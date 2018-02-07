<template>
    <div class='Fwrap'>
        <div class='title'>
            <div class='l'>
                 <svg class="icon fenlei" aria-hidden="true" @click='back'>
                        <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
            <div class='m'>
                详情
            </div>
            <div class='r' @click="toRelease">
                反馈
            </div>
        </div>
        <div class='content' ref="page">    
            <div class="page" v-html="info.content"></div>
        </div> 
    </div>
</template>

<script>
const userId = JSON.parse(sessionStorage.getItem('userInfo')).userid;
export default {
    activated(){
        const id = this.$route.params;
        this.axios.get(`/api/outFit/getOutfitDetali?outId=${id.id}&userId=${userId}`).then(res => {
            this.info = res.data.obj
        })
        // this.$nextTick(() => {
        //     setTimeout(() => {
        //         [...this.$refs.page.getElementsByTagName('*')].forEach(el => {
        //             if(el.tagName === 'IMG') {
        //                 el.style.width = '100%';
        //                 el.style.height = 'auto';
        //                 el.style.display = 'block';
        //             };
        //             el.style.fontSize = '.35rem';
        //             el.style.lineHeight = '.4rem'
        //         });
        //     },500)
        // })
    },
    data(){
        return {
            info:{}
        }
    },
    methods:{
        back(){
            this.$router.back();
        },
        toRelease() {
            this.$router.push({
                path: `/fashion/feedback/${this.$route.params.id}`
            })
        }
    }
}
</script>

<style lang="stylus">
.Fwrap   
    position fixed
    top 0
    left 0
    width 100%
    height 90vh
    display flex
    flex-direction column
    .title {
        height: 1.2rem;
        display: flex;
        background: #fc7aa5;
        color: #fff;
        font-size: 0.4rem;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.4rem;

        .icon {
            font-size: 0.5rem;
        }

        .m {
            flex: 1;
            text-align: center;
        }

        .l {
            font-size: 0.4rem;
            transform: rotate(180deg);
        }
    }
    .content
        flex 1
        overflow-x hidden
        overflow-y scroll
        -webkit-overflow-scrolling: touch;
        p
            width 100%
            img
                display block
                width 100vw!important 
                height auto!important
            a
                display block
                img 
                    display block
                    width 100vw!important 
                    height auto!important
            span
                width 100%
                display block
                font-size .3rem!important
                line-height .4rem!important
                box-sizing border-box
                padding 0 .15rem
</style>
