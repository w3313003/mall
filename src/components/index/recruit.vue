<template>
    <div class="recuit">
        <div class="title">
            招募    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="content">
            <img class="img" src="../../assets/img/zhaomu.png" alt="">
            <article ref="page" v-html="info.content">
                
            </article>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        this.axios.get('/api/microFilm/getRecruit').then(res => {
            this.info = res.data.obj[0];
            console.log(this.info)
        })
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                [...this.$refs.page.getElementsByTagName('*')].forEach(el => {
                    if(el.tagName === 'IMG') {
                        el.style.maxWidth = '100%';
                        el.style.margin = 'auto';
                    };
                    el.style.fontSize = '.35rem';
                });
            },500)
        })
    },
    data() {
        return {
            info: {}
        }
    },
    methods: {
        back() {
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.recuit
    width 100%
    height 100vh
    position fixed
    background #fff
    z-index 1000
    display flex
    flex-direction column   
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        color #fff
        background #fc7aa5
        text-align center
        font-size 0.4rem
        position relative
        .icon
            width 0.5333rem
            height 0.5333rem
            position absolute
            left 0.3rem
            top 50%
            transform translateY(-50%) rotate(180deg)
            font-size 0.4rem
    .img
        width 100%
        height 4rem
    article
        width 90%
        margin 0.2667rem auto 0
        font-size .35rem
    .content
        flex 1
        overflow scroll
</style>
