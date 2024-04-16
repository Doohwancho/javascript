function makeUrl(url: string) {
  return `http://localhost:5000${url}`;
}

const config = {
  url: {
    auth: {
      loginUrl: makeUrl("/auth/login"), //TODO - config에 url 보관하고 import해서 가져다 쓰는걸 이런 식으로 리펙토링을 했구만.
      registerUrl: makeUrl("/auth/register"),
      checkLoginedUrl: makeUrl("/auth/logged-in"),
    },
    post: {
      addPost: makeUrl("/post/add-post"),
      getPost: makeUrl("/post/posts"),
    },
    user: {
      getProfile: makeUrl("/user/profile"),
    },
  },
};

export default config;
