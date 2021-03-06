var express = require('express');
var router = express.Router();
var buzz_admin_utils = require('../../src/buzz/buzz_admin_utils');
var buzz_cst_admin = require('../../src/buzz/cst/buzz_cst_admin');
var buzz_cst_gm_data = require('../../src/buzz/cst/buzz_cst_tm_tool');
var _ = require('underscore');

function _makeVar() {
    var TXT_EN = buzz_cst_admin.TXT_SIDEBAR_EN;
    TXT_EN = _.extend(TXT_EN, buzz_cst_gm_data.TXT_CONTENT_EN);
    
    var TXT_CN = buzz_cst_admin.TXT_SIDEBAR_CN;
    TXT_CN = _.extend(TXT_CN, buzz_cst_gm_data.TXT_CONTENT_CN);
    
    var data = TXT_CN;
    
    data = _.extend(data, { title: 'Test Tool', expanded_id: 'menu_test_mgmt' });
    return data;
}

/* GET */
router.get('/', function (req, res) {
    res.render("admin/pages-tm-tool", _makeVar());
});

/* POST */
router.post('/', function (req, res) {
    buzz_admin_utils.checkTokenPost(req, function (err, user_auth) {
        if (err) {
            console.log(JSON.stringify(err));
            cb(err);
        } else {
            var params = _makeVar(req);
            params = _.extend(params, { user_auth: user_auth });
            
            res.render("admin/pages-tm-tool", params);
        }
    });
});

module.exports = router;