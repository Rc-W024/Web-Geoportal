
/**
* Returns the map layer object with the natitle gave in the creation of the layer.
* In the example next expample "Pozos"
*    CAPA_WFS_POZOS = new ol.layer.Vector({
      source: vs_pozos,
      title: "Pozos",
      style: createTextStyleFunction('z_tapa','blue')
   });
* Valid for Openlayers 4.6.5
* @method lib_openLayersUtilities_getLayerObjectByTitle
* @param {mapa} ol.map - The map object
* @param {titulo_capa} string - The title of the layer
* @returns The layer object
*/
function lib_openLayersUtilities_getLayerObjectByTitle(mapa,titulo_capa){
	//Devuelve el objeto capa que coincide con el título de la capa
	var capas = lib_openLayersUtilities_getLayersList(mapa);
	for (var i = 0, len = capas.length; i < len; i++) {
		  var capa=capas[i];
		  if (capa.N.title==titulo_capa){
			  return capa;
		  }
	}
}

/**
 * Returns all layers of the map
 * @method lib_openLayersUtilities_getLayersList
 * @param {mapa} - The map object
 * @returns A list with all the layers
 */
function lib_openLayersUtilities_getLayersList(mapa) {
	//devuelve todas las capas del mapa
	var allLayers = [];
	var mapLayers = mapa.getLayers().getArray();
	
	mapLayers.forEach(function (layer, i) {
	    if (layer instanceof ol.layer.Group) {
	        layer.getLayers().getArray().forEach(function(sublayer, j, layers) {
	            allLayers.push(sublayer);
	        })
	    } else if ( !(layer instanceof ol.layer.Group)) {
	            allLayers.push(layer);
	    }
	});
	
	return allLayers;
}

/**
* Clear a WFS vector layer. Then the vector layer is reloaded
* @method reload_layer
* @param {objLayer} ol.layer.Vector - object wich represents a OL3 vector layer
* @return none
*/
function lib_openLayersUtilities_reloadVectorLayer(map, objLayer){
	objLayer.getSource();//recarga una capa wfs
}

function lib_openLayersUtilities_reloadVectorLayerByTitle(map, layerTitle){
	//recarga una capa wfs
	var objLayer=lib_openLayersUtilities_getLayerObjectByTitle(map,layerTitle);
	lib_openLayersUtilities_reloadVectorLayer(map, objLayer);
}


function lib_openLayersUtilities_reloadWMSLayer(objLayer){
	var params = objLayer.getSource().getParams();
	objLayer.getSource().updateParams(params);
}

function lib_openLayersUtilities_reloadWMSLayerByTitle(map, layerTitle){
	//recarga una capa wfs
	var objLayer=lib_openLayersUtilities_getLayerObjectByTitle(map,layerTitle);
	lib_openLayersUtilities_reloadWMSLayer(objLayer);
}

/**
* Reloads the WFS layers and clear the selection
* @method recargar_mapa
* @return none
*/
function clearSelection(map, mapSelect){
	//clear the selection
	var features = mapSelect.getFeatures();
	features.clear();
}


function selectElementByAttribute(objLayer, attributeName,attributeValue){
	for(var f=0;f<objLayer.features.length;f++) {
		  if(objLayer.features[f].attributes.someAttribute == 'desiredValue') {
		    selectFeatureControl.select(layer.features[f]);
		    return layer.features[f];
		  }
		}
}

/*Unfinished function*/
function selectElementByAttribute(objLayer, attributeName,attributeValue){

}