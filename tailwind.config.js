module.exports = {
	content: ['./views/**/*.{ejs,js}'],
	theme: {
		extend: {
			gridTemplateRows: {
				'welcome-header': '1fr minmax(min-content, max-content)',
				'welcome-header-lg': '1fr',
				'dashboard-header': 'minmax(min-content, max-content) 1fr',
				'dashboard-header-lg': '1fr',
				'modal': 'minmax(min-content, max-content) minmax(0, 1fr)',
			},
			gridTemplateColumns: {
				'welcome-header-lg': '40% 1fr 1fr',
				'dashboard-header-lg': '40% 1fr',
			},
		},
	},
	plugins: [],
}
