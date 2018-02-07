<template>
    <div class='wrap'>
        <div class='title'>
            {{helpobj.title}}    
            <svg class="icon fenlei" aria-hidden="true" @click='close'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='m'>
            {{helpobj.title}}
        </div>
        <div class='b'>
            {{helpobj.content}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        helpobj:{}
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrap
    width 100%
    height 100vh
    position fixed
    left 0 
    top 0
    background #e7e7e7
    z-index 1000
    .title
        width 100%
        height 1.1333rem
        color #fff
        background #fc7aa5
        text-align center
        font-size 0.4rem
        line-height 1.1333rem
        position relative
        .icon
            width 0.5333rem
            height 0.5333rem
            position absolute
            left 0.3rem
            top 50%
            transform translateY(-50%) rotate(180deg)
            font-size 0.4rem
    .m
        height 1rem
        line-height 1rem
        box-sizing border-box
        padding-left .3rem
        font-size .4rem
    .b
        background #fff
        box-sizing border-box
        padding .3rem
        font-size .4rem
</style>
