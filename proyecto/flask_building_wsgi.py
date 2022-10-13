# -*- coding: utf-8 -*-
'''
Created on 6 Mar 2018
@author: Gaspar Mora-Navarro
Department of Cartographic Engineering Geodesy and Photogrammetry
Higher Technical School of Geodetic, Cartographic and Topographical Engineering
@email: joamona@cgf.upv.es
'''
import os, sys

APP_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(APP_DIR)

from flask_building7 import app as application