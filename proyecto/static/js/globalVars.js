var MAP; //openlayers map
var EPSGMAPCODE = '4326';
var LOGGED = false; //avoid showing some parts to non authorized users
					//if true, the all the parts are showed
var SOURCE_DRAW;//Temporal layer source, where the new geometries are drawn
var MAP_DRAW_POLYGON; // Draw interaction. Global so we can remove it later
var MAP_SELECT /*Global var to store the selection interaction*/
var COORDS_ELTO_SEL /*The coordinates of the last selected element*/