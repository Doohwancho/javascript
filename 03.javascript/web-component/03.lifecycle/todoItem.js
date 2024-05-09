
/**
 * takeaway1) observe attribute


1. custom-defined Element안에 "checked"라는 attribute에 statig get observedAttributes()를 통해 observe할 수 있다.
2. 이때, attributeChangedCallback()을 통해 attribute가 변경될 때마다 호출된다.

*/

/**
 * takeaway2) other callback functions regarding lifecycles

1. connectedCallback()
	whenever the element is inserted into the DOM, this callback is invoked.
2. disconnectedCallback()
	whenever the element is removed from the DOM, this callback is invoked.
*/



const template = document.createElement("template");
template.innerHTML = `
	<style>
		label {
			color : green;
			display: block;
		}

		.description {
			front-size: .65rem;
			font-weight: lighter;
			color: #777;
		}
	</style>
	<label>
		<input type="checkbox" />
		<slot></slot>         <!-- slot is content of <todo-item> tag -->
		<span class="description">
			<slot name="description"></slot>
		</span>
	</label>
`;


class TodoItem extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" }); //show DOM은 기존 DOM과 독립적으로 존재. .css on index.html의 영향을 받지도 않음.
		// 전체 DOM tree에서 원래 <todo-item> 안에 속한 html tag들은, 이제  shadow DOM이라는 하나의 node로 추상화 되고, shadow DOM은 render life cycle시에, main DOM tree그릴 때 말고 따로 동적으로 그리는 듯? 아마?
		// 컴포넌트로 관심사 분리(css나 html, 기능 등)을 shadowDOM 을 통해 함.
		shadow.append(template.content.cloneNode(true));
		this.checkbox = shadow.querySelector("input"); //shadow DOM에서 input tag를 찾아서, this.checkbox에 저장.
	}

	static get observedAttributes() { //observer "checked" attribute
		return ["checked"];
	}

	attributeChangedCallback(name, oldValue, newValue) { //when attribute changed, this function is called.
		if (name === "checked") {
			this.updateChecked(newValue);
		}
	}

	updateChecked(value) {
		this.checkbox.checked = value != null && value !== "false";
	}


	connectedCallback() { //when element is inserted into DOM, this function is called.
		console.log("connected");
	}

	disconnectedCallback() { //when element is removed from DOM, this function is called.
		console.log("disconnected");
	}
}

customElements.define("todo-item", TodoItem); //이름에 하이픈 넣는 이유는, default html tag에 겹치지 않게 하기 위함.

const item = document.querySelector("todo-item");
let checked = true;
setInterval(() => {
	checked = !checked;
	item.setAttribute("checked", checked);
}, 500);


//item.remove(); //remove from DOM -> disconnectedCallback() is called.
