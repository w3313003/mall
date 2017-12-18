<template>
    <div class='goods-wrap'>
        <div class='nav'>
                    <div @click='ischoose = !ischoose'>价格
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                    <div>销量
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                    <div>最新
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                    <div>折扣
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                </div>
                <transition name='navmove'>
                    <div class='navchoose' v-if='ischoose'>
                        <div :class='{"active":ispricetop}' @click='ispricetop = true'>价格由高到低
                            <span>
                                
                            </span>
                        </div>
                        <div :class='{"active":!ispricetop}' @click='ispricetop = false'>价格由低到高</div>
                    </div>
            </transition>  
                <scroll class='scroll' ref='scroll' :data='goodList'>
                   <goodList :goodList='goodList' @getTodetail='getTodetail'></goodList>
                </scroll>
    </div>
</template>


<script>
import scroll from 'common/scroll'
import goodList from 'common/goodList'
import { moocgoodList } from 'common/util.js'
export default {
    components:{
        scroll,
        goodList
    },
    created(){
        this.$nextTick(() => {
            this.goodList = moocgoodList;
        })
    },
    activated(){
        this.$refs.scroll.refresh()
    },
    data(){
        return {
            ischoose:false,
            ispricetop:true,
            goodList:[]
        }
    },
    watch:{
        ispricetop(val){
            if(val) {
                console.log(1)
            } else {
                console.log(2)
            }
        }
    },
    methods:{
        getTodetail(item){
            console.log(item.id)
        }
    }
}
</script>



<style lang="stylus" scoped>
@css{
    .navmove-enter-active,.navmove-leave-active{
        transition : all .5s
    }
    .navmove-enter,.navmove-leave-to{
        transform : translateY(-100%);
        opacity : 0;
    }
}


.goods-wrap
    position fixed
    height 100vh
    width  100%
    overflow hidden
    z-index 999
    background-color #fff
    display flex
    flex-direction column
    .scroll
        flex 1
        height 100%
        overflow hidden


.navchoose
    width 100%
    position fixed
    top 1.2rem
    left 0 
    font-size 0.4rem
    z-index 1000
    background-color #fff
    div 
        border-bottom 0.0133rem solid #e5e5e5
        padding 0.2rem
        &.active
            color #fc79a5

.nav
    display flex
    height 1.2rem
    // position  fixed
    // top 0
    width 100%
    align-items center
    justify-content space-around
    font-size 0.4rem
    border-bottom 0.0267rem solid #e5e5e5
</style>
