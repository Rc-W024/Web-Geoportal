# -*- coding: utf-8 -*-
'''
Created on 15 de may. de 2019

@author: desweb
Wu Ruochen
Universidad Politécnica de Valencia
'''

#system imports
import sys
import os
import json

#Third part imports
#Import Flask classes
from flask import Flask, session, redirect, url_for, escape, request, render_template

#basedir is /home/desweb/www/apps/desweb/dw/flask_building
#this allow import things from this location. For example the py package
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)

from pyCode import mySettings, provincias, informacion, rural_puntos, authentication
from pg_operation2 import pg_operations2 #will not work in production mode if do not add BASE_DIR to sys.path
#pg_building contains the functions building_insert and building_select
#pg_building.py is un the /home/desweb/www/apps/desweb/dw/flask_building/py folder
#/home/desweb/www/apps/desweb/dw/flask_building/py is also a package because has the
#empty __init__.py file

"""
To run this app in develop mode
export FLASK_DEBUG=1;export FLASK_APP=china.py;flask run
"""

app = Flask(__name__)

app.secret_key = b'M0fFbLp24gI7DVBvoX//tA=='

@app.route('/cn_help/')
def cn_help():
    return 'This is helpful'

@app.route("/")
def home():
    dSettings=mySettings.dSettings
    
    htmlpage=render_template('base4.html',dSettings=dSettings)
    return htmlpage

@app.route('/pro_insert/', methods=['GET'])
def pro_insert():
    if request.method == 'GET':
        js_pro=request.args.get('gid', '')
        if js_pro=='':
            resp_json=json.dumps({"ok":'false', 'data':'', 'message':'You have to specify a js_pro variable'})
            return resp_json
        else:
            resp_json=provincias.pro_insert(js_pro)
        return resp_json

@app.route('/pro_insert2/', methods=['POST'])
def pro_insert2():
    if request.method == 'POST':
        js_pro=request.form['form_data']
        resp_json=provincias.pro_insert(js_pro)
        return resp_json

@app.route('/pro_select/', methods=['GET'])
def pro_select():
    if request.method == 'GET':
        gid=request.args.get('gid', '')
        if gid=='':
            resp_json=json.dumps({"ok":'false', 'data':'', 'message':'You have to specify a gid'})
            return resp_json
        js=provincias.pro_select1(gid)
        if gid == None:
            resp_json=json.dumps({"tableName": "provincias","ok":'false', 'data':'', 'message':'The gid {0} does not exist'.format(gid)})
        else:
            resp_json=json.dumps({"tableName": "provincias","ok":"true", "data": js, "message":"Row returned succefully"})
        return resp_json

@app.route('/pro_select2/', methods=['GET'])
def pro_select2():
    if request.method == 'GET':
        nomcampo=request.args.get('nomcampo', '')
        valorcampo=request.args.get('valorcampo', '')
        if nomcampo=='' or valorcampo=='':
            resp_json=json.dumps({"ok":'false', 'data':'', 'message':'You have to specify the name'})
            return resp_json
        resp_json=provincias.pro_select2(nomcampo, valorcampo)
        return resp_json
      
@app.route('/pro_update/', methods=['POST'])
def pro_update():
    if request.method == 'POST':
        js=request.form['form_data']
        d=json.loads(js)
        gid=d['gid']
        d2=pg_operations2.dict_to_string_fields_and_vector_values2(d,
                                                           list_fields_to_remove=['gid'],
                                                           geom_field_name='geom',
                                                           epsg='4326',
                                                           geometry_type='multipolygon',
                                                           epsg_to_reproject='4326')

        field=d2['str_field_names']
        list_field=d2['list_field_values']
        values=d2['str_s_values']
        resp_json=provincias.pro_update(field=field,list_field=list_field,values=values,cond_where='where gid=%s',list_values=[gid])
        return resp_json

@app.route('/pro_delete/', methods=['POST'])
def pro_delete():
    if request.method == 'POST':
        js_pro={}
        d=request.form['form_data']
        js=json.loads(d)
        js_pro['gid']=js['gid']
        js_pro['cond_where']="where gid=%s"
        resp_json=provincias.pro_delete(js_pro, where=True, list=[js_pro['gid']])
        return resp_json

@app.route('/info_insert/', methods=['POST'])
def info_insert():
    if request.method == 'POST':
        js_info=request.form['form_data']
        resp_json=informacion.inf_insert(js_info)
        return resp_json

