<template>
    <div class="card">
      <header v-if="$slots.header">
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </template>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  header {
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
  </style>