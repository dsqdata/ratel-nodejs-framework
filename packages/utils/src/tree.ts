const DEFAULT_CONFIG = {
    id: 'id',
    children: 'children',
    pid: 'pid'
}

const getConfig = config => Object.assign({}, DEFAULT_CONFIG, config)

/**
 * 列表转树
 * @param list
 * @param config
 * @param backFun
 */
export function listToTree(list: any[], config: any = {}, backFun): any {
    config = getConfig(config)
    const nodeMap = new Map(), result = [], {id, children, pid} = config
    for (const node of list) {
        node[children] = node[children] || []
        nodeMap.set(node[id], node)
    }
    for (const node of list) {
        const parent = nodeMap.get(node[pid]);
        if (backFun) {//处理 parent,node
            backFun(parent, node);
        }
        (parent ? parent.children : result).push(node)
    }
    return result
}

/**
 * 树转列表
 * @param tree
 * @param config
 */
export function treeToList(tree, config: any = {}) {
    config = getConfig(config)
    const {children} = config, result = [...tree]
    for (let i = 0; i < result.length; i++) {
        if (!result[i][children]) continue
        result.splice(i + 1, 0, ...result[i][children])
    }
    return result
}

/**
 * 查找树节点
 * @param tree
 * @param func 查找函数
 * @param config
 */
export function findNode(tree, func, config: any = {}) {
    config = getConfig(config)
    const {children} = config, list = [...tree]
    for (let node of list) {
        if (func(node)) return node
        node[children] && list.push(...node[children])
    }
    return null
}

/**
 * 查找所有树节点
 * @param tree
 * @param func
 * @param config
 */
export function findNodeAll(tree, func, config: any = {}) {
    config = getConfig(config)
    const {children} = config, list = [...tree], result = []
    for (let node of list) {
        func(node) && result.push(node)
        node[children] && list.push(...node[children])
    }
    return result
}
