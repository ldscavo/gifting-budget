<template>
  <div class="dropdown is-right" v-bind:class="{ 'is-active': expanded }">
    <div class="dropdown-trigger">
      <button class="button is-shadowless" v-on:click="toggle()">
        <span class="icon is-small">
          <fa-icon icon="ellipsis-v" />
        </span>
      </button>
    </div>
    <div v-on:click="close()" class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    title: String
  },
  data: function() {
    return {
      expanded: false
    }
  },
  methods: {
    toggle: function() {
      this.expanded = !this.expanded;
    },
    open: function() {
      this.expanded = true;
    },
    close: function() {
      this.expanded = false;
    }
  }
}
</script>
<style scoped>
  .dropdown-trigger button {
    background: none;
    border: none;
  }
</style>
