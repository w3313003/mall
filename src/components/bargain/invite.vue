<template>
    <div class="share-wrap">
        <div class="title">
            砍价分享
        </div>
        <scroll class="scroll" ref="scroll">
            <div>
                <img src="../../assets/img/goodimg.png" alt="" class="img">
                <div class="desc">
                    <div class="title">
                        标题标题便偷偷标题标题便偷偷标题标题便偷偷标题标题便偷偷标题标题便偷偷
                    </div>
                    <div class="info">
                        <span class="price">
                            <i>￥</i>300.00
                        </span>
                        <span class="tips">
                            [10人帮砍，立减100元]
                        </span>
                    </div> 
                    <div class="count">
                        <span>3</span>人帮砍
                    </div>
                    <div class="btn" @click="invite">
                        发起砍价
                    </div>
                </div>
                <div class="friend">
                    <div class="title">
                        帮砍好友
                    </div>
                    <div class="content">
                        <div class="item">
                            <img src="../../assets/img/avatar.png" alt="">
                            <div class="nickName">name</div>
                            <div class="price">-￥5.00</div>
                        </div>
                        <div class="item">
                            <img src="../../assets/img/avatar.png" alt="">
                            <div class="nickName">name</div>
                            <div class="price">-￥5.00</div>
                        </div>
                        <div class="item">
                            <img src="../../assets/img/avatar.png" alt="">
                            <div class="nickName">name</div>
                            <div class="price">-￥5.00</div>
                        </div>
                        <div class="item">
                            <img src="../../assets/img/avatar.png" alt="">
                            <div class="nickName">name</div>
                            <div class="price">-￥5.00</div>
                        </div>
                    </div> 
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from 'common/scroll'
import wx from 'weixin-js-sdk'
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default {
    components:{
        scroll
    },
    data(){
        return {
            activeId : '',
            userId : '',
            shareConfig:{},
            activeId: ''
        }
    },
    created(){
        this.activeId = sessionStorage.getItem('activeId');
        let url = location.href.split('#')[0],
            userid = userInfo.userid;
        let params = new URLSearchParams();
            params.append('url',url);
            params.append('userId',userid);
        this.axios.post(`/api/wsc/user/getJsSdk`,params).then(res => {
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx8a2df9136c4a762a', // 必填，公众号的唯一标识
                timestamp: res.data.obj.timestamp , // 必填，生成签名的时间戳
                nonceStr: res.data.obj.nonce, // 必填，生成签名的随机串
                signature: res.data.obj.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                success(){
                    alert('confsig:ok')
                },
                error(){
                    alert('config:error')
                }
            });
           wx.ready(() => {
               console.log("i'm ready")
           })
        });  
    },
    activated(){
        
    },
    methods:{
        invite(){
            this.shareConfig = {
                shareUrl : `${location.origin}/?activeid=${this.activeId}&userId=${userInfo.userid}#/share`,
                title : '分享测试',
                imgUrl : '',
                desc : '分享测试分享测试分享测试'
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
            Toast('分享链接已生成，点击右上角分享')
        }
    }
}
</script>

<style lang="stylus" scoped>
.share-wrap
    position fixed
    top 0
    width 100%
    height 100vh
    left 0
    z-index 999
    background #e7e7e7
    display flex
    flex-direction column
    & > .title
        height 1.2rem
        line-height 1.2rem
        text-align center
        color #ffffff
        background #fc7aa5
        font-size .4rem
        letter-spacing 0.0533rem
    .scroll
        flex 1
        overflow hidden
        .img
            display block
            height 9.3333rem
            width 100%
        .desc
            background #ffffff
            box-sizing border-box
            padding 0.2667rem
            .title
                font-size .35rem
                line-height .45rem
            .info
                display flex
                justify-content space-between
                align-self center
                margin 0.2667rem 0
                .price
                    color #ef2b2a
                    font-size .4rem
                    i 
                        font-size .3rem
                .tips
                    color #ff8989
                    font-size .3rem
            .count 
                text-align center
                font-size .3rem
                span 
                    color #ef2b2a
            .btn 
                height 1.0667rem
                color #ffffff
                font-size .4rem
                line-height 1.0667rem
                text-align center
                width 80%
                margin 0.2667rem auto
                background #fc7aa5
                border-radius 0.1333rem
                letter-spacing 0.04rem
    .friend
        background #ffffff
        box-sizing border-box
        padding 0.2667rem
        margin-top 0.1333rem
        .title
            font-size .4rem
            padding-bottom 0.2667rem
        .content
            .item
                display flex
                justify-content space-between
                align-items center
                padding 0.2667rem 0
                border-top  0.0133rem solid #e7e7e7
                img 
                    flex 0 0 1.0667rem
                    height 1.0667rem
                    border-radius 50%
                .nickName
                    flex 1
                    font-size .4rem
                    padding-left 0.5667rem
                .price
                    font-size .4rem
                    color #f24646
</style>
