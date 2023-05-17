
import { _decorator, Component, EventTouch, Node, SystemEvent, Touch } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UiMain
 * DateTime = Wed May 17 2023 23:03:44 GMT+0800 (中国标准时间)
 * Author = 热狂蚂蚁
 * FileBasename = UiMain.ts
 * FileBasenameNoExtension = UiMain
 * URL = db://assets/script/ui/UiMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('UiMain')
export class UiMain extends Component {

    @property
    public planeSpeed: number = 1;

    @property(Node)
    public playerPlane: Node = null;

    start() {
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
    }

    _touchMove(touch: Touch, event: EventTouch): void {
        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * delta.x * this.planeSpeed, pos.y, pos.z - 0.01 * delta.y * this.planeSpeed);
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
