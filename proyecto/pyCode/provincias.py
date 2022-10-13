#-*- coding: utf-8 -*-
'''
Created on 24 de mar. de 2019

@author: desweb
Wu Ruochen
Universidad Politécnica de Valencia
'''

import psycopg2
import psycopg2.extensions
import sys
import os
import json
import pg_operation2
from my_python_libs.pg_operations.pg_connect import pg_connect
from pg_operation2 import pg_operations2
from my_python_libs import pg_operations

psycopg2.extensions.register_type(psycopg2.extensions.UNICODE)
psycopg2.extensions.register_type(psycopg2.extensions.UNICODEARRAY)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
sys.path.append(BASE_DIR)


def pro_insert(js_pro):
    js_pro=json.loads(js_pro)
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    #cur.execute("insert into provincias (geom, area, perimeter, name) values (%s,%s,%s,%s)",(js_pro['geom'], js_pro['area'], js_pro['perimeter'], js_pro['name']))
    pol='MULTIPOLYGON((({0})))'.format(js_pro['geom'])
    cur.execute("insert into provincias (geom, area, perimeter, name) values (st_geomfromtext(%s,4326),%s,%s,%s)",(pol, js_pro['area'], js_pro['perimeter'], js_pro['name']))
    con.commit()
    resp_json=json.dumps({"tableName": "provincias","ok":'true', 'data':js_pro, 'message':'Insertar datos'})
    print 'building_insert: ' + resp_json
    
    return resp_json

def pro_select1(gid):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    table_name='provincias'
    string_fields_to_select='gid, name, area, perimeter, st_asgeojson(geom)'
    cond_where='where gid=%s'
    list_val_cond_where=[gid]
    cons='SELECT array_to_json(array_agg(registros)) FROM (select {string_fields_to_select} from {table_name} as t {cond_where} limit 100) as registros;'.format(string_fields_to_select=string_fields_to_select,table_name=table_name,cond_where=cond_where)      
    print cons

    if cond_where == '':
        cur.execute(cons)
    else:
        cur.execute(cons, list_val_cond_where)
    lista = cur.fetchall()
    r=lista[0][0]
    if r == None:
        return None 
    else:
        if type(r) is str:
            r=json.loads(r)
        return r
    
def pro_select(js_pro,list=[]):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    a='SELECT array_to_json(array_agg(b)) FROM (select {select} from provincias as a {cond_where} limit 100) as b;'.format(select=js_pro['select'],cond_where=js_pro['cond_where'])
    if js_pro['cond_where'] == '':
        cur.execute(a)
    else:
        cur.execute(a, list)
    lista = cur.fetchall()
    r=lista[0][0]
    if r == None:
        return None
    else:
        if type(r) is str:
            r=json.loads(r)
        return r
    con.commit()
    resp_json=json.dumps({"tableName": "provincias","ok":'True','message':'Seleccionar datos','data':js_pro})
    return resp_json

def pro_select2(nomcampo, valorcampo):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    table_name='provincias'
    string_fields_to_select='gid, name, area, perimeter, st_asgeojson(geom)'
    cond_where='where '+nomcampo+'=%s'
    list_val_cond_where=[valorcampo]
    r=pg_operations2.pg_select2(con, table_name, string_fields_to_select, cond_where, list_val_cond_where)
    if r==None :
        resp_json=json.dumps({"tableName":"provincias","ok":"false",'message':'Error'})
    else :
        resp_json=json.dumps({"tableName":"provincias","ok":"true",'message':'Seleccionar datos'})
    return resp_json                            

def pro_update(field,list_field,values,cond_where=None,list_values=None):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    cons = 'update provincias set ({field}) = ({values})'.format(field=field,values=values)
    if cond_where == None:
        cur.execute(cons,list_values)
    else:
        cons += ' ' + cond_where
        cur.execute(cons,list_field + list_values)
    con.commit()
    return cur.rowcount

def pro_delete(js_pro,where=False,list=[]):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    if where == True:
        cur.execute("delete from provincias "+js_pro['cond_where'],list)
    else:
        cur.execute("delete from provincias")
    con.commit()
    resp_json=json.dumps({"tableName":"provincias","ok":"true",'message':'Emilinar los datos'})
    return resp_json