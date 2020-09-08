<template>
  <div id="footer">
    <span>
      &copy; {{ year }} by Logan Scavo.
    </span>        
    <span>
      Source can be found on <a href="https://github.com/ldscavo/gifting-budget" target="_blank">GitHub</a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'footerBar',
  data: function() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style>
#footer {
  margin: 150px auto 15px;
  max-width: 550px;
  border-top: 1px solid #2c3e50;
  padding:5px;
}
</style>
