
import { _decorator, Collider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Thu May 18 2023 10:18:23 GMT+0800 (中国标准时间)
 * Author = 热狂蚂蚁
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Bullet')
export class Bullet extends Component {
    private _bulletSpeed = 0;

    private _isEnemyBullet = false;

    onEnable() {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        console.log('trigger bullet destroy');

        this.node.destroy();
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;
        if (this._isEnemyBullet) {
            moveLength = pos.z + this._bulletSpeed;
            this.node.setPosition(pos.x, pos.y, moveLength);

            if (moveLength > 50) {
                this.node.destroy();
                console.log('bullet destroy');
            }
        } else {
            moveLength = pos.z - this._bulletSpeed;
            this.node.setPosition(pos.x, pos.y, moveLength);

            if (moveLength < -50) {
                this.node.destroy();
                console.log('bullet destroy');
            }
        }
    }

    show(speed: number, isEnemyBullet: boolean) {
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;
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
