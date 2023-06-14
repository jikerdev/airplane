
import { _decorator, Collider, Component, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SelfPlane
 * DateTime = Wed May 17 2023 22:34:33 GMT+0800 (中国标准时间)
 * Author = 热狂蚂蚁
 * FileBasename = SelfPlane.ts
 * FileBasenameNoExtension = SelfPlane
 * URL = db://assets/script/SelfPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('SelfPlane')
export class SelfPlane extends Component {

    public lifeValue = 5;
    public isDie = false;

    private _currLife = 0;

    onEnable() {
        // 注册触发事件来监听碰撞回调, onTriggerEnter 为碰撞开始回调
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    public init() {
        this._currLife = this.lifeValue;
        this.isDie = false;
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const colliderGroup = event.otherCollider.getGroup();
        if (colliderGroup === Constant.CollisionType.ENEMY_PLANE
            || colliderGroup === Constant.CollisionType.ENEMY_BULLET) {
            this._currLife--;
            if (this._currLife <= 0) {
                this.isDie = true;
            }
        }
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
