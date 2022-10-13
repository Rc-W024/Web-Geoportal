function main_provincia(){
   document.getElementById("divprovincia").style.display = "block";
   document.getElementById("divinformacion").style.display = "none";
   document.getElementById("divruralpuntos").style.display = "none";
}

function main_informacion(){
   document.getElementById("divprovincia").style.display = "none";
   document.getElementById("divinformacion").style.display = "block";
   document.getElementById("divruralpuntos").style.display = "none";
}

function main_puntorural(){
	   document.getElementById("divprovincia").style.display = "none";
	   document.getElementById("divinformacion").style.display = "none";
	   document.getElementById("divruralpuntos").style.display = "block";
}

function main_hideBoth(){
   document.getElementById("divprovincia").style.display = "none";
   document.getElementById("divinformacion").style.display = "none";
   document.getElementById("divruralpuntos").style.display = "none";
}

function main_showModalLogin(){
	$("#divModalFormLogin").modal()
}

function main_toogleMapForms(){
	$("#divMapShowForms").slideToggle();
}

function main_hideBoth2(){
	   document.getElementById("divGetBuilding").style.display = "none";
	   document.getElementById("divGetBuilding_info").style.display = "none";
	   document.getElementById("divGetBuilding_ru").style.display = "none";
}

/*Show can be true or false*/
function main_showMapForms(show){
	if (show){
		$("#divMapShowForms").slideDown();
	}else{
		$("#divMapShowForms").slideUp();
	}
}

function main_getBuildingInfo(){
	map_mapInteractions_mapSelect_enableSelect();
	main_showMapForms(true);
	lib_jsForms_hideAllFormsInDivExceptOne('divMapShowFormsPanelContainer', 'formGetBuilding');
}

function main_getInfo(){
	map_mapInteractions_mapSelect_enableSelect();
	main_showMapForms(true);
	lib_jsForms_hideAllFormsInDivExceptOne('divMapShowFormsPanelContainer', 'formGetBuilding_info');
}

function main_getruralInfo(){
	map_mapInteractions_mapSelect_enableSelect();
	main_showMapForms(true);
	lib_jsForms_hideAllFormsInDivExceptOne('divMapShowFormsPanelContainer', 'formGetBuilding_ru');
}

function main_editGeometry(){
	var json_answer='{"ok":"false","message":"Functionality not available"}';
	general_updateMessage(json_answer);
}

/*
 * Extracts the informatio from the login form in a json string and calls the building_login view with Ajax
 * */
function cn_login(){
	var str_json=lib_jsForms_formToJSONString('formLogin');
	var data='form_data=' + str_json;
	lib_generalUtilities_myAjax('POST', URL_APP + 'cn_login/', data, general_updateMessage);//insert the record
}

/*
 * Calls the building_logout view with Ajax
 * */
function cn_logout(){
	lib_generalUtilities_myAjax('GET', URL_APP + 'cn_logout/', '', general_updateMessage);//insert the record
}

function main_init(){
	
	document.getElementById("buttonprovincia").addEventListener("click", main_provincia);
	document.getElementById("buttoninformacion").addEventListener("click", main_informacion);
	document.getElementById("buttonruralpuntos").addEventListener("click", main_puntorural);
	main_hideBoth();
	
	//Form buildings click
	document.getElementById('insert_building').addEventListener('click', buildings_insert);
	document.getElementById('update_building').addEventListener('click', buildings_update);
	document.getElementById('delete_building').addEventListener('click', buildings_delete);
	
	document.getElementById('insert_building_info').addEventListener('click', buildings_insert_info);
	document.getElementById('update_building_info').addEventListener('click', buildings_update_info);
	document.getElementById('delete_building_info').addEventListener('click', buildings_delete_info);
	
	document.getElementById('insert_building_ru').addEventListener('click', buildings_insert_ru);
	document.getElementById('update_building_ru').addEventListener('click', buildings_update_ru);
	document.getElementById('delete_building_ru').addEventListener('click', buildings_delete_ru);
	
	document.getElementById('buttonGetBuilding').addEventListener('click', buildings_getBuildingByGid);
	document.getElementById('buttonGetBuilding_info').addEventListener('click', buildings_getBuildingByGid_info);
	document.getElementById('buttonGetBuilding_ru').addEventListener('click', buildings_getBuildingByGid_ru);
	document.getElementById('buttonLogin').addEventListener('click', cn_login);
	document.getElementById('imgLogout').addEventListener('click', cn_logout);
	document.getElementById('imgShowModalLogin').addEventListener('click', main_showModalLogin);
	
	//map buttons click
	document.getElementById('buttonToogleMapForms').addEventListener('click', main_toogleMapForms);
	//document.getElementById('buttonMapDraw').addEventListener('click', map_mapInteractions_mapDraw_enableDrawPolygons);
	document.getElementById('buttonGetBuildingInfo').addEventListener('click', main_getBuildingInfo);
	document.getElementById('buttonGetInfo').addEventListener('click', main_getInfo);
	document.getElementById('buttonGetRuralInfo').addEventListener('click', main_getruralInfo);
	//document.getElementById('buttonDeleteSelectedBuilding').addEventListener('click', buildings_deleteBuildingByGid);
	document.getElementById('buttonRefreshMap').addEventListener('click', map_mapMain_mapRefresh);
	//document.getElementById('buttonEditGeometry').addEventListener('click', main_editGeometry);
	main_hideBoth2()
}


window.onload = function() {
	main_init();
	main_toogleMapForms()
	map_mapMain_createOlMap();
};

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

