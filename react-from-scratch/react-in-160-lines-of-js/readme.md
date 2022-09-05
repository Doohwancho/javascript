---
# Objective

write React from scratch



---
# Roadmap


1. Elements
2. Rendering
3. Patching
4. Components


---
# A. Elements

how JSX -> virtual DOM?


## A-1. process of generating VDOM

JAX -> API -> VDOM
`<div .../>` -> f(div: ...) -> {type:div ...}



## A-2. par1. JAX

```JAX
/** @jsx createElement */
const list = <ul className="some-list">
    <li className="some-list__item">One</li>
    <li className="some-list__item">Two</li>
</ul>;
```

JAX = javascript + html


## A-3. part2. transcompile using API

```javascript
const list = createElement('ul', {className: 'some-list'},
    createElement('li', {className: 'some-list__item'}, 'One'),
    createElement('li', {className: 'some-list__item'}, 'Two'),
);
```

## A-4. part3. desired function that returns Virtual DOM


```javascript
/** @jsx createElement */
const createElement = (type, props, ...children) => {
    if (props === null) props = {};
    return {type, props, children};
};

/* Helper method for pretty VDOM display */
const prettyVDOM = (vdom) => JSON.stringify(vdom, null, 4);

```


## A-5. Example


Example #1: Simple text
```javascript
document.getElementById('one').textContent = prettyVDOM(
  <div>
    Hello World!  
  </div>
);
```

output(VDOM)
```JSON
{
    "type": "div",
    "props": {},
    "children": [
        "Hello World!"
    ]
}
```

Element = lightweight object representation of DOM
Element는 children에서 "Hello World!"를 뺀 나머지 type, props, children 
그냥 DOM은 여러 메서드들 주렁주렁 붙어있어서, 복사할 때 시간 오래


Example #2: Simple nested list
```javascript
document.getElementById('two').textContent = prettyVDOM(
  <ul className="some-list">
    <li className="some-list__item">One</li>
    <li className="some-list__item">Two</li>
  </ul>
);
```

output (VDOM)
```JSON
{
    "type": "ul",
    "props": {
        "className": "some-list"
    },
    "children": [
        {
            "type": "li",
            "props": {
                "className": "some-list__item"
            },
            "children": [
                "One"
            ]
        },
        {
            "type": "li",
            "props": {
                "className": "some-list__item"
            },
            "children": [
                "Two"
            ]
        }
    ]
}
```




---
# B. Rendering

how virtual DOM -> DOM?

traverse tree algorithm. on each node, VDOM -> DOM


## B-1. render()

js에서 어떻게 render()가 콜 되냐면, 
```javascript
import Gooact, { render, Component } from '../gooact';

class Title extends Component {
    componentDidMount() {
        console.log('title');
        console.log(document.getElementById('title'));
    }

    render() {
        return (
            <h1 id="title">{this.props.children}</h1>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.onIncrease = this.onIncrease.bind(this);
        this.onDecrease = this.onDecrease.bind(this);
    }

    componentDidMount() {
        console.log('app');
    }

    onIncrease() {
        this.setState({counter: this.state.counter + 1});
    }

    onDecrease() {
        this.setState({counter: this.state.counter - 1});
    }

    render() {
        const {counter} = this.state;
        return (
            <div>
                <Title>Hello Gooact!!!!</Title>
                <p>
                    <button onClick={this.onDecrease}>-</button>
                    {' '}Counter: {counter}{' '}
                    <button onClick={this.onIncrease}>+</button>
                </p>
            </div>
        );
    }
}

render(<App/>, document.getElementById('root'));
```


render(<App/>, document.getElementById('root'));

vdom은 `<App />`, parent는 root DOM 

tree traverse하다가, 개발자가 새로 정의한 컴포넌트인 `<Title />`만나면, 
그 안으로 들어가서 재귀로 render()함 



```javascript
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
```

Q. mount()는 어디서 나온애야?

render()에서 파라미터로 주는 virtual DOM은 이렇게 생김

