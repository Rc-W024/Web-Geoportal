/**
 * Created on 25 feb. 2017
 * @author: Gaspar Mora-Navarro
 * Department of Cartographic Engineering Geodesy and Photogrammetry
 * Higher Technical School of Geodetic, Cartographic and Topographical Engineering
 * joamona@cgf.upv.es
 */

/*
 Module wich manage the element modification
 */

/**
 * Adds the modify interaction to the map. The interaction is saved a a global variable
 * @method add_modify
 * @return none
 * */
function add_modify(){
	//This function must be called only once
	//It is necessary before have added the select ineraction to the map
	var select;
	
	MAP.getInteractions().forEach(function (interaction) {
		  if(interaction instanceof ol.interaction.Select) {
			  select=interaction;
		  }
	}); 
    MAP_MODIFY = new ol.interaction.Modify({
      features: select.getFeatures()
    });
    MAP.addInteraction(MAP_MODIFY);
}

/**
 * Disables the modify interaction
 * @method disable_modify
 * @return none
 * */
function disable_modify(){

	MAP_MODIFY.setActive(false);
}
/**
 * Enables the modify interaction
 * @method enable_modify
 * @return none
 * */
function enable_modify(){
	MAP_MODIFY.setActive(true);
}