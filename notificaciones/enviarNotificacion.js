import admin from "firebase-admin";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

//----------------------------------------------------
// FIREBASE
//----------------------------------------------------

const serviceAccount = JSON.parse(
    fs.readFileSync("./firebase-adminsdk.json", "utf8")
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log("✅ Firebase Admin conectado");

//----------------------------------------------------
// SUPABASE
//----------------------------------------------------

const SUPABASE_URL =
    "https://ytedqizoetrafbgufslp.supabase.co";

const SUPABASE_SERVICE_KEY =
    "sb_secret_CeM-zdn3EdPdD1PCx2FkLA_zCtDI4K9";

const db = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
);

console.log("✅ Supabase conectado");

//----------------------------------------------------
// MOTOR
//----------------------------------------------------


console.log("");
console.log("================================");
console.log(" Motor de Notificaciones");
console.log("================================");
console.log("");
console.log("Esperando noticias...");

console.log("");
console.log("================================");
console.log("🚀 PRUEBA DE INICIO DE SERVIDOR");
console.log("================================");

await enviarATodosLosDispositivos(
    "🚀 Prueba de inicio de servidor",
    "Si recibes esta notificación, el servidor y Firebase funcionan correctamente."
);


console.log("");

//----------------------------------------------------
// OBTENER DISPOSITIVOS ACTIVOS
//----------------------------------------------------

async function obtenerDispositivos(){

    const { data, error } = await db
        .from("notificaciones_dispositivos")
        .select("*")
        .eq("activo", true);

    if(error){
        throw error;
    }

    return data || [];

}

//----------------------------------------------------
// PRUEBA DE CONEXIÓN
//----------------------------------------------------

try{

    const dispositivos = await obtenerDispositivos();

    console.log("");
    console.log("Dispositivos activos:", dispositivos.length);

}catch(e){

    console.error(e);

}

//----------------------------------------------------
// REALTIME
//----------------------------------------------------

db.channel("noticias_push")

.on(
    "postgres_changes",
    {
        event: "INSERT",
        schema: "public",
        table: "noticias"
    },
    async (payload)=>{

        console.log("");
        console.log("================================");
        console.log("📰 NUEVA NOTICIA");
        console.log("================================");

        console.log(payload.new);

        const resultado = await enviarATodosLosDispositivos(
    payload.new.titulo,
    payload.new.mensaje
);

if(resultado.enviados > 0){

    await marcarNotificacionEnviada(
        payload.new.id
    );

    console.log("✅ Notificación marcada como enviada.");

}else{

    console.log("⚠️ No se marcó como enviada porque ningún dispositivo la recibió.");

}

    }
)

.subscribe((estado)=>{

    console.log("Realtime:", estado);

});

//----------------------------------------------------
// ENVIAR A UN DISPOSITIVO
//----------------------------------------------------

async function enviarNotificacion(dispositivo, title, body){

    try{

        if(!dispositivo.token_fcm){

            console.log("⚠️ Dispositivo sin token:", dispositivo.dispositivo_id);

            return false;

        }

        console.log("📱 Dispositivo:", dispositivo.dispositivo_id);
        console.log("🔑 Token:", dispositivo.token_fcm.substring(0,40) + "...");


console.log("================================");
console.log("MENSAJE A FIREBASE");
console.log("================================");

console.dir({
    token: dispositivo.token_fcm,
    notification: {
        title,
        body
    },
    webpush: {
        notification: {
            title,
            body,
            icon: "/Quiniela-Liga-Mx/icons/icon-192.png",
            badge: "/Quiniela-Liga-Mx/icons/icon-192.png"
        }
    }
}, { depth: null });

        const respuesta = await admin.messaging().send({

    token: dispositivo.token_fcm,

    notification: {
        title,
        body
    },

    webpush: {

        notification: {

            title,
            body,

            icon: "https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/icons/icon-192.png",
            badge: "https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/icons/icon-192.png"

        },

        fcmOptions: {

            link: "https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/"

        }

    }

});
        console.log("📨 Respuesta Firebase:", respuesta);
        console.log("✅ Enviada correctamente.");

        return true;

    }catch(e){

        console.error("❌ Error enviando a:", dispositivo.dispositivo_id);
console.error(e.code || e.message);

if(e.code === "messaging/registration-token-not-registered"){

    await desactivarDispositivo(dispositivo);

}

return false;

    }

}

//----------------------------------------------------
// OBTENER JORNADA ACTIVA
//----------------------------------------------------

async function obtenerJornadaActiva(){

    const { data, error } = await db
        .from("jornadas")
        .select("*")
        .eq("activa", true)
        .maybeSingle();

    if(error){
        throw error;
    }

    return data;

}

