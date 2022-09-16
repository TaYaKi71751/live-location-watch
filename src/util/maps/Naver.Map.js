export const NaverMap = {
	/**
		*
		* @param {string} nmapURL
		* @param {string} httpURL
		* https://guide.ncloud-docs.com/docs/en/naveropenapiv3-maps-url-scheme-url-scheme#mobile-web-page
		*/
	open: (nmapURL, httpURL) => {
		const clickedAt = +new Date();
		window.location.href = nmapURL;
		setTimeout(function () {
			if (+new Date() - clickedAt < 2000) {
				window.open(httpURL); // Opens new Window => httpURL
			}
		}, 1500);
	},
	/**
		* @param {{latitude:number,longitude:number}} position
		* @param {string} pinTitle
		* @returns [nmapURL:string,httpURL:string]
		* */
	place: (position, pinTitle) => {
		/**
			* httpURL https://developers.naver.com/forum/posts/29791
			* nmapURL https://guide.ncloud-docs.com/docs/en/naveropenapiv3-maps-url-scheme-url-scheme#mark-places
			* */
		const httpURL = `http://map.naver.com/index.nhn?enc=utf8&level=2&lng=${position.longitude}&lat=${position.latitude}&pinTitle=${pinTitle}`;
		const nmapURL = `nmap://place?lng=${position.longitude}&lat=${position.latitude}&name=${pinTitle}`;
		return [nmapURL, httpURL];
	}
};
