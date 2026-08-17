/*==========================================================
    MOTOR DE PRESENTACIONES — MODO ESTÁTICO
==========================================================*/


/*
============================================================
CONFIGURACIÓN BASE
============================================================
*/

const PRESENTACION = {

    titulo: "JORNADA",

    contenido: "",

    subtitulo: "Liga MX"

};


/*
============================================================
ANIMACIÓN ACTUAL
============================================================
*/

let ANIMACION = null;


/*
============================================================
FONDO
============================================================
*/

let FONDO = "normal";


/*
============================================================
 SELECCIONAR PRESENTACIÓN
============================================================
*/

async function cargarPresentacion(
    configuracion,
    db
) {

    if (!configuracion) {

        console.error(
            "❌ El motor no recibió configuración"
        );

        return false;

    }


    const evento =
        configuracion.evento || "";


    const numero =
        evento.replace(/^J/i, "");


    PRESENTACION.contenido =
        numero;

PRESENTACION.jornada_id =
    configuracion.jornada_id;

    /*
    --------------------------------------------------------
    ASIGNACIÓN ESTÁTICA DE LA SAGA
    --------------------------------------------------------

    J05 → A010
    J06 → A011
    J07 → A012
    J08 → A013
    J09 → A014
    J10 → A015
    J11 → A016
    J12 → A017
    J13 → A018
    J14 → A019
    J15 → A020
    J16 → A021
    J17 → A022

    IMPORTANTE:
    Se conserva "db" en la firma de la función para que
    iniciarSistema() no tenga que cambiar.
    En este motor estático NO se consulta Supabase.
    */

    const animaciones = {

        "5":  "A010",
        "6":  "A011",
        "7":  "A012",
        "8":  "A013",
        "9":  "A014",
        "10": "A015",
        "11": "A016",
        "12": "A017",
        "13": "A018",
        "14": "A019",
        "15": "A020",
        "16": "A021",
        "17": "A022"

    };


    ANIMACION =
        animaciones[numero] || "A018";


    console.log(
        "🎬 Animación ESTÁTICA:",
        evento,
        "→",
        ANIMACION
    );

    /*
    --------------------------------------------------------
    FONDO
    --------------------------------------------------------
    */

    FONDO =
        configuracion.fondo ||
        "normal";


    console.log(
        "🎬 Motor:",
        evento,
        "→",
        ANIMACION
    );


    console.log(
        "🎨 Fondo:",
        FONDO
    );


    return true;

}


/*
============================================================
OBTENER PRESENTACIÓN
============================================================
*/

function obtenerPresentacion() {

    return PRESENTACION;

}


/*
============================================================
OBTENER ANIMACIÓN
============================================================
*/

function obtenerAnimacion() {

    return ANIMACION;

}


/*
============================================================
OBTENER FONDO
============================================================
*/

function obtenerFondo() {

    return FONDO;

}