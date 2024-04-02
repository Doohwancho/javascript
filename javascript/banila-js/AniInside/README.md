
# what

MyAnimeList 비공식 API중 하나인 Jikan API를 이용하여 실시간 편성표를 보여주는 간단한 웹앱


reference: https://github.com/DeAcct/AniInside

# stack

language: banila-js (banila web component, shadow DOM)
bundler: vite
package manager: yarn berry
style: scss(BEM)
pwa: vite-plugin-pwa
util:workbox-window: idk, maybe when you need objects from window context, you use this module


# takeaways

## reset.scss

## private #variable in class

day.js 에서

```javascript
export default class DAY {
  #data = [
    {
      key: "sunday",
      day: "일",
    },
    {
      key: "monday",
      day: "월",
    },
    {
      key: "tuesday",
      day: "화",
    },
    {
      key: "wednesday",
      day: "수",
    },
    {
      key: "thursday",
      day: "목",
    },
    {
      key: "friday",
      day: "금",
    },
    {
      key: "saturday",
      day: "토",
    },
  ];
  get all() {
    return this.#data;
  }
  get now() {
    return this.#data[new Date().getDay()];
  }
  find(day) {
    return this.#data.find((data) => data.day === day);
  }
}

```

클래스 안 #variable로 선언된건 private 벼수호, public 메서드인 get all(); 로 접근하네.


## Component.js 재정의

여기서 어떤 template html을 보낼지,
render()이랑 afterRender()도 있고,
setEvent()도 있네?
해당 컴포넌트 안에 query는 $selector()로 검색하네. 내부 메서드는 DOM.querySelect()나 DOM.querySelectAll() 쓰고.

shadow DOM이라는게 virtual DOM을 의미하는건가? 그건 아니겠지?
virtual DOM이라는게 트리에 변경된 노드만 선택적으로 업데이트하는 기능이 있어야 하지 않나?
shadow DOM을 썼다는게 그냥 컴포넌트 안에 만든 html DOM 조작하려고 한거겠지? 



