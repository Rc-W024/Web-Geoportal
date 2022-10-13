function map_mapMain_createOlMap() {
    //crea el mapa y lo devuelve
    var epsg4326;
    //console.log('A punto daser el mapa');

    //Map projection
    var olProjection = new ol.proj.Projection({
        code: 'EPSG:4326',
        // The extent is used to determine zoom level 0. Recommended values for a
        // projection's validity extent can be found at https://epsg.io/.
        extent: [73.4516901481645, 18.163514640563, 134.975474464951, 53.5313636779289],
        //extent2: [108.200462341309, 3.40847730636597, 122.78874206543, 24.5722160339355],
        units: 'degrees'
    });

    ol.proj.addProjection(olProjection); 

    //capa rural
    var buildingsWMS_Rural = new ol.layer.Tile({
        source: new ol.source.TileWMS(({
        	url: 'http://localhost:8080/geoserver/china/wms',
        	params: {"LAYERS": "china:rural_puntos", "VERSION": "1.1.0", "STYLES": "", "TILED": "true"},
        })),
    title: "Rural puntos"
    });
    var vectorSourceBuildings_ru = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return 'http://localhost:8080/geoserver/china/wms' + '?service=WFS&' +
                'version=1.1.0&request=GetFeature&typename=' + 'china:rural_puntos' + '&' +
                'outputFormat=application/json&' +
                'srsname=EPSG:' + EPSGMAPCODE + '&bbox=' + extent.join(',') + ',EPSG:' + EPSGMAPCODE;
            },
            strategy: ol.loadingstrategy.bbox
        });
    
    //capa provincias
    var buildingsWMS = new ol.layer.Tile({
        source: new ol.source.TileWMS(({
        	url: 'http://localhost:8080/geoserver/china/wms',
        	params: {"LAYERS": "china:provincias", "VERSION": "1.1.0", "STYLES": "", "TILED": "true"},
        })),
    title: "Provincia"
    });
    /*
    var vectorSourceBuildings_pro = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent) {
                return 'http://localhost:8080/geoserver/china/wms' + '?service=WFS&' +
                'version=1.1.0&request=GetFeature&typename=' + 'china:provincias' + '&' +
                'outputFormat=application/json&' +
                'srsname=EPSG:' + EPSGMAPCODE + '&bbox=' + extent.join(',') + ',EPSG:' + EPSGMAPCODE;
            },
            strategy: ol.loadingstrategy.bbox
        });

    var wfsLayerBuildings_Provincia = new ol.layer.Vector({
        title: 'WFS_Provincia',
        source: vectorSourceBuildings_pro,
        style: lib_openLayersLabelUtilities_createTextStyleFunction('gid','#B1EDEE')
    });
    */
    //capa lineas
    var buildingsWMS_Lineas = new ol.layer.Tile({
        source: new ol.source.TileWMS(({
        	url: 'http://localhost:8080/geoserver/china/wms',
        	params: {"LAYERS": "china:linea_de_los_nueve_puntos", "VERSION": "1.1.0", "STYLES": "", "TILED": "true"},
        })),
    title: "Lineas"
    });
    
    //Adds the mouse coordinate position to the map
    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: EPSGMAPCODE,
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('map_mouse_position_control'),
        undefinedHTML: 'EPSG:' + EPSGMAPCODE
    });
    
    buildingsWMS_Rural.setVisible(false);
    //wfsLayerBuildings_Provincia.setOpacity(0.5);
    
    MAP = new ol.Map({
        layers: [buildingsWMS_Lineas, buildingsWMS, buildingsWMS_Rural],
        target: 'map',
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [108.10, 31.62],
            zoom: 2
        }),
        controls: [mousePositionControl]
    });

    //Layer swicher definition
    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Leyenda'
    });
    //adds the layer swicher to the map
    MAP.addControl(layerSwitcher);
    console.log('Mapa finalizado');
    
    map_mapMain_addInteractions();
    
}

/*Adds all the interactions, and disables it*/
function map_mapMain_addInteractions(){
	map_mapInteractions_mapSelect_addSelect(map_mapInteractions_mapSelect_manageMapSelection);
	map_mapInteractions_mapSelect_disableSelect();
	map_mapInteractions_mapDraw_addDrawPolygon();
	map_mapInteractions_mapDraw_disableDrawPolygons();
	var buildingSnap=new map_mapInteractions_SnapLayer(MAP,'WFS_Provincia');
	buildingSnap.enableSnap();
	map_mapInteractions_mapDraw_enableOnDrawEndBuilding();
}


/**Refresh the map*/
function map_mapMain_mapRefresh(){
	var json_answer='{"ok":"true","message":"Map updated"}';
	buildings_refresh(json_answer);
}
	