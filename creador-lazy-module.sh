#!/bin/bash
nombre_modulo=$1
ruta_modulo=$2
ng g m modules/$nombre_modulo --route $ruta_modulo --module app
mkdir -p src/app/modules/$nombre_modulo/components
ng g s modules/$nombre_modulo/services/$nombre_modulo

# Ejemplo:
# Se debe posicionar en la raiz del proyecto (a nivel del angular.json) y ejecutar lo siguiente:
# ./creador-lazy-module.sh nombre-del-modulo ruta-del-modulo
# Por ultimo se deben corregir los imports generados en el module y el module-routing creado
