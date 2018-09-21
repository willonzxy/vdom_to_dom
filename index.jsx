/*
 * @Author: willon 
 * @Date: 2018-09-21 10:04:06 
 * @Last Modified by: willon tel:13189679384
 * @Last Modified time: 2018-09-21 12:35:11
 */
function create_virtual_dom_by_jsx(){
    return (
        <ul id="filmList" className="list">
            <li className="main">Detective Chinatown Vol 2</li>
            <li>Ferdinand</li>
            <li>Paddington 2</li>
        </ul>
    )
}

function flattern(arr){
    return [].concat(...arr)
}

function h(type , props = {} , ...children){
    return {
        type,
        props,
        children:flattern(children) // 嵌套结构压扁
    }
}

/* 1、初步渲染出vdom的结构 */
console.log(create_virtual_dom_by_jsx())

/* 2、现在我们来改写render函数让其根据virtual dom渲染出真正的dom */
function render(dom) {
    dom.appendChild(createElement(create_virtual_dom_by_jsx())); // 记住view()
}

function createElement(vdom) {
    var node = document.createElement(vdom.type); // 创建元素
    setAttr(node, vdom.props); // 设置属性
    Array.isArray(vdom.children) && vdom.children.forEach( element => { // 有子元素就递归渲染
        if( typeof element === 'string'){
            node.appendChild(document.createTextNode(element))
        }else{
            node.appendChild(createElement(element))
        }
    });
    return node
}

function setAttr(dom, props) {
    Object.keys(props).forEach( attrName => {
        if( attrName === 'className' ){
            dom.setAttribute('class',props[attrName])
        }else{
            dom.setAttribute(attrName,props[attrName])
        }
    })
}


