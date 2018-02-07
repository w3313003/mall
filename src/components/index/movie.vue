<template>
    <div class="movie-wrap">
          <div class="title">
              <div class='l'>
                 <svg class="icon fenlei" aria-hidden="true" @click='back'>
                        <use xlink:href="#icon-jiantou"></use>
                </svg>
                </div>
                <div class='m'>
                    微电影
                </div>
                <router-link tag="div" to='/recruit' class='r'>
                    招募
                </router-link>
          </div>
          <div class="movie-content">
              <div>
                  <div class="video-wrap" v-for='(item,index) in videoList' :key="index">
                      <videoPlayer
                        ref="video"
                        :events='events'
                        class="video vjs-big-play-centered"
                        :options="item"
                        @play="currentPlay(item, index)"
                      />
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
              <div style="height: 1.2rem"></div>
          </div>
    </div>
</template>

<script>
import scroll from 'common/scroll'
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";


export default {
    data(){
        return {
            videoList : [],
            events: ['click']
        }
    },
    created(){
        this._getMovieList();
    },
    mounted() {

    },
    components:{
        videoPlayer
    },
    methods:{
        back(){
            this.$router.back();
        },
        currentPlay(item,index) {
            this.$refs.video.forEach((v, i) => {
                if(index === i ) {
                    return;
                } else {
                    v.$el.getElementsByTagName('video')[0].pause();
                }
            });
        },
        _getMovieList(){
            this.axios.get('/api/microFilm/getMicroFilmList').then(r => {
                if(r.data.code !== 'success') throw new Error('error');
                r.data.obj.forEach(v => {
                    let obj = {
                        playsinline: true,
                        x5Playsinline:true,
                        webkitPlaysinline: true,
                        muted: false,
                        language: "zh",
                        controls: true,
                        preload: "auto",
                        fluid: true,
                        controlBar: {
                            volumePanel: false,
                            currentTimeDisplay: false,
                            durationDisplay: false
                        },
                        "vjs-big-play-centered": true,
                        sources: [
                          {
                            type: "video/mp4",
                            src: v.filePath
                          }
                        ],
                        poster: v.img,
                        name: v.name,
                        content: v.content
                    };
                    this.videoList.push(obj);
                });
                console.log(this.videoList);
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.movie-wrap
    position absolute
    width 100%
    height: 90%;
    overflow: hidden;
    .title
        height: 1.2rem;
        display: flex;
        background: #fc7aa5;
        color: #fff;
        font-size: 0.4rem;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.4rem;
        position absolute
        top 0
        z-index 2
        width 100%
        .icon 
            font-size: 0.5rem;
        .m
            flex: 1;
            text-align: center;
        .l 
            font-size: 0.4rem;
            transform: rotate(180deg);
    .movie-content
        height 100%
        margin-top 1.2rem
        overflow scroll
        -webkit-overflow-scrolling: touch;
        .video-wrap
            .text
                box-sizing border-box
                padding 0.2667rem 
                .name
                    font-size 0.4667rem
                    margin-bottom 0.2rem
                .desc
                    font-size 0.3333rem
</style>
