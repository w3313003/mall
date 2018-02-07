<template>
    <div class='goods-wrap'>
        <div class='nav'>
                    <div 
                        @click="selectType('price')"
                        >
                        价格
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                    <div
                        @click="selectType('sale')"
                        >销量
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                    <div
                        @click="selectType('time')"
                        >最新
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                    <div
                        @click="selectType('discount')"
                     >折扣
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-arrLeft-fill"></use>
                        </svg>
                    </div>
                </div>
                <transition-group name='navmove'>
                    <div class='navchoose' v-if='typeMap.price.show' :key='1'>
                        <div :class='{active:typeMap.price.ascending}'  data-type='1' @click='sortPrice'>价格由高到低</div>
                        <div :class='{active:!typeMap.price.ascending}' data-type='2' @click='sortPrice'>价格由低到高</div>
                    </div>
                    <div class='navchoose' v-if='typeMap.sale.show' :key='2'>
                        <div :class='{"active":typeMap.sale.ascending}'  data-type='1' @click='sortSale'>销量由高到低</div>
                        <div :class='{"active":!typeMap.sale.ascending}'  data-type='2' @click='sortSale'>销量由低到高</div>
                    </div>
                    <div class='navchoose' v-if='typeMap.time.show' :key="3">
                        <div :class='{"active":typeMap.time.ascending}'  data-type='1' @click='sortTime'>时间由新到旧</div>
                        <div :class='{"active":!typeMap.time.ascending}'  data-type='2' @click='sortTime'>时间由旧到新</div>
                    </div>
                    <div class='navchoose' v-if='typeMap.discount.show' :key="4">
                        <div :class='{"active":typeMap.discount.show}'  data-type='1' @click='sortDiscount'>折扣由高到低</div>
                        <div :class='{"active":!typeMap.discount.show}' data-type='2' @click='sortDiscount'>折扣由低到高</div>
                    </div>
                </transition-group>  
                <div class='scroll' ref='scroll'>
                   <goodList :goodList='goodList'></goodList>
                </div>
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
    created() {
    },
    activated() {
        this.typeid = this.$route.params.id;
        this._getGoodsInfo();
    },
    data(){
        return {
            ischoosePrice:false,
            ispricetop:true,
            typeMap: {
                price: {
                    show: false,
                    ascending: true
                },
                sale: {
                    show: false,
                    ascending: true
                },
                time: {
                    show: false,
                    ascending: true
                },
                discount: {
                    show: false,
                    ascending: true
                }

            },
            ischooseSalecount:false,
            isSaletop:true,
            goodList:[]
        }
    },
    watch: {
        typeMap: {
            handler(newVal, oldVal){
                console.log(newVal)
            },
            deep: true
        }
    },
    computed: {
        // 价格
        PriceAscending() {
            return this.goodList.sort((a,b) => {
                return b.sellingPrice - a.sellingPrice;
            })
        },
        PriceDescending() {
            return this.PriceAscending.reverse();
        },
        // 销量
        SaleAscending() {
            return this.goodList.sort((a,b) => {
                return b.xiaoshou_num - a.xiaoshou_num
            })
        },
        SaleDescending() {
            return this.goodList.sort((a,b) => {
                return a.xiaoshou_num - b.xiaoshou_num
            })
        },
        // 时间
        TimeAscending() {
            return this.goodList.sort((a,b) => {
                return Date.parse(new Date(b.updateDate)) - Date.parse(new Date(a.updateDate))
            })
        },
        TimeDescending() {
            return this.TimeAscending.reverse();
        },
        // 折扣
        DiscountAscending() {
            return this.goodList.sort((a,b) => {
                return (b.marketPrice - b.sellingPrice) - (a.marketPrice - a.sellingPrice)
            })
        },
        DiscountDescending() {
            return this.DiscountAscending.reverse();
        }
    },
    methods:{
        selectType(type) {
            Object.entries(this.typeMap).forEach(v => {
                if(v[0] !== type) {
                    v[1].show = false;
                }
            });
            this.typeMap[type].show = !this.typeMap[type].show
        },
        sortPrice(e){
            const type = e.currentTarget.dataset.type;
            if(type === '1'){
                this.goodList = this.PriceAscending;
                this.typeMap.price.ascending = true;
            } else {
                this.goodList = this.PriceDescending;
                this.typeMap.price.ascending = false;
            };
            Object.values(this.typeMap).forEach(v => {
                v.show = false;
            })
        },
        sortSale(e) {
            const type = e.currentTarget.dataset.type;
            if(type === '1'){
                this.goodList = this.SaleAscending;
                this.typeMap.sale.ascending = true;
            } else {
                this.goodList = this.SaleDescending;
                this.typeMap.sale.ascending = false;
            };
            Object.values(this.typeMap).forEach(v => {
                v.show = false;
            })
        },
        sortTime(e) {
            const type = e.currentTarget.dataset.type;
            if(type === '1'){
                this.goodList = this.TimeAscending;
                this.typeMap.time.ascending = true;
            } else {
                this.goodList = this.TimeDescending;
                this.typeMap.time.ascending = false;
            };
            Object.values(this.typeMap).forEach(v => {
                v.show = false;
            })
        },
        sortDiscount(e) {
            const type = e.currentTarget.dataset.type;
            if(type === '1'){
                this.goodList = this.DiscountAscending;
                this.typeMap.discount.ascending = true;
            } else {
                this.goodList = this.DiscountDescending;
                this.typeMap.discount.ascending = false;
            };
            Object.values(this.typeMap).forEach(v => {
                v.show = false;
            })
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
    height 100%
    width  100%
    overflow hidden
    z-index 999
    background-color #fff
    .scroll
        height 100%
        overflow scroll
        -webkit-overflow-scrolling: touch;
        box-sizing border-box
        padding-top 1.2rem

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
    position  fixed
    top 0
    width 100%
    z-index 2
    background-color #fff
    align-items center
    justify-content space-around
    font-size 0.4rem
    border-bottom 0.0267rem solid #e5e5e5
    div
        height 100%
        flex 1
        display flex
        justify-content space-between
        align-items center
        box-sizing border-box
        padding 0 .55rem
</style>
