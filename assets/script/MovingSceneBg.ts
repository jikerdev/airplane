
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MovingBg
 * DateTime = Wed May 17 2023 18:35:59 GMT+0800 (中国标准时间)
 * Author = 热狂蚂蚁
 * FileBasename = MovingBg.ts
 * FileBasenameNoExtension = MovingBg
 * URL = db://assets/MovingBg.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('MovingBg')
export class MovingBg extends Component {

    @property(Node)
    bg01: Node = null;

    @property(Node)
    bg02: Node = null;

    private _speed: number = 10;
    private _bgMovingRange = 90;

    start() {
        this._init();
    }

    private _init(): void {
        this.bg01.setPosition(0, 0, 0);
        this.bg02.setPosition(0, 0, -this._bgMovingRange);
    }

    protected update(deltaTime: number): void {
        this._moveBackground(deltaTime);
    }

    private _moveBackground(deltaTime: number): void {
        this.bg01.setPosition(0, 0, this.bg01.position.z + this._speed * deltaTime);
        this.bg02.setPosition(0, 0, this.bg02.position.z + this._speed * deltaTime);

        if (this.bg01.position.z >= this._bgMovingRange) {
            this.bg01.setPosition(0, 0, this.bg02.position.z - this._bgMovingRange);
        }else if(this.bg02.position.z > this._bgMovingRange){
            this.bg02.setPosition(0, 0, this.bg01.position.z - this._bgMovingRange);
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
