
const socket = io(`ws://${hostname}:${port}${path}`,{auth});

socket.on('reportLocation',(data)=>{
	console.log(data);
	const dpos = data.location;
	map.viewport_.onclick = function(){
		/**
			* http_url https://developers.naver.com/forum/posts/29791
			* app_url https://guide.ncloud-docs.com/docs/naveropenapiv3-maps-url-scheme-url-scheme
			* */
		const http_url = `http://map.naver.com/index.nhn?enc=utf8&level=2&lng=${dpos.longitude}&lat=${dpos.latitude}&pinTitle=Destination`;
		const app_url = `nmap://place?lng=${dpos.longitude}&lat=${dpos.latitude}&name=Destination`;

		window.open(app_url);
		window.open(http_url);
	}
	const dlonlat = [dpos.longitude,dpos.latitude];
	const dproj = ol.proj.fromLonLat(dlonlat);
	map.setView(
		new ol.View({
			center: dproj,
			zoom: 18
		}));
	iconFeature.setGeometry(new ol.geom.Point(dproj));
})
