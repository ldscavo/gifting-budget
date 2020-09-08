<template>
  <div id="main-header">
    <router-link v-bind:to="{ path: '/' }" id="site-logo">
      <div id="logo-img"></div>
      <div id="logo-text">Gift Budget</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  props: {
    budget: Object
  },
  methods: {
    saveBudget: function() {
      var store = window.localStorage;

      store.setItem(this.budget.name, JSON.stringify(this.budget));
    }
  }
}
</script>

<style>
#main-header {
  border-bottom: 1px solid #389da0;
  width:100%;
  height: 75px;
  background-color: #42babd;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
#main-header div span {        
  padding:5px;
}
#site-logo {
  display: flex;
  justify-content: flex-start;
  font-size: 2rem;
  margin-left:50px;
}
#site-logo:hover {
  border: none;
}
#logo-img {
    background-image: url("../assets/logo.png");
    background-size: 50px;
    background-repeat: no-repeat;
    height:50px;
    width: 50px;
}
#logo-text {
  margin: 10px 5px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  text-shadow: 1px 1px #2c3e50;
}    
</style>
