import React from 'react';

import { Map as OpenLayerMap, View } from 'ol';
import { OSM } from 'ol/source';
import { Attribution } from 'ol/control';
import { Tile as LayerTile } from 'ol/layer';

let map = null;
export function useMap (props) {
	if (map === null || map?.children?.length === 0) { newMap(props); }
	return map;
}
export function newMap (props) {
	if (
		(() => {
			const _ = document.querySelectorAll('.container > #map');
			return (
				typeof _?.length != 'undefined' &&
				_?.length === 0
			);
		})()
	) {
		const _ = document.createElement('div');
		_.id = 'map';
		document.querySelector('.container')
			.appendChild(_);
	}
	map = new OpenLayerMap({
		controls: [
			new Attribution()
		],
		target: props?.target || 'map',
		layers: props?.layers || [new LayerTile({ source: new OSM() })],
		view: props?.view || new View({ center: [0, 0], zoom: 2 })
	});
	return useMap();
}
export class Map extends React.Component {
	constructor (props) {
		super();
		this.props = props;
	}

	componentDidMount () {
		map = newMap(this.props);
	}

	render (props) {
		return (
			<div id="map"/>
		);
	}
}
