# -*- coding: utf-8 -*-
'''
Created on 13 Feb 2018
@author: joamona
'''

import sys
import os
import json


#necessary to be able to import the my_python_libs.pg_operations2 modules
#probably you will need a os.path.dirname() less. Check the content of BASE_DIR before to start
#BASE_DIR has to be /home/desweb/www/apps/desweb
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(BASE_DIR)

print BASE_DIR

from pg_operation2 import pg_operations2
import mySettings

database=mySettings.DATABASE
user=mySettings.USER
password=mySettings.PASSWORD
host=mySettings.HOST
port=mySettings.PORT

def buildingInsert(form_data):
    #json_data='{"gid":"10","descripcion":"Hospital","area":"100","geom":"100,100,200,100,200,200,100,100"}'
    d_form_data=json.loads(form_data)
    
    #elimitate commas and put spaces to the list of coordinates
    print 'Before --> d_form_data["geom]": ' + d_form_data['geom']
    d_form_data['geom']=pg_operations2.transform_coords_ol_to_postgis(coords_geom=d_form_data['geom'])
    print 'After --> d_form_data["geom]": ' + d_form_data['geom']
    
    #database connection
    d_conn=pg_operations2.pg_connect2(database, user, password, host, port)
    
    #getting parameters for pg_sinser2 function
    d2=pg_operations2.dict_to_string_fields_and_vector_values2(d=d_form_data, list_fields_to_remove=['gid'])
    str_field_names=d2['str_field_names']
    list_field_values=d2['list_field_values']
    str_s_values=d2['str_s_values']
    print 'str_field_names: ' + str_field_names
    print 'list_field_values: ' + str(list_field_values)
    print 'str_s_values: ' + str_s_values
    
    #inserting the building
    list_returning=pg_operations2.pg_insert2(d_conn=d_conn, nom_tabla='d.buildings', str_field_names=str_field_names, list_field_values=list_field_values, str_s_values=str_s_values,str_fields_returning='gid')
    new_gid=list_returning[0][0]
    #disconnecting from the database.  DO NOT FORGET
    pg_operations2.pg_disconnect2(d_conn)
    
    #creating a json answer
    resp_json=json.dumps({"tableName": "d.buildings","ok":'true', 'data':d_form_data, 'message':'Building inserted', 'new_gid':new_gid})
    print 'building_insert: ' + resp_json
    
    return resp_json

def buildingSelect(gid):
    d_conn=pg_operations2.pg_connect2(database, user, password, host, port)
    table_name='d.buildings'
    string_fields_to_select='gid, descripcion, area, fecha, st_asgeojson(geom)'
    cond_where='where gid=%s'
    list_val_cond_where=[gid]
    r=pg_operations2.pg_select2(d_conn, table_name, string_fields_to_select, cond_where, list_val_cond_where)
    pg_operations2.pg_disconnect2(d_conn)
    if r==None:
        resp_json=json.dumps({"tableName": "d.buildings","ok":'false', 'data':'', 'message':'The gid {0} does not exist'.format(gid)})
    else:
        resp_json=json.dumps({"tableName": "d.buildings","ok":"true", "data": r, "message":"Row returned succefully"})
    return resp_json

def buildingDelete(form_data):
    d_form_data=json.loads(form_data)
    gid=d_form_data.get('gid','')
    if gid=='':
        resp_json=json.dumps({"ok":'false', 'data':'', 'message':'You have to specify a gid'})
        return resp_json
    d_conn=pg_operations2.pg_connect2(database, user, password, host, port)
    table_name='d.buildings'
    cond_where='where gid=%s'
    list_values_cond_where=[gid]
    num_rows=pg_operations2.pg_delete2(d_conn, table_name, cond_where, list_values_cond_where)
    pg_operations2.pg_disconnect2(d_conn)
    

    resp_json=json.dumps({"tableName": "d.buildings","ok":'true', 'data':'', 'message':'Num of buildings deleted: {0}'.format(num_rows), 'new_gid':''})
    print 'building_delete: ' + resp_json
    return resp_json

def buildingUpdate(form_data):
    #json_data='{"gid":"10","descripcion":"Hospital","area":"100","geom":"100,100,200,100,200,200,100,100"}'
    d_form_data=json.loads(form_data)
    gid=d_form_data.get('gid','')
    if gid=='':
        resp_json=json.dumps({"tableName": "d.buildings","ok":'false', 'data':d_form_data, 'message':'You have to specify the gid in the json form data', 'new_gid':''})
        print 'building_update: ' + resp_json
        return resp_json
        
    #elimitate commas and put spaces to the list of coordinates
    d_form_data['geom']=pg_operations2.transform_coords_ol_to_postgis(coords_geom=d_form_data['geom'])
    #database connection
    d_conn=pg_operations2.pg_connect2(database, user, password, host, port)
    #getting parameters for pg_sinser2 function
    d2=pg_operations2.dict_to_string_fields_and_vector_values2(d=d_form_data, list_fields_to_remove=['gid'])
    table_name='d.buildings'
    str_field_names=d2['str_field_names']
    list_field_values=d2['list_field_values']
    str_s_values=d2['str_s_values']
    print 'str_field_names: ' + str_field_names
    print 'list_field_values: ' + str(list_field_values)
    print 'str_s_values: ' + str_s_values
    
    #inserting the building
    num_rows=pg_operations2.pg_update2(d_conn, table_name, str_field_names, str_s_values, list_field_values, cond_where='where gid=%s', list_values_cond_where=[gid])
    #disconnecting from the database.  DO NOT FORGET
    pg_operations2.pg_disconnect2(d_conn)
    #creating a json answer
    resp_json=json.dumps({"ok":'true', 'data':d_form_data, 'message':'Num of buldings updated: {0}'.format(num_rows), 'new_gid':''})
    print 'building_update: ' + resp_json
    
    return resp_json


    
if __name__=='__main__':
    json_data='{"gid":"10","descripcion":"Hospital","area":"100","geom":"100,100,200,100,200,200,100,100"}'
    buildingInsert(json_data)
