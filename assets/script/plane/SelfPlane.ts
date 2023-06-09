
import { _decorator, AudioSource, Collider, Component, ITriggerEvent, Node } from 'cc';
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
    @property(Node)
    public explode: Node = null;
    @property(Node)
    public bloodFace: Node = null;
    @property(Node)
    public blood: Node = null;

    public lifeValue = 5;
    public isDie = false;

    private _currLife = 0;
    private _audioSource: AudioSource = null;

    start() {
        this._audioSource = this.getComponent(AudioSource);
    }

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
        this.explode.active = false;
        // 每次初始化时，将血条缩放值重置
        this.bloodFace.setScale(1, 1, 1);
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const colliderGroup = event.otherCollider.getGroup();
        if (colliderGroup === Constant.CollisionType.ENEMY_PLANE
            || colliderGroup === Constant.CollisionType.ENEMY_BULLET) {
            if (this._currLife === this.lifeValue) {
                // 飞机第一次减少血量时，激活血量组件
                this.blood.active = true;
            }
            this._currLife--;
            // 每次扣血时，调整血条的缩放值
            this.bloodFace.setScale(this._currLife / this.lifeValue, 1, 1);
            if (this._currLife <= 0) {
                this.isDie = true;
                this._audioSource.play();
                // 碰撞时，将爆炸激活
                this.explode.active = true;
                // 玩家飞机死亡时，隐藏血量
                this.blood.active = false;
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
