<template>
	<div class="tuiguang">
        <div class="title">
            {{acInfo.name}}    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
		<div class="scroll">
            <div>
                <goodsList :goodList='acInfo.goodsList'>

			    </goodsList>
            </div>
		</div>
	</div>
</template>

<script>
import scroll from 'common/scroll'
import goodsList from 'common/goodList'
export default {
    data() {
        return {
            acInfo: {}
        }
    },
    activated() {
        // console.log(this.$router)
        this.axios.get(`/api/index/getProGoods?id=${this.$route.params.id}`).then(res => {
            if(res.data.obj) {
                this.acInfo = res.data.obj[0]
            } else {
                alert('当前分类暂无商品');
                this.$router.back();
            }
        })
    },
	// props: {
	// 	goodsList: {
    //         type: Array,
    //         default: () => {}
    //     }
	// },
	methods: {
		back() {
			this.$router.back();
		}
    },
    components: {
        scroll,
        goodsList
    }
}
</script>

<style lang="stylus" scoped>
.tuiguang
    width 100%
    height 100%
    position fixed
    background #fff
    z-index 1000
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
    .scroll
        box-sizing border-box
        padding-top 1.1333rem
        height 100%
        overflow scroll
        -webkit-overflow-scrolling: touch;
</style>