//----------------------------------------------------
// DESACTIVAR DISPOSITIVO
//----------------------------------------------------

async function desactivarDispositivo(dispositivo){

    const { error } = await db
        .from("notificaciones_dispositivos")
        .update({
            activo: false
        })
        .eq("dispositivo_id", dispositivo.dispositivo_id);

    if(error){

        console.error("❌ Error desactivando dispositivo:");
        console.error(error);

        return false;

    }

    console.log("🚫 Dispositivo desactivado:", dispositivo.dispositivo_id);

    return true;

}

//----------------------------------------------------
// OBTENER TODOS LOS PARTIDOS
//----------------------------------------------------

async function obtenerTodosLosPartidos(){

    const { data, error } = await db
        .from("partidos")
        .select("*")
        .order("fecha_partido", { ascending: true });

    if(error){
        throw error;
    }

    return data || [];

}


//----------------------------------------------------
// PRIMER PARTIDO DE LA JORNADA
//----------------------------------------------------

function primerPartidoJornada(partidos){

    const ahora = new Date();

    return (partidos || [])

        .filter(partido => {

            if(!partido.fecha_partido){
                return false;
            }

            const fecha = new Date(partido.fecha_partido);

            return !isNaN(fecha) && fecha > ahora;

        })

        .sort((a, b) =>

            new Date(a.fecha_partido) -
            new Date(b.fecha_partido)

        )[0] || null;

}


//----------------------------------------------------
// AGRUPAR PARTIDOS POR JORNADA
//----------------------------------------------------

function agruparPorJornada(partidos){

    const jornadas = {};

    for(const partido of partidos){

        if(!jornadas[partido.jornada_id]){

            jornadas[partido.jornada_id] = [];

        }

        jornadas[partido.jornada_id].push(partido);

    }

    return jornadas;

}



//----------------------------------------------------
// AGENDA DE EVENTOS
//----------------------------------------------------

const agenda = [];
const temporizadores = [];


//----------------------------------------------------
// AGREGAR EVENTO
//----------------------------------------------------

function agregarEvento(tipo, fecha, datos = {}){

    agenda.push({

        tipo,
        fecha,
        datos

    });

}

//----------------------------------------------------
// CONSTRUIR AGENDA
//----------------------------------------------------

async function construirAgenda(){

    agenda.length = 0;

    const jornada = await obtenerJornadaActiva();

    if(!jornada){

        console.log("❌ No hay jornada activa.");
        return;

    }

    console.log("Jornada activa:", jornada.numero);

    const partidos = await obtenerTodosLosPartidos();

    const jornadas = agruparPorJornada(partidos);

    console.log("");
    console.log("JORNADAS");
    console.log("----------------");

    for(const jornadaId in jornadas){

        const lista = jornadas[jornadaId];

        console.log("");
        console.log("================================");
        console.log("Jornada:", jornadaId);
        console.log("Partidos:", lista.length);

        const primero = primerPartidoJornada(lista);

        if(!primero){

            console.log("Sin partidos futuros.");
            continue;

        }

        console.log(
            "Primer partido:",
            primero.local,
            "vs",
            primero.visitante
        );

        const inicio = new Date(primero.fecha_partido);

        const cierre = new Date(inicio);
        cierre.setMinutes(cierre.getMinutes() - 10);

        const aviso = new Date(cierre);
        aviso.setHours(aviso.getHours() - 1);

        console.log("Inicio :", inicio.toLocaleString());
        console.log("Cierre :", cierre.toLocaleString());
        console.log("Aviso  :", aviso.toLocaleString());

        if(jornadaId === jornada.id){

            agregarEvento(
                "aviso_1h",
                aviso,
                {
                    jornada: jornada.numero
                }
            );

            agregarEvento(
                "cierre_registros",
                cierre,
                {
                    jornada: jornada.numero,
                    jornadaId: jornada.id
                }
            );

        }

        for(const partido of lista){

            if(!partido.fecha_partido) continue;

            const fecha = new Date(partido.fecha_partido);

            if(isNaN(fecha)) continue;

            if(fecha <= new Date()) continue;

            agregarEvento(
                "inicio_partido",
                fecha,
                {
                    local: partido.local,
                    visitante: partido.visitante
                }
            );

        }

    }

    console.log("");
    console.log("AGENDA");
    console.log("----------------");

    agenda.sort((a,b)=>a.fecha-b.fecha);

    for(const evento of agenda){

        console.log(
            evento.tipo,
            evento.fecha.toLocaleString()
        );

    }

}


