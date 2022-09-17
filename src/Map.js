import React, { useState } from 'react';
import { Map, useMap } from './util/Map';
import { View } from 'ol';
import { MarkerIcon, MarkerText } from './util/Marker';
import { fromLonLat } from 'ol/proj';
import { Point as GeometryPoint } from 'ol/geom';
import { Config } from './util/Config';
import io from 'socket.io-client';
import { DeviceInfo } from './util/device';
import { LocationInfo } from './util/location';
import { Place as NaverMapPlace } from './util/maps/naver';

import styles from './Map.module.css';

export default function App () {
	const href = Config.io.user.Subscriptions.href;
	const map = useMap();
	let subscriptions = null;
	if (subscriptions === null) {
		subscriptions = Config.auth.getAll()
			.map((auth) => (io(href, { auth })))
			.map((socket) => {
				const [reportLocation, setReportLocation] = useState(null);
				const marker =	MarkerIcon();

				const s = socket;
				if (reportLocation === null) {
					map.addLayer(marker.layer);
					socket.on('reportLocation', (data) => {
						const dpos = data.location;
						const dlonlat = [dpos.longitude, dpos.latitude];
						const dproj = fromLonLat(dlonlat);
						if (`${socket.auth.device.id}` === `${localStorage.getItem('focus')}`) {
							map.setView(new View({ center: dproj, zoom: 10 }));
						}
						marker.style.text_ = MarkerText(
							socket.auth.device.id + '\n' +
								'(' + data?.location?.latitude + ',' +
								data?.location?.longitude + ')'
						);
						marker.feature.setGeometry(new GeometryPoint(dproj));
						setReportLocation(data?.location);
					});
				}
				s.location = reportLocation;
				return s;
			});
	}
	return <>
		<Map/>
		<div className={styles.Devices}>
			{subscriptions.map((socket) => (
				<DeviceInfo
					key={`device ${socket.auth.device.id}`}
					id={socket.auth.device.id}>
					<LocationInfo
						key={`location ${socket?.location?.id}`}
						location={socket.location}>
						<NaverMapPlace
							key={`naver-place ${socket?.location?.id}`}
							position={socket.location}
							pinTitle={'Destination'}/>
					</LocationInfo>

				</DeviceInfo>
			))}
		</div>
	</>;
}
