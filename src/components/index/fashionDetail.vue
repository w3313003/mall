<template>
    <div class='wrap'>
        <div class='title'>
            时尚穿搭详情    
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='content' v-html='info.content'>    
        </div> 
    </div>
</template>

<script>
export default {
    created(){
        const id = this.$route.params;
        console.log(typeof id.id)
        // this.axios.get(`/api/getOutfitDetali?outId=${id.id}`).then(res => {
        //     if(res.data.code != 'success') throw new Error('请求失败');
        //     this.info = res.data.obj;
        //     console.log(this.info)
        // });
        this.axios.post('/api/outFit/getOutfitDetali',{
            outId : id.id
        }).then(res => {
            console.log(res.data)
        })
    },
    data(){
        return {
            info:{}
        }
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrap   
    position fixed
    top 0
    left 0
    width 100%
    height 100vh
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
    .content
        font-size .5rem
</style>
