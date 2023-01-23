const template = document.createElement("template");
template.innerHTML = `
	<style>
		h3 { color : green }
	</style>
	<h3>
		<slot></slot>         <!-- slot is content of <todo-item> tag -->
	</h3>
`;


class TodoItem extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" }); //show DOM은 기존 DOM과 독립적으로 존재. .css on index.html의 영향을 받지도 않음.
		// 전체 DOM tree에서 원래 <todo-item> 안에 속한 html tag들은, 이제  shadow DOM이라는 하나의 node로 추상화 되고, shadow DOM은 render life cycle시에, main DOM tree그릴 때 말고 따로 동적으로 그리는 듯? 아마?
		// 컴포넌트로 관심사 분리(css나 html, 기능 등)을 shadowDOM 을 통해 함.
		shadow.append(template.content.cloneNode(true));
	}
}

customElements.define("todo-item", TodoItem); //이름에 하이픈 넣는 이유는, default html tag에 겹치지 않게 하기 위함.
