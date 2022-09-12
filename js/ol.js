const map = new ol.Map({
	target: 'map',
	layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
	view: new ol.View({
		center: [0, 0],
		zoom: 0
	})
});
var iconStyle = new ol.style.Style({
	image: new ol.style.Icon({
		scale: 0.05,
		anchor: [0.5, 100],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		opacity: 1.0,
		src: './img/marker.png'
	})
});

let iconFeature = new ol.Feature();   
let iconSource = new ol.source.Vector({
	features: [iconFeature]
});    
let iconLayer = new ol.layer.Vector({
	source: iconSource,
	style : iconStyle
});
map.addLayer(iconLayer); 
