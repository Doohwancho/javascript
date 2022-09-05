---\
Objective

write React from scratch



---\
Roadmap


1. Elements
2. Rendering
3. Patching
4. Components


---\
A. Elements

how JSX -> virtual DOM?


A-1. process of generating VDOM

JAX -> API -> VDOM
`<div .../>` -> f(div: ...) -> {type:div ...}



A-2. par1. JAX

```JAX
/** @jsx createElement */
const list = <ul className="some-list">
    <li className="some-list__item">One</li>
    <li className="some-list__item">Two</li>
</ul>;
```

JAX = javascript + html


A-3. part2. transcompile using API

```javascript
const list = createElement('ul', {className: 'some-list'},
    createElement('li', {className: 'some-list__item'}, 'One'),
    createElement('li', {className: 'some-list__item'}, 'Two'),
);
```

A-4. part3. desired function that returns Virtual DOM


```javascript
/** @jsx createElement */
const createElement = (type, props, ...children) => {
    if (props === null) props = {};
    return {type, props, children};
};

/* Helper method for pretty VDOM display */
const prettyVDOM = (vdom) => JSON.stringify(vdom, null, 4);

```




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




---\
B. Rendering

how virtual DOM -> DOM?

traverse tree algorithm. on each node, VDOM -> DOM


B-1. render()

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
    if (typeof vdom == 'string' || typeof vdom == 'number') { //case1. 123 or 'hello'
        return mount(document.createTextNode(vdom));
    } else if (typeof vdom == 'boolean' || vdom === null) { //case2. <div></div>
        return mount(document.createTextNode(''));
    } else if (typeof vdom == 'object' && typeof vdom.type == 'function') { //case3. <CustomTitle> ... </CustomTitle>
        return Component.render(vdom, parent);
    } else if (typeof vdom == 'object' && typeof vdom.type == 'string') { //case4. when it starts with <div>, <ul>, etc... and has children
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






---\
C. Patching

how virtual DOM patch existing DOM using key?

---\
D. Components

- what is React Component?
    - creation
    - lifecycle
    - rendering procedure


