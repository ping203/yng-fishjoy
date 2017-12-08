﻿////////////////////////////////////////////////////////////////////////////////
// Account Update Exp and Level Function
// 账户数据更新(经验和等级)
// update
////////////////////////////////////////////////////////////////////////////////

//==============================================================================
// import
//==============================================================================
var ObjUtil = require('../../../buzz/ObjUtil');
var AccountCommon = require('../common');
var CacheAccount = require('../../../buzz/cache/CacheAccount');

var DEBUG = 0;


//==============================================================================
// public
//==============================================================================

//------------------------------------------------------------------------------
// definition
//------------------------------------------------------------------------------
exports.update = _update;

//------------------------------------------------------------------------------
// implement
//------------------------------------------------------------------------------

/**
 * 账户数据更新(经验和等级).
 */
function _update(pool, data, cb, my_account) {
    if (DEBUG) console.log("CALL _updateExpAndLevel()");
    
    var account_id = my_account['id'];
    var token = my_account['token'];

    var old_exp = parseInt(my_account['exp']);
    var old_level = parseInt(my_account['level']);
    var exp = data['exp'] || old_exp;
    var level = data['level'] || old_level;
        
    if (level < old_level) {
        cb(new Error("更新的玩家等级不能低于原有等级!"));
        return;
    }

    //--------------------------------------------------------------------------
    // 更新缓存中的数据(重要:数据库操作将会被删除)
    //--------------------------------------------------------------------------
    CacheAccount.setExp(account_id, exp);
    CacheAccount.setLevel(account_id, level);
    //--------------------------------------------------------------------------

    cb(null, "success");
}


//==============================================================================
// private
//==============================================================================