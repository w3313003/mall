<template>
    <div class="movie-wrap">
          <div class="title">
              淘口令    
              <svg class="icon fenlei" aria-hidden="true" @click="back">
                  <use xlink:href="#icon-jiantou"></use>
              </svg>
          </div>
          <scroll class="movie-content" :data='videoList'>
              <div>
                  <div class="video-wrap" v-for='(item,index) in videoList' :key="index">
                      <video class="video" :src='item.filePath' autoplay>

                      </video>
                      <div class="text">
                          <p class="name">
                              {{item.name}}
                          </p>
                          <p class="desc">
                              {{item.content}}
                          </p>
                      </div> 
                  </div>
              </div>
          </scroll>
    </div>
</template>

<script>
import scroll from 'common/scroll'


export default {
    data(){
        return {
            videoList : []
        }
    },
    created(){
        this._getMovieList()
    },
    components:{
        scroll
    },
    methods:{
        back(){
            this.$router.back();
        },
        _getMovieList(){
            this.axios.get('/api/microFilm/getMicroFilmList').then(r => {
                if(r.data.code !== 'success') throw new Error('error');
                this.videoList = r.data.obj
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.movie-wrap
    height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .title
        width: 100%;
        height: 1.1333rem;
        line-height: 1.1333rem;
        background: #fff;
        color: #fc7aa5;
        text-align: center;
        font-size: 0.4rem;
        position: relative;
        z-index 9999
        border-bottom: 0.0133rem solid #e7e7e7;
        .icon
            width: 0.5333rem;
            height: 0.5333rem;
            position: absolute;
            left: 0.3rem;
            top: 50%;
            transform: translateY(-50%) rotate(180deg);
            font-size: 0.4rem;
    .movie-content
        flex 1
        overflow hidden
        .video-wrap
            .video
                width 100%
                height 4rem   
            .text
                box-sizing border-box
                padding 0.2667rem 
                .name
                    font-size 0.4667rem
                    margin-bottom 0.2rem
                .desc
                    font-size 0.3333rem
</style>
