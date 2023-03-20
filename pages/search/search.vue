<template>
	<view class="search">
		<view class="head">
			<view class="lnav">
				<text @tap="handleToback()" class="iconfont">&#xe645;</text> |
				<text @tap="handleTohome()" class="iconfont">&#xe606;</text>
			</view>
			搜索
		</view>
		<view class="index-search">
			<view class="search" >
				<text class="iconfont icon-sousuo"></text>
				<input type="text" confirm-type="search" placeholder="搜索歌曲" v-model="searchWord" @confirm="doSearch()">
				<text class="iconfont icon-yousanjiao2 guan" @tap="guan"></text>
			</view>
		</view>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="hot-search" v-if="sou">
					<view class="hot-search-head">
						热搜榜
					</view>
					<view class="hot-songs-item" v-for="(item,index) in searchHot" :key="index" @tap="handleHotWord(item.searchWord)">
						<view class="hot-index">
							{{index+1}}
						</view>
						<view class="hot-content">
							<view class="hot-song-name">
								<text>{{item.searchWord}}</text>		
							</view>
							<view class="hot-song-more">
								<text>{{item.content}}</text>
								
							</view>
						</view>
						<view class="hot-num">
								{{item.score}}
						</view>
					</view>
				</view>
				<view class="search-result" v-else>
					<view class="search-result-item" v-for="(item,index) in searchList" :key="index" @tap="handleToDetail(item.id)">
						<view class="content">
							<view class="name">
							<text>{{item.name}}</text>
							</view>
							<view class="more">
								<text>{{item.artists[0].name}} - {{item.album.name}}</text>
							</view>
						</view>
						<view class="icon">
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
	import {searchHot,searchSuggest,searchResult} from '../../commmon/api.js'
	export default {
		data() {
			return {
				searchHot:[],
				searchWord:'',
				sou:true,
				searchList:[]
			};
		},
		onLoad() {
			searchHot().then((res)=>{
				this.searchHot = res.data.data
			})
		},
		methods: {
			handleToback() {
				uni.navigateBack()

			},
			handleTohome() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			handleHotWord(word) {
				this.searchWord = word
				this.getSearchList(word)
			},
			getSearchList(word) {
				searchResult(word).then((res)=>{
					if(res.data.code=='200') {
						this.searchList = res.data.result.songs
						this.sou = false
					}
				})
			},
			doSearch() {
				this.getSearchList(this.searchWord)
			},
			guan() {
				this.searchWord = ''
				this.sou = true
			},
			handleToDetail(songid) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${songid}`,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		position: relative;
		width: 100%;
		height: 75px;
		font-size: 16px;
		line-height: 100px;
		color: black;
		text-align: center;
		font-weight: 500;
		letter-spacing: 2px;
		.lnav {
			box-sizing: border-box;
			position: absolute;
			display: flex;
			justify-content: space-evenly;
			left: 8px;
			bottom: 10px;
			width: 90px;
			height: 30px;
			color: #999;
			background: white;
			line-height: 31px;
			border: 1px solid #eaeaea;
			border-radius: 20px;
			
			text {
				font-size: 20px;
			}
			.iconfont {
				color: black;
			}
			
		}
	}
	//搜索
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
			color:#8b8b8b ;
			input {
				float: left;
				height: 100%;
				color: black;
				letter-spacing: 1px;
				width: calc(100vw - 140px);
			}
			.iconfont {
				float: left;
				margin: 0 14px;
				font-size: 20px
			}
			.guan {
				margin: 0;
				width: 60rpx;
				float: right;
			}
	
		}
	}
	//热搜
	.hot-search {
		padding:15px;
		.hot-search-head {
			margin-bottom: 30rpx;
		}
		.hot-songs-item {
			height: 120rpx;
			color: #999;
			&:nth-child(-n+4) .hot-index{
				color: #fb2222;
			}
			.hot-index {
				width: 70rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 40rpx;
				float: left;
			}
			.hot-content {
				float: left;
				height: 80rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				.hot-song-name {
					width: 500rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 36rpx;
					color: #000;
				}
				.hot-song-more {
					overflow: hidden;
					// margin-top: 5px;
					width: 500rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 28rpx;
				}
			}
			.hot-num {
				height: 80rpx;
				line-height: 80rpx;
				float: right;
				font-size: 28rpx;
			}
		}
	}
	//搜索结果
	.search-result {
		padding: 0 15px;
		.search-result-item {
			height: 100rpx;
			width: 100%;
			border-bottom: 1px solid #999;
			margin-bottom: 15px;
			.content {
				float: left;
				height: 80rpx;
				width: 500rpx;
				.name {
					width: 500rpx;
					color: #557fad;
				}
				.more {
					width: 500rpx;
					font-size: 28rpx;
					color: #999;
				}
			}
			.icon {
				width: 60rpx;
				height: 80rpx;
				line-height: 80rpx;
				float: right;
				.iconfont {
					color: #999;
					font-size: 60rpx
				}
			}
		}
		
	}
</style>
