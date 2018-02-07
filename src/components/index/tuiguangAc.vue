<template>
	<div class="tuiguang">
        <div class="title">
            推广活动    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
		<scroll class="scroll" :data='goodsList'>
            <div>
                <goodsList :goodList='goodsList'>

			    </goodsList>
            </div>
		</scroll>
	</div>
</template>

<script>
import scroll from 'common/scroll'
import goodsList from 'common/goodList'
export default {
	props: {
		goodsList: {
            type: Array,
            default: () => {}
        }
	},
	methods: {
		back() {
			this.$emit('back')
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
    height 100vh
    position fixed
    background #fff
    z-index 1000
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
        overflow hidden
        flex 1
</style>
