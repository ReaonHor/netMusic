<template>
	<view class="home">
		<musichead title="云音乐" :isShow="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search">
					<view class="search" @tap="handleToSearch">
						<text class="iconfont icon-sousuo"></text>
						<text>搜索歌曲</text>
					</view>
				</view>
				<view class="index-list">
					<view class="index-list-item" v-for="(item,index) in toplist" :key="item.id"
						@tap="handleToList(item.id)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl"></image>
							<text class="">{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text">
							<view class="detail" v-for="(item,index) in item.tracks" :key="index">
								<text>{{index+1}}.{{item.first}} - {{item.second}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="about">
					<text class="iconfont">&#xe7e8;</text>
					<text>关于</text>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import '../../commmon/iconfont.css'
	import {
		toplist
	} from '../../commmon/api.js'
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	export default {
		data() {
			return {
				toplist: []
			}
		},
		onLoad() {
			toplist().then((res) => {
				this.toplist = res
			})
		},
		methods: {
			handleToList(id) {
				uni.navigateTo({
					url: `/pages/list/list?id=${id}`
				});
			},
			handleToSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-search {
		height: 160rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.search {
			height: 70rpx;
			width: calc(100vw - 30px);
			background-color: #f7f7f9;
			border-radius: 30px;
			line-height: 70rpx;

			.iconfont {
				margin: 0 14px;
				font-size: 20px
			}

			text {
				color: #8b8b8b;
				letter-spacing: 1px;
			}
		}
	}

	.index-list {
		width: 100%;
		padding: 0 30rpx;

		.index-list-item {
			margin-bottom: 34rpx;
			display: flex;
			justify-content: start;

			.index-list-img {
				position: relative;
				width: 212rpx;
				height: 212rpx;
				background-color: skyblue;
				border-radius: 8rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}

				text {
					position: absolute;
					left: 12rpx;
					bottom: 16rpx;
					color: white;
					font-size: 20rpx;
				}
			}

			.index-list-text {
				display: flex;
				flex-direction: column;
				padding: 14rpx;

				.detail {
					display: flex;
					flex: 1;
					color: #5e5e5e;
					font-size: 25rpx;
					letter-spacing: 1px;
					width: 390rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					align-items: center;

					text {}
				}
			}
		}
	}

	.about {
		margin-top: 50rpx;
		color: #8b8b8b;
		text-align: center;
	}
</style>
