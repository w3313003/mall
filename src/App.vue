<template>
  <div id="app">
    <keep-alive>
        <router-view/>
    </keep-alive>
    <footer>
      <div class='nav-wrap'>
          <router-link to='/index' tag="div">
            <svg class="icon indexicon" aria-hidden="true">
                <use xlink:href="#icon-shouye"></use>
            </svg>
            <div>首页</div>
          </router-link>
          <router-link  to='/classify' tag="div">
            <svg class="icon fenlei" aria-hidden="true">
                <use xlink:href="#icon-fenlei"></use>
            </svg>
            <div>分类</div>
          </router-link>
          <router-link  to='/sof' tag="div">
            <svg class="icon pyq" aria-hidden="true">
                <use xlink:href="#icon-pengyouquan"></use>
            </svg>
            <div>他她圈</div>

          </router-link>
          <router-link  to='/shopcart' tag="div">
            <svg class="icon gouwuche" aria-hidden="true">
                <use xlink:href="#icon-gouwuche11"></use>
            </svg>
            <div>购物车</div>
          </router-link>
          <router-link  to='/personalcenter' tag="div">
            <svg class="icon center" aria-hidden="true">
                <use xlink:href="#icon-wode"></use>
            </svg>
            <div>我的</div>
          </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import goodDetail from '@/components/gooddetail/gooddetail'

export default {
  name: 'app',
  components:{
    goodDetail
  }
}
</script>

<style lang='stylus'>
footer
  position fixed
  bottom 0
  width 100vw
  height 10vh
  background-color #f6f6f6
  .nav-wrap
    height 100%
    display flex
    text-align center
    align-items center
    color #a9a9a9
    & > div
      height 100%
      width:20%
      display flex
      flex-direction column
      box-sizing border-box
      padding 0.2rem 0
      justify-content space-around
      align-items center
      &.router-link-exact-active
        color #ef5285
      svg 
        font-size 0.5333rem
      div
        font-size 0.3rem
</style>
