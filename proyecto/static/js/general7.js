/**
* Change the message showed in the p_message element
* @method update_message
* @param {obj} obj_resp_json - object which have to has two properties: ok and mensaje.
* 		ok can be true or false.
* @return none
*/
function general_updateMessage(resp_json){
	var obj_resp_json=$.parseJSON(resp_json);
	var obj_div=document.getElementById('div_message');
	var obj_p = document.getElementById('p_message');
	var cont;
	
	if (obj_resp_json.ok=='true') {
		cont='<strong>Successfully!</strong> ' + obj_resp_json.message;
		obj_div.style.background='LightGreen ';
	}else{
		cont='<strong>Problem!</strong> ' + obj_resp_json.message;
		obj_div.style.background='LightCoral ';
	}
	obj_p.innerHTML=cont;
	if (JAVASCRIPT_DEBUG_MODE){
		console.log(obj_resp_json.message);
	}
	
}