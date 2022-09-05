/* Gooact by SweetPalma, 2018. All rights reserved. */
(() => { 'use strict';

const createElement = (type, props, ...children) => {
    if (props === null) props = {};
    return {type, props, children};
};

const setAttribute = (dom, key, value) => {
    if (typeof value == 'function' && key.startsWith('on')) { //case1. event handler 적용
        const eventType = key.slice(2).toLowerCase();
        dom.__gooactHandlers = dom.__gooactHandlers || {};
        dom.removeEventListener(eventType, dom.__gooactHandlers[eventType]);
        dom.__gooactHandlers[eventType] = value;
        dom.addEventListener(eventType, dom.__gooactHandlers[eventType]);
    } else if (key == 'checked' || key == 'value' || key == 'className') { //case2. button check 관련
        dom[key] = value;
    } else if (key == 'style' && typeof value == 'object') { //case3. css style 적용
        Object.assign(dom.style, value);
    } else if (key == 'ref' && typeof value == 'function') { //case4. a href 관련
        value(dom);
    } else if (key == 'key') { //case5. 쌩 key value 관련 인듯?
        dom.__gooactKey = value;
    } else if (typeof value != 'object' && typeof value != 'function') { //case6. 임의의 attribute 부여한 것인듯? 
        dom.setAttribute(key, value);
    }
};

const render = (vdom, parent=null) => {
    const mount = parent ? (el => parent.appendChild(el)) : (el => el);
    if (typeof vdom == 'string' || typeof vdom == 'number') { //case1. 123 or 'hello' -> plain text nodes
        return mount(document.createTextNode(vdom));
    } else if (typeof vdom == 'boolean' || vdom === null) { //case2. <div></div> -> plain text nodes
        return mount(document.createTextNode(''));
    } else if (typeof vdom == 'object' && typeof vdom.type == 'function') { //case3. <CustomTitle> ... </CustomTitle> -> recursive, render()
        return Component.render(vdom, parent);
    } else if (typeof vdom == 'object' && typeof vdom.type == 'string') { //case4. when it starts with <div>, <ul>, etc... and has children -> recursive render() for its children, along with adding attributes 
        const dom = mount(document.createElement(vdom.type));
        for (const child of [/* flatten */].concat(...vdom.children))
            render(child, dom);
        for (const prop in vdom.props)
            setAttribute(dom, prop, vdom.props[prop]);
        return dom;
    } else {
        throw new Error(`Invalid VDOM: ${vdom}.`);
    }
}


const patch = (dom, vdom, parent=dom.parentNode) => {
    const replace = parent ? el => (parent.replaceChild(el, dom) && el) : (el => el);
    if (typeof vdom == 'object' && typeof vdom.type == 'function') { //case1. complex DOM + complex VDOM = recursive patch(); 
        return Component.patch(dom, vdom, parent);
    } else if (typeof vdom != 'object' && dom instanceof Text) { //case2. text DOM + primitive VDOM = if their contents diffs, full re-render
        return dom.textContent != vdom ? replace(render(vdom, parent)) : dom; 
    } else if (typeof vdom == 'object' && dom instanceof Text) { //case3. text DOM + Complex VDOM = full re-render
        return replace(render(vdom, parent));
    } else if (typeof vdom == 'object' && dom.nodeName != vdom.type.toUpperCase()) { //case4. DOM and VDOM different types && complex VDOM -> full re-render
        return replace(render(vdom, parent));
    } else if (typeof vdom == 'object' && dom.nodeName == vdom.type.toUpperCase()) { //case5. highlight. DOM and VDOM same types && complex VDOM -> children reconciliation. 
        const pool = {};
        const active = document.activeElement;
        [].concat(...dom.childNodes).map((child, index) => {
            const key = child.__gooactKey || `__index_${index}`; //tree에 넣어진 순서를 비교하네?
            pool[key] = child; //일단 pool에 DOM의 element들을 key:value로 넣어둠
        });
        [].concat(...vdom.children).map((child, index) => {
            const key = child.props && child.props.key || `__index_${index}`; //props 이름이 key가 되어 DOM의 요소들의 props 이름(key)와 비교됨.(없다면 tree에 넣어진 순서 비교) 
            dom.appendChild(pool[key] ? patch(pool[key], child) : render(child, dom)); //recursive로 DOM에서 pool로 child 넣었으면, patch(pool[key], child)로 재 비교하고, VDOM에는 있는 child가 DOM에 없어서 pool[key]에 없다면, render(VDOM_child, dom) 한다. 
            delete pool[key]; //렌더 했으니 값 만 일단 제거. 키는 살려두네? memoization. 
        });
        for (const key in pool) {
            const instance = pool[key].__gooactInstance; //바로 위에서 DOM child랑 VDOM child 비교할 때, pool[key] delete하고 남은 key들을 여기서 깔끔히 지워주는거 갑네. 근데 왜 위에서 지우지 번거롭게 여기서 따로 지우지? 아 delete pool[key]하면 키는 남기고 값만 지워지는데, 같은 키가 여러번 나올 수 있으니까. div 같은 애들 재활용 하려고 하는거구나! 
            if (instance) instance.componentWillUnmount(); //아 그게 아니라 value가 DOM의 child 그 자체네. 비교했을 때, 없는 애들을 일괄삭제해주는 애구나. 
            pool[key].remove();
        }
        for (const attr of dom.attributes) dom.removeAttribute(attr.name); //attributes는 비교 안하고 싹 다 지운다음에 
        for (const prop in vdom.props) setAttribute(dom, prop, vdom.props[prop]); //전부 다시 부여하네 
        active.focus(); //dom tree에서 이리저리 이동했으니, 마지막으로 active했던 tree node로 복원시키는 것 
        return dom;
    }
};
class Component {
    constructor(props) { //takes props as parameter 
        this.props = props || {}; //stores read-only props 
        this.state = null; //stores changing state 
    }

    static render(vdom, parent=null) {
        const props = Object.assign({}, vdom.props, {children: vdom.children});
        if (Component.isPrototypeOf(vdom.type)) {
            const instance = new (vdom.type)(props);
            instance.componentWillMount(); //react lifecycle - before render
            instance.base = render(instance.render(), parent);
            instance.base.__gooactInstance = instance;
            instance.base.__gooactKey = vdom.props.key;
            instance.componentDidMount(); //react lifecycle- after render 
            return instance.base;
        } else {
            return render(vdom.type(props), parent);
        }
    }

    static patch(dom, vdom, parent=dom.parentNode) {
        const props = Object.assign({}, vdom.props, {children: vdom.children});
        if (dom.__gooactInstance && dom.__gooactInstance.constructor == vdom.type) {
            dom.__gooactInstance.componentWillReceiveProps(props); //react lifecycle method 
            dom.__gooactInstance.props = props;
            return patch(dom, dom.__gooactInstance.render(), parent);
        } else if (Component.isPrototypeOf(vdom.type)) { //VDOM이 extends Component한 리엑트 컴포넌트면 
            const ndom = Component.render(vdom, parent); //새로운 DOM에 render() 이후, 
            return parent ? (parent.replaceChild(ndom, dom) && ndom) : (ndom); //기존 DOM과 갈아끼운다 
        } else if (!Component.isPrototypeOf(vdom.type)) { //VDOM이 리엑트 컴포넌트가 아니면, 
            return patch(dom, vdom.type(props), parent); //patch() 
        }
    }

    setState(next) {
        const compat = (a) => typeof this.state == 'object' && typeof a == 'object';
        if (this.base && this.shouldComponentUpdate(this.props, next)) {
            const prevState = this.state;
            this.componentWillUpdate(this.props, next); //fire all lifecycle method 
            this.state = compat(next) ? Object.assign({}, this.state, next) : next; //setState 이후, 
            patch(this.base, this.render()); //re-render() 
            this.componentDidUpdate(this.props, prevState); //fire all lifecycle method 
        } else {
            this.state = compat(next) ? Object.assign({}, this.state, next) : next;
        }
    }

    shouldComponentUpdate(nextProps, nextState) { //when props or state is different, return true  
        return nextProps != this.props || nextState != this.state;
    }

    componentWillReceiveProps(nextProps) { //react lifecycle method to be overrided 
        return undefined;
    }

    componentWillUEdate(nextProps, nextState) { //react lifecycle method to be overrided 
        return undefined;
    }

    componentDidUpdate(prevProps, prevState) { //react lifecycle method to be overrided
        return undefined;
    }

    componentWillMount() { //react lifecycle method to be overrided 
        return undefined;
    }

    componentDidMount() { //react lifecycle method to be overrided 
        return undefined;
    }

    componentWillUnmount() { //react lifecycle method to be overrided 
        return undefined;
    }
};

if (typeof module != 'undefined') module.exports = {createElement, render, Component};
if (typeof module == 'undefined') window.Gooact  = {createElement, render, Component};

})();
