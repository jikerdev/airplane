
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Constant
 * DateTime = Thu May 18 2023 15:02:47 GMT+0800 (中国标准时间)
 * Author = 热狂蚂蚁
 * FileBasename = Constant.ts
 * FileBasenameNoExtension = Constant
 * URL = db://assets/script/framework/Constant.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
export class Constant{

    @property
    public enemySpeed: number = 0;

    public enemyType = Constant.EnemyType.TYPE1;

    public static EnemyType = {
        TYPE1: 1,
        TYPE2: 2,
    }

    public static Combination = {
        PLAN1: 1,
        PLAN2: 2,
        PLAN3: 3,
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
