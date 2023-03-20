<template>
	<view class="detail">
		<view class="album-img" :style="{'background-image':`url(${songDetail.al.picUrl})`}">
		</view>
		<view class="detail-contain">
			<musichead :title="songDetail.name" :isShow="true" mycolor="#fff"></musichead>
			<view class="container">
				<scroll-view scroll-y="true">
					<view class="detail-play" @tap="isPlay()">
						<view class="detail-img">
							<view class="detail-album" :style="{'background-image':`url(${songDetail.al.picUrl})`}" :class="{'run':play}" >
							</view>
							<text class="iconfont icon-bofang" v-if="!play"></text>
							<text class="iconfont icon-zanting" v-else></text>
						</view>
						
					</view>
					<view class="detail-lyric">
						<view class="lyric-wrap" :style="{transform:`translateY(${(-lyricIndex+1)*35}px)`}">
							<view class="lyric-item" v-for="(item,index) in lyric" :key="index" :class="{active : lyricIndex==index}" >{{item.lyric}}			
							</view>
						</view>
					</view>
					<view class="detail-love">
						<view class="love-head">
							<view class="love-title">
								喜欢这首歌的人也听
							</view>
							<view class="love-bofang">
								<text class="iconfont icon-bofang">一键收听</text>
							</view>
						</view>
						<view class="love-item" v-for="(item,index) in songSimi" :key="index" @tap="handleToSimi(item.id)">
							<view class="song-img">
								<image :src="item.album.picUrl"></image>
							</view>
							<view class="song-content">
								<view class="kuan">
									<view class="music-name">
										<text>{{item.name}}</text>
									</view>
									<text class="iconfont icon-wusunyinzhi"></text>
									<text class="music-more">{{item.name}} - {{item.album.artists[0].name}}</text>
								</view>
							</view>
							<view class="icon">
								<text class="iconfont icon-bofang"></text>
							</view>
						</view>
					</view>
					<view class="detail-comment">
						<view class="comment-head">
							精彩评论
						</view>
						<view class="comment-content" v-for="(item,index) in songComment" :key="index">
							<view class="content-head">
								<view class="tou">
									<image :src="item.user.avatarUrl"></image>
								</view>
								<view class="middle">
									<view class="name">
										{{item.user.nickname}}
									</view>
									<view class="time">
										{{item.time | formatTime}}
									</view>
								</view>
								<view class="zan">
									{{item.likedCount | formatCount}}
									<text class="iconfont icon-dianzan"></text>
								</view>
							</view>
							<view class="content">
								<text>{{item.content}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import '../../commmon/iconfont.css'
	import {
		myLyric
	} from '../../commmon/mylyric.js'
	import {
		list,
		songData,
		songDetail,
		songSimi,
		songLyric,
		songComment
	} from '../../commmon/api.js'
	export default {
		data() {
			return {
				play: true,
				songDetail: {
					al: {
						picUrl:''
					}
				},
				songSimi: [],
				songComment: [],
				lyric: [],
				lyricIndex:0,
				timer:null
			}
		},
		onLoad(options) {
			this.getMusic(options.id)

		},
		onUnload() {
			this.clearMyInterval()
			// #ifdef H5
			this.bgAudio.destroy()
			// #endif
		},
		onHide() {
			this.clearMyInterval()
			this.clearMyInterval()
			// #ifdef H5
			this.bgAudio.destroy()
			// #endif
			
		},
		methods: {
			getMusic(songid) {
				this.$store.commit('next_id',songid)
				Promise.all([songDetail(songid), songSimi(songid), songComment(songid), songLyric(songid),songData(songid)]).then((res) => {
						if (res[0].data.code == 200) {
							this.songDetail = res[0].data.songs[0]
						}
						if (res[1].data.code == 200) {
							this.songSimi = res[1].data.songs
						}
						if (res[2].data.code == 200) {
							this.songComment = res[2].data.hotComments
						}
						if (res[3].data.code == 200) {
							let lyricno = res[3].data.lrc.lyric
							this.lyric = myLyric(lyricno)
						}
						if (res[4].data.code == 200) {	
							// #ifdef MP-WEIXIN
							this.bgAudio = uni.getBackgroundAudioManager()
							this.bgAudio.title = this.songDetail.name
							// #endif
							
							// #ifdef H5
							this.bgAudio = uni.createInnerAudioContext()
							this.play = false
							this.clearMyInterval()
							// #endif
							this.bgAudio.src = res[4].data.data[0].url || ''
							this.listenLyric()
							// #ifdef H5
							this.clearMyInterval()
							// #endif
							
							this.bgAudio.onPlay(()=>{
								this.play = true
								this.listenLyric()
							})
							this.bgAudio.onPause(()=>{
								this.clearMyInterval()
								this.play = false
								
							})
							this.bgAudio.onEnded(()=>{
								this.getMusic(this.$store.state.nextId)
								this.clearMyInterval()
							})
						}
					})
				},
				isPlay() {
					if(this.bgAudio.paused) {
						this.bgAudio.play()
					}
					else {
						this.bgAudio.pause()
					}
				},
				listenLyric() {
					this.clearMyInterval()
					this.mytime = setInterval(()=>{
						for(var i = 0; i<this.lyric.length;i++) {
							if(this.bgAudio.currentTime>this.lyric[this.lyric.length-1].time) {
								this.lyricIndex = this.lyric.length-1
								this.clearMyInterval()
								break;
							}
							if(this.bgAudio.currentTime>=this.lyric[i].time&&this.bgAudio.currentTime<=this.lyric[i+1].time) {
								this.lyricIndex = i
								console.log(this.lyricIndex)
							}
						}
					},250)
				},
				clearMyInterval() {
					clearInterval(this.mytime)
				},
				handleToSimi(id) {
					this.bgAudio.pause()
					this.getMusic(id)
				},
				
			}
		}
</script>

<style lang="scss" scoped>
	@keyframes move {
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	.detail {
		width: 100%;
		height: 100%;

		.album-img {
			width: 100%;
			height: 100%;
			position: fixed;
			background: url('../../static/eason.jpg') no-repeat;
			background-size: cover;
			background-position: center center;
			filter: blur(25px);
			z-index: -1;
		}

		&::before {
			position: fixed;
			display: block;
			content: '';
			width: 100%;
			height: 100%;
			top: 0;
			right: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, .5);
			z-index: 1;
		}

		.detail-contain {
			position: relative;
			z-index: 9;
		}

		.container {
			.detail-play {
				position: relative;
				height: 400px;	
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				.detail-img {
					width: 280px;
					height: 280px;
					border-radius: 50%;
					background: linear-gradient(145deg, #585858, #696969);
					box-shadow: 19px 19px 38px #525252,
						-19px -19px 38px #727272;
					z-index: 20;
					overflow: hidden;
					text-align: center;
					position: relative;
					.iconfont {	
						position: absolute;
						color: #fff;
						top: 50%;
						left: 50%;
						// transform: translate(-50% -50%);
						// transform: translateX(-50%);
						transform: translateY(-50%) translateX(-50%);
						font-size: 70px;
						z-index: 25;
					}
				}
				.detail-album {		
					width: 280px;
					height: 280px;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 11;
					border-radius: 50%;
					background: url('') no-repeat;
					background-size: cover;
					background-position: center center;
					animation: 10s linear move infinite ;
					animation-play-state: paused;
				}
				.run {
					animation-play-state: running;
				}
			}
			

			.detail-lyric {
				height: 140px;
				text-align: center;
				overflow: hidden;
				.lyric-wrap {
					line-height: 35px;
					transition: all 0.25s ease-in;
					.lyric-item {
						color: #999;
					}
					.active {
						color: #fff;
					}
				}
				
			}

			.detail-love {
				padding: 30px 15px;
				color: #fff;
				margin-bottom: 20px;

				.love-head {
					height: 60rpx;
					margin-bottom: 30rpx;

					.love-title {
						float: left;
						font-size: 38rpx;
						letter-spacing: 1px;
					}

					.love-bofang {
						float: right;
						height: 60rpx;
						width: 180rpx;
						text-align: center;
						line-height: 60rpx;
						border-radius: 30rpx;
						border: 1px solid #999;

						text {
							font-size: 30rpx;
						}

					}
				}

				.love-item {
					display: flex;
					width: 100%;
					margin-bottom: 30rpx;

					.song-img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 5px;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.icon {
						width: 80rpx;
						height: 80rpx;
						text-align: center;
						line-height: 80rpx;

						.iconfont {
							font-size: 48rpx;
							color: #999;
						}
					}

					.song-content {
						flex: 1;
						margin-left: 10px;
						width: calc(100vw - 160rpx - 40px);
						.kuan {
							width:calc(100vw - 160rpx - 80px); ;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.iconfont {
							color: #fa3b3c;
							font-size: 45rpx;
							vertical-align: middle;
						}

						.music-name {				
							white-space: nowrap;
							text-overflow: ellipsis;
							letter-spacing: 1px;
						}

						.music-more {
							font-size: 26rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							color: #999;
						}
					}
				}

			}

			.detail-comment {
				padding: 0 15px;
				color: #fff;

				.comment-head {
					font-size: 38rpx;
					letter-spacing: 1px;
					margin-bottom: 20px;
				}

				.comment-content {
					width: 100%;
					margin-bottom: 15px;

					.content-head {
						display: flex;
						justify-content: space-between;
						width: 100%;
						height: 64rpx;
						color: #999;
						margin-bottom: 10px;

						.tou {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							overflow: hidden;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.zan {
							font-size: 28rpx;
						}

						.middle {
							flex: 1;
							margin-left: 20rpx;

							.name {
								font-size: 25rpx;
								margin-bottom: 1px;
							}

							.time {
								font-size: 20rpx;
							}
						}
					}

					.content {
						width: 600rpx;
						margin-left: 80rpx;
						padding-bottom: 10px;
						border-bottom: 1px solid #999;
						line-height: 1.6;
						letter-spacing: 1px;
					}
				}
			}
		}
	}
</style>
