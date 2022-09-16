import { Feature } from 'ol';
import { Vector as SourceVector } from 'ol/source';
import { Vector as LayerVector } from 'ol/layer';
import { Style, Icon, Text, Fill, Stroke } from 'ol/style';

import MarkerImage from '../img/marker.png';

export function MarkerIcon () {
	const iconStyle = new Style({
		image: new Icon({
			scale: 0.05,
			anchor: [0.5, 100],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 1.0,
			src: MarkerImage
		})
	});
	const iconFeature = new Feature();
	const iconSource = new SourceVector({
		features: [iconFeature]
	});
	const iconLayer = new LayerVector({
		source: iconSource,
		style: iconStyle
	});
	return { style: iconStyle, source: iconSource, feature: iconFeature, layer: iconLayer };
};
export function MarkerText (text) {
	return new Text({
		text,
		scale: 1.2,
		fill: new Fill({
			color: '#fff'
		}),
		stroke: new Stroke({
			color: '0',
			width: 3
		})
	});
}
