<template>
  <div id="app">
    <header-bar-v2 />
    <router-view></router-view>
    <footer-bar />
  </div>
</template>

<script>
import headerBar from './components/headerBar'
import headerBarV2 from './components/headerBarV2'
import footerBar from './components/footerBar'

export default {
  name: 'app',
  components: {
    headerBar,
    headerBarV2,
    footerBar
  }
}
</script>

<style>
html {
  background-color: #ddd ;
  width:100%;
}
body {
  padding: 0;
  margin: 0;
}
a {
  color: #973735;
  text-decoration: none;
  font-weight: bold;
}
a:hover {
  border-bottom: 2px solid #973735;
  cursor: pointer;
}
button {
  padding:5px 15px;
  color:#fafafa;
  border:none;
  border-radius: 0.25rem;
  background-color: #bd4542;
}
button:hover {
  background-color: #973735;
  cursor: pointer;
}
button[type=reset] {
  background: #838383;
}
button[type=reset]:hover {
  background: #767676;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.add-entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.add-entry-field {
  margin:5px 0;
  padding:5px;
}
.add-entry-field label {
  display: block;
}
.add-entry-field button {
  margin: 1px;
}
input.edit-field {    
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size:1rem;
  border:none;
  max-width: 125px;
  /*padding:5px none 5px 5px;*/
}
input.edit-field:hover {
  border:1px solid #a2a2a2;
}
input.edit-field:focus {
  border:1px solid #2c3e50;
}
.warning {
  color: red;
}
#form-page {
  max-width: 650px;
  margin:0 auto;

  border:1px solid #a2a2a2;
  border-top: none;
  
  background-color: #fafafa;
  padding:15px 5px;
}
.form-input {
  font-size: 1rem;
  padding:5px 10px;
}
.form-input.text {
  width: 225px;
}
.form-section {
  padding:10px 15px;
}
.form-section label {
  display: block;
}
.over-budget {
  color: red;
  font-weight: bold;
}
.form-error {
  color: red;
  font-size: 0.9rem;
}
</style>
