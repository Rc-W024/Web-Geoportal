
/**
* Sends by AJAX a request to the server
* @method mi_ajax
* @param {type} - string. Can be 'POST' or 'GET'. Indicates the method of send of the data to the server
* @param {url} - string. The url where the data will be sent to: 'http://localhost/myapp/'
* @param {data} - string. The data to be sent. 'operacion=insert&pk_name=gid&pk_value=25&...'
* @param {funcion_respuesta} - object. The function that will manage the server answer. This function has to receive
* 			exactly one parameter, that is the data received from the server. The function will be executed
* 			automatically when the answer be received.
* @return none
*/

function lib_myAjax_myAjax(type, url_alias, data, funcion_respuesta){
    $.ajax({
        type: type,
        url: url_alias,
        data: data, // Adjuntar los campos del formulario enviado.
        success: funcion_respuesta
      });
}