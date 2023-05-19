
import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyPlane
 * DateTime = Thu May 18 2023 14:35:52 GMT+0800 (中国标准时间)
 * Author = 热狂蚂蚁
 * FileBasename = EnemyPlane.ts
 * FileBasenameNoExtension = EnemyPlane
 * URL = db://assets/script/plane/EnemyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

const OUTOFBOUNCE = 50;

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {

    /**
     * 子弹发射周期
     */
    @property
    public createBulletTime = 0.5;

    private _enemySpeed = 0;
    private _needBullet = false;
    private _gameManager: GameManager = null;

    private _currCreateBulletTime = 0;

    start() {
        // [3]
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        const movePos = pos.z + this._enemySpeed;
        this.node.setPosition(pos.x, pos.y, movePos);

        if (this._needBullet) {
            this._currCreateBulletTime += deltaTime;
            if (this._currCreateBulletTime > this.createBulletTime) {
                this._gameManager.createEnemyBullet(this.node.position);
                this._currCreateBulletTime = 0;
            }
        }

        if (pos.z > OUTOFBOUNCE) {
            this.node.destroy();
        }
    }

    show(gameManager: GameManager, speed: number, needBullet: boolean) {
        this._gameManager = gameManager;
        this._enemySpeed = speed;
        this._needBullet = needBullet;
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
