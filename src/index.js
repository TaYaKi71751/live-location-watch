import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { Config } from './util/Config';

import { Device } from './util/Device';
import { Location } from './util/Location';
import { NaverMap } from './util/maps/Naver.Map';
import { MarkerIcon, MarkerText } from './util/Marker';

import './index.css';
import styles from './index.module.css';

import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import { Tile as LayerTile } from 'ol/layer';
import { Point as GeometryPoint } from 'ol/geom';
import io from 'socket.io-client';

const href = Config.io.user.Subscriptions.href;
const map = new Map({
	target: 'map',
	layers: [new LayerTile({ source: new OSM() })],
	view: new View({ center: [0, 0], zoom: 2 })
});

const overlay = document.querySelector('.ol-overlaycontainer-stopevent');
overlay.style.display = 'contents';
overlay.style.width = 'fit-content';
overlay.style.height = 'fit-content';
overlay.style['pointer-events'] = undefined;

const topLeftOverlay = document.querySelector('.ol-zoom.ol-unselectable.ol-control');
topLeftOverlay.className = '';
topLeftOverlay.style.position = 'absolute';
topLeftOverlay.style.width = 'fit-content';
topLeftOverlay.style.height = 'fit-content';
topLeftOverlay.style['pointer-events'] = undefined;
console.log(map.getLayers().array_.length);

const App = () => {
	return <>
		<div className={styles.Devices}>{Config.auth.getAll().map((auth) => {
			const socket = io(href, { auth });
			const [marker] = useState(MarkerIcon());
			const [reportLocation, setReportLocation] = useState({
				latitude: null,
				longitude: null
			});
			const onLocationClick = () => {
				NaverMap.open(
					...NaverMap.place({
						latitude: reportLocation?.latitude,
						longitude: reportLocation?.longitude
					}, 'Destination')
				);
			};
			socket.on('connect', () => {
				if (
					reportLocation?.latitude === null &&
				reportLocation?.latitude === null
				) {
					map.addLayer(marker.layer);
					console.log({ marker, mapLayers: map.getLayers(), map });
					marker.style.text_ = MarkerText(`${socket.auth.device.id}\n(${reportLocation?.latitude},${reportLocation?.longitude})`);
				}
				socket.on('reportLocation', (data) => {
					const dpos = data.location;
					const dlonlat = [dpos.longitude, dpos.latitude];
					const dproj = fromLonLat(dlonlat);
					if (`${socket.auth.device.id}` === `${localStorage.getItem('focus')}`) {
						map.setView(new View({ center: dproj, zoom: 10 }));
					}
					marker.style.text_ = MarkerText(`${socket.auth.device.id}\n(${data?.location?.latitude},${data?.location?.longitude})`);
					marker.feature.setGeometry(new GeometryPoint(dproj));
					setReportLocation({
						latitude: data.location.latitude,
						longitude: data.location.longitude
					});
					console.log({ marker, mapLayers: map.getLayers().array_.length });
				});
			});
			return <><Device id={auth?.device?.id}>
				<Location
					onClick={onLocationClick}
					latitude={reportLocation.latitude}
					longitude={reportLocation.longitude}/>
			</Device></>;
		})}</div>
	</>;
};
const root = ReactDOM.createRoot(topLeftOverlay);
root.render(
	<App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
