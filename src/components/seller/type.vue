<template>
    <div class="Swrap">
        <div class='title'>
            {{this.$route.query.type}}    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <scroll class="good-wrap" :data='goodsList'>
            <div>
                <good-list 
                :goodList='goodsList'>

                </good-list>
            </div>
        </scroll>
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
        console.log(this.$route);
        let data = new URLSearchParams();
            data.append('commodityType',id);
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
    width 100vw
    height 100vh
    z-index 9999
    display flex
    flex-direction column
    background #e7e7e7
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
    .good-wrap
        flex 1
        overflow hidden
</style>
