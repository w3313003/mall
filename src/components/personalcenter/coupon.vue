/*
 * @Author: ZhaoJie 
 * @Date: 2017-11-28 14:35:40 
 * @Last Modified by: 赵杰
 * @Last Modified time: 2018-01-02 15:01:54
 */
<template>
    <div class="coupon-wrap">
        <div class='title'>
            优惠券    
                <svg class="icon fenlei" aria-hidden="true" @click='back'>
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
        </div> 
        <scroll class='scroll' ref="scroll" :data='couponList'>
            <ul>
                <li class='item' v-for='(item,index) in couponList' :key="index"> 
                    <div class='l'>
                        <div class='t'>
                            <div class='price'>
                                ￥<span>
                                    {{item.money}}</span>
                            </div>
                            <div class='seller_name'>
                                {{item.shopName}}
                            </div>
                        </div>
                        <div class='b'>
                            <div class='desc' style="word-break: keep-all;font-size:.3rem;">
                                满
                                    {{item.fullAmount}}减
                                    {{item.money}}元
                            </div>
                            <div class='date'>
                                {{item.remainingTime}}后到期
                            </div>
                        </div>
                    </div>
                    <router-link class='r' to='/index' tag="div">
                        立即使用
                    </router-link>
                </li>
            </ul>
        </scroll>
    </div>
</template>

<script>
import scroll from 'common/scroll'

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

export default {
    data(){
        return {
            couponList:[]
        }
    },
    components:{
        scroll
    },
    created(){
        let data = new URLSearchParams();
        data.append("userId", userInfo.userid);
        this.axios.post("/api/wsc/user/userPacketList", data).then(res => {
            if(res.data.code !== 'success') throw new Error('error');
            res.data.obj.forEach(v => {
                if (!v.shopName && v.type == 1) {
                    this.$set(v, "shopName", "平台红包");
                }
            });
            this.couponList = res.data.obj;
        });
    },
    activated(){
        this.$refs.scroll.refresh()
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.coupon-wrap
    position fixed
    top 0
    left 0
    background #e7e7e7
    z-index 999
    width 100vw
    height 100vh
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
    .scroll
        flex 1
        overflow hidden
        .item
            box-sizing border-box
            padding 0.6667rem 0.4rem
            background #fff
            display flex
            justify-content space-between
            align-items center
            font-size .4rem
            word-break keep-all
            .l
                flex 1
                .t,.b
                    display flex
                    justify-content space-between
                .t
                    align-items flex-end
                .b
                    color #666
                    margin-top 0.2rem
                .price
                    color #fb291e
                    span 
                        font-size .55rem
                .seller_name
                    font-size .45rem
            .r
                width 2.8rem
                height 0.7333rem
                text-align center
                line-height 0.7333rem
                border-radius 0.3667rem
                background #fc7aa5
                color #fff
                font-size .35rem
                margin-left 10vw
            
</style>
