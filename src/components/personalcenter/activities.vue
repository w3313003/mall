<template>
    <div class='act-warp'>
        <div class="title">
            我的活动
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <!-- <div class='nav'>
            <div :class='{"active":currentIndex == 0}' data-index='0' @click='navToggle'>发起</div>
            <div :class='{"active":currentIndex == 1}' data-index='1' @click='navToggle'>参与</div>
        </div> -->
        <div class='content'>
        <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
            <swiper-slide v-if="goodsList.length > 0">
                <div class='item' v-for="(v,i) of goodsList" :key="i">
                    <img :src="v.imgMain" alt="">
                    <div class='text'>
                        <p class='titles'>
                            {{v.name}}
                        </p>
                        <p class='tips'>
                            [{{v.kjNum}}人帮砍，立减{{v.kjNum * v.kjPrice}}元]
                        </p>
                        <div class='progress'>
                            <div class='innerprogress' ref='progess' ></div>
                        </div>
                        <div class='price'>
                            <div class="oldp">
                                ￥{{v.sellingPrice}}元
                            </div>
                            <div class="newp">
                                目标价{{(v.sellingPrice - v.kjNum * v.kjPrice).toFixed(2)}}元
                            </div>       
                        </div>
                        <div class='btn' @click.stop="toShare(v)">
                            <div class='continue'>
                                继续砍价
                            </div>
                            <div class='pay' @click.stop="toDetail(v)">
                                直接购买
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <div class="empty" v-else>
                    <div class='empty-content'>
                        <img src='../../assets/img/empty.gif'/> 
                        <p class='desc'> 
                            暂无商品
                        </p>
                        <div class='btn' @click='goIndex'>
                            去逛逛
                        </div> 
                    </div> 
                </div>
            </swiper>
        </div>   
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import wx from 'weixin-js-sdk';
import { APPID } from 'common/util';
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

export default {
    components:{
        swiper, 
        swiperSlide
    },
    data(){
        return {
            notNextTick:true,
            currentIndex:0,
            swiperOption:{
                paginationClickable: true,
                onSlideChangeEnd:s => {
                    this.currentIndex = s.activeIndex;
                }
            },
            goodsList:[],
            shareConfig:{}
        }
    },
    activated(){
        let data = new URLSearchParams();
            data.append('userId',userInfo.userid);
        this.axios.post('/api/activity/getMyKjGoods',data).then(res => {
            if(res.data.obj) {
                res.data.obj.forEach((v,i)=> {
                    let percent = (v.discount / v.kjPrice) / v.kjNum;
                    this.$set(v,'percent',percent); 
                });
                this.goodsList = res.data.obj;
                 setTimeout(() => {
                     this.goodsList.forEach((v,i) => {
                        this.$refs.progess[i].style.width = `${v.percent * 100}%`
                    })
                },100)
            }
        });
        this._getWxConfig();
    },
    methods:{
        back(){
            this.$router.back();
        },
        navToggle(e){
            const index = e.currentTarget.dataset.index;
            this.currentIndex = index;
            this.$refs.mySwiper.swiper.slideTo(index)
        },
        toDetail(item) {
            this.$router.push({
                path:`/good/${item.id}`
            })
        },
        goIndex() {
            this.$router.push('/index')
        }, 
        toShare(item){
            this.shareConfig = {
                shareUrl : `${location.origin}/weixin/?goodsId=${item.id}&activeid=${item.activity}&userId=${userInfo.userid}&kjId=${item.kjId}#/share`,
                title : item.name,
                imgUrl : item.imgMain,
                desc : item.keyword
            };
            wx.onMenuShareTimeline({
                title: this.shareConfig.title, // 分享标题
                link: this.shareConfig.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareConfig.imgUrl, // 分享图标
                success() {
                    alert('分享成功')
                },
                cancel(){
                }
            });
            wx.onMenuShareAppMessage({
                title: this.shareConfig.title, // 分享标题
                desc: this.shareConfig.desc, // 分享描述
                link: this.shareConfig.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareConfig.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success() {
                    alert('分享成功')
                },
                cancel: function () {
                    alert('取消分享')
                }
            });
            wx.onMenuShareQQ({
                title: this.shareConfig.title, // 分享标题
                desc: this.shareConfig.desc, // 分享描述
                link: this.shareConfig.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareConfig.imgUrl, // 分享图标
                success () {
                    alert('分享成功')
                },
                cancel: function () {
                    alert('取消分享')
                }
            });
            wx.onMenuShareWeibo({
                title: this.shareConfig.title, // 分享标题
                desc: this.shareConfig.desc, // 分享描述
                link: this.shareConfig.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareConfig.imgUrl, // 分享图标
                success () {
                // 用户确认分享后执行的回调函数
                },
                cancel () {
                // 用户取消分享后执行的回调函数
                }
            });
            Toast('分享链接已生成，点击右上角分享');  
        },
        _getWxConfig() {
            let configUrl = location.href.split('#')[0],
                userId = userInfo.userId;
            let params = new URLSearchParams();
                params.append('url',configUrl);
                params.append('userId',userId);
            return this.axios.post(`/api/wsc/user/getJsSdk`,params).then(res => {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: APPID, // 必填，公众号的唯一标识
                    timestamp: res.data.obj.timestamp , // 必填，生成签名的时间戳
                    nonceStr: res.data.obj.nonce, // 必填，生成签名的随机串
                    signature: res.data.obj.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    success(){
                        alert('confsig:ok')
                    },
                    error(){
                        alert('config:error')
                    }
                });
               wx.ready(() => {
                   console.log("i'm ready")
               });
            });
        },
    }
}
</script>

