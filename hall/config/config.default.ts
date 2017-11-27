'use strict';
import { EggAppConfig } from 'egg';
import defaultConfig from './defaultConfig';
import * as fs from 'fs';
import * as path from 'path';

export default (appInfo: EggAppConfig) => {
    
    const config: any = {};
    config.keys = appInfo.name + '123456';

    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png')),
    };

    // config.view = {
    //     defaultViewEngine: 'nunjucks',
    //     mapping: {
    //         '.tpl': 'nunjucks',
    //     },
    // };

    config.view = {
        defaultViewEngine: 'ejs',
        mapping: {
            '.html': 'ejs',
        },
    };

    config.middleware = [
        'errorHandler',
        'decryptBody',
        'cryptBody'
    ];

    config.logger ={
        level:'DEBUG',
        consoleLevel: 'DEBUG',
    }

    config.security = {
        xframe: {
          enable: false,
        },
        csrf:{
            enable:false,
        }
      };

    config.mysql = {
        client:{
            host:'127.0.0.1',
            port:'3306',
            user:'root',
            password:'linyng',
            database:'fishjoy',
        },
        app:true,
        agent:false,
    }

    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'fishjoy',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: 'root',
    }

    config.i18n ={
        defaultLocale: 'en_US',
    }

    config.static = {
        prefix:'/',
        dir:[path.join(appInfo.baseDir, 'app/public')]
    }

    return {...config, ...defaultConfig};
}