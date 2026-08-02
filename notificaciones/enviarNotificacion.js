// import readline from "readline";
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

const mensaje = {
    token: "e8XePGnb2cXp5dWq_3XmM4:APA91bHfjAbZ3yM2_7lzblew35JdLDcjr2g7S3FZj6qyJCxn8UIu2IQDsz3pQ5PVYXSgXZ6mPDbI995vDEtK4aC-v8iRRGg0H3TTGnJAFZ-yYP59alwNTdk",
    notification: {
        title: "🧪 Prueba directa",
        body: "Si ves esto, Firebase funciona."
    }
};

admin.messaging().send(mensaje)
.then(id => {
    console.log("MENSAJE ID:", id);
})
.catch(err => {
    console.error(err);
});

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

//----------------------------------------------------
// AGENDA DE EVENTOS
//----------------------------------------------------

const agenda = [];


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
// CONSOLA
//----------------------------------------------------
/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto){

    return new Promise(resolve=>{

        rl.question(texto, resolve);

    });

}
*/


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

    return data;

}
/*
try{

    const dispositivos = await obtenerDispositivos();

    console.log("--------------------------------");
    console.log("Dispositivos activos:", dispositivos.length);

const title = await preguntar("Título: ");
const body = await preguntar("Mensaje: ");

console.log("");

    for(const dispositivo of dispositivos){

    console.log(
        "Enviando a:",
        dispositivo.dispositivo_id
    );

    await enviarNotificacion(dispositivo, title, body);

}

    console.log("--------------------------------");

 rl.close();

}catch(e){

    console.error(e);

}
*/



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
// OBTENER PARTIDOS DE UNA JORNADA
//----------------------------------------------------

async function obtenerPartidos(jornadaId){

    const { data, error } = await db
        .from("partidos")
        .select("*")
        .eq("jornada_id", jornadaId)
        .order("fecha_partido",{ ascending:true });

    if(error){
        throw error;
    }

    return data || [];

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

function primerPartidoJornada(lista){

    const ahora = new Date();

    return (lista || [])

        .filter(p => {

            if(!p.fecha_partido) return false;

            const fecha = new Date(p.fecha_partido);

            if(isNaN(fecha)) return false;

            return fecha > ahora;

        })

        .sort((a,b)=>

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
// ENVIAR A UN DISPOSITIVO
//----------------------------------------------------

async function enviarNotificacion(dispositivo, title, body){

    try{

console.log(JSON.stringify({
    token: dispositivo.token_fcm,
    notification: {
        title,
        body
    }
}, null, 2));

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
            badge: "https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/icons/icon-192.png",
            vibrate: [200, 100, 200]
        }
    }

});

console.log("📨 Respuesta Firebase:", respuesta);
console.log("📱 Dispositivo:", dispositivo.dispositivo_id);
console.log("🔑 Token:", dispositivo.token_fcm.substring(0,40) + "...");



        console.log("✅ Enviada:", dispositivo.dispositivo_id);

        return true;

    }catch(e){

    console.error("❌", dispositivo.dispositivo_id);

    console.error(e.code);

    if(e.code==="messaging/registration-token-not-registered"){

        await desactivarDispositivo(dispositivo);

    }

    return false;

}

}

//----------------------------------------------------
// DESACTIVAR DISPOSITIVO
//----------------------------------------------------

async function desactivarDispositivo(dispositivo){

    const { error } = await db
        .from("notificaciones_dispositivos")
        .update({

            activo:false

        })
        .eq("dispositivo_id", dispositivo.dispositivo_id);

    if(error){

        console.error(error);

    }else{

        console.log("🚫 Desactivado:", dispositivo.dispositivo_id);

    }

}



//----------------------------------------------------
// PRUEBA JORNADA
//----------------------------------------------------

try{

    const jornada = await obtenerJornadaActiva();

    if(!jornada){

        console.log("❌ No hay jornada activa.");

    }else{

        console.log("Jornada activa:", jornada.numero);

        const partidos = await obtenerTodosLosPartidos();

        const jornadasPartidos = agruparPorJornada(partidos);

        console.log("");
        console.log("JORNADAS");
        console.log("----------------");

        for(const jornadaId in jornadasPartidos){

            const partidosJornada = jornadasPartidos[jornadaId];

            console.log("");
            console.log("================================");
            console.log("Jornada:", jornadaId);
            console.log("Partidos:", partidosJornada.length);

            const primero = primerPartidoJornada(partidosJornada);

            if(primero){

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

            }else{

                console.log("Sin partidos futuros.");

            }

            for(const partido of partidosJornada){

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

        agenda.forEach(evento=>{

            console.log(
                evento.tipo,
                evento.fecha.toLocaleString()
            );

        });

    }

}catch(e){

    console.error(e);

}




//----------------------------------------------------
// PROGRAMAR AGENDA
//----------------------------------------------------

function programarAgenda(){

    for(const evento of agenda){

        const espera = evento.fecha.getTime() - Date.now();

        if(espera <= 0){

            console.log("⏩ Evento vencido:", evento.tipo);

            continue;

        }

        console.log("⏰ Programado:", evento.tipo);

        setTimeout(async ()=>{

            console.log("");
            console.log("================================");
            console.log("EVENTO:", evento.tipo);
            console.log("================================");

            if(evento.tipo==="aviso_1h"){

               await crearNoticia(

    `🏆 Jornada ${evento.datos.jornada + 1} disponible`,

    "Ya puedes registrar tus pronósticos.\n\n⏰ Recuerda que el registro cierra 10 minutos antes del primer partido."

);

            }




if(evento.tipo==="cierre_registros"){

    await crearNoticia(

    "🔄 Cambio de Jornada",

    `La Jornada ${evento.datos.jornada} ha cerrado.

🏆 Ya puedes registrar tus pronósticos para la Jornada ${evento.datos.jornada + 1}.`

);

}


if(evento.tipo==="inicio_partido"){

    await crearNoticia(

        `⚽ ${evento.datos.local} vs ${evento.datos.visitante}`,

        "¡El partido va a de comenzar!"

    );

}


            console.log("");

        }, espera);

    }

}


programarAgenda();


//----------------------------------------------------
// CREAR NOTICIA
//----------------------------------------------------

async function crearNoticia(titulo, mensaje){

    const { error } = await db
        .from("noticias")
        .insert({

            titulo,
            mensaje,
            activa: true

        });

    if(error){

        console.error(error);

        return;

    }

    console.log("📰 Noticia creada.");

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
        console.log("NUEVA NOTICIA");
        console.log("================================");

        const dispositivos = await obtenerDispositivos();

console.log("Dispositivos activos:", dispositivos.length);
console.log("");

for(const dispositivo of dispositivos){

    console.log("Enviando a:", dispositivo.dispositivo_id);

    await enviarNotificacion(
        dispositivo,
        payload.new.titulo,
        payload.new.mensaje
    );

}
    }

)

.subscribe((estado)=>{

    console.log("Realtime:",estado);

});
