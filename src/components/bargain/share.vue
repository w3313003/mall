<template>
    <div class="share-wrap">
        <div class="title">
            砍价分享
        </div>
        <scroll class="scroll" ref="scroll">
            <div>
                <img :src="goodsInfo.imgMain" alt="" class="img">
                <div class="desc">
                    <div class="title">
                        {{goodsInfo.shopName}}
                    </div>
                    <div class="info">
                        <span class="price">
                            <i>￥</i>
                            {{goodsInfo.sellingPrice - goodsInfo.discount}}
                        </span>
                        <span class="tips">
                            [{{goodsInfo.kjNum}}人帮砍，立减{{goodsInfo.kjNum * goodsInfo.kjPrice}}元]
                        </span>
                    </div> 
                    <div class="count">
                        <span>
                            {{goodsInfo.discount / goodsInfo.kjPrice}}
                        </span>人帮砍
                    </div>
                    <div class="btn" @click="HelpBargin">
                        帮砍一刀
                    </div>
                </div>
                <div class="friend">
                    <div class="title">
                        帮砍好友
                    </div>
                    <div class="content" v-if="friendsList.length > 0">
                        <div class="item" v-for="(v,i) of friendsList" :key="i">
                            <img :src="v.img" alt="">
                            <div class="nickName">{{v.nikeName}}</div>
                            <div class="price">-￥{{Number(goodsInfo.kjPrice).toFixed(2)}}</div>
                        </div>
                    </div> 
                    <div class='content' style="text-align:center" v-else>
                        暂无帮砍好友
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from 'common/scroll'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

export default {
    components:{
        scroll
    },
    data() {
        return {
            activeId:'',
            goodsId: '',
            kjId: '',
            goodsInfo:{},
            friendsList: []
        }
    },
    created(){
        alert(userInfo.userid);
        let searchObj = new URLSearchParams(location.search);
            this.activeId = searchObj.get('activeid');
            this.kjId = searchObj.get('kjId');
            this.goodsId = searchObj.get('goodsId');
        let data = new URLSearchParams();
            data.append('goodsId',this.goodsId);
            data.append('userId',userInfo.userid);
        this.axios.post('/api/wsc/goods/getById',data).then(res => {
            this.goodsInfo = res.data.obj;
            this._getFriends();
        });
    },
    methods:{
        HelpBargin(){
            if(location.search.length < 1) {
                alert('参数错误');
                return false;
            };
            let data = new URLSearchParams();
                data.append('id',this.activeId);
                data.append('userId',userInfo.userid);
            this.axios.post('/api/activity/joinKj',data).then(res => {
                console.log(res.data)
            })
        },
        _getFriends() {
            let params = new URLSearchParams();
                params.append('id',this.kjId);
            this.axios.post('/api/activity/getJoiners',params).then(res => {
                if(res.data.obj) {
                    this.friendsList = res.data.obj;
                }
            })
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
