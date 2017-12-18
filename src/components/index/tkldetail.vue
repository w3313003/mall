<template>
    <div class="tkld-wrap">
        <div class="title">
              淘口令    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="content">
            <img src="../../assets/img/goodimg.png" alt="">
            <div class="text">
                <div class="name" ref="name" >
                    66666
                </div> 
                <div class="btn" ref='btn' data-clipboard-text="663126634" @click="copy">
                    点击复制
                </div>
                <div class="tips">
                    复制后打开淘宝APP即可领取内部优惠券
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import scroll from 'common/scroll'
import Copy from 'clipboard'
import { Toast } from 'mint-ui'

export default {
    components:{
        scroll
    },
    methods:{
        back(){
            this.$router.back();
        },
        copy(e){
            var clipboard = new Copy(this.$refs.btn);
            clipboard.on('success',() => {
                Toast('复制成功');
                console.log('656')
            })
            clipboard.on('error',function(){
                Toast('失败，请重试')
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.tkld-wrap
    height: 100vh;
    background #fff
    position relative
    z-index 999
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .title
        width: 100%;
        height: 1.1333rem;
        line-height: 1.1333rem;
        background: #fc7aa5;
        color: #fff;
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
    .content
        flex 1
        overflow hidden
        display flex
        flex-direction column
        img 
            width 100%
            height 75vh
        .text
            flex 1
            display flex 
            flex-direction column
            box-sizing border-box
            padding 0.2667rem
            justify-content space-around
            .name
                font-size .4rem
                text-align center
            .btn
                width 6.6667rem
                height 1.2rem
                margin 0 auto
                background #fc7aa5
                color #fff
                text-align center
                line-height 1.2rem
                font-size .35rem
                border-radius 0.1333rem
            .tips
                color #999
                text-align center
                font-size .35rem
</style>
