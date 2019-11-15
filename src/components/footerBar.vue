<template>
    <div id="footer">
        <span>
            &copy; 2019<span v-if="year > 2019">-{{ year }}</span> by Logan Scavo.
        </span>        
        <span>
            Source can be found on <a href="#">GitHub</a>
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
    position: relative;
    bottom: 0;
    height: 25px;
    padding:5px;
    background: #c3c3c3;
    margin-top: 150px;
}
</style>