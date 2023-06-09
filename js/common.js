;(function () {
	'use strict'
	const doms = {
		switch_theme: document.getElementById('switch_theme'),
		message: document.querySelector('#description .message'),
	}
	/**
	 * 调整主题颜色
	 * @param {boolean} isDark 是否为深色模式
	 */
	function changeTheme(isDark) {
		if (isDark) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
      localStorage.removeItem('theme')
		}
    doms.switch_theme.checked = isDark
	}

	/**
	 * 初始化主题
	 */
	function initTheme() {
		const currentTheme = localStorage && localStorage.getItem('theme')
		if (currentTheme) {
			document.body.classList.add(currentTheme)
      changeTheme(true)
			return
		}
		const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		changeTheme(isDark)
		if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
			let listeners = {
				dark: (e) => {
					e.matches && changeTheme(true)
				},
				light: (e) => {
					e.matches && changeTheme(false)
				},
			}

			window.matchMedia('(prefers-color-scheme: dark)').onchange = listeners.dark
			window.matchMedia('(prefers-color-scheme: light)').onchange = listeners.light
		}
	}
	function initParagraph() {
		//paragraphs 是个数组,随机取出来一个
		const p = paragraphs[Math.floor(Math.random() * paragraphs.length)];
		doms.message.innerHTML = p;
	}
	function bindEvents() {
		doms.switch_theme.addEventListener('click', () => {
			const isDark = document.body.classList.contains('dark')
			changeTheme(!isDark)
			window.localStorage && window.localStorage.setItem('theme', isDark ? '' : 'dark')
		})
	}
	function init() {
		initTheme()
		initParagraph()
		bindEvents()
	}
  init()
})()
