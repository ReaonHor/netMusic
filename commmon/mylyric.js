export function myLyric(msg) {
	let re = /\[([^\]]+)\]([^\[]+)/g;
	let result = []
	msg.replace(re,function($0,$1,$2){
		result.push({'time':formatTimeTosec($1),'lyric':$2});
	})
	
	
	function formatTimeTosec(value) {
		let arr = value.split(':')
		let a = parseInt(arr[0])*60
		let b = parseFloat(arr[1])
		return (a + b).toFixed(1)
	}
	return result
}