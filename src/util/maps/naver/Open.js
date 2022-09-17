/**
		*
		* @param {string} nmapURL
		* @param {string} httpURL
		* https://guide.ncloud-docs.com/docs/en/naveropenapiv3-maps-url-scheme-url-scheme#mobile-web-page
		*/
export function	open (nmapURL, httpURL) {
	const clickedAt = +new Date();
	window.location.href = nmapURL;
	setTimeout(function () {
		if (+new Date() - clickedAt < 2000) {
			window.open(httpURL); // Opens new Window => httpURL
		}
	}, 1500);
}
