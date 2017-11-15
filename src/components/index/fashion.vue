<template>
   <div class='f-wrap'>
        <div class='title'>
            寝室装饰    
            <svg class="icon fenlei" aria-hidden="true">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>  
   </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.f-wrap
    width 100%
    height 90vh
    overflow scroll
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        background #fff
        color #fc7aa5
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

</style>
