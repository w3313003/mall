<template>
    <div class='goods-wrap'>
        <div class='nav'>
                    <div 
                        @click='ischoosePrice = !ischoosePrice'
                        >
                        价格
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                    <div
                        @click='ischooseSalecount = !ischooseSalecount'
                        >销量
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
                    <div class='navchoose' v-if='ischoosePrice'>
                        <div :class='{"active":ispricetop}'  data-type='1' @click='sortPrice'>价格由高到低</div>
                        <div :class='{"active":!ispricetop}' data-type='2' @click='sortPrice'>价格由低到高</div>
                    </div>
                    <div class='navchoose' v-if='ischooseSalecount'>
                        <div :class='{"active":isSaletop}'  data-type='1' @click='sortPrice'>销量由高到低</div>
                        <div :class='{"active":!isSaletop}' data-type='2' @click='sortPrice'>销量由低到高</div>
                    </div>
                </transition>  
                <scroll class='scroll' ref='scroll' :data='goodList'>
                   <goodList :goodList='goodList'></goodList>
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
        
    },
    activated(){
        this.typeid = this.$route.params.id;
        this.$refs.scroll.refresh();
        this._getGoodsInfo();
    },
    data(){
        return {
            ischoosePrice:false,
            ispricetop:true,
            ischooseSalecount:false,
            isSaletop:true,
            goodList:[]
        }
    },
    watch:{
        /**
         * @augments 
         * true 升序
         * false 降序
         */
        ispricetop(val){
            if(val) {
                this.goodList = this.PriceAscending;
            } else {
                this.goodList = this.PriceDescending;
            }
        }
    },
    computed: {
        // 价格
        PriceAscending(){
            return this.goodList.sort((a,b) => {
                return b.sellingPrice - a.sellingPrice;
            })
        },
        PriceDescending(){
            return this.PriceAscending.reverse();
        },
        // 销量
        SaleAscending(){
            return this.goodList.sort((a,b) => {
                return b.xiaoshou_num - a.xiaoshou_num
            })
        },
        SaleDescending(){
            return this.SaleAscending.reverse();
        },
        // 时间
        TimeAscending(){
            return this.goodList.sort((a,b) => {
                return Date.parse(new Date(b.updateDate)) - Date.parse(new Date(a.updateDate))
            })
        },
        TimeDescending(){
            return this.TimeAscending.reverse();
        }
    },
    methods:{
        sortPrice(e){
            const type = e.currentTarget.dataset.type;
            if(type === '1'){
                this.ispricetop = true;
                this.ischoosePrice = false;
            } else {
                this.ispricetop = false;
                this.ischoosePrice = false;
            }
        },
        _getGoodsInfo(){
            let params = new URLSearchParams();
            params.append('type',this.typeid);
            this.axios.post('/api/waresClass/getClassList',params).then(res => {
                if(res.data.code !== 'success') throw new Error('错误');
                this.goodList = res.data.obj;
                this.AllGoodsList = JSON.parse(JSON.stringify(res.data.obj));
            });
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
