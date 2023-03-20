<template>
	<view class="list" :style="{'background-image':`url(${playlist.coverImgUrl})`}">
		<musichead title="歌单" :isShow="true" mycolor="white"></musichead>
		<view class="container" v-if="!isLoading">
			<scroll-view scroll-y="true" >
				<view class="list-head">
					<view class="list-head-image">
						<image :src="playlist.coverImgUrl"></image>
						<text class="iconfont">&#xe629;{{playlist.playCount | formatCount}}</text>
					</view>
					<view class="detail">
						<view class="">
							<text class="detail-title">{{playlist.name}}</text>
						</view>
						<view class="detail-author">
							<image :src="playlist.creator.avatarUrl" ></image>
							<text>{{playlist.creator.nickname}}</text>
						</view>
						<view class="detail-b">
							<text class="detail-text">{{playlist.description}}</text>
						</view>
						
					</view>
				</view>
				<button open-type="share" class="share">
					<text class="iconfont">&#xe684;</text>分享给微信好友
				</button>
				<view class="music-list">
					<view class="music-list-head">
						<text class="iconfont icon-bofang2"></text>
						<text>播放全部</text>
						<text class="all-num">(共100首)</text>
					</view>
					<view class="music-list-item" v-for="(item,index) in tracks" :key="index" @tap="handleToDetail(item.id)">
						<view class="music-index">
							{{index+1}}
						</view>
						<view class="music-content">
							<view class="kuan">
								<view class="music-name">
									<text>{{item.name}}</text>			
								</view>
								<text class="iconfont icon-wusunyinzhi"></text>
								<text class="music-more">{{item.ar[0].name}} - {{item.name}}</text>
							</view>
						</view>
						<view class="music-icon">
							<text class="iconfont icon-bofang"></text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '../../commmon/iconfont.css'
	import {list} from '../../commmon/api.js'
	export default {
		data() {
			return {
				playlist:{
					coverImgUrl:'',
					creator:{
						avatarUrl:''
					}
				},
				tracks:[],
				isLoading:true
			};
		},
		onLoad(option) {
			list(option.id).then((res)=>{
				this.playlist = res.data.playlist
				this.tracks = res.data.playlist.tracks
				this.$store.commit('init_id',res.data.playlist.trackIds)
				this.isLoading = false
			})
			
		},
		methods:{
			handleToDetail(songid) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${songid}`,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
	height: 100vh;
	background-size: cover;
	background-position:  400px 200px;  
	.list-head {
		display: flex;
		justify-content: start;
		padding: 30px;
		.list-head-image {
			position: relative;
			width: 264rpx;
			height: 264rpx;
			border-radius: 20rpx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
			text {
				position: absolute;
				right: 8rpx;
				top: 8rpx;
				color: white;
				font-size: 26rpx
			}
		}
		.detail {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: start;
			overflow: hidden;
			padding: 5rpx 0 30rpx 30rpx;
			view {
				flex: 1;
			}
			.detail-title {
				color: white;
				font-size: 34rpx;
			}
			.detail-author {
				font-size: 28rpx;
				color:#f3dfe9;
				image {
					width: 54rpx;
					height: 54rpx;
					border-radius: 50%;
					vertical-align: middle;
				}
				text {
					letter-spacing: 1px;
					margin-left: 5px;
				}
				
			}
			.detail-b {
			width: 175px;
			height: 37px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;  //开启弹性
			 -webkit-line-clamp: 2;
			-webkit-box-orient: vertical;    //垂直对齐方式
			}
			.detail-text {
				letter-spacing: 1px;
				font-size: 22rpx;
				color:#f3dfe9;
			}
		}
		
	}
	.share {
		width: 350rpx;
		height: 74rpx;
		margin-bottom: 50rpx;
		text-align: center;
		line-height: 74rpx;
		color: white;
		border-radius: 45rpx;
		font-size: 31rpx;
		background: rgba(254,254,254,0.2);
		letter-spacing: 1px;
		.iconfont {
			margin-right: 4px;
		}
	}
	.music-list {
		padding: 15px;
		border-radius: 40rpx 40rpx 0 0;
		background-color: #fff;
		.music-list-head {
			height: 70rpx;	
			margin-bottom: 40rpx;
			.all-num {
				color: #999;
			}
			text {
				vertical-align: middle;	
			}
			.iconfont {
				font-size: 60rpx;		
			}
			:nth-child(2) {
				margin-left: 12px;
				font-size: 35rpx;	
				letter-spacing: 2px;
				font-weight: 500;
			}
			:nth-child(3) {
				margin-left: 1px;
				font-size: 28rpx;
				
			}
		}
	}
	.music-list-item {
		display: flex;
		justify-content: start;
		width: 100%;
		height: 110rpx;	
		margin-bottom: 20rpx;
		
		.music-index {
			width: 80rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 40rpx;
			color: #999999;
		}
		
		.music-icon {
			width: 80rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			.iconfont {
				font-size: 65rpx;
				color: #999999;
			}
		}
		
		.music-content {
			flex: 1;
			padding: 5px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			.kuan {
				overflow: hidden;
				width: 470rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.iconfont {
				color: #fa3b3c;
				font-size: 60rpx;
				vertical-align: middle;
			}
			.music-name {
				
				white-space: nowrap;
				text-overflow: ellipsis;
				letter-spacing: 1px;
			}
			.music-more {
				font-size: 26rpx;
				color: #999;
			}
		}
	}
}
</style>
