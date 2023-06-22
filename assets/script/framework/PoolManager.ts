
import { _decorator, Component, instantiate, Node, NodePool, Pool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PoolManager
 * DateTime = Thu Jun 22 2023 14:21:02 GMT+0800 (中国标准时间)
 * Author = 热狂蚂蚁
 * FileBasename = PoolManager.ts
 * FileBasenameNoExtension = PoolManager
 * URL = db://assets/script/framework/PoolManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

interface IDictPool {
    [name: string]: NodePool;
}

interface IDictPrefab {
    [name: string]: Prefab;
}

@ccclass('PoolManager')
export class PoolManager {

    private _dictPool: IDictPool = {};
    private _dictPrefab: IDictPrefab = {};
    private static _instance: PoolManager;

    public static instance() {
        if (!this._instance) {
            this._instance = new PoolManager();
        }
        return this._instance;
    }

    public getNode(prefab: Prefab, parent: Node) {
        let name = prefab.data.name;
        let node: Node = null;
        this._dictPrefab[name] = prefab;

        const pool = this._dictPool[name];
        if (pool) {
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                node = instantiate(prefab);
            }
        } else {
            // 如果没有这个分类的小容器，则去创建这个分类的小容器
            this._dictPool[name] = new NodePool();
            node = instantiate(prefab);
        }

        node.parent = parent;
        node.active = true;
        return node;
    }

    public putNode(node: Node) {
        let name = node.name;
        // 节点被回收，则设置为null
        node.parent = null;
        // 判断容器里是否存在这个分类的节点
        if (!this._dictPool[name]) {
            // 新创建一个小容器
            this._dictPool[name] = new NodePool();
        }
        this._dictPool[name].put(node);
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
