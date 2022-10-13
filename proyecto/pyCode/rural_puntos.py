#-*- coding: utf-8 -*-
'''
Created on 17 de may. de 2019

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


def ru_insert(js_ru):
    js_ru=json.loads(js_ru)
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    pol='MULTIPOINT({0})'.format(js_ru['geom'])
    cur.execute("insert into rural_puntos (geom ,class, id, name) values (st_geomfromtext(%s,4326),%s,%s,%s)",(pol, js_ru['class'], js_ru['id'], js_ru['name']))
    con.commit()
    resp_json=json.dumps({"tableName": "rural_puntos","ok":'true', 'data':js_ru, 'message':'Insertar datos'})
    print 'building_insert: ' + resp_json
    
    return resp_json
    
def ru_select(js_ru,list=[]):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    a='SELECT array_to_json(array_agg(b)) FROM (select {select} from rural_puntos as a {cond_where} limit 100) as b;'.format(select=js_ru['select'],cond_where=js_ru['cond_where'])
    if js_ru['cond_where'] == '':
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
    resp_json=json.dumps({"tableName": "rural_puntos","ok":'True','message':'Seleccionar datos','data':js_ru})
    return resp_json

def ru_select1(gid):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    table_name='rural_puntos'
    string_fields_to_select='gid, st_asgeojson(geom), class, id, name'
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

def ru_select2(nomcampo, valorcampo):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    table_name='rural_puntos'
    string_fields_to_select='gid, geom, class, id, name'
    cond_where='where '+nomcampo+'=%s'
    list_val_cond_where=[valorcampo]
    r=pg_operations2.pg_select2(con, table_name, string_fields_to_select, cond_where, list_val_cond_where)
    if r==None :
        resp_json=json.dumps({"tableName":"rural_puntos","ok":"false",'message':'Error'})
    else :
        resp_json=json.dumps({"tableName":"rural_puntos","ok":"true",'message':'Seleccionar datos'})
    return resp_json
                              

def ru_update(field,list_field,values,cond_where=None,list_values=None):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    cons = 'update rural_puntos set ({field}) = ({values})'.format(field=field,values=values)
    if cond_where == None:
        cur.execute(cons,list_values)
    else:
        cons += ' ' + cond_where
        cur.execute(cons,list_field + list_values)
    con.commit()
    return cur.rowcount

def ru_delete(js_ru,where=False,list=[]):
    con = psycopg2.connect(dbname='postgres',user='postgres',password='postgres',host='localhost',port=5432)
    cur = con.cursor()
    if where == True:
        cur.execute("delete from rural_puntos "+js_ru['cond_where'],list)
    else:
        cur.execute("delete from rural_puntos")
    con.commit()
    resp_json=json.dumps({"tableName":"rural_puntos","ok":"true",'message':'Emilinar los datos'})
    return resp_json