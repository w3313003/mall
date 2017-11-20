<template>
    <div class='help-warp'>
        <div class="title">
            <div class='l'>
                 <svg class="icon" aria-hidden="true" @click='back'>
                        <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
            <div class='m'>
                帮助
            </div>
            <div class='r'>
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-kefu"></use>
                </svg>
            </div>
        </div>
        <div class='content'>
            <div v-for='(item,index) in helpList' :key="index" @click='watchDetail(item)'>
                <span>
                    {{item.title}}
                </span>
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
        </div>
        <help-detail :helpobj = 'currentobj' v-if='watch'
        @close='close'></help-detail>
    </div>
</template>

<script>
import helpDetail from './helpdetail' 

export default {
    components:{
        helpDetail
    },
    data() {
      return {
        watch:false,
        helpList: [
          {
            title: "如何查找订单",
            content: "答：进入个人中心—“我的订单”，进入对应订单详情“查看物流”即可查看订单的物流信息。"
          },
          {
            title: "如何查看物流信息",
            content: "答：进入个人中心—“我的订单”，进入对应订单详情“查看物流”即可查看订单的物流信息。"
          },
          {
            title: "如何退货退款",
            content: "答：进入个人中心—“我的订单”，进入对应订单详情“查看物流”即可查看订单的物流信息。"
          },
          {
            title: "如何查找订单",
            content: "答：进入个人中心—“我的订单”，进入对应订单详情“查看物流”即可查看订单的物流信息。"
          },
          {
            title: "如何查看物流信息",
            content: "答：进入个人中心—“我的订单”，进入对应订单详情“查看物流”即可查看订单的物流信息。"
          },
          {
            title: "如何退货退款",
            content: "答：进入个人中心—“我的订单”，进入对应订单详情“查看物流”即可查看订单的物流信息。"
          }
        ],
        currentobj:{}
      };
    },
    methods: {
      back() {
        this.$router.back();
      },
      watchDetail(item){
          this.currentobj = item;
          this.watch = true;
      },
      close(){
          this.watch = false;
      }
    }
};
</script>

<style lang="stylus" scoped>
.help-warp {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    background: #e7e7e7;

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

    .content {
        div {
            height: 90px;
            display: flex;
            background: #fff;
            box-sizing: border-box;
            padding: 0 0.3rem;
            font-size: 0.4rem;
            align-items: center;
            border-bottom: 0.0267rem solid #e7e7e7;
            justify-content: space-between;

            &:nth-child(4) {
                margin-top: 0.1333rem;
            }

            .icon {
                font-size: 0.5rem;
                font-weight: 600;
                color: #777;
            }
        }
    }
}
</style>
