module.exports = {
	content: ['./views/**/*.ejs'],
	theme: {
		extend: {
			gridTemplateRows: {
				'welcome-header': '1fr minmax(min-content, max-content)',
			},
		},
		colors: {
			'gray-dark': '#393E41',
			'gray-light': '#707070',
			green: '#00A03E',
			red: '#C1292E',
			white: '#F2F4F6',
		},
	},
	plugins: [],
}