//----------------------------------------------------
// PROGRAMAR AGENDA
//----------------------------------------------------

function programarAgenda(){

    console.log("");
    console.log("PROGRAMANDO EVENTOS");
    console.log("----------------");

    const ahora = new Date();

    for(const evento of agenda){

        const espera = evento.fecha.getTime() - ahora.getTime();

        if(espera <= 0){

            console.log("⏭️ Omitido:", evento.tipo);

            continue;

        }

        console.log(
            "⏰ Programado:",
            evento.tipo,
            "en",
            Math.round(espera / 1000),
            "segundos"
        );

        const timer = setTimeout(async()=>{

    console.log("");
    console.log("================================");
    console.log("⏰ EVENTO");
    console.log("================================");

    console.log(evento.tipo);

    await ejecutarEvento(evento);

}, espera);

temporizadores.push(timer);

    }

}


//----------------------------------------------------
// EJECUTAR EVENTO
//----------------------------------------------------

async function ejecutarEvento(evento){

    switch(evento.tipo){

        case "aviso_1h":

            await crearNoticia(

    "⏰ Falta 1 hora",

    "En una hora inicia la jornada " +
    evento.datos.jornada

);

            break;

        case "cierre_registros":

            await crearNoticia(

    "🔒 Registros cerrados",

    "Ya no es posible registrar nuevos boletos."

);

            break;

        case "inicio_partido":

            await crearNoticia(

    "⚽ Inicia el partido",

    evento.datos.local +
    " vs " +
    evento.datos.visitante

);

            break;

        default:

            console.log("⚠️ Evento desconocido:", evento.tipo);

    }

}


//----------------------------------------------------
// CREAR NOTICIA
//----------------------------------------------------

async function crearNoticia(titulo, mensaje){

    const haceCincoMinutos = new Date(
        Date.now() - (5 * 60 * 1000)
    ).toISOString();

    const { data: existe, error: errorBusqueda } = await db
        .from("noticias")
        .select("id")
        .eq("titulo", titulo)
        .eq("mensaje", mensaje)
        .gte("fecha_publicacion", haceCincoMinutos)
        .limit(1);

    if(errorBusqueda){

        console.error("❌ Error buscando noticia duplicada:");
        console.error(errorBusqueda);

        return false;

    }

    if(existe && existe.length){

        console.log("⚠️ Noticia duplicada. No se creó.");

        return false;

    }

    const { error } = await db
        .from("noticias")
        .insert({

            activa: true,
            titulo,
            mensaje,
            notificacion_enviada: false,
            fecha_publicacion: new Date().toISOString()

        });

    if(error){

        console.error("❌ Error creando noticia:");
        console.error(error);

        return false;

    }

    console.log("📰 Noticia creada:", titulo);

    return true;

}

//----------------------------------------------------
// MARCAR NOTIFICACIÓN ENVIADA
//----------------------------------------------------

async function marcarNotificacionEnviada(id){

    const { error } = await db
        .from("noticias")
        .update({
            notificacion_enviada: true
        })
        .eq("id", id);

    if(error){

        console.error("❌ Error marcando noticia enviada:");
        console.error(error);

        return false;

    }

    return true;

}

//----------------------------------------------------
// ENVIAR A TODOS LOS DISPOSITIVOS
//----------------------------------------------------

async function enviarATodosLosDispositivos(title, body){

    const inicio = Date.now();

    const dispositivos = await obtenerDispositivos();

    let enviados = 0;
    let errores = 0;

    console.log("");
    console.log("================================");
    console.log("📨 ENVÍO DE NOTIFICACIONES");
    console.log("================================");

    console.log("Título:", title);
    console.log("");

    if(dispositivos.length === 0){

        console.log("⚠️ No hay dispositivos registrados.");

        return {
            enviados: 0,
            errores: 0,
            dispositivos: 0
        };

    }

    for(const dispositivo of dispositivos){

        const ok = await enviarNotificacion(
            dispositivo,
            title,
            body
        );

        if(ok){
            enviados++;
        }else{
            errores++;
        }

    }

    console.log("");
    console.log("Dispositivos :", dispositivos.length);
    console.log("✅ Enviadas   :", enviados);
    console.log("❌ Errores    :", errores);
    console.log("⏱ Tiempo     :", Date.now() - inicio, "ms");

    return {

        dispositivos: dispositivos.length,
        enviados,
        errores

    };

}


//----------------------------------------------------
// ARRANQUE
//----------------------------------------------------

try{

    await construirAgenda();

    programarAgenda();

}catch(e){

    console.error(e);

}
