/**
 * Created on 25 feb. 2017
 * @author: Gaspar Mora-Navarro
 * Department of Cartographic Engineering Geodesy and Photogrammetry
 * Higher Technical School of Geodetic, Cartographic and Topographical Engineering
 * joamona@cgf.upv.es
 */

/**
 * Configures the map interaction selected on the right menu
 */

/**
 * This function is called from the initialization function inicializa (File inicializar.js).
 * Creates the map interactions
 * @method add_interactions
 * @return none
 * */
function add_interactions(){
	add_select(opera_seleccion);//creates the map selection interaction and establishes the function which will manage
			//the map selections. opera_seleccion is in the file manage_map_selection.js 
	add_modify();//creates the modify interaction (map_modify.js)
	add_draws();//creates the draws interaction (map_draw.js)
	add_snap_pozos();//creates the snap interaction to the pozos layer. File: map_snap.js	
	add_snap_tubos();////creates the snap interaction to the tubos layer File: map_snap.js	
}
/**
 * Disables all the map interactions
 * @method disable_interactions
 * @return none
 * */
function disable_interactions(){
	disable_select();
	disable_draws();
	disable_snap_pozos();
	disable_snap_tubos();
	disable_modify();
}
/**
 * Configures the select interaction. This function is called on click in the radio button seleccionar.
 * @method disable_interactions
 * @return none
 * */
function configura_seleccionar(){
	disable_interactions();
	document.getElementById('tipo_geom').style.display = "none";
	enable_select();
}

/**
 * Configures the modify interaction. This function is called on click in the radio button modificar.
 * @method configura_modificar
 * @return none
 * */
function configura_modificar(){
	disable_interactions();
	document.getElementById('tipo_geom').style.display = "none";
	enable_select();//Initializes the map selection
	enable_modify();
	enable_snap_pozos();//File: map_snap_pozos.js	
	enable_snap_tubos();//File: map_snap_pozos.js	
}
/**
 * Configures the draw interaction and initializes it to draw points. 
 * This function is called on click in the radio button dibujar.
 * @method configura_dibujar
 * @return none
 * */
function configura_dibujar(){
	disable_interactions();
	document.getElementById('tipo_geom').style.display = "block";
	document.getElementById('radio_tipo_geom_point').checked = true;
	enable_draw_points();//File: map_draw.js
	enable_snap_pozos();//File: map_snap_pozos.js	
	enable_snap_tubos();//File: map_snap_pozos.js	
}
/**
 * Configures the draw interaction and initializes it to draw LineString. 
 * This function is called on click in the radio button Polilíneas.
 * @method configura_dibujar_tubo
 * @return none
 * */
function configura_dibujar_tubo(){
	disable_interactions();
	document.getElementById('tipo_geom').style.display = "block";
	enable_draw_lines();//File: map_draw.js
	enable_snap_pozos();//File: map_snap_pozos.js	
	enable_snap_tubos();//File: map_snap_pozos.js	
}
/*******UNUSED CODE*********/
function cambia_geom_linestring(){
	disable_interactions();
	enable_draw_lines('LineString');//File: map_draw.js
	add_snap_pozos();//File: map_snap_pozos.js	
	add_snap_tubos();//File: map_snap_pozos.js	
}
function cambia_geom_polygon(){
	disable_interactions();
	enable_draw_polygons();//File: map_draw.js
	enable_snap_pozos();//File: map_snap_pozos.js	
	enable_snap_tubos();//File: map_snap_pozos.js	
}
