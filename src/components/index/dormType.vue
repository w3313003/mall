<template>
	<div class="top">
		<div class='title'>
            {{goodsInfo.areaName}}
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
		<scroll class="good-wrap" :data='goodsInfo.goosList'>
            <div>
                <goodsList   v-if="goodsInfo.goosList"
                    :goodList='goodsInfo.goosList || []'>
                </goodsList>
				<div v-else class="tips">
					当前分类暂无商品
				</div>
            </div>
        </scroll>
	</div>
</template>

<script>
import goodsList from 'common/goodList';
import scroll from 'common/scroll';
export default {
	components: {
		scroll,
		goodsList
    },
    data() {
        return {
            goodsInfo: {}
        }
    },
	activated() {
		this.axios.get('/api/bedroomDecoration/getZoneNavBar').then(res =>  {
            res.data.obj.forEach(v => {
                v.statu === '0' ? this.goodsInfo = v : null; 
            });
            console.log(this.goodsInfo)
        });
	},
	methods: {
		back() {
			this.$router.back();
		}
	}
}
</script>

<style lang="stylus" scoped>
.top
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

.tips
	font-size .5rem
	text-align center
	margin .3rem 

</style>
