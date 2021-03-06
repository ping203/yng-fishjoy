////////////////////////////////////////////////////////////////////////////////
// 玩家反馈的接口实现.
////////////////////////////////////////////////////////////////////////////////

//==============================================================================
// import
//==============================================================================
var data_util = require('./data_util');
var buzz_level = require('../../src/buzz/buzz_level');

//------------------------------------------------------------------------------
// 缓存(Cache)
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// 配置表
//------------------------------------------------------------------------------

//==============================================================================
// const
//==============================================================================
var DEBUG = 0;
var ERROR = 1;
var TAG = "【data/level】";

//==============================================================================
// public
//==============================================================================

//------------------------------------------------------------------------------
// definition
//------------------------------------------------------------------------------
exports.levelUp = levelUp;

//------------------------------------------------------------------------------
// implement
//------------------------------------------------------------------------------

function levelUp(req, res) {
    const FUNC = TAG + "levelUp() --- ";
    const HINT = "玩家升级";
    //----------------------------------
    var aes = req.body.aes;
    var dataObj = data_util.parseDataObj(req, HINT);

    buzz_level.levelUp(req, dataObj, function(err, result) {
        data_util.handleReturn(res, aes, err, result, HINT);
    });
}