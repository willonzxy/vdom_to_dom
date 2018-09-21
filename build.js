/*
 * @Author: willon 
 * @Date: 2018-09-21 10:04:06 
 * @Last Modified by: willon tel:13189679384
 * @Last Modified time: 2018-09-21 11:15:59
 */
function create_virtual_dom_by_jsx() {
    return h(
        "ul",
        { id: "filmList", className: "list" },
        h(
            "li",
            { className: "main" },
            "Detective Chinatown Vol 2"
        ),
        h(
            "li",
            null,
            "Ferdinand"
        ),
        h(
            "li",
            null,
            "Paddington 2"
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
/* function render() {
    console.log(view()); // 呈现vdom的结构先
} */
console.log(create_virtual_dom_by_jsx());
/* 2、现在我们来改写render函数让其根据virtual dom渲染出真正的dom */
function render(dom) {
    dom.appendChild(createElement(create_virtual_dom_by_jsx())); // 记住view()
}

function createElement(vdom) {
    var node = document.createElement(vdom.type); // 创建元素
    setAttr(node, vdom.props); // 设置属性
    Array.isArray(vdom.children) && vdom.children.forEach(element => {
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
    for (let key in props) {
        dom[key] = props[key];
    }
}