<style lang="stylus" scoped>
.act-warp
    width 100%
    height 100vh
    position fixed
    top 0
    left 0
    z-index 999
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
    .nav    
        height 1.3333rem
        display flex
        background #fff
        border-bottom 0.0133rem solid #e7e7e7
        align-items center
        justify-content space-around
        div
            text-align center
            height 100%
            line-height 1.3333rem
            font-size 0.4rem
            &.active
                color #fc7ba6
                border-bottom 1px solid #fc7ba6
    .content
        background #fff
        flex 1
        overflow scroll
        background #e7e7e7
        .item
            display flex
            box-sizing border-box
            width 100%
            padding 0.2rem
            background #fff
            overflow hidden
            margin-bottom 0.1333rem
            img
                display block
                flex 0 0 2.6667rem
                height 2.6667rem
            .text
                flex 1
                box-sizing border-box
                padding-left 0.2rem
                display flex
                flex-direction column
                justify-content space-between
                .titles 
                    width 6.4rem
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                    font-size 0.4rem
                .tips
                    color #fc7aa5
                    font-size 0.3333rem
                .price
                    display flex
                    justify-content space-between
                .progress
                    width 100%
                    height 0.2rem
                    background #e7e7e7
                    border-radius 0.1rem
                    overflow hidden
                    .innerprogress
                        background yellow
                        height 100%
                .btn
                    display flex
                    justify-content space-around
                    div 
                        width 2.6667rem
                        border-radius 0.3333rem
                        text-align center
                        line-height 0.6667rem
                        color #fff
                        font-size .4rem
                        height 0.6667rem
                        background-color #fc7aa5

.empty
    width 100%
    height 8rem
    background #e7e7e7
    position relative
    .empty-content
        position absolute
        width 3.8rem
        left 50%
        top 50%
        text-align center
        transform translate(-50%,-50%)
        img
            width 100%
            height 2.5rem
        .desc
            color #989898
            font-size .35rem
            margin .2rem 0
        .btn
            width 75%
            font-size .35rem
            text-align center
            display inline-block
            padding .15rem 0
            background #fc7aa5
            color #fff
            border-radius 0.625rem
                


.tips
    font-size .4rem
    margin .2rem 0 
    text-align center
    width 100%
</style>