```JSON
{
    "type": "ul",
    "props": {
        "className": "some-list"
    },
    "children": [
        {
            "type": "li",
            "props": {
                "className": "some-list__item"
            },
            "children": [
                "One"
            ]
        }
    ]
}
```

각 child(each node on virtual DOM tree)의 props의 attributes는 아래 코드에서 virtual DOM에 더해줌 

```javascript
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
```






---
# C. Patching

how virtual DOM tree patch existing DOM tree using key?

기존 DOM의 문제점: 노드 하나 바뀌었는데, 전체 노드 re-rendering 해야 함 = 낭비

근데 virtual DOM tree랑 existing DOM tree를 비교해서 

바뀐 부분만 patch한다고 해도, 두 트리 비교하는 알고리즘은 O(n^3)

시간복잡도 어떻게 줄이지?

```javascript
/** @jsx createElement */
const createElement = (type, props, ...children) => {
    if (props === null) props = {};
    return {type, props, children};
};

const setAttribute = (dom, key, value) => {
    if (typeof value == 'function' && key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase();
        dom.__gooactHandlers = dom.__gooactHandlers || {};
        dom.removeEventListener(eventType, dom.__gooactHandlers[eventType]);
        dom.__gooactHandlers[eventType] = value;
        dom.addEventListener(eventType, dom.__gooactHandlers[eventType]);
    } else if (key == 'checked' || key == 'value' || key == 'className') {
        dom[key] = value;
    } else if (key == 'style' && typeof value == 'object') {
        Object.assign(dom.style, value);
    } else if (key == 'ref' && typeof value == 'function') {
        value(dom);
    } else if (key == 'key') {
        dom.__gooactKey = value;
    } else if (typeof value != 'object' && typeof value != 'function') {
        dom.setAttribute(key, value);
    }
};

const render = (vdom, parent=null) => {
    console.log('render', vdom);
    const mount = parent ? (el => parent.appendChild(el)) : (el => el);
    if (typeof vdom == 'string' || typeof vdom == 'number') {
        return mount(document.createTextNode(vdom));
    } else if (typeof vdom == 'boolean' || vdom === null) {
        return mount(document.createTextNode(''));
    } else if (typeof vdom == 'object' && typeof vdom.type == 'function') {
        return Component.render(vdom, parent);
    } else if (typeof vdom == 'object' && typeof vdom.type == 'string') {
        const dom = mount(document.createElement(vdom.type));
        for (const child of [/* flatten */].concat(...vdom.children))
            render(child, dom);
        for (const prop in vdom.props)
            setAttribute(dom, prop, vdom.props[prop]);
        return dom;
    } else {
        throw new Error(`Invalid VDOM: ${vdom}.`);
    }
};


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

/* Playground: */
const oldList = <ul className="some-list">
  <li className="some-list__item" key="one">One</li>
  <li className="some-list__item" key="two">Two</li>
</ul>;

const newList = <ul className="some-list">
  <li className="some-list__item" key="three">Three</li>
  <li className="some-list__item" key="two">Two</li>
</ul>;

const dom = render(oldList, document.getElementById('root'));
patch(dom, newList);

```

key가 "two"로 같은 애는 pass하고,
key가 다른 애는(one -> three)는 바꾼다는거지?




---
# D. Components

## D-1. what is React Component?

props -> Component -> VDOM -> DOM

Component is javascript function with "props" and "state"

what are "props" and "state"?

## D-2. props 

props(property) is read-only object that cannot be modified. 

example

```javascript
function Add(props) {
  return (
    <div>
      {props.n1} + {props.n2} = {props.n1 + props.n2}
    </div>
  )
}

<Add n1={2} n2={3} />

```

## D-3. state

state is data that change over time. 

```javascript
function AddWithInput(props) {
  const [n2, setN2] = React.useState(0)
  
  function handleInputChange(event) {
    const input = event.target
    const newN2 = Number(input.value)
    setN2(newN2)
  }
  
  return (
    <div>
      {props.n1} +{' '}
      <input type="number" value={n2} onChange={handleInputChange} /> ={' '}
      {props.n1 + n2}
    </div>
  )
}

```

useState tracks data value over lifetime of the component. 

## D-4. Component 

```javascript
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
```

