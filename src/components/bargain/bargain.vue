<template>
    <div class="bargin-wrap">
        <div class='scroll'>
            <div class='good-wrap'>
                <div class='good' v-for='(item,index) in goodList' :key="index" @click="toShare(item)">
                    <div class='img-wrap'>
                        <img v-lazy='item.imgMain'>
                    </div>
                    <div class='content'>
                        <div class='title'>
                            {{item.name}}
                        </div>
                        <div class='disc'>
                            <div class='l'>
                                <div>￥
                                    <span>{{item.sellingPrice - item.discount}}</span>
                                </div>
                            </div>
                            <div class='r'>
                                限量{{item.limited}}件
                            </div>
                        </div>
                        <div style='color:#ff8989'>[{{item.kjNum}}人帮砍，立减{{item.kjNum * item.kjPrice}}元]</div>
                        <div class='btn'>
                            发起砍价
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import scroll from "common/scroll";
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

export default {
    components:{
        scroll
    },
    data(){
        return {
            userId : '',
            activeId : ''
        }
    },
    activated() {
        let params = new URLSearchParams();
            params.append('userId',userInfo.userid);
            params.append('type','1')
        this.axios.post('/api/activity/getActivityList',params).then(res => {
            this.goodList = res.data.obj;
        })
    },
    methods:{
        toShare(item){
            let data = new URLSearchParams();
                data.append('userId',userInfo.userid);
                data.append('goodsId',item.id);
                if(item.kjId) {
                    sessionStorage.setItem('kjId',item.kjId);
                } else {
                    sessionStorage.setItem('kjId',undefined);
                }
            this.axios.post('/api/activity/bargain',data).then(res => {
                if(res.data.msg === '参数错误') {
                    Toast('当前商品已发起砍价，将跳转至我的活动');
                    setTimeout(() => {
                        this.$router.push({
                            path: '/personalcenter/activities'
                        });
                    },1000)
                    return;
                };
                this.activeId = res.data.obj.id;
                this.userId = res.data.obj.userId;
                sessionStorage.setItem('activeId',res.data.obj.id);
                setTimeout(() => {
                    this.$router.push({
                        path: `/invite/${item.id}`
                    });
                },1000)
            });
        }
    },
    data(){
        return {
            goodList:[]
        }
    }
}
</script>

<style lang="stylus" scoped>
.bargin-wrap
    position fixed
    height 100vh
    width  100%
    overflow hidden
    z-index 999
    background #e7e7e7
    .scroll
        height 100%
        overflow-x hidden;
        overflow-y scroll
        -webkit-overflow-scrolling: touch;

        .good-wrap
            box-sizing border-box
            padding 0.2rem
            .good
                width 100%
                height 3.4667rem
                box-sizing border-box
                padding 0.1333rem
                background-color #fff
                display flex
                margin-bottom 0.1333rem
                .img-wrap
                    flex 0 0 3.2rem
                    height 100%
                    img 
                        width 100%
                        height 100%
                .content    
                    flex 1
                    box-sizing border-box
                    padding 0.1rem 0.2rem
                    overflow hidden
                    display flex
                    flex-direction column
                    justify-content space-between
                    .title
                        font-size 0.4667rem
                        width 100%
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap    
                    .disc
                        display flex
                        font-size 0.3333rem
                        justify-content space-between
                        color #f02b2b
                        .r
                            color #989898
                            display flex
                            align-items flex-end
                        .l
                            span 
                                font-size 0.5333rem
                    .btn
                        width 100%
                        color #fff
                        background #fc7aa5
                        height 0.8rem
                        line-height 0.8rem
                        text-align center
                        border-radius 10px
                        font-size 0.4rem

</style>
