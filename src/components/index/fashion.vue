<template>
   <div class='f-wrap'>
        <div class='title'>
<<<<<<< HEAD
            寝室装饰    
=======
            时尚穿搭    
>>>>>>> local
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>  
<<<<<<< HEAD
=======
        <div class="scroll">
            <div class='item' v-for='(item,index) in itemList' :key="index" @click='watchDetail(item)'>
                <div class='header'>
                    <img v-lazy="item.headImg" alt="">
                    <div class='nickname'>{{item.name}}</div>
                    <div class='time'>
                        {{item.timeDifference}}
                    </div>
                </div>
                <div class='banner'>
                    <img v-lazy="item.img" alt="">
                </div>
                <div class='heading'>{{item.title}}</div>
                <div class='control'>
                    <div v-if="item.isZan == '1'">
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-dianzan-copy"></use>
                        </svg>
                        {{item.zan}}
                    </div>
                    <div @click.stop='zan(item)' v-else>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-dianzan"></use>
                        </svg>
                        {{item.zan}}
                    </div>
                    <div>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-fenxiang-copy"></use>
                        </svg>
                        分享
                    </div>
                </div>
            </div>
        </div>
>>>>>>> local
   </div>
</template>

<script>
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
export default {
<<<<<<< HEAD
    methods:{
        back(){
            this.$router.back()
=======
    activated() {
        this.axios.get(`/api/outFit/getOutfitList?userId=${userInfo.userid}`).then(res => {
            this.itemList = res.data.obj
        })
    },  
    data(){
        return {
            itemList:[]
        }
    },
    filters:{
        diffTime(val){
            let time1 = new Date().getTime(),
                time2 = new Date(val).getTime();
            let dalte = (time1-time2)/1000,
                day = Math.round(dalte / (24*60*60)),
                afterDay = dalte - day*24*60*60,
                hour = Math.round(afterDay / ( 60 * 60 ))
                console.log(-hour)
        }
    },
    methods:{
        back(){
            this.$router.back()
        },
        watchDetail(item){
            this.$router.push({
                path:`/fashion/${item.id}`
            })
        },
        zan(item) {
            let data = new URLSearchParams();
            const outId = item.id,
                userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            data.append("outId", outId);
            data.append("userId", userInfo.userid);
            data.append('type','1');
            this.axios.post("/api/outFit/addZanShare", data).then(res => {
                if (res.data.message == "成功") {
                    this.zanList = res.data.obj;
                    Toast('点赞成功');
                    item.isZan = '1';
                    this.axios.get(`/api/outFit/getOutfitList?userId=${userInfo.userid}`).then(res => {
                        this.itemList = res.data.obj
                    });
                } else {
                    Toast('已经点赞')
                }
            });
>>>>>>> local
        }
    }
}
</script>

<style lang="stylus" scoped>
.f-wrap
    width 100%
<<<<<<< HEAD
    height 90vh
    overflow scroll
=======
    height 90%
    background #e7e7e7
    overflow hidden
    position fixed
>>>>>>> local
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        background #fff
        color #fc7aa5
        text-align center
        font-size 0.4rem
<<<<<<< HEAD
        position relative
=======
        position absolute
        border-bottom 0.0133rem solid #e7e7e7
        width 100%
        top 0
        z-index 2
>>>>>>> local
        .icon
            width 0.5333rem
            height 0.5333rem
            position absolute
            left 0.3rem
            top 50%
            transform translateY(-50%) rotate(180deg)
            font-size 0.4rem
<<<<<<< HEAD

=======
    .item
        box-sizing border-box
        padding 0.3333rem
        background #fff
        margin-top 0.1333rem
        .header
            display flex
            height 0.9333rem
            font-size 0.3333rem
            img
                width 0.9333rem
                height 0.9333rem
                border-radius 50%
            .nickname
                flex 1
                display flex
                align-items center
                margin-left 0.2rem
            .time
                display flex
                align-items center
                color #777
        .banner
            width 100%
            height 4.6667rem
            margin 0.2rem 0
            img 
                width 100%
                height 100%
        .heading
            font-weight 500 
            font-size 0.4rem
            height 0.8rem
            line-height 0.8rem
        .control
            display flex
            div
                width 1.6rem
                display flex
                align-items center
                font-size 0.3333rem
                color #777
                .icon 
                    font-size 0.5rem
                    margin-right 0.1333rem
        &:first-child
            margin 0
.scroll
    height 100%
    overflow scroll
    box-sizing border-box
    padding-top 1.1333rem
>>>>>>> local
</style>
