/*
 * @Author: willon 
 * @Date: 2018-09-21 10:04:06 
 * @Last Modified by: willon tel:13189679384
 * @Last Modified time: 2018-09-21 12:58:04
 */
function create_virtual_dom_by_jsx() {
    return h(
        "ul",
        { id: "list", className: "list" },
        h(
            "li",
            { className: "main" },
            "\u8096\u7533\u514B\u7684\u6551\u8D4E"
        ),
        h(
            "li",
            null,
            "\u963F\u7518\u6B63\u4F20"
        ),
        h(
            "li",
            null,
            "\u76D7\u68A6\u7A7A\u95F4"
        )
    );
}

function flattern(arr) {
    return [].concat(...arr);
}

function h(type, props = {}, ...children) {
    return {
        type,
        props,
        children: flattern(children) // 嵌套结构压扁
    };
}

/* 1、初步渲染出vdom的结构 */
console.log(create_virtual_dom_by_jsx());

/* 2、现在我们来改写render函数让其根据virtual dom渲染出真正的dom */
function render(dom) {
    dom.appendChild(createElement(create_virtual_dom_by_jsx())); // 记住view()
}

function createElement({ type, props, children }) {
    let node = document.createElement(type); // 创建元素
    props && setAttr(node, props); // 设置属性
    Array.isArray(children) && children.forEach(element => {
        // 有子元素就递归渲染
        if (typeof element === 'string') {
            node.appendChild(document.createTextNode(element));
        } else {
            node.appendChild(createElement(element));
        }
    });
    return node;
}

function setAttr(dom, props) {
    Object.keys(props).forEach(attrName => {
        if (attrName === 'className') {
            dom.setAttribute('class', props[attrName]);
        } else {
            dom.setAttribute(attrName, props[attrName]);
        }
    });
}
