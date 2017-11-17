const REDISKEY = require('../../database/consts').REDISKEY;
const ACCOUNTKEY = require('../../database/consts').ACCOUNTKEY;
const rankScore = require('../../base/utils/rankScore');
const SUBTASK_TYPE = require('../src/consts').SUBTASK_TYPE;
const REWARD_TYPE = require('../src/consts').REWARD_TYPE;

function crossWeek() {
    
}


function crossMonth() {

}

module.exports = {
    //按天重置
    dailyReset: {
        enable: false,
        time: '*/10,*,*,*,*,*',
        //time: '0,0,0,*,*,*', //每天0点执行
        subTask: [
            {redisKey: REDISKEY.FIRST_LOGIN, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.DAY_REWARD, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.VIP_DAILY_FILL, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.BROKE_TIMES, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.LEVEL_MISSION, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.MISSION_DAILY_RESET, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.HEARTBEAT, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.HEARTBEAT_MIN_COST, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.GOLD_SHOPPING, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.DROP_RESET, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.COMEBACK, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.ACTIVE_DAILY_RESET, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.ACTIVE_STAT_RESET, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.FREE_DRAW, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.TOTAL_DRAW, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.GET_CARD, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.GODDESS_CTIMES, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.SOCIAL_SHARE_STATUS_1, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.SOCIAL_INVITE_DAILY_STATE, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.DAY_REWARD_ADV, type: SUBTASK_TYPE.DEL},

            {redisKey: REDISKEY.TOKEN, type: SUBTASK_TYPE.MODIFY, limit: 1000, value: 'daily_reset'},
            {redisKey: REDISKEY.GODDESS_FREE, type: SUBTASK_TYPE.MODIFY, limit: 1000, value: 1},
            {redisKey: REDISKEY.GODDESS_CROSSOVER, type: SUBTASK_TYPE.MODIFY, limit: 1000, value: 1},
        ]
    },
    //按周重置
    weekReset: {
        enable: false,
        time: '*/10,*,*,*,*,*',
        //time: '0,0,0,*,*,7', //每周日0点执行
        subTask: [
            {redisKey: REDISKEY.MAX_WAVE, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.SOCIAL_SHARE_STATUS_2, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.FLOWER_RECEIVE_WEEKLY, type: SUBTASK_TYPE.DEL},

            {redisKey: REDISKEY.RANK.BP, platforms: REDISKEY.PLATFORM_TYPE, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.RANK.GODDESS, platforms: REDISKEY.PLATFORM_TYPE, type: SUBTASK_TYPE.DEL},
            {redisKey: REDISKEY.RANK.FLOWER, platforms: REDISKEY.PLATFORM_TYPE, type: SUBTASK_TYPE.DEL},
        ]
    },
    //按月重置
    monthReset: {
        enable: true,
        time: '*/10,*,*,*,*,*',
        //time: '0,0,0,1,*,*', //每月1号0点执行
        subTask: [
            {
                redisKey: REDISKEY.RANK.MATCH,
                platforms: REDISKEY.PLATFORM_TYPE,
                type: SUBTASK_TYPE.MODIFY,
                limit: 2000,
                condition: function (points) {
                    return Math.floor(740 + Math.max(points - 800, 100) * 0.6);
                },
                default_points: 800,
                default_rank: 5
            },
        ]
    },
    //排行榜生成
    rankBuild: {
        enable: false,
        time: '*/5,*,*,*,*,*',
        subTask: [
            {
                redisKey: REDISKEY.RANK.GODDESS,
                originScore: null,
                range: 10000,
                limit: 1000,
                showDetail: 100,
                ext: [ACCOUNTKEY.NICKNAME, ACCOUNTKEY.FIGURE_URL, ACCOUNTKEY.SEX]
            },
            {
                redisKey: REDISKEY.RANK.MATCH,
                originScore: null,
                range: 10000,
                limit: 1000,
                showDetail: 100,
                ext: [ACCOUNTKEY.NICKNAME, ACCOUNTKEY.FIGURE_URL, ACCOUNTKEY.SEX]
            },
            {
                redisKey: REDISKEY.RANK.AQUARIUM,
                originScore: null,
                range: 10000,
                limit: 1000,
                showDetail: 100,
                ext: [ACCOUNTKEY.NICKNAME, ACCOUNTKEY.FIGURE_URL, ACCOUNTKEY.SEX]
            },
            {
                redisKey: REDISKEY.RANK.CHARM,
                originScore: null,
                range: 10000,
                limit: 1000,
                showDetail: 100,
                ext: [ACCOUNTKEY.NICKNAME, ACCOUNTKEY.FIGURE_URL, ACCOUNTKEY.SEX]
            },
            {
                redisKey: REDISKEY.RANK.BP,
                originScore: null,
                range: 10000,
                limit: 1000,
                showDetail: 100,
                ext: [ACCOUNTKEY.NICKNAME, ACCOUNTKEY.FIGURE_URL, ACCOUNTKEY.SEX]
            },
            {
                redisKey: REDISKEY.RANK.FLOWER,
                originScore: null,
                range: 10000,
                limit: 1000,
                showDetail: 100,
                ext: [ACCOUNTKEY.NICKNAME, ACCOUNTKEY.FIGURE_URL, ACCOUNTKEY.SEX]
            },
        ]
    },
    //排行奖励、重置
    rankReward:{
        enable: false,
        time: '*/10,*,*,*,*,*',
        //time: '0,0,0,*,*,*', //每天0点执行
        subTask: [
            {redisKey: REDISKEY.RANK.BP, reward:[REWARD_TYPE.DAILY, REWARD_TYPE.WEEK], reset:crossWeek},
            {redisKey: REDISKEY.RANK.GODDESS, reward:[REWARD_TYPE.DAILY, REWARD_TYPE.WEEK], reset:crossWeek},
            {redisKey: REDISKEY.RANK.FLOWER, reward:[REWARD_TYPE.DAILY, REWARD_TYPE.WEEK], reset:crossWeek},
            {redisKey: REDISKEY.RANK.AQUARIUM, reward:[REWARD_TYPE.DAILY]},
            {redisKey: REDISKEY.RANK.CHARM, reward:[REWARD_TYPE.DAILY]},
            {redisKey: REDISKEY.RANK.MATCH, reward:[REWARD_TYPE.DAILY, REWARD_TYPE.MONTH], reset:crossMonth},
        ]
    }

};