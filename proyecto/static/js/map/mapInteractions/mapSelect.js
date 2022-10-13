
/*
 Module wich manage the element selection
 */

/**
* Adds select interaction to the map. 
* 	YOU HAVE TO DO THIS ONLY ONCE. 
* 	LATER YOU CAN ENABLE OR DISABLE DE SELECTION INTEREACTION WITH THE OTHER FUNCTIONS 
* 	IN THIS FILE
* The select interaction is saved in a global variable
* @method add_select
* @param {manageSelectionFunctionName} - the function which will manage each map selection.
* 		The function have to receive a parameter. The parameter is given by OL3.5 and is the
* 		event selection object. Inside there is the coordinates clicked, and a vector of elements
* 		selected. In this program the function which manage the selections
* @return none
*/
function map_mapInteractions_mapSelect_addSelect(manageSelectionFunctionName){
	MAP_SELECT = new ol.interaction.Select();
	MAP.addInteraction(MAP_SELECT);
	MAP_SELECT.on('select', manageSelectionFunctionName);
	general_updateMessage('{"ok":"true","message":"Select interaction added"}');
}

/**
* Enables the select interaction from the map
* @method map_mapInteractions_mapSelect_enableSelect
* @return none
*/
function map_mapInteractions_mapSelect_enableSelect(){
	document.getElementById("provincia").reset();
	map_mapInteractions_mapDraw_disableDrawPolygons();
	MAP_SELECT.setActive(true);
	general_updateMessage('{"ok":"true","message":"Select interaction enabled"}');
	
}

/**
* Disables the select interaction from the map
* @method map_mapInteractions_mapSelect_disableSelect
* @return none
*/
function map_mapInteractions_mapSelect_disableSelect(){
	MAP_SELECT.setActive(false);
	general_updateMessage('{"ok":"true","message":"Select interaction disabled"}');
}

/*******************/

/**
 * That function is automatically called each time that a selection is done in the map.
 * Manages the object event selection. The selection can be done in any layer of the map, so that
 * it is necessary to check some properties in order to know what has been selected.
 * The selection can be multiple, pressing the shift key, but this function only uses the first element
 * selected.
 * @method map_mapInteractions_mapSelect_manageMapSelection
 * @param {e} event object - object which have some properties. One of them is the list of object selected 
 * @return none
 **/
function map_mapInteractions_mapSelect_manageMapSelection(e){
	//This function will be executed each time that there was a map selection
	//e is the event selection. Inside are the coordinate picked and the elements selected 
	var selectedFeatures = e.target.getFeatures();
	var elemento=selectedFeatures.item(0);//get only the first element selected
	var coords;
	if (elemento!=undefined){
		//if there is element
		var id,gid,capa, coords;
		id=elemento.getId();//'pozos.12' or 'tubosaneamiento.12' -->table.gid
		if (id==undefined){
			//If it is a new drawed element does not has id
			COORDS_ELTO_SEL=elemento.getGeometry().getCoordinates().toString();//list of coordinates of the element
			//alert ('coords');
			lib_jsForms_hideAllFormsInDiv("divMapShowFormsPanelContainer");
		    general_updateMessage('{"ok":"false","message":"This element does not have gid because is new"}');
			return;
		}
		capa=id.split(".")[0];//table name
		gid=id.split(".")[1];//gid value
		coords=elemento.getGeometry().getCoordinates().toString();//list of coordinates of the element
		COORDS_ELTO_SEL=coords;//the list of coordinates is saved in a global variable
		switch(capa) {
			//executes a function depending of the layer name
		    case "provincia":
		    	map_mapInteractions_mapSelect_getBuildingInfo(elemento, gid, coords);
		        break;
		    /* 
		    For other layers
		    
		    case "tubosaneamiento":
		    	opera_tubo_seleccionado(elemento, gid, coords);
		        break;
		    case "edificios":
		        break;
		    */
		}
	}else{
		lib_jsForms_hideAllFormsInDiv("divMapShowFormsPanelContainer");
	    general_updateMessage('{"ok":"false","message":"No element selected"}');		
	}
		
}

/**
 * That function is automatically called from the function map_mapInteractions_mapSelect_manageMapSelection
 *  each time that a building is selected.
 * Hides all the forms except the buildings form. Sends a request to the server, asking the information of the selected building.
 * When the information is retrieved the data is passed to the function buildings_fillFormBuilding
 * @method map_mapInteractions_mapSelect_getBuildingInfo
 * @param {elemento} object - the object which represents a water well. Do not used in the function
 * @param {gid} string - the gid of the water well selected
 * @param {coords} string - List of coordinates of the water well. Do not used in the function
 * @return none
 **/
function map_mapInteractions_mapSelect_getBuildingInfo(elemento, gid, coords){
	//var z_tapa=elemento.get('z_tapa');//This is the way of obtain a attribute value
	//alert("Es un pozo gid: " + gid + " z_tapa: " + z_tapa + " coordenadas: " + coords);
	var data='gid=' + gid + '&table=provincias';
	lib_jsForms_hideAllFormsInDivExceptOne('divMapShowFormsPanelContainer', 'provincia');
	main_showMapForms(true);
	lib_generalUtilities_myAjax('GET',URL_APP + 'pro_select', data, buildings_fillFormBuilding);
}

