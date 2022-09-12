const NaverMap = {
	/**
		* 
		* @param {string} nmap_url 
		* @param {string} http_url 
		* https://guide.ncloud-docs.com/docs/en/naveropenapiv3-maps-url-scheme-url-scheme#mobile-web-page
		*/
	open:(nmap_url,http_url) => {
		let clickedAt = +new Date();
		location.href = nmap_url;
		setTimeout(function() {
			if (+new Date() - clickedAt < 2000) {
				window.open(http_url); // Opens new Window => http_url
			}
		}, 1500);
	},
	/** 
		* @param {{latitude:number,longitude:number}} position
		* @param {string} pinTitle
		* @returns [nmap_url:string,http_url:string]
		* */
	place:(position,pinTitle) => {
		/**
			* http_url https://developers.naver.com/forum/posts/29791
			* nmap_url https://guide.ncloud-docs.com/docs/en/naveropenapiv3-maps-url-scheme-url-scheme#mark-places
			* */
		const http_url = `http://map.naver.com/index.nhn?enc=utf8&level=2&lng=${position.longitude}&lat=${position.latitude}&pinTitle=${pinTitle}`;
		const nmap_url = `nmap://place?lng=${position.longitude}&lat=${position.latitude}&name=${pinTitle}`;
		return [nmap_url,http_url];
	}
}
