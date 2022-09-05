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


---\
C. Patching

how virtual DOM patch existing DOM using key?

---\
D. Components

- what is React Component?
    - creation
    - lifecycle
    - rendering procedure


