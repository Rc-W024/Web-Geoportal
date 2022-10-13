
/**
 * Returns a json with all the inputs of the form
 * geom can be true or false
 * 		if is false then the fieds 'type' and 'coordinates' NOT will be added
 * 		The default is true. If not is passed will be true*/
function lib_jsForms_formToJSONString(id_form, geom) {
	if (geom === undefined) {
        // geom was not passed
		geom=true;
    }
	var form = document.getElementById(id_form);
	var obj = {};
	var elements = form.querySelectorAll( "input, select, textarea" );
	for( var i = 0; i < elements.length; ++i ) {
		var element = elements[i];
		var name = element.name;
		var value = element.value;

		if( name ) {
			if (geom==false){
				if ((name=='coordinates') || (name=='type')){
					//no hace nada
				}else{
					obj[ name ] = value;
				}
			}else{
				obj[ name ] = value;
			}
		}
	}
	return JSON.stringify( obj );
}


/**
 * Returns a string with all the inputs of the form
 * geom can be true or false
 * if is false then the fieds 'type' and 'coordinates' NOT will be added
 * The default is true. If not is passed will be true*/
function lib_jsForms_formToJSONStringFields(id_form, geom) {
	if (geom === undefined) {
        // geom was not passed
		geom=true;
    }
	var form = document.getElementById(id_form);
	var obj = {};
	var elements = form.querySelectorAll( "input, select, textarea" );
	var campos="";
	for( var i = 0; i < elements.length; ++i ) {
		var element = elements[i];
		var name = element.name;

		if( name ) {
			if (geom==false){
				if ((name=='coordinates') || (name=='type')){
					//no hace nada
				}
			}else{
				campos=campos + ", " + name;
			}
		}
	}
	return campos.substring(1);//returns all except the first character. Eliminates the tirs ','
}

/**
* Loads the form whit the data
* @method load_values_form
* @param {str} id_form - string with the id property value of the form
* @param {obj} reccord_obj - object which properties are the values to fill the form.
* 		The property names must match with the id of the input controls of the form.
* 		
* 		If the obj has a geometry has to be in the st_geojson field of the reccord_obj.
* 		This function extract the vector geometry coordinates, transform them into 'x,y,x,y, ...'
* 		and put it into the geom texbox of the form.
* @return none
*/
function lib_jsForms_loadValuesForm(id_form,reccord_obj){
    var form = document.getElementById(id_form);
    $.each(reccord_obj, function( key, val ) {
        if (key=='st_asgeojson'){
            var objGeoJson=$.parseJSON(val);
            var type=objGeoJson.type;
            if (type=="Point"){
                var pt=objGeoJson.coordinates;
                var strCoordinates="" +pt[0].toString() + "," + pt[1].toString();
            }else{
                var coordinates=objGeoJson.coordinates[0];
                var strCoordinates= lib_jsForms_vectorCoordinatesToString(coordinates);
            }
            form.elements.namedItem('geom').value=strCoordinates;
        }
        else{
            form.elements.namedItem(key).value=val;
        }
    });
} 

function lib_jsForms_loadValuesForm2(id_form,reccord_obj){
    var form = document.getElementById(id_form);
    $.each(reccord_obj, function( key, val ) {
        if (key=='st_asgeojson'){
            var objGeoJson=$.parseJSON(val);
            var type=objGeoJson.type;
            if (type=="MultiPoint"){
                var pt=objGeoJson.coordinates;
                var strCoordinates="" +pt[0] + "," + pt[1];
            }else{
                var coordinates=objGeoJson.coordinates[0];
                var strCoordinates= lib_jsForms_vectorCoordinatesToString(coordinates);
            }
            form.elements.namedItem('geom').value=strCoordinates;
        }
        else{
            form.elements.namedItem(key).value=val;
        }
    });
} 


/**
* Hides all the forms in a div
* @method lib_jsForms_hideAllFormsInDiv
* @param {str} divName - string with the id of the div that contains all the forms to hide
* @return none
*/
function lib_jsForms_hideAllFormsInDiv(divName) {
	var selector="#" + divName + " form"
    var objForms= document.querySelectorAll(selector);//selects several
	var objForm;
	var n=objForms.length;
	var i;
    for (i = 0; i < n; i++) {
    	objForm=objForms[i];
    	objForm.parentElement.style.display = 'none';
    }
}

/**
* Hides all the forms in a div, except one
* @method lib_jsForms_hideAllFormsInDivExceptOne
* @param {str} divName - string with the id of the div that contains all the forms
* @param {str} formName - string with the id of the form in the div to show
* @return none
*/
function lib_jsForms_hideAllFormsInDivExceptOne(divName, formName) {
	lib_jsForms_hideAllFormsInDiv(divName);
	var selector="#" + formName;
	var objForm= document.querySelector(selector);//selects only one
	objForm.parentElement.style.display = 'block';
}

