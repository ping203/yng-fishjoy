//==========================================================
// 初始化业务
//==========================================================

var DateUtil = require('../utils/DateUtil');


var DEBUG = 0;
var ERROR = 1;
var TAG = "【buzz_initdata】";

//------------------------------------------------------------------------------
// definition
//------------------------------------------------------------------------------
exports.initMonthSign = initMonthSign;

//------------------------------------------------------------------------------
// implement
//------------------------------------------------------------------------------


/**
 *初始化月签数据
 */
function initMonthSign() {
    var ret = "";
    var n = DateUtil.getDaysOfThisMonth();
    for (var i = 0; i < n; i++) {
        if (i > 0) ret += ",";
        ret += "0";
    }
    return ret;
}