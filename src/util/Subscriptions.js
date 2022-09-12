import { Map,Feature,View } from 'ol';
import {Vector as SourceVector,OSM} from 'ol/source';
import {Vector as LayerVector,Tile as LayerTile} from 'ol/layer';
import {Point as GeometryPoint} from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import {Style,Icon,Text,Fill,Stroke} from 'ol/style';
import io from 'socket.io-client';

import {NaverMap} from './maps/Naver.Map';
import MarkerImage from '../img/marker.png';
import {io as SocketIOConfig} from '../config.js';

const hostname = SocketIOConfig.Subscriptions.hostname;
const port = SocketIOConfig.Subscriptions.port;
const path = SocketIOConfig.Subscriptions.path;

export class Subscriptions {
	map = new Map({
		target: 'map',
		layers: [new LayerTile({ source: new OSM() })],
		view:new View({ center:[0, 0], zoom:2 }),
	})
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
		socket.on('connect',()=>{
			const iconStyle = new Style({
				image: new Icon({
					scale: 0.05,
					anchor: [0.5, 100],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 1.0,
					src: MarkerImage
				}),
			});
			let iconFeature = new Feature();   
			let iconSource = new SourceVector({
				features: [iconFeature]
			});
			let iconLayer = new LayerVector({
				source: iconSource,
				style : iconStyle
			});
			this.map.addLayer(iconLayer);
			socket.on('reportLocation',(data)=>{
				const device = socket?.auth?.device;
				const dpos = data.location;
				const dlonlat = [dpos.longitude,dpos.latitude];
				const dproj = fromLonLat(dlonlat);
				document.querySelectorAll(`[class="device"][id="${device.id}"] > .place`)
					.forEach((place)=>{
						place.onclick = function(){NaverMap.open(...NaverMap.place(dpos,'Destination'));}
					});
				document.querySelectorAll(`[class="device"][id="${device.id}"] > .info > .location`)
					.forEach((location)=>{
						location.textContent = `(${dpos.latitude},${dpos.longitude})`;
					});
				if(socket.auth.device.id === this.focus){
					this.map.setView(new View({ center: dproj, zoom: 10 }));
				}
				const _ = iconStyle;
				_.text_ =new Text({
					text: `${socket.auth.device.id}\n(${dpos.latitude},${dpos.longitude})`,
					scale: 1.2,
					fill: new Fill({
						color: "#fff"
					}),
					stroke: new Stroke({
						color: "0",
						width: 3
					})
				})
				iconFeature.setGeometry(new GeometryPoint(dproj));
			});
			
		})
		return this.sockets.push(socket) - 1;
	}
}
