<template>
    <div class="search">
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
                    />
                </div>
            </div> 
            <div class='msg' v-show='isSearching'>
                 <div @click='sendsearch'>
                    搜索
                </div>
            </div>
            <div v-if='!isSearching' style='font-size:.5rem;color:#666'>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pingjia"></use>
                </svg>
            </div>
        </div> 
        <div class="search-block">
            <div v-if='searchGoodsList.length < 1'>
                <div class="lately">
                    <div class="title">
                        最近搜索
                    </div>
                    <div class="searchResult">
                        <div v-for='(v, k) of oldSearch' :key="k" @click="chooseWord(v)">
                            {{v.searchName}}
                        </div>
                    </div>
                    <div class="item-wrap" v-if='oldSearch.length < 1'>
                        暂无记录
                    </div>
                </div>
                <div class="hot">
                    <div class="title">
                        热门搜索
                    </div>
                    <div class="searchResult">
                        <div v-for='(v, k) of hotSearch' :key="k" @click="chooseWord(v)">
                            {{v.searchName}}
                        </div>
                    </div>
                    <div class="item-wrap" v-if='hotSearch.length < 1'>
                        暂无记录
                    </div>
                </div>
                <p class="btn" @click="clear">清空历史搜索记录</p>
            </div>
            <div class="result" v-else>
                <ul>
                    <li v-for="(item, i) in searchGoodsList" :key="i" @click="toGoods(item)">
                        <img :src="item.imgMain" alt="">
                        <div class='title'>
                            {{item.name}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

export default {
    data() {
        return {
            word: '',
            isSearching: true,
            word:'',
            searchGoodsList:[],
            hotSearch:[],
            oldSearch:[],
        }
    },
    activated() {
        this.searchGoodsList = [];
        this.word = '';
        this.axios.get(`/api/wsc/goods/searchList?userId=${userInfo.userid}`).then(res => {
            if(res.data.code === 'success' && res.data.obj) {
                this.hotSearch = res.data.obj.topSearch;
                this.oldSearch = res.data.obj.latelySeanch;
            }
        })
    },
    methods: {
        sendsearch(){
            if(this.word.length < 1) return;
            let data = new URLSearchParams();
                data.append('name',this.word);
                data.append('userId',userInfo.userid)
            this.axios.post('/api/wsc/goods/searchGoods',data).then(res => {
                if(res.data.code === 'success'){
                    this.searchGoodsList = res.data.obj
                } else {
                    this.searchGoodsList = []
                }
            });
            console.log(this.searchGoodsList)
        },
        toGoods(item) {
            this.$router.replace({
                path:`/good/${item.id}`
            })
        },
        chooseWord(item) {
            this.word = item.searchName;
        },
        clear() {
            this.axios.get(`/api/wsc/goods/deleteSearch?userId=${userInfo.userid}`).then(res => {
                if(res.data.code === 'success') {
                    this.oldSearch = [];
                    Toast('删除成功');
                };
            })
        }
    }
};
</script>

<style lang="stylus" scoped>
.search
    width 100vw
    height 100vh
    display flex
    flex-direction column
    position absolute
    left  0
    top 0
    z-index 9999
    .search-wrap
        height: 0.93rem;
        overflow: hidden;
        background-color: rgba(0,0,0,0.1);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 0.3rem;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        background: #fafafa;
        .search-input
            height: 0.6667rem;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            top: 0.1333rem;
            left: 5%;
            background: #fff;
            z-index: 99;
            border: 1px solid #e7e7e7;
            border-radius: 0.333rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-size: 0.4rem;
            overflow: hidden;
            margin-right: 15px;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            .s-svg
                text-align: center;
                -webkit-box-flex: 0;
                -ms-flex: 0 0 0.8rem;
                flex: 0 0 0.8rem;
                line-height: 0.6667rem;
            .input-wrap
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                input 
                    width: 100%;
                    height: 100%;
                    font-size: 0.4rem;
        .msg
            height: 0.8rem;
            z-index: 99;
            top: 0.1333rem;
            right: 3%;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 1.5333rem;
            flex: 0 0 1.5333rem;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            font-size: 0.34rem;
            color: #fff;
            border-radius: 0.1333rem;
            background: #fc7aa5;
    .search-block
        flex 1
        background: #fff;
        border: 1px solid #666;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0.2667rem 0.3333rem;
        overflow scroll  
        div
            .lately,.hot
                .title
                    font-size: 0.35rem;
                    color: #989898;
                .item-wrap
                    margin: 0.2667rem 0;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
.result
    width 100%
    li
        display flex
        padding .15rem 0
        border-bottom 1px solid #666
        img 
            width 1.6rem
            height 1.6rem
            border-radius .15rem
        div.title 
            font-size .35rem
            flex 1
            text-align center
            line-height 1.6rem
.searchResult
    margin .2rem 0
    display flex
    flex-wrap wrap
    font-size .4rem
    div
        padding .15rem .25rem
        border-radius 15px
        border 1px solid #666
        margin-right .85rem 

.btn
    text-align center
    font-size .35rem
    margin-top .5rem
</style>
