/**
 * Module for draw
 */


/**
* Adds the map draw interaction
* @method add_draws
* adds draw point, line and polygon interactions
* @return none
*/
function map_mapInteractions_mapDraw_addDrawPolygon() {
/*Possible values for tipo_geom:
 * 		"Point","LineString","Polygon"
 * */
	//MAP_DRAW_POINT = new ol.interaction.Draw({
    //    source: SOURCE_DRAW,
    //    type: /** @type {ol.geom.GeometryType} */ ('Point')
    //  });
    //  MAP.addInteraction(MAP_DRAW_POINT);
  	//MAP_DRAW_LINE = new ol.interaction.Draw({
    //    source: SOURCE_DRAW,
    //    type: /** @type {ol.geom.GeometryType} */ ('LineString')
    //  });
    //  MAP.addInteraction(MAP_DRAW_LINE);
	var buildingsLayerObject=lib_openLayersUtilities_getLayerObjectByTitle(MAP,'Provincia');
	var buildingsSource=buildingsLayerObject.getSource();
	MAP_DRAW_POLYGON = new ol.interaction.Draw({
        source: buildingsSource,
        type: /** @type {ol.geom.GeometryType} */ ('Multipolygon')
      });
    MAP.addInteraction(MAP_DRAW_POLYGON);
    general_updateMessage('{"ok":"true","message":"Polygon draw interaction added"}');
}

/**
* Enables only polygons draw interaction
* @method enable_draw_points
* @return none
*/
function map_mapInteractions_mapDraw_enableDrawPolygons(){
	buildings_refresh('{"ok":"true","message":"Refreshing the map"}')
	map_mapInteractions_mapSelect_disableSelect();
	document.getElementById("provincia");
	MAP_DRAW_POLYGON.setActive(true);
    general_updateMessage('{"ok":"true","message":"Polygon draw interaction enabled"}');
}

/**
* Disable draw polygons interaction
* @method disable_draw_points
* @return none
*/
function map_mapInteractions_mapDraw_disableDrawPolygons(){
	MAP_DRAW_POLYGON.setActive(false);
    general_updateMessage('{"ok":"true","message":"Polygon draw interaction disabled"}');
}

function map_mapInteractions_mapDraw_enableOnDrawEndBuilding(){
	general_updateMessage('{"ok":"true","message":"On draw end event enabled"}');
	MAP_DRAW_POLYGON.on('drawend', map_mapInteractions_mapDraw_onDrawEndBuilding);	
}

function map_mapInteractions_mapDraw_onDrawEndBuilding(e){
	var elemento=e.feature;
	elemento.setId('temp_polygon');
	var coords=elemento.getGeometry().getCoordinates().toString();
	var form = document.getElementById('provincia');
	form.reset();
	var geom = form.elements["geom"].value=coords;
	map_mapInteractions_mapDraw_disableDrawPolygons();
	main_showMapForms(true);
	lib_jsForms_hideAllFormsInDivExceptOne('divMapShowForms', 'provincia');
}
