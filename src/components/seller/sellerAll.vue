<template>
    <div class="Swrap">
        <div class='title'>
            全部商品    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="good-wraps">
            <div>
                <good-list 
                :goodList='goodsList'>

                </good-list>
            </div>
        </div>
    </div>
</template>

<script>
import scroll from 'common/scroll'
import goodList from 'common/goodList'
export default {
    components: {
        scroll,
        goodList
    },
    activated() {
        let id = this.$route.params.id;
        console.log(id);
        let data = new URLSearchParams();
            data.append('shopId',id);
        this.axios.post('/api/waresClass/getClassList',data).then(res => {
            console.log(res.data);
            this.goodsList = res.data.obj;
        })
    },
    data() {
        return {
            goodsList: []
        }
    },
    methods: {
        back() {
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.Swrap
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 9999
    background #e7e7e7
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        color #fff
        background #fc7aa5
        text-align center
        font-size 0.4rem
        position absolute
        top 0
        z-index 2
        .icon
            width 0.5333rem
            height 0.5333rem
            position absolute
            left 0.3rem
            top 50%
            transform translateY(-50%) rotate(180deg)
            font-size 0.4rem
    .good-wraps
        overflow scroll
        -webkit-overflow-scrolling: touch;
        height 100%
        box-sizing border-box
        padding-top 1.1333rem
</style>
