<template>
    <div class='pc-wrap'>
        <scroll class='scroll'>
        <div>
        <div class='header'>
            <div class='title'>
                我的
            </div>
            <div class='h-content'>
                <div class='l'>
                    <div class='img-wrap'>
                        <img src='../.././assets/img/avatar.png'>
                    </div>
                    <div class='nickname'>
                        {{userInfo.nickname}}
                    </div>
                </div>
                <div class='r'>
                    <div class='t'>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-iconcopy"></use>
                        </svg>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-duihuakuang"></use>
                        </svg>  
                    </div>
                    <div class='b' @click='infoDetail'>
                        个人信息
                    </div>
                </div>
            </div>
        </div>
        <div class='order'>
            <div class='title'>
                <div class='l'>
                    我的订单
                </div>
                <router-link to='/order' class="r" tag='div'>
                    查看全部订单
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>    
                </router-link> 
            </div>
            <div class='content'>
                <div class='item' data-id='0' @click='goOrderCenter'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/o_icon1.png" alt="">
                    </div>
                    <div>
                        待付款
                    </div>
                </div>
                <div class='item' data-id='1' @click='goOrderCenter'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/o_icon2.png" alt="">
                    </div>
                    <div>
                        待发货
                    </div>
                </div>
                <div class='item' data-id='2' @click='goOrderCenter'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/o_icon1.png" alt="">
                    </div>
                    <div>
                        待收货
                    </div>
                </div>
                <div class='item' data-id='3' @click='goOrderCenter'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/o_icon1.png" alt="">
                    </div>
                    <div>
                        待评价
                    </div>
                </div>
                <router-link to='/returnGoods' class='item' tag="div">
                    <div class='img-wrap'>
                        <img src="../.././assets/img/o_icon1.png" alt="">
                    </div>
                    <div>
                        退换货
                    </div>
                </router-link>
            </div>
        </div>
        <div class='ul-content'>
            <ul>
                <router-link to='/personalcenter/activities' tag='li'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/me_icon_08.png" alt="">
                    </div>
                    <div>我的活动</div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </router-link>
                <router-link to='/personalcenter/collection' tag='li'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/me_icon_09.png" alt="">
                    </div>
                    <div>我的收藏</div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </router-link>
                <router-link to='/personalcenter/my_comment' tag='li'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/me_icon_10.png" alt="">
                    </div>
                    <div>优惠券</div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </router-link>
                <router-link to='/personalcenter/my_comment' tag='li'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/me_icon_11.png" alt="">
                    </div>
                    <div>我的评价</div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </router-link>
                <li>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/me_icon_12.png" alt="">
                    </div>
                    <div>我的话题</div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </li>
                <router-link to='/personalcenter/help' tag='li'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/me_icon_13.png" alt="">
                    </div>
                    <div>帮助</div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </router-link>
                <router-link to='/personalcenter/feedback' tag='li'>
                    <div class='img-wrap'>
                        <img src="../.././assets/img/me_icon_14.png" alt="">
                    </div>
                    <div>意见反馈</div>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </router-link>
            </ul>
        </div>
        </div>
        </scroll>
    </div>
</template>

<script>
import { userdata } from 'common/mock'
import scroll from 'common/scroll'


export default {
    created(){
        this.axios.get("http://g.cn").then(res => {
            this.userInfo = res.data;
        })
    },
    data(){
        return {
            userInfo:{}
        }
    },
    components : {
        scroll
    },
    methods:{
        infoDetail(){
            this.$router.push({
                path:'/personalcenter/personalinfo'
            })
        },
        goOrderCenter(e){
            const index =  +e.currentTarget.dataset.id + 1;
            this.$router.push({
                name:'order',
                params:{
                    index
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.pc-wrap
    background-color #e7e7e7
    height 90vh
    overflow hidden
    .scroll
        height 100%
        overflow hidden

.header
    height 4rem
    background-color #fc7aa5
    display flex
    flex-direction column
    justify-content space-between
    .title
        height 1.2rem
        color #fff
        line-height 1.2rem
        text-align center
        font-size 0.4rem
    .h-content
        display flex
        justify-content space-between
        .l
            display flex
            align-items center
            flex 1
            box-sizing border-box
            padding 0 0.5rem
            .nickname 
                color #fff
                font-size 0.35rem
                margin-left 0.35rem
            .img-wrap
                width 1.3333rem
                height 1.3333rem
                overflow hidden
                border-radius 0.6667rem
                img
                    width 100%
                    height 100%
        .r
            width 2.8rem
            height 2.4rem
            .t
                box-sizing border-box
                padding 0 0.3rem
                display flex
                justify-content space-around
                .icon
                    font-size 0.55rem
                    color #fff
            .b
                color #fc7aa5
                margin 0.4rem 0
                height 0.7333rem
                line-height 0.7333rem
                font-size 0.3333rem
                text-align center
                border-radius 0.36rem 0 0 0.36rem
                background-color #fff
.order
    background-color #fff
    height 3.6rem
    display flex
    flex-direction column
    border-bottom 1px solid #666
    .title
        height 1.0667rem
        line-height 1.0667rem
        box-sizing border-box
        padding 0 0.2rem
        display flex
        justify-content space-between
        border-bottom 0.0133rem solid #e7e7e7
        .l
            font-size 0.38rem
        .r
            font-size 0.3rem 
            color #666
    .content
        box-sizing border-box
        flex 1
        padding 0 0.6667rem
        display flex
        justify-content space-between
        .item
            width 1.0667rem
            box-sizing border-box
            padding 0.4rem 0
            display flex
            flex-direction column
            justify-content space-between
            .img-wrap
                width 1.0667rem
                height 1.0667rem
                img 
                    width 100%
            div
                font-size 0.3333rem

.ul-content    
    li
        background #fff
        display flex
        height 1.2rem
        align-items center
        box-sizing border-box
        padding 0 0.2rem
        border-bottom 1px solid #666
        justify-content space-between
        div
            font-size 0.35rem
            &.img-wrap
                width 0.5333rem
                height 0.5333rem
                img 
                    width 100%
                    height 100%
            &:nth-child(2)
                flex 1
                margin-left 0.2rem
        &:nth-child(6)  
            margin-top 0.2133rem

</style>
