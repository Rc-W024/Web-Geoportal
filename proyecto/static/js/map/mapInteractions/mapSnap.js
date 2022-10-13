/**
 * adds a snap interaction to a vector layer to a map
 * Example of use:
 * 	s=new Snap(MAP,'WFS Pipes');
 *  s.enable_snap();
 *  s.disable_snap();
*/
class map_mapInteractions_SnapLayer {
	constructor(map, layer_title){
		//constructor
		this.source_layer=undefined;//the source layer 
		this.snap=undefined;//the snap interaction created
		this.map=map;//the map
		this.layer_title=layer_title;//the layer title as 

		var layer_to_add=lib_openLayersUtilities_getLayerObjectByTitle(this.map,this.layer_title);
		this.source_layer=layer_to_add.getSource();
		this.snap = new ol.interaction.Snap({
			source: this.source_layer
		});
		this.map.addInteraction(this.snap);
	}
	enableSnap(){
		this.snap.setActive(true);
	}
	disableSnap(){
		this.snap.setActive(false);
	}
}

