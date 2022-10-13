# -*- coding: utf-8 -*-
'''
Created on 16 Feb 2018
@author: Gaspar Mora-Navarro
Department of Cartographic Engineering Geodesy and Photogrammetry
Higher Technical School of Geodetic, Cartographic and Topographical Engineering
@email: joamona@cgf.upv.es
'''
#Possible values: 
# 1: DEVELOP FLASK
# 2: TEST PRODUCTION. APACHE IN LOCALHOST
# 3: Redirection from localhost host ports to localhost guest ports
# 4: PRODUCTION IN A REMOTE SERVER
MODE=5

PYTHON_DEBUG_MODE=None
JAVASCRIPT_DEBUG_MODE=None
URL_APP=None #app url
URL_STATIC=None #url for the static folder
URL_WMS_GEOSERVER_SERVICE=None
URL_WFS_GEOSERVER_SERVICE=None

DATABASE=None
HOST=None
PORT=None
USER=None
PASSWORD=None

dSettings=None

#Develop mode with Flask server
if MODE==1:
    PYTHON_DEBUG_MODE=True
    JAVASCRIPT_DEBUG_MODE='true'
    URL_APP='http://localhost:5000/' #app url
    URL_STATIC='http://localhost:5000/static/' #url for the static folder
    URL_WMS_GEOSERVER_SERVICE='http://localhost:8080/geoserver/wms/'
    URL_WFS_GEOSERVER_SERVICE='http://localhost:8080/geoserver/wfs/'
    
    DATABASE='buildings'
    HOST='localhost'
    PORT=5432
    USER='postgres'
    PASSWORD='postgres'

#Production mode mode with Apache server in local. To check the app before upload it to the server
if MODE==2:   
    PYTHON_DEBUG_MODE=False
    JAVASCRIPT_DEBUG_MODE='false'
    URL_APP='http://localhost/flask_building/' #app url
    URL_STATIC='http://localhost/flask_building_static/' #url for the static folder
    URL_WMS_GEOSERVER_SERVICE='http://localhost:8080/geoserver/wms/'
    URL_WFS_GEOSERVER_SERVICE='http://localhost:8080/geoserver/wfs/'
    
    DATABASE='desweb'
    HOST='localhost'
    PORT=5432
    USER='postgres'
    PASSWORD='postgres'
    
#Redirection from host to virtual machine
if MODE==3: 
    PYTHON_DEBUG_MODE=True
    JAVASCRIPT_DEBUG_MODE='true'
    URL_APP='http://localhost:2080/flask_building/' #app url
    URL_STATIC='http://localhost:2080/flask_building_static/' #url for the static folder
    URL_WMS_GEOSERVER_SERVICE='http://localhost:8181/geoserver/wms/'
    URL_WFS_GEOSERVER_SERVICE='http://localhost:8181/geoserver/wfs/'
    
    DATABASE='desweb'
    HOST='localhost'
    PORT=5432
    USER='postgres'
    PASSWORD='postgres'

#Production mode mode
if MODE==4: 
    PYTHON_DEBUG_MODE=False
    JAVASCRIPT_DEBUG_MODE='false'
    URL_APP='http://yourServerAddress/flask_building/' #app url
    URL_STATIC='http://yourServerAddress/flask_building_static/' #url for the static folder
    URL_WMS_GEOSERVER_SERVICE='http://yourServerAddress:8080/geoserver/wms/'
    URL_WFS_GEOSERVER_SERVICE='http://yourServerAddress:8080/geoserver/wfs/'
    
    DATABASE='databaseName'
    HOST='localhost'
    PORT=5432
    USER='secretUser'
    PASSWORD='secretPassword'

if MODE==5:
    PYTHON_DEBUG_MODE=True
    JAVASCRIPT_DEBUG_MODE='true'
    URL_APP='http://localhost:5000/' #app url
    URL_STATIC='http://localhost:5000/static/' #url for the static folder
    URL_WMS_GEOSERVER_SERVICE='http://localhost:8080/geoserver/wms/'
    URL_WFS_GEOSERVER_SERVICE='http://localhost:8080/geoserver/wfs/'
    
    DATABASE='postgres'
    HOST='localhost'
    PORT=5432
    USER='postgres'
    PASSWORD='postgres'
    
dSettings={
        'PYTHON_DEBUG_MODE':PYTHON_DEBUG_MODE,
        'URL_APP':URL_APP,
        'URL_STATIC':URL_STATIC, 
        'JAVASCRIPT_DEBUG_MODE': JAVASCRIPT_DEBUG_MODE,
        'URL_WMS_GEOSERVER_SERVICE': URL_WMS_GEOSERVER_SERVICE,
        'URL_WFS_GEOSERVER_SERVICE':URL_WFS_GEOSERVER_SERVICE
       }