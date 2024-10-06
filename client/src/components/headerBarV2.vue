<template>
    <nav class="navbar is-primary" role="navigation">
        <div class="navbar-brand">
            <router-link v-bind:to="{ path: '/' }" class="navbar-item">
                <img src="../assets/logo.png" />
                <strong class="site-name">Gift Budget</strong>
            </router-link>

            <a role="button" class="navbar-burger is-white" aria-label="menu" aria-expanded="false"
                data-target="navbarBasicExample" v-on:click="toggleExpand()"
                v-bind:class="{ 'is-active': this.expanded }">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active': this.expanded }">
            <div class="navbar-start">
                <router-link v-bind:to="{ path: '/budgets' }" class="navbar-item">
                    Budgets
                </router-link>
            </div>
            <!-- <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">
                            Log in
                        </a>
                    </div>
                </div>
            </div> -->
        </div>
    </nav>
</template>

<script>
export default {
    name: "headerBarV2",
    props: {},
    data: function(){
        return {
            expanded: false
        };
    },
    methods: {
        toggleExpand: function() {
            this.expanded = !this.expanded;
        }
    }
}
</script>

<style>
:root {
    --bulma-navbar-burger-color: #fff;
}

.site-name,
.navbar-item {
    color: #fff;
    text-shadow: 1px 1px #2c3e50;
}

.site-name {
    font-weight: bold;
    font-size: larger;    
}
</style>