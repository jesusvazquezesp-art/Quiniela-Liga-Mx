import admin from "firebase-admin";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

//----------------------------------------------------
// FIREBASE
//----------------------------------------------------

const serviceAccount = JSON.parse(
    fs.readFileSync("./firebase-adminsdk.json","utf8")
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log("✅ Firebase conectado");

//----------------------------------------------------
// SUPABASE
//----------------------------------------------------

const db = createClient(

    "https://ytedqizoetrafbgufslp.supabase.co",

    "sb_secret_CeM-zdn3EdPdD1PCx2FkLA_zCtDI4K9"

);

console.log("✅ Supabase conectado");

console.log("");
console.log("================================");
console.log(" Motor de Notificaciones");
console.log("================================");
console.log("");
console.log("Esperando noticias...");
console.log("");


//----------------------------------------------------
// OBTENER DISPOSITIVOS
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
// ENVIAR A TODOS
//----------------------------------------------------

async function enviarNotificacionATodos(title, body){

    const dispositivos = await obtenerDispositivos();

    console.log("");
    console.log("Dispositivos:", dispositivos.length);
    console.log("");

    for(const dispositivo of dispositivos){

        try{

            await admin.messaging().send({

                token: dispositivo.token_fcm,

                notification:{

                    title,
                    body

                }

            });

            console.log("✅", dispositivo.dispositivo_id);

        }catch(e){

            console.error("❌", dispositivo.dispositivo_id);
            console.error(e.code);

        }

    }

}



//----------------------------------------------------
// REALTIME
//----------------------------------------------------

db.channel("noticias_push")

.on(

    "postgres_changes",

    {

        event: "*",

        schema: "public",

        table: "noticias"

    },

   async (payload) => {

        console.log("");
        console.log("================================");
        console.log("NUEVA NOTICIA");
        console.log("================================");

        await enviarNotificacionATodos(
    payload.new.titulo,
    payload.new.mensaje
);

        console.log("");

    }

)

.subscribe((estado)=>{

    console.log("Realtime:",estado);

});