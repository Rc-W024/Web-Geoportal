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

}

window.onload = function() {
	//main_init();
};


function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
