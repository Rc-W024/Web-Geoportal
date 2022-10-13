
/**
* Return the text to use to label
* @method get_etiqueta
* @param {feature} object - object wich represents a geometry from a OL3 vector layer
* @param {campo}  string - Name of the field of the feature to get the text. If the name is gid or id
* 						  The field does not exists. Then uses the method feature.getId(), which returns
* 						  'table.gid'. Spits the string and returns the gid
* @return none
*/
function get_etiqueta(feature,campo){
	if ((campo=='gid') || (campo=='id')){
		return feature.getId().split('.')[1];
	}else{
		return feature.get(campo);
	}
}


/**
* Return a OL3 text style to label a vector layer
* @method createTextStyle
* @param {feature} object - object wich represents a geometry from a OL3 vector layer
* @param {campo}  string - Name of the field of the feature to use to label.
* @param {col} string - color to use for the label
* @return OL3 text style
*/
var createTextStyle = function(feature, campo, col) {
  return new ol.style.Text({
    textAlign: 'left',
    textBaseline: 'middle',
    font: '14px Verdana',
    text: get_etiqueta(feature,campo),
    fill: new ol.style.Fill({color: col}),
    stroke: new ol.style.Stroke({color: col, width: 0.5})
  });
};

/**
* This is a example from how to use an image to draw points.
* This variable can be used in the image: property when a new ol.style.Style is created
*/
var pointImageSymbol = new ol.style.Icon(({
	anchor: [0.5, 1],
	anchorXUnits: 'fraction',
	anchorYUnits: 'fraction',
	opacity: 1,
	scale:0.1,
		src: 'img/pozo.jpg'
}));
	
/**
* Return a OL3 style to label a vector layer. The style also give a symbology to the layer: 
* 	point, polygon or lineString
* @method createTextStyleFunction
* @param {campo}  string - Name of the field of the feature to use to label.
* @param {col} string - color to use for the label
* @return OL3 style with text style
*/
var lib_openLayersLabelUtilities_createTextStyleFunction = function(campo, col) {
	  return function(feature, color) {
		  var estilo=new ol.style.Style({
				image: new ol.style.Circle({
			        radius: 3,
			        fill: new ol.style.Fill({
			          color: '#0000ff'
			        })
			      }), 
			    stroke: new ol.style.Stroke({
			          color: '#80ff00',
			          width: 2
			        }),
			    fill: new ol.style.Fill({
			            color: '#ff6666'
			          }),
	      		text: createTextStyle(feature, campo, col)
		  });
	    return [estilo];
	  }
	};
	
	
