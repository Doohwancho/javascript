class TodoItem extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<h3>${this.innerText}</h3>`;
	}
}

customElements.define("todo-item", TodoItem); //이름에 하이픈 넣는 이유는, default html tag에 겹치지 않게 하기 위함.
