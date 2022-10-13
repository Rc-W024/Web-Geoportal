function buildings_insert(){
	//it will be necessary to check the values of the form before
	//send it to the server
	//var str_json=lib_jsForms_formToJSONString('provincia');
	
	var $form = $("#provincia");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'pro_insert2/', data, general_updateMessage);//insert the record
}

function buildings_refresh(json_answer){
	general_updateMessage(json_answer);
	objJson=$.parseJSON(json_answer);
	if (objJson.ok=='true') {
		lib_openLayersUtilities_reloadWMSLayerByTitle(MAP, 'Provincia')
	}
}

function buildings_update(){
	
	var $form = $("#provincia");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'pro_update/', data, general_updateMessage);
}

function buildings_delete(){
	
	var $form = $("#provincia");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'pro_delete/', data, general_updateMessage);
}	

function buildings_insert_info(){

	var $form = $("#informacion");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'info_insert/', data, general_updateMessage);//insert the record
}
function buildings_update_info(){
	
	var $form = $("#informacion");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'info_update/', data, general_updateMessage);
}

function buildings_delete_info(){
	
	var $form = $("#informacion");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'info_delete/', data, general_updateMessage);
}	

function buildings_insert_ru(){
	
	var $form = $("#rural_puntos");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'ru_insert/', data, general_updateMessage);//insert the record
}
function buildings_update_ru(){
	
	var $form = $("#rural_puntos");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'ru_update/', data, general_updateMessage);
}

function buildings_delete_ru(){
	
	var $form = $("#rural_puntos");
	var obj_json = getFormData($form);
	var str_json=JSON.stringify(obj_json);
	var data='pk_name=gid&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'ru_delete/', data, general_updateMessage);
}	

function buildings_refresh(json_answer){
	general_updateMessage(json_answer);
	objJson=$.parseJSON(json_answer);
	if (objJson.ok=='true') {
		lib_openLayersUtilities_reloadVectorLayerByTitle(MAP, 'Provincia');
		lib_openLayersUtilities_reloadWMSLayerByTitle(MAP, 'Provincia');
		lib_openLayersUtilities_reloadVectorLayerByTitle(MAP, 'Rural puntos');
		lib_openLayersUtilities_reloadWMSLayerByTitle(MAP, 'Rural puntos')
	}
}

function buildings_getBuildingByGid(){
	var form = document.getElementById("formGetBuilding");
	var gid= form.elements["gid"].value;
	var data='gid='+ gid;
	lib_generalUtilities_myAjax('GET', URL_APP + 'pro_select/', data, buildings_fillFormBuilding);
}	

function buildings_getBuildingByGid_info(){
	var form = document.getElementById("formGetBuilding_info");
	var gid= form.elements["id"].value;
	var data='id='+ gid;
	lib_generalUtilities_myAjax('GET', URL_APP + 'info_select/', data, buildings_fillFormBuilding_info);
}

function buildings_getBuildingByGid_ru(){
	var form = document.getElementById("formGetBuilding_ru");
	var gid= form.elements["gid"].value;
	var data='gid='+ gid;
	lib_generalUtilities_myAjax('GET', URL_APP + 'ru_select/', data, buildings_fillFormBuilding_ru);
}

function buildings_getBuildingByName(){
	var form = document.getElementById("divGetBuilding");
	var name= form.elements["name"].value;
	var data='nomcampo=name&valorcampo='+ name;
	lib_myAjax_myAjax('GET', URL_APP + 'pro_select/', data, buildings_fillFormBuilding);
}

function buildings_deleteBuildingByGid(){
	//it will be necessary to check the values of the form before
	//send it to the server
	var str_json=lib_jsForms_formToJSONString('provincia');
	var data='tableName=provincias&form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'pro_delete/', data, general_updateMessage);//insert the record
	var form = document.getElementById("provincia").reset();
}

function buildings_fillFormBuilding(json_answer){
	general_updateMessage(json_answer);
	var objJson=$.parseJSON(json_answer);
	var data=objJson.data;
	var row = data[0];
	lib_jsForms_loadValuesForm('provincia',row);
	lib_jsForms_hideAllFormsInDivExceptOne('divMapShowFormsPanelContainer', 'provincia');
	var mapId='provincia.' + row.gid.toString();
	var buildingsLayerObject=lib_openLayersUtilities_getLayerObjectByTitle(MAP,'Provincia');
	var buildingsSource=buildingsLayerObject.getSource();
	var obj=buildingsSource.getFeatureById(mapId);
	var selected_collection = MAP_SELECT.getFeatures();
	selected_collection.clear();	
	selected_collection.push(obj);
}

function buildings_fillFormBuilding_info(json_answer){
	general_updateMessage(json_answer);
	var objJson=$.parseJSON(json_answer);
	var data=objJson.data;
	var row = data[0];
	lib_jsForms_loadValuesForm('informacion',row);
	lib_jsForms_hideAllFormsInDivExceptOne('divMapShowFormsPanelContainer', 'informacion');
	var mapId='informacion.' + row.gid.toString();
	var buildingsLayerObject=lib_openLayersUtilities_getLayerObjectByTitle(MAP,'Provincia');
	var buildingsSource=buildingsLayerObject.getSource();
	var obj=buildingsSource.getFeatureById(mapId);
	var selected_collection = MAP_SELECT.getFeatures();
	selected_collection.clear();	
	selected_collection.push(obj);
}

function buildings_fillFormBuilding_ru(json_answer){
	general_updateMessage(json_answer);
	var objJson=$.parseJSON(json_answer);
	var data=objJson.data;
	var row = data[0];
	lib_jsForms_loadValuesForm2('rural_puntos',row);
	lib_jsForms_hideAllFormsInDivExceptOne('divMapShowFormsPanelContainer', 'rural_puntos');
	var mapId='rural_puntos.' + row.gid.toString();
	var buildingsLayerObject=lib_openLayersUtilities_getLayerObjectByTitle(MAP,'Rural puntos');
	var buildingsSource=buildingsLayerObject.getSource();
	var obj=buildingsSource.getFeatureById(mapId);
	var selected_collection = MAP_SELECT.getFeatures();
	selected_collection.clear();	
	selected_collection.push(obj);
}