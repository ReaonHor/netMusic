<template>
	<view class="head" :style='{color:mycolor}'>
		<view class="lnav" v-if="isShow">
			<text @tap="handleToback()" class="iconfont">&#xe645;</text>	| 
			 <text @tap="handleTohome()" class="iconfont">&#xe606;</text> 
		</view>		
			{{title}}
	</view>
</template>

<script>
	import '../../commmon/iconfont.css'
	export default {
		name:"musichead",
		props:{
			title:{
				type:String,
				default:""
			},
			isShow:{
				type:Boolean,
				default:true		
			},
			mycolor:{
				type:String,
				default:'black'
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handleToback() {
				uni.navigateBack()

			},
			handleTohome() {
				uni.navigateTo({
					url:'/pages/index/index'
				})
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
			color: #a1a191;
			left: 8px;
			bottom: 10px;
			width: 90px;
			height: 30px;
			background: rgba(0,0,0,0.4);
			line-height: 31px;
			border-radius: 20px;
			text  {
				font-size: 20px;
			}
			.iconfont {
				color: white;
			}
		}
			
		
		
	}
</style>