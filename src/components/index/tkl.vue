<template>
    <div class="tkl-wrap">
        <div class="title">
            淘口令    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <scroll >
            <div class="good-wrap">
                <div class='gooditem'>
                    <div class='img-wrap'>
                        <img src="../../assets/img/goodimg.png" alt="">
                    </div>
                    <div class='content'>
                        <div class='titles'>
                           <img src='../../assets/img/taobao.png'>
                           <span>12341241222222222222222222222222222222</span>
                        </div>
                        <div class="price">
                            <div class="l">
                                ￥<span>666</span>元
                            </div>
                            <div class="r">
                                券后价999元
                            </div>
                        </div>
                    </div>
                </div>
                <div class='gooditem'>
                    <div class='img-wrap'>
                        <img src="../../assets/img/goodimg.png" alt="">
                    </div>
                    <div class='content'>
                        <div class='titles'>
                           <img src='../../assets/img/taobao.png'>
                           <span>12341241222222222222222222222222222222</span>
                        </div>
                        <div class="price">
                            <div class="l">
                                ￥<span>666</span>元
                            </div>
                            <div class="r">
                                券后价999元
                            </div>
                        </div>
                    </div>
                </div>
                <div class='gooditem'>
                    <div class='img-wrap'>
                        <img src="../../assets/img/goodimg.png" alt="">
                    </div>
                    <div class='content'>
                        <div class='titles'>
                           <img src='../../assets/img/taobao.png'>
                           <span>12341241222222222222222222222222222222</span>
                        </div>
                        <div class="price">
                            <div class="l">
                                ￥<span>666</span>元
                            </div>
                            <div class="r">
                                券后价999元
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from 'common/scroll'
export default {
    components:{
        scroll
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.tkl-wrap
    height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .title
        width: 100%;
        height: 1.1333rem;
        line-height: 1.1333rem;
        background: #fff;
        color: #fc7aa5;
        text-align: center;
        font-size: 0.4rem;
        position: relative;
        z-index 9999
        border-bottom: 0.0133rem solid #e7e7e7;
        .icon
            width: 0.5333rem;
            height: 0.5333rem;
            position: absolute;
            left: 0.3rem;
            top: 50%;
            transform: translateY(-50%) rotate(180deg);
            font-size: 0.4rem;
    .good-wrap
        box-sizing border-box
        padding 0.2667rem
        display flex
        flex-wrap wrap
        .gooditem
            flex 0 0 4.5333rem
            overflow hidden
            margin-right 0.3333rem
            margin-bottom 0.2rem
            &:nth-child(2n)
                margin-right 0
            .img-wrap
                width 100%
                height 4.5333rem
                border-radius 0.1333rem
                img 
                    width 100%
                    height 100%
            .content
                margin-top 0.2rem
                .titles
                    width 100%
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    vertical-align middle
                    font-size .3rem
                    margin-bottom 0.2rem
                    img 
                        width 0.4rem
                        vertical-align text-top
                        height 0.4rem
                .price
                    display flex
                    justify-content space-between
                    color #ef2b2a
                    span 
                        font-size .4rem
                    .r
                        padding 5px 20px
                        border-radius 10px
                        border 0.075vmax solid #ef2b2a

</style>
