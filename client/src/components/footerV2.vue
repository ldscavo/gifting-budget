<template>
    <footer class="footer">
        <div class="content has-text-centered">            
            <span>
                &copy; {{ year }} by Logan Scavo.
            </span>
            <span>
                Source can be found on <a href="https://github.com/ldscavo/gifting-budget" target="_blank">GitHub</a>
            </span>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'footerV2',
    data: function () {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>