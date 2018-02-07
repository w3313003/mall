<template>
    <div class='classify-wrap'>
        <div class='scroll' ref='scroll'>
            <div class='search-wrap'>
        <div class='search-input'>
                <div class='s-svg'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </div>
                <div class='input-wrap'>
                    <input type='text' 
                    placeholder='输入关键词按回车键进行搜索' 
                    v-model.trim="word" 
                    @keydown.enter="sendSearch" 
                    @click='openSearch'>
                </div>
                </div> 
                <div class='msg'  v-show='isSearching'>
                     <div @click='isSearching = false; word ="" '>
                        取消
                    </div>
                </div>
                <div v-if='!isSearching' style='font-size:.5rem;color:#666'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingjia"></use>
                    </svg>
                </div>
        </div> 
            <div>
                <div class='content'>
                    <div class='male'>
                        <div class='title'>
                            男装分类
                        </div>
                        <div class='disc'>
                            <div class="item" v-for='(item,index) in maleList' :key="index" @click="goDetail(item)">
                                <div class='img-wrap'>
                                    <img v-lazy="item.img" alt="">
                                </div>
                                <div class='text'>
                                    <p>
                                        {{item.classname}}
                                    </p>
                                    <div>
                                        {{item.introduce}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='fmale'>
                        <div class="title">
                            女装分类
                        </div>
                        <div class="disc">
                             <div class="item" v-for='(item,index) in fmaleList' :key="index" @click="goDetail(item)">
                                <div class='img-wrap'>
                                    <img v-lazy="item.img" alt="">
                                </div>
                                <div class='text'>
                                    <p>
                                        {{item.classname}}
                                    </p>
                                    <div>
                                         {{item.introduce}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import scroll from "common/scroll";
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

export default {
    activated(){
        this.maleList = [];
        this.fmaleList = [];
        this.axios.get('/api/waresClass/getWaresClassList').then(res => {
            res.data.obj.forEach((v,i) => {
                v.sexType === '0' ? this.maleList.push(v) : this.fmaleList.push(v);
            });
        });
        this.isSearching = false;
    },
    data() {
        return {
            maleList : [],
            fmaleList : [],
            isSearching:false,
            word:'',
            searchGoodsList:[],
            hotSearch:[],
            oldSearch:[]
        };
    },
    components: {
      scroll
    },
    methods:{
        open(){
            this.searing = true;
        },
        goDetail(item){
            this.$router.push({
                path : `/good_all/${item.id}`
            })
        },
        goToGoodsDetail(item){
            this.$router.push({
                path:`/good/${item.id}`
            })
        },
        sendSearch() {
            this.sendsearch()
        },
        search(item){
            this.word = item.searchName;
            this.sendsearch();
        },
        sendsearch(){
            if(this.word.length < 1) return;
            let data = new URLSearchParams();
                data.append('name',this.word);
                data.append('userId',userInfo.userid)
            this.axios.post('/api/wsc/goods/searchGoods',data).then(res => {
                if(res.data.code === 'error'){
                    this.searchGoodsList = [];
                } else {
                    this.searchGoodsList = res.data.obj
                }
            })
        },
        openSearch(){
            this.$router.push('/search')
            // this.isSearching = true;
            // this.word = '';
            // this._getSearchList();
        },
        _getSearchList(){
            let data = new URLSearchParams();
                data.append('userId',userInfo.userid)
            this.axios.post(`/api/wsc/goods/searchList`,data).then(res => {
                this.hotSearch = res.data.obj.topSearch;
                this.oldSearch = res.data.obj.latelySeanch;
            })
        }
    }
};
</script>

<style lang="stylus" scoped>
.searchList
    h5
        font-size .4rem 
        text-align center
        margin-bottom 10px
    .item
        font-size .35rem
        margin .2rem 0;
        text-align center


.classify-wrap
    position absolute
    top 0
    height 90%
    width:100%
    .scroll
        height 100%
        overflow-x hidden
        overflow-y scroll
        background #e7e7e7
        -webkit-overflow-scrolling: touch;
.search-block
    width 100%
    height 100%
    background #fff
    position absolute
    top 0.93rem
    left 0
    z-index 999
    border 1px solid #666
    box-sizing border-box
    padding 0.2667rem 0.3333rem
    .near   
        .title
            font-size .35rem
            color #989898
        .itemwrap
            margin 0.2667rem 0
            display flex
            flex-wrap wrap
            .item 
                height 0.6667rem
                box-sizing border-box
                line-height 0.6667rem
                border 0.0133rem solid #555
                border-radius 0.3333rem
                padding 0 .2rem
                margin-right  .3rem
    .history
        .title
            font-size .35rem
            color #989898
        .itemwrap
            margin 0.2667rem 0
            display flex
            flex-wrap wrap
            .item 
                height 0.6667rem
                box-sizing border-box
                line-height 0.6667rem
                border 0.0133rem solid #555
                border-radius 0.3333rem
                padding 0 .2rem
                margin-right  .3rem  

.search-wrap
    height 0.93rem
    overflow hidden
    background-color rgba(0,0,0,.1)
    display flex
    box-sizing border-box
    padding  0 .3rem
    align-items center
    justify-content space-around
    background: rgb(250,250,250);
.fmale
    margin-top 0.1333rem

.content
    .male,.fmale
        background #fff
        .title
            height 1.2rem
            line-height 1.2rem
            font-size 0.4rem
            position relative
            padding-left 0.2rem
            border-bottom 0.0133rem solid #e7e7e7
            &:before
                content:''
                height 0.4rem
                width 0.0667rem
                background #fc7aa5
                position absolute
                left 0
                top 50%
                transform translateY(-50%)
        .disc
            display flex
            flex-wrap wrap
            box-sizing border-box
            padding 0.2667rem
            justify-content flex-start
            padding-bottom 0
            .item
                width 2.9333rem
                margin-bottom 0.1333rem
                margin-right 0.3333rem
                &:nth-child(3n)
                    margin-right 0
                .img-wrap
                    width 100%
                    height 2.9333rem
                    overflow hidden
                    img 
                        width 100%
                        height 100%
                .text
                    margin-top 0.1333rem
                    text-align center
                    p
                        font-size 0.4rem
                        margin 0.0667rem 0
                        overflow hidden
                        width 100%
                        text-overflow ellipsis
                        white-space nowrap
                    div
                        font-size 0.3333rem
                        overflow hidden
                        width 100%
                        text-overflow ellipsis
                        white-space nowrap
                        margin 0.0667rem 0

.msg
    height 0.8rem
    z-index 99
    top 0.1333rem
    right 3%
    flex 0 0 1.5333rem
    display flex
    align-items center
    justify-content center
    font-size 0.34rem
    color #fff
    border-radius 0.1333rem
    background #fc7aa5
.search-input
    height 0.6667rem
    flex 1
    top 0.1333rem
    left 5%
    background #fff
    z-index 99
    border 1px solid #e7e7e7
    border-radius 0.333rem
    display flex
    font-size 0.4rem
    overflow hidden
    margin-right 15px
    align-items center
    .input-wrap
        flex 1
        input
            width 100%
            height 100%
            font-size 0.4rem
    .s-svg
        text-align center
        flex 0 0 0.8rem
        line-height 0.6667rem
        .icon 
            color #666


.searchList-enter-active, .searchList-leave-active {
        transition: all .3s
}
.searchList-enter, .searchList-leave-to{
    transform :translate3d(0,100%,0)
}
</style>
