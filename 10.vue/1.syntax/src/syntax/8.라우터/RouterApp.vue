<template>
    <div>
      <h2>8. Vue Router 예제</h2>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <style scoped>
  nav {
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  main {
    padding: 1rem;
  }
  </style>