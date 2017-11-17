const RobotPlayer = require('./robotPlayer');
const fishCmd = require('../fishCmd');
const event = require('../../../base/event');
const config = require('../config');
const robotBuilder = require('./robotBuilder');

class RobotController {
    constructor() {
        this._robotPlayerMap = new Map();
        event.on(fishCmd.request.robot_catch_fish.route.split('.')[2], this.onCatchfish.bind(this));
        this._fireTimer = null;
    }

    run() {
        if (!this._fireTimer) {
            this._fireTimer = setInterval(this.robotAction.bind(this), config.ROBOT.FIRE_TIMEOUT);
        }
    }

    stop() {
        if (this._fireTimer) {
            clearInterval(this._fireTimer);
        }
    }

    robotAction() {
        this.fire();
        this._checkTimeout();
    }

    onCatchfish(data, cb) {
        let player = this._robotPlayerMap.get(data.robot_uid);
        if (!!player) {
            player.c_catch_fish(data, cb);
        }
        else {
            utils.invokeCallback(cb, CONSTS.SYS_CODE.PLAYER_NOT_EXIST);
        }
    }


    /**
     * 添加机器人到房间
     * @param rooms
     */
    async addRobot(rooms) {
        if (rooms.length == 0) {
            return;
        }

        for(let item of rooms){
            let room = item.room;
            let scene = item.scene;

            let account = await robotBuilder.genAccount(room);
            logger.error('-----------------------account:', account);
            let player = RobotPlayer.allocPlayer({
                gameMode: room.mode,
                sceneType: room.sceneType,
                account: account,
                scene:scene
            });

            logger.error('机器人加入房间：', player);
            this._addPlayerEvent(player);
            this._robotPlayerMap.set(player.uid, player);

            scene.robotJoin(player, room);
        }
    }

    _checkTimeout(){
        let now = Date.now();
        let uids = [];
        for(let player of this._robotPlayerMap.values()){
            if(now - player.joinTime >= config.ROBOT.JOIN_TIMEOUT){
                player.scene.robotLeave(player.uid);
                uids.push(player.uid);
                logger.error('------------------------玩家超市离开', player.uid);
            }
        }

        uids.forEach(function (uid) {
            this._robotPlayerMap.delete(uid);
        }.bind(this))
    }

    _addPlayerEvent(player) {
        player.on('kick', function (event) {
            logger.error('-----------robot kick', event.player.uid);
            this._robotPlayerMap.delete(event.player.uid);

        }.bind(this));
    }

    /**
     * 开火
     */
    fire() {
        for (let player of this._robotPlayerMap.values()) {
            player.robotFire();
        }
    }

     useSkill() {
        for(let player of this._robotPlayerMap.values()){
            let wpLv = player.DIY.weapon;
            let skillId = 8;
            player.c_use_skill({
                skill: skillId,
                wp_level: wpLv, 
            }, function () {
                player.c_use_skill_sure({
                    skill: skillId,
                    fire_point: {x: utils.random_int(0, 1280), y: utils.random_int(0,720)}, //开火人打击点
                    wp_level: wpLv,
                });
            });
        }
    }

    changeWeapon() {
        for(let player of this._robotPlayerMap.values()){
            let eng = player.DIY.weapon_energy;
            let keys = Object.keys(eng);
            let ri = Math.floor(Math.random()*keys.length);
            let wpLv = keys[ri];
            if (player.DIY.weapon == wpLv) {
                continue;
            }
            player.c_fighting_notify({
                event: consts.FIGHTING_NOTIFY.WP_LEVEL,
                event_data: wpLv,  
            });
        }
    }

    changeWeaponSkin() {
        for(let player of this._robotPlayerMap.values()){
            let own = player.account.weapon_skin.own;
            let ri = Math.floor(Math.random()*own.length);
            let wpSkin = own[ri];
            if (player.DIY.weapon_skin == wpSkin) {
                continue;
            }
            player.c_fighting_notify({
                event: consts.FIGHTING_NOTIFY.WP_SKIN,
                event_data: wpSkin,  
            });
        }
    }


}

module.exports = new RobotController();


