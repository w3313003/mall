<template>
  <div class='sales-wrap'>
        <div class='scroll'>
            <div class='good-wrap'>
                <div class='good' @click='goToDetail(item)' v-for='(item,index) in goodList' :key="index">
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
                                    <span>{{item.sellingPrice}}</span>
                                </div>
                            </div>
                            <div class='r'>
                                ￥{{item.marketPrice}}
                            </div>
                        </div>
                        <div class='acount'>
                            <div>
                                限量<span>{{item.stockNum}}</span>件
                            </div>
                            <div>
                                月销{{item.xiaoshou_num}}件
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import scroll from 'common/scroll'
export default {
    components:{
        scroll
    },
    activated(){
        this.axios.get('/api/activity/getActivityList?type=3').then(res => {
            this.goodList = res.data.obj;
            console.log(this.goodList)
        })
    },
    methods: {
        goToDetail(item) {
            this.$router.push({
                path:`/good/${item.id}`
            })
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
.sales-wrap
    position fixed
    height 100%
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
                        justify-content flex-start
                        color #f02b2b
                        .r
                            color #989898
                            display flex
                            align-items flex-end
                            text-decoration: line-through;
                            margin-left 0.1333rem
                        .l
                            span 
                                font-size 0.6rem
                    .acount
                        font-size 0.3333rem
                        color #989898
                        display flex
                        justify-content space-between
                    

</style>
