import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useModalStore = defineStore('modalStore', () => {
  const modals = reactive({});

  const open = (name) => {
    modals[name] = true;
  };

  const close = (name) => {
    modals[name] = false;
  };

  const toggle = (name) => {
    modals[name] = !modals[name];
  };

  const isOpen = (name) => {
    return !!modals[name];
  };

  return { modals, open, close, toggle, isOpen };
});