export class Component extends HTMLElement {
  state = {};
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.setup();
    this.setIsolatedEvent();
    this.render();
    this.afterRender();
  }
  /**
   * 컴포넌트에 요소가 주입되기 직전 실행될 것을 여기서 정의한다.
   */
  setup() {}
  /**컴포넌트의 모양을 여기서 정의한다. */
  template() {
    return ``;
  }
  render() {
    this.shadowRoot.innerHTML = this.template();
    this.setEvent();
  }
  /** 테마 변경 이벤트를 감지하여 테마 관련 CSS Variables를 교체한다.*/
  theme() {
    addEventListener("theme-change", () => {
      console.log("asdf");
    });
  }
  /**
   * 가상돔 내부에서 요소를 찾아 반환하는 메서드
   * @param {`.${string}` | `#${string}` | string} query CSS선택자
   * @param {boolean} [all=false] true일 경우 일치하는 모든 요소를 NodeList로 반환한다.
   * @returns {null | Element | NodeList}
   */
  $selector(query, all = false) {
    return all
      ? this.shadowRoot.querySelectorAll(query)
      : this.shadowRoot.querySelector(query);
  }
  afterRender() {}
  /**
   * 재렌더링이 필요한, 요소에 직접 등록하는 이벤트는 여기에서 정의한다.
   */
  setEvent() {}
  /**
   * 렌더링과 상관이 없는 이벤트를 여기에서 정의한다.
   * window에 등록하는 이벤트 등
   */
  setIsolatedEvent() {}
}
