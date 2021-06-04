<template>
  <context-menu>
    <context-menu-submenu label="sub">
      <context-menu-item @click="click">
        click
      </context-menu-item>
      <context-menu-item @click="click">
        click2
      </context-menu-item>
    </context-menu-submenu>
    <context-menu-item @itemClickHandle="itemClickEvent" divider>
      divider
    </context-menu-item>
    <context-menu-item>item1</context-menu-item>
    <context-menu-item>item2</context-menu-item>
    <context-menu-item>item3</context-menu-item>
  </context-menu>

  <div
    v-contextmenu="{ id: '123', waka: 'waka' }"
    style="background-color: pink; height: 10vh; width: 10vw;"
  ></div>
</template>

<script lang="ts">
export default {
  name: 'App',
  props: {},
  setup() {
    function click() {
      alert('ee eee');
    }

    function itemClickEvent(e: any) {
      console.log('id:', e.id);
    }

    return { click, itemClickEvent };
  },
};
</script>
