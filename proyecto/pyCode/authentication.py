# -*- coding: utf-8 -*-
'''
Created on 7 May 2018
@author: Gaspar Mora-Navarro
Department of Cartographic Engineering Geodesy and Photogrammetry
Higher Technical School of Geodetic, Cartographic and Topographical Engineering
@email: joamona@cgf.upv.es
'''
import json
import hashlib
from pg_operation2 import pg_operations2
import mySettings

SECRET='as6d541cas5rg4gff2'

class UserAuth():
    """
    Class with three properties to store autentication data
    """
    user=None
    typeUser=None
    isLoggedIn=None

#def login(session, form_data):
def login(session, request):
    """
    Cheks if the user and password exists
    If true stores the user information in the session dictionary
    """
    #gets the html form user data
    form_data=request.form['form_data']
    d_form_data=json.loads(form_data)
    usuario=d_form_data['usuario']
    psw=d_form_data['psw']
    
    #encrypts the passord typed by the user in the html form
    encrPsw=hashlib.sha512(psw).hexdigest()

    d_conn=pg_operations2.pg_connect2(database=mySettings.DATABASE, user=mySettings.USER, password=mySettings.PASSWORD, host=mySettings.HOST, port=mySettings.PORT)
    
    #selects the psw in the database for the user. Is already encrypted
    r=pg_operations2.pg_select2(d_conn, table_name='d.users', string_fields_to_select='typeuser,psw', cond_where='where usuario=%s', list_val_cond_where=[usuario])
    
    if r <> None:
        databaseEncrPsw=r[0]['psw']
        typeUser=r[0]['typeuser']
    
        #check if matches
        if databaseEncrPsw==encrPsw:
            #stores the user information in the session dictionary
            session['usuario']=usuario
            session['authenticated']=SECRET
            session['typeUser']=typeUser
            resp_json=json.dumps({"tableName": "","ok":"true", "data":"", "message":"User {0} logged in".format(usuario), "new_gid":""})
        else:
            resp_json=json.dumps({"tableName": "","ok":"true", "data":"", "message":"Incorrect password".format(usuario), "new_gid":""})            
    else:
        resp_json=json.dumps({"tableName": "","ok":"false", "data":"", "message":"The user {0} does not exits".format(usuario), "new_gid":""})
    
    d_conn['cursor'].close()
    d_conn['conn'].close()
    return resp_json


def isLoggedIn(session):
    """
    Returns true if the user is already logged in. False on the contrary
    """
    if 'authenticated' in session:
        if session['authenticated']==SECRET:
            return True
        else:
            return False
    else:
        return False

def logout(session):
    if isLoggedIn(session):
        session.pop('usuario')
        session.pop('authenticated')
        session.pop('typeUser')   
        resp_json=json.dumps({"tableName": "","ok":"true", "data":"", "message":"User logged out", "new_gid":""})
    else:
        resp_json=json.dumps({"tableName": "","ok":"false", "data":"", "message":"You where not logged in", "new_gid":""})
    return resp_json

def insertUsers():
    d_conn=pg_operations2.pg_connect2(database=mySettings.DATABASE, user=mySettings.USER, password=mySettings.PASSWORD, host=mySettings.HOST, port=mySettings.PORT)
    conn=d_conn['conn']
    cursor=d_conn['cursor']
    q='DROP TABLE IF EXISTS d.users'
    cursor.execute(q) #Deletes the table d.users if exists
    q='create table d.users (gid serial primary key, usuario text, typeuser text, psw text);'
    cursor.execute(q) #creates the table d.users
    
    u1={'usuario':'usu1','typeuser':'editor', 'psw':hashlib.sha512('ps1').hexdigest()}
    u2={'usuario':'usu2','typeuser':'administrator', 'psw':hashlib.sha512('ps2').hexdigest()}
    u3={'usuario':'usu3','typeuser':'consultant', 'psw':hashlib.sha512('ps3').hexdigest()}
    
    lu=[u1,u2,u3]
    for u in lu:
        d_str=pg_operations2.dict_to_string_fields_and_vector_values2(d=u, list_fields_to_remove=None, geom_field_name=None, epsg=None, geometry_type=None, epsg_to_reproject=None)
        r=pg_operations2.pgInsert2(d_conn=d_conn, nom_tabla='d.users', d_str=d_str, str_fields_returning='gid')
        print r
    
    conn.commit()
    cursor.close()
    conn.close()
    print (hashlib.sha512('Hola').hexdigest()) 

#insertUsers()

#print login(session={}, form_data='{"usuario": "usu1", "psw": "ps1"}')
