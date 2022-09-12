class Subscriptions {
	sockets = [];
	get focus(){let f = localStorage.getItem('focus');f = f === null ? -1 : f;return f;}
	set focus(value){localStorage.setItem('focus',Number(value));}
	/**
		* 
		* @param {{user:{email:string,password:string},device:{id:`${number}`}}} auth
		* @returns {number} socketsIndex
		*/
	connect(auth) {
		const socket = io(`ws://${hostname}:${port}${path}`,{auth});
		socket.on('reportLocation',(data)=>{
			console.log(data);
			const dpos = data.location;
			const dlonlat = [dpos.longitude,dpos.latitude];
			const dproj = ol.proj.fromLonLat(dlonlat);
			if(socket.auth.device.id === this.focus){
				map.viewport_.onclick = function(){
					NaverMap.open(...NaverMap.place(dpos,'Destination'));
				}
				map.setView(
					new ol.View({
						center: dproj,
						zoom: 18
					}));
			}
			iconFeature.setGeometry(new ol.geom.Point(dproj));
		});
		return this.Subscriptions.sockets.push(socket) - 1;
	}
}
