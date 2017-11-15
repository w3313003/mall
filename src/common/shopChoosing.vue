<template>
    <transition name='mask'>
        <div class='mask' v-show='choosing' @click='close'>
        <transition name='choosing'>
            <div class='choosetype' v-show='choosing' @click.stop='cancelBubble'>
                <div class='header'>
                    <div class='img-wrap'>
                        <img src=".././assets/img/goodimg.png" alt="">
                    </div>
                    <div class='disc'>
                        <div class='price'>
                            ￥<span>{{totalPrice}}</span>
                        </div>
                        <div class='Allcount'>
                            库存{{goodInfo.totalcount}}
                        </div>
                        <div class='currenttype'>
                            已选: {{currentType}}
                        </div>
                        <div class='cancel' @click='close'>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-quxiao"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class='block choose_block1'>
                    <div class='title'>颜色:</div>
                    <div class='detail-type'>
                        <div class='item' :class='{"active" : item == color}' @click='chooseColor(item)' v-for='(item,index) in goodInfo.color' :key="index">
                            {{item}}    
                        </div>  
                    </div>
                </div>
                <div class='block choose_block2'>
                    <div class='title'>尺码:</div> 
                    <div class='detail-type'>
                        <div class='item' :class='{"active" : item == size}' @click='chooseSize(item)' v-for='(item,index) in goodInfo.size' :key="index">
                            {{item}}    
                        </div> 
                    </div>
                </div>
                <div class='count'>
                    <div>
                        购买数量
                    </div>
                    <div class='control'>
                        <div @click='less'>
                            <svg class="icon indexicon" aria-hidden="true">
                                <use xlink:href="#icon-iconjian"></use>
                            </svg>
                        </div>
                        <div>
                            <input type="text" v-model='goodInfo.amount' maxlength='3'>
                        </div>
                        <div @click='add'>
                            <svg class="icon indexicon" aria-hidden="true">
                                <use xlink:href="#icon-jiahao"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class='confirm_btn' @click='appendToShopCart'>
                    确定
                </div>
            </div>
        </transition>  
        </div>
    </transition>
</template>

<script>
export default {
    props:{
        goodInfo:{
            type:Object,
            default(){
                return {};
            }
        }
    },
    created(){
        this.size = this.goodInfo.size[0];
        this.color = this.goodInfo.color[0]
    },
    computed:{
        totalPrice(){
            return this.goodInfo.price * this.goodInfo.amount 
        },
        currentType(){
            if(!this.color || !this.szie) '';
            return `颜色:${this.color},尺码:${this.size}`
        }
    },
    data(){
        return {
            size:'',
            color:'',
            choosing:false
        }
    },
    methods:{
        close(){
           this.choosing = false
        },
        less(){
            this.$emit('less')
        },
        add(){
            this.$emit('add')
        },
        chooseColor(item){
            this.color = item;
            this.$emit('chooseColor',item)
        },
        chooseSize(item) {
            this.size = item;
            this.$emit('chooseSize',item)
        },
        cancelBubble(e){
            e.stopPropagation();
        },
        appendToShopCart(){
            this.$emit('appendTo')
            this.close();
        }
    }
}
</script>

<style lang="stylus" scoped>
@css{
    .choosing-enter-active,.choosing-leave-active{
        transition:all .5s;
    }
    .choosing-enter,.choosing-leave-to{
        transform:translate3d(0,100%,0) rotateX(-100deg);
        // opacity:0
    }
    .mask-enter-active,.mask-leave-active{
        transition:all .5s;
    }
    .mask-enter,.mask-leave-to{
        opacity : 0;
    }
}


.mask
    width : 100vw;
    height : 100vh;
    position:fixed;
    top:0;
    left:0;
    background-color : rgba(0,0,0,.3);
    z-index : 1002;
    .choosetype
        position fixed
        left 0 
        bottom 0
        width 100%
        background #fff
        z-index 1002
        .header
            display flex
            position relative
            box-sizing border-box
            padding 0.2rem 0.5333rem 0
            .img-wrap
                width 2.8rem
                height 2.8rem
                display flex
                justify-content center
                background #e8e8e8
                align-items center
                transform translateY(-0.6667rem)
                img
                    display block
                    width 2.5333rem 
                    height 2.5333rem
            .disc
                flex 1
                margin-left 0.3333rem
                position relative
                .cancel
                    position absolute
                    width 0.8rem
                    height 0.8rem
                    font-size 0.8rem
                    right 0.1333rem
                    top 0   
                .price  
                    font-size 0.3333rem
                    margin-top 0.15rem
                    color #ea250b
                    span
                        font-size 0.4rem
                .currenttype,.Allcount
                    color #989898
                    font-size 0.35rem
                    margin 0.4rem 0
        .block  
            font-size: 0.35rem;
            box-sizing border-box
            padding 0 0.4667rem
            margin 0.2667rem 0
            .title
                margin 0 0 0.2667rem 0
            .detail-type
                display flex
                flex-wrap wrap
                width 100%
                .item
                    flex 0 0 30%
                    justify-content flex-start
                    height 0.6667rem
                    background #e4e4e4
                    color #989898
                    line-height 0.6667rem
                    text-align center
                    margin 0.3067rem 0.2rem 0.3067rem 0
                    border-radius 0.333rem
                    &.active
                        background #fc7aa5
                        color #fff
        .count
            display flex
            justify-content space-between
            box-sizing: border-box;
            padding: 0 0.4667rem;
            font-size: 0.35rem;
            align-items center
            margin 0.4rem 0
            .control
                display flex
                flex 0 0 2.9333rem
                justify-content space-between
                & > div
                    width 0.88rem
                    height 0.88rem
                    background #e4e4e4
                    font-size 0.35rem
                    display flex
                    justify-content center
                    align-items center
                    &:nth-child(2)
                        input
                            display block
                            background #e4e4e4
                            width 100%
                            height 100%
                            font-size 0.5rem
                            text-align center
                    .icon 
                        font-size 0.2667rem
        .confirm_btn
            width 100%
            height 1.0667rem
            line-height 1.0667rem
            text-align center
            color #fff
            background #fc7aa5
            font-size 0.4rem
            letter-spacing 0.0267rem


</style>
