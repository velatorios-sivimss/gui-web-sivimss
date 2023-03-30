import { HttpResponse } from "@angular/common/http";
import { Modulo, RespuestaHttp } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";

export const dummyMenuResponse:RespuestaHttp<Modulo[]> = {
  "error": false,
  "codigo": 200,
  "mensaje": "Exito",
  "datos": [
    {
      "idTablaMenu": "1",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal",
      "modulos": [
        {
          "idTablaMenu": "11",
          "idTablaPadre": "1",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.5265624081032001",
          "modulos": [
            {
              "idTablaMenu": "21",
              "idTablaPadre": "11",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.6891527927379616",
              "modulos": null
            }
          ]
        },
        {
          "idTablaMenu": "16",
          "idTablaPadre": "1",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.6557575833571679",
          "modulos": null
        }
      ]
    },
    {
      "idTablaMenu": "2",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.9086997415020128",
      "modulos": [
        {
          "idTablaMenu": "12",
          "idTablaPadre": "2",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.7669770100777754",
          "modulos": [
            {
              "idTablaMenu": "22",
              "idTablaPadre": "12",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.9636617507447133",
              "modulos": null
            },
            {
              "idTablaMenu": "23",
              "idTablaPadre": "12",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.7508504062433266",
              "modulos": null
            }
          ]
        },
        {
          "idTablaMenu": "13",
          "idTablaPadre": "2",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.2551978568129222",
          "modulos": null
        },
        {
          "idTablaMenu": "17",
          "idTablaPadre": "2",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.8728553772651175",
          "modulos": null
        },
        {
          "idTablaMenu": "18",
          "idTablaPadre": "2",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.3970041669877285",
          "modulos": null
        }
      ]
    },
    {
      "idTablaMenu": "3",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.3341045904290905",
      "modulos": [
        {
          "idTablaMenu": "14",
          "idTablaPadre": "3",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.9750582845649294",
          "modulos": null
        },
        {
          "idTablaMenu": "15",
          "idTablaPadre": "3",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.10969788311952527",
          "modulos": null
        },
        {
          "idTablaMenu": "19",
          "idTablaPadre": "3",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.36645473387693495",
          "modulos": [
            {
              "idTablaMenu": "24",
              "idTablaPadre": "19",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.8632668097161379",
              "modulos": null
            },
            {
              "idTablaMenu": "25",
              "idTablaPadre": "19",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.06378286058435483",
              "modulos": null
            },
            {
              "idTablaMenu": "26",
              "idTablaPadre": "19",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.7291139045070055",
              "modulos": null
            },
            {
              "idTablaMenu": "27",
              "idTablaPadre": "19",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.454220971515608",
              "modulos": null
            },
            {
              "idTablaMenu": "28",
              "idTablaPadre": "19",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.08376317479066847",
              "modulos": null
            },
            {
              "idTablaMenu": "29",
              "idTablaPadre": "19",
              "idModulo": "1",
              "descIcono": "icono ejemplo",
              "titulo": "Menu Principal 0.05615299014016333",
              "modulos": [
                {
                  "idTablaMenu": "30",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.2435441177743898",
                  "modulos": null
                },
                {
                  "idTablaMenu": "31",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.5253893812423474",
                  "modulos": null
                },
                {
                  "idTablaMenu": "32",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.8963145836222122",
                  "modulos": null
                },
                {
                  "idTablaMenu": "33",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.9054048051176637",
                  "modulos": null
                },
                {
                  "idTablaMenu": "34",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.8380803054553273",
                  "modulos": null
                },
                {
                  "idTablaMenu": "35",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.47418714265729034",
                  "modulos": null
                },
                {
                  "idTablaMenu": "36",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.8566948276541148",
                  "modulos": null
                },
                {
                  "idTablaMenu": "37",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.9034745915825242",
                  "modulos": null
                },
                {
                  "idTablaMenu": "38",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.6361537237057031",
                  "modulos": null
                },
                {
                  "idTablaMenu": "39",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.47034487451458806",
                  "modulos": null
                },
                {
                  "idTablaMenu": "40",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.4432632321894758",
                  "modulos": null
                },
                {
                  "idTablaMenu": "41",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.8052815681372597",
                  "modulos": null
                },
                {
                  "idTablaMenu": "42",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.6966181748515164",
                  "modulos": null
                },
                {
                  "idTablaMenu": "43",
                  "idTablaPadre": "29",
                  "idModulo": "1",
                  "descIcono": "icono ejemplo",
                  "titulo": "Menu Principal 0.06724620057944786",
                  "modulos": null
                }
              ]
            }
          ]
        },
        {
          "idTablaMenu": "20",
          "idTablaPadre": "3",
          "idModulo": "1",
          "descIcono": "icono ejemplo",
          "titulo": "Menu Principal 0.6412611991551344",
          "modulos": null
        }
      ]
    },
    {
      "idTablaMenu": "4",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.44165720645492634",
      "modulos": null
    },
    {
      "idTablaMenu": "5",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.5527319652519487",
      "modulos": null
    },
    {
      "idTablaMenu": "6",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.489712194064364",
      "modulos": null
    },
    {
      "idTablaMenu": "7",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.5528978030689972",
      "modulos": null
    },
    {
      "idTablaMenu": "8",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.44776713237889776",
      "modulos": null
    },
    {
      "idTablaMenu": "9",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.348552668791779",
      "modulos": null
    },
    {
      "idTablaMenu": "10",
      "idTablaPadre": null,
      "idModulo": "1",
      "descIcono": "icono ejemplo",
      "titulo": "Menu Principal 0.2632834457450392",
      "modulos": null
    }
  ]
}
