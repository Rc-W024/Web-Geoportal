/**
 * Created on 25 feb. 2017
 * @author: Gaspar Mora-Navarro
 * Department of Cartographic Engineering Geodesy and Photogrammetry
 * Higher Technical School of Geodetic, Cartographic and Topographical Engineering
 * joamona@cgf.upv.es
 */

/**
* Adds the snap interaction to the layer pozos
* @method add_snap_pozos
* @return none
*/
function add_snap_pozos(){
	SNAP_POZOS = new ol.interaction.Snap({
		  source: CAPA_WFS_POZOS.getSource()
		});
		MAP.addInteraction(SNAP_POZOS);
}
/**
* Adds the snap interaction to the layer tubos
* @method add_snap_tubo
* @return none
*/
function add_snap_tubos(){
	SNAP_TUBOS = new ol.interaction.Snap({
		  source: CAPA_WFS_TUBOS.getSource()
		});
		MAP.addInteraction(SNAP_TUBOS);
}
/**
* Disables the snap interaction to the layer pozos
* @method disable_snap_pozos
* @return none
*/
function disable_snap_pozos(){
	SNAP_POZOS.setActive(false);
}
/**
* Disables the snap interaction to the layer tubos
* @method disable_snap_tubos
* @return none
*/
function disable_snap_tubos(){
	SNAP_TUBOS.setActive(false);
}
/**
* Enables the snap interaction to the layer pozos
* @method enable_snap_pozos
* @return none
*/
function enable_snap_pozos(){
	SNAP_POZOS.setActive(true);
}
/**
* Enables the snap interaction to the layer tubos
* @method enable_snap_pozos
* @return none
*/
function enable_snap_tubos(){
	SNAP_TUBOS.setActive(true);
}