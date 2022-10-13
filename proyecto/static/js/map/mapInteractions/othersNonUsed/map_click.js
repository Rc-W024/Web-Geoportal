/**
 * Created on 25 feb. 2017
 * @author: Gaspar Mora-Navarro
 * Department of Cartographic Engineering Geodesy and Photogrammetry
 * Higher Technical School of Geodetic, Cartographic and Topographical Engineering
 * joamona@cgf.upv.es
 */

/**
* Adds click interaction
* @method add_map_click
* @param {funcion_que_recibe_el_click} - the function which will manage each click.
* 		The function have to receive a parameter. The parameter is given by OL3.5 and is the
* 		event click object. Inside there is the coordinates clicked. 
* 		In this program the function which manage the clicks is captura_coords_click,
* 		at the end of this file.
* @return none
*/
function add_map_click(funcion_que_recibe_el_click){
	//enables the click event
	MAP_CLICK_EVENT=MAP.on("click",funcion_que_recibe_el_click);
}

/**
* Removes the map click interaction
* @method remove_map_click
* @return none
*/
function enable_map_click(){
	MAP_CLICK_EVENT.setActive(true);
}
function disable_map_click(){
	MAP_CLICK_EVENT.setActive(false);
}


/**
* Manage the click event, and shows a message with the coordinates clicked
* @method captura_coords_click
* @param {event} - The click event
* @return none
*/
function captura_coords_click(event) {
	//manage the click elvent
	var coord = event.coordinate;
	alert(String(coord[0]) + ',' + String(coord[1]));
}

