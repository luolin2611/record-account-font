module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset'
	],
	plugins: [
		[
			'import',
			{
				libraryName: 'vant',
				libraryDirectory: 'es',
				style: true
			}, 'vant'
		],
		["transform-es2015-arrow-functions", {
			spec: true
		}]
	]
}