@app.route('/info_select/', methods=['GET'])
def info_select():
    if request.method == 'GET':
        gid=request.args.get('id', '')
        if gid=='':
            resp_json=json.dumps({"ok":'false', 'data':'', 'message':'You have to specify a id'})
            return resp_json
        js=informacion.inf_select1(gid)
        if gid == None:
            resp_json=json.dumps({"tableName": "informacion","ok":'false', 'data':'', 'message':'The id {0} does not exist'.format(id)})
        else:
            resp_json=json.dumps({"tableName": "informacion","ok":"true", "data": js, "message":"Row returned succefully"})
        return resp_json

@app.route('/info_select1/', methods=['GET'])
def info_select1():
    if request.method == 'GET':
        nomcampo=request.args.get('nomcampo', '')
        valorcampo=request.args.get('valorcampo', '')
        if nomcampo=='' or valorcampo=='':
            resp_json=json.dumps({"ok":'false', 'data':'', 'message':'You have to specify the name'})
            return resp_json
        resp_json=informacion.inf_select2(nomcampo, valorcampo)
        return resp_json
      
@app.route('/info_update/', methods=['POST'])
def info_update():
    if request.method == 'POST':
        js=request.form['form_data']
        d=json.loads(js)
        gid=d['id']
        d2=pg_operations2.dict_to_string_fields_and_vector_values2(d,
                                                           list_fields_to_remove=['id'],
                                                           geom_field_name='geom',
                                                           epsg='4326',
                                                           geometry_type='multipolygon',
                                                           epsg_to_reproject='4326')

        field=d2['str_field_names']
        list_field=d2['list_field_values']
        values=d2['str_s_values']
        resp_json=informacion.inf_update(field=field,list_field=list_field,values=values,cond_where='where id=%s',list_values=[gid])
        return resp_json

@app.route('/info_delete/', methods=['POST'])
def info_delete():
    if request.method == 'POST':
        js_info={}
        d=request.form['form_data']
        js=json.loads(d)
        js_info['id']=js['id']
        js_info['cond_where']="where id=%s"
        resp_json=informacion.inf_delete(js_info, where=True, list=[js_info['id']])
        return resp_json

@app.route('/ru_insert/', methods=['POST'])
def ru_insert():
    if request.method == 'POST':
        js_ru=request.form['form_data']
        resp_json=rural_puntos.ru_insert(js_ru)
        return resp_json

@app.route('/ru_select/', methods=['GET'])
def ru_select():
    if request.method == 'GET':
        gid=request.args.get('gid', '')
        if gid=='':
            resp_json=json.dumps({"ok":'false', 'data':'', 'message':'You have to specify a gid'})
            return resp_json
        js=rural_puntos.ru_select1(gid)
        if gid == None:
            resp_json=json.dumps({"tableName": "rural_puntos","ok":'false', 'data':'', 'message':'The gid {0} does not exist'.format(gid)})
        else:
            resp_json=json.dumps({"tableName": "rural_puntos","ok":"true", "data": js, "message":"Row returned succefully"})
        return resp_json

@app.route('/ru_select1/', methods=['GET'])
def ru_select1():
    if request.method == 'GET':
        nomcampo=request.args.get('nomcampo', '')
        valorcampo=request.args.get('valorcampo', '')
        if nomcampo=='' or valorcampo=='':
            resp_json=json.dumps({"ok":'false', 'data':'', 'message':'You have to specify the name'})
            return resp_json
        resp_json=rural_puntos.ru_select2(nomcampo, valorcampo)
        return resp_json
      
@app.route('/ru_update/', methods=['POST'])
def ru_update():
    if request.method == 'POST':
        js=request.form['form_data']
        d=json.loads(js)
        gid=d['gid']
        d2=pg_operations2.dict_to_string_fields_and_vector_values2(d,
                                                           list_fields_to_remove=['gid'],
                                                           geom_field_name='geom',
                                                           epsg='4326',
                                                           geometry_type='multipolygon',
                                                           epsg_to_reproject='4326')

        field=d2['str_field_names']
        list_field=d2['list_field_values']
        values=d2['str_s_values']
        resp_json=rural_puntos.ru_update(field=field,list_field=list_field,values=values,cond_where='where gid=%s',list_values=[gid])
        return resp_json

@app.route('/ru_delete/', methods=['POST'])
def ru_delete():
    if request.method == 'POST':
        js_ru={}
        d=request.form['form_data']
        js=json.loads(d)
        js_ru['gid']=js['gid']
        js_ru['cond_where']="where gid=%s"
        resp_json=rural_puntos.ru_delete(js_ru, where=True, list=[js_ru['gid']])
        return resp_json

@app.route('/cn_login/', methods=['POST'])
def cn_login():
    resp_json=authentication.login(session, request)
    return resp_json

@app.route('/cn_logout/', methods=['GET'])
def cn_logout():
    resp_json=authentication.logout(session)
    return resp_json
    
if __name__ == "__main__":
    app.run(debug=True)