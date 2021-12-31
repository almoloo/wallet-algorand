module.exports = {
	content: ['./views/**/*.ejs'],
	theme: {
		extend: {
			gridTemplateRows: {
				'welcome-header': '1fr minmax(min-content, max-content)',
				'welcome-header-lg': '1fr',
			},
			gridTemplateColumns: {
				'welcome-header-lg': '40% 1fr 1fr',
			},
		},
	},
	plugins: [],
}
