export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A010 — OVNI DE JUÁREZ

    Noche
    → Estadio JUÁREZ FC
    → Aparece JORNADA
    → OVNI visible
    → Rayo tractor
    → JORNADA asciende
    → ENTRA DENTRO DEL OVNI
    → Desaparece
    → OVNI se aleja al horizonte
    ============================================================
    */

    contenedor.innerHTML = `

        <div class="a010-contenedor">

            <!-- CIELO -->

            <div class="a010-cielo">

                <div class="a010-estrella e1"></div>
                <div class="a010-estrella e2"></div>
                <div class="a010-estrella e3"></div>
                <div class="a010-estrella e4"></div>
                <div class="a010-estrella e5"></div>
                <div class="a010-estrella e6"></div>
                <div class="a010-estrella e7"></div>
                <div class="a010-estrella e8"></div>

            </div>


            <!-- LUNA -->

            <div class="a010-luna"></div>


            <!-- ESTADIO -->

            <div class="a010-estadio">

                <div class="a010-estadio-luces">

                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>

                </div>


                <div class="a010-gradas">

                    <div class="a010-grada-fondo"></div>

                    <div class="a010-grada-frente"></div>

                </div>


                <div class="a010-cancha">

                    <div class="a010-linea-central"></div>

                    <div class="a010-circulo-central"></div>

                </div>


                <div class="a010-estadio-nombre">
                    JUÁREZ FC
                </div>

            </div>


            <!-- PRESENTACIÓN -->

            <div class="a010-presentacion">

                <div class="a010-titulo">
                    JORNADA
                </div>

                <div class="a010-numero">
                    ${numeroJornada}
                </div>

                <div class="a010-subtitulo">
                    Liga MX
                </div>

            </div>


            <!-- OVNI -->

            <div class="a010-ovni">

                <div class="a010-ovni-cuerpo">

                    <div class="a010-ovni-cabina"></div>

                    <div class="a010-ovni-luces">

                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

                </div>


                <!-- RAYO -->

                <div class="a010-rayo-tractor">

                    <div class="a010-rayo-interior"></div>

                </div>

            </div>


            <!-- DESTELLO -->

            <div class="a010-destello"></div>

        </div>

    `;


    // ==========================================================
    // CSS
    // ==========================================================

    const estilo =
        document.createElement("style");


    estilo.textContent = `

        .a010-contenedor {

            position: relative;

            width: 100%;
            height: 100%;

            overflow: hidden;

            background:
                linear-gradient(
                    to bottom,
                    #02040c 0%,
                    #081326 48%,
                    #101b2d 72%,
                    #080b10 100%
                );

            font-family: Arial, sans-serif;

            pointer-events: none;

            box-sizing: border-box;

        }


        /* =====================================================
           CIELO
        ===================================================== */

        .a010-cielo {

            position: absolute;

            inset: 0;

            z-index: 1;

        }


        .a010-estrella {

            position: absolute;

            width: 5px;
            height: 5px;

            border-radius: 50%;

            background: #ffffff;

            box-shadow:
                0 0 8px #ffffff;

            opacity: .8;

        }


        .a010-estrella.e1 {
            left: 10%;
            top: 13%;
        }

        .a010-estrella.e2 {
            left: 23%;
            top: 25%;
        }

        .a010-estrella.e3 {
            left: 37%;
            top: 11%;
        }

        .a010-estrella.e4 {
            left: 52%;
            top: 20%;
        }

        .a010-estrella.e5 {
            left: 69%;
            top: 10%;
        }

        .a010-estrella.e6 {
            left: 82%;
            top: 25%;
        }

        .a010-estrella.e7 {
            left: 91%;
            top: 12%;
        }

        .a010-estrella.e8 {
            left: 61%;
            top: 34%;
        }


        /* =====================================================
           LUNA
        ===================================================== */

        .a010-luna {

            position: absolute;

            width: 95px;
            height: 95px;

            right: 13%;
            top: 11%;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle at 35% 35%,
                    #ffffff,
                    #dfe8f3 55%,
                    #9ca9bb 100%
                );

            box-shadow:
                0 0 35px
                rgba(220,235,255,.35);

            opacity: .75;

            z-index: 2;

        }


        /* =====================================================
           ESTADIO
        ===================================================== */

        .a010-estadio {

            position: absolute;

            left: 50%;
            bottom: 7%;

            width: 820px;
            height: 330px;

            transform:
                translateX(-50%)
                scale(.75);

            opacity: 0;

            z-index: 4;

        }


        .a010-gradas {

            position: absolute;

            left: 50%;
            bottom: 65px;

            width: 760px;
            height: 210px;

            transform:
                translateX(-50%);

            overflow: hidden;

            border-radius:
                45% 45% 5% 5%;

            background:
                linear-gradient(
                    to bottom,
                    #18263a,
                    #0b111c
                );

            border:
                4px solid
                rgba(100,120,145,.5);

            box-shadow:

                0 0 40px
                rgba(80,120,180,.2),

                inset 0 0 40px
                rgba(0,0,0,.8);

        }


        .a010-grada-fondo {

            position: absolute;

            inset: 20px;

            border-radius:
                45% 45% 0 0;

            background:

                repeating-linear-gradient(
                    to bottom,
                    rgba(100,120,150,.3) 0px,
                    rgba(100,120,150,.3) 4px,
                    transparent 4px,
                    transparent 14px
                );

        }


        .a010-grada-frente {

            position: absolute;

            left: 50%;
            bottom: 0;

            width: 680px;
            height: 100px;

            transform:
                translateX(-50%);

            border-radius:
                50% 50% 0 0;

            background:
                linear-gradient(
                    to bottom,
                    #101b2a,
                    #05080d
                );

        }


        /* =====================================================
           LUCES
        ===================================================== */

        .a010-estadio-luces {

            position: absolute;

            left: 50%;
            top: 0;

            width: 720px;

            transform:
                translateX(-50%);

            display: flex;

            justify-content:
                space-between;

            z-index: 5;

        }


        .a010-estadio-luces span {

            width: 13px;
            height: 45px;

            border-radius: 8px;

            background: #ffffff;

            box-shadow:

                0 0 10px #ffffff,

                0 0 25px
                rgba(170,210,255,.8);

        }


        /* =====================================================
           CANCHA
        ===================================================== */

        .a010-cancha {

            position: absolute;

            left: 50%;
            bottom: 0;

            width: 520px;
            height: 110px;

            transform:
                translateX(-50%);

            border-radius:
                50% 50% 0 0;

            background:
                linear-gradient(
                    to bottom,
                    #173b28,
                    #081a10
                );

            border:
                3px solid
                rgba(100,180,120,.35);

            z-index: 7;

        }


        .a010-linea-central {

            position: absolute;

            left: 50%;
            top: 0;

            width: 2px;
            height: 100%;

            background:
                rgba(255,255,255,.5);

        }


        .a010-circulo-central {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 70px;
            height: 35px;

            transform:
                translate(-50%, -50%);

            border:
                2px solid
                rgba(255,255,255,.5);

            border-radius: 50%;

        }


        /* =====================================================
           JUÁREZ FC
        ===================================================== */

        .a010-estadio-nombre {

            position: absolute;

            left: 50%;
            bottom: 88px;

            transform:
                translateX(-50%);

            font-size: 48px;

            font-weight: 900;

            letter-spacing: 8px;

            color: #ffffff;

            text-shadow:

                0 0 10px
                rgba(255,255,255,.9),

                0 0 25px
                rgba(70,160,255,.8),

                0 0 50px
                rgba(30,100,220,.5);

            z-index: 10;

        }


        /* =====================================================
           PRESENTACIÓN
        ===================================================== */

        .a010-presentacion {

            position: absolute;

            left: 50%;
            top: 54%;

            width: 100%;

            transform:
                translate(-50%, -50%)
                scale(.25);

            opacity: 0;

            display: flex;

            flex-direction: column;

            justify-content: center;
            align-items: center;

            text-align: center;

            color: #ffffff;

            z-index: 20;

            text-shadow:

                0 0 12px #ffffff,

                0 0 30px
                rgba(100,180,255,.9),

                0 0 60px
                rgba(60,120,255,.65);

        }


        .a010-titulo {

            font-size: 42px;

            font-weight: bold;

            letter-spacing: 10px;

            margin-bottom: 15px;

        }


        .a010-numero {

            font-size: 300px;

            font-weight: 900;

            line-height: .85;

        }


        .a010-subtitulo {

            margin-top: 20px;

            font-size: 30px;

            color: #ffd54f;

        }


        /* =====================================================
           OVNI
        ===================================================== */

        .a010-ovni {

            position: absolute;

            left: 50%;
            top: 14%;

            width: 430px;
            height: 430px;

            transform:
                translateX(-50%)
                scale(.9);

            opacity: 0;

            z-index: 25;

        }


        .a010-ovni-cuerpo {

            position: absolute;

            left: 50%;
            top: 0;

            width: 360px;
            height: 135px;

            transform:
                translateX(-50%);

            border-radius:
                50% 50% 45% 45%;

            background:

                radial-gradient(
                    ellipse at 50% 30%,
                    #dce9f5 0%,
                    #77899d 35%,
                    #283443 70%,
                    #080d14 100%
                );

            border:
                4px solid
                rgba(210,235,255,.85);

            box-shadow:

                0 0 25px
                rgba(150,210,255,.7),

                0 0 70px
                rgba(70,150,255,.45);

        }


        /* =====================================================
           CABINA
        ===================================================== */

        .a010-ovni-cabina {

            position: absolute;

            left: 50%;
            top: -48px;

            width: 150px;
            height: 80px;

            transform:
                translateX(-50%);

            border-radius:
                50% 50% 40% 40%;

            background:

                radial-gradient(
                    ellipse at center,
                    #effcff,
                    #68a8c5 55%,
                    #17364a 100%
                );

            border:
                3px solid
                rgba(220,245,255,.9);

            box-shadow:

                0 0 25px
                rgba(100,225,255,.85);

        }


        /* =====================================================
           LUCES OVNI
        ===================================================== */

        .a010-ovni-luces {

            position: absolute;

            left: 50%;
            bottom: 12px;

            width: 270px;

            transform:
                translateX(-50%);

            display: flex;

            justify-content:
                space-between;

        }


        .a010-ovni-luces span {

            width: 15px;
            height: 15px;

            border-radius: 50%;

            background:
                #72eaff;

            box-shadow:

                0 0 8px
                #72eaff,

                0 0 22px
                rgba(80,220,255,.9);

        }


        /* =====================================================
           RAYO TRACTOR
        ===================================================== */

        .a010-rayo-tractor {

            position: absolute;

            left: 50%;
            top: 105px;

            width: 360px;
            height: 330px;

            transform:
                translateX(-50%)
                scaleY(.1);

            clip-path:
                polygon(
                    15% 0%,
                    85% 0%,
                    100% 100%,
                    0% 100%
                );

            background:
                linear-gradient(
                    to bottom,
                    rgba(130,250,255,.65),
                    rgba(80,225,255,.30),
                    rgba(70,170,255,.08)
                );

            filter:
                blur(2px);

            opacity: 0;

            transform-origin:
                top center;

            z-index: -1;

        }


        .a010-rayo-interior {

            position: absolute;

            inset: 20px;

            background:
                linear-gradient(
                    to bottom,
                    rgba(235,255,255,.45),
                    rgba(120,240,255,.10)
                );

            clip-path:
                polygon(
                    25% 0%,
                    75% 0%,
                    100% 100%,
                    0% 100%
                );

        }


        /* =====================================================
           DESTELLO
        ===================================================== */

        .a010-destello {

            position: absolute;

            inset: 0;

            background: #ffffff;

            opacity: 0;

            z-index: 50;

        }

    `;


    contenedor.appendChild(estilo);


    // ==========================================================
    // ELEMENTOS
    // ==========================================================

    const estadio =
        contenedor.querySelector(
            ".a010-estadio"
        );


    const presentacion =
        contenedor.querySelector(
            ".a010-presentacion"
        );


    const ovni =
        contenedor.querySelector(
            ".a010-ovni"
        );


    const rayo =
        contenedor.querySelector(
            ".a010-rayo-tractor"
        );


    const destello =
        contenedor.querySelector(
            ".a010-destello"
        );


// ==========================================================
// 1. ESTADIO
// ==========================================================

return estadio.animate(

    [

        {
            opacity: 0,

            transform:
                "translateX(-50%) scale(.6)"
        },

        {
            opacity: 1,

            transform:
                "translateX(-50%) scale(.8)"
        },

        {
            opacity: 1,

            transform:
                "translateX(-50%) scale(.75)"
        }

    ],

    {

        duration: 1500,

        easing:
            "cubic-bezier(.2,.8,.2,1)",

        fill: "forwards"

    }

).finished

.then(() => {

    // ======================================================
    // 2. APARECE JORNADA
    // ======================================================

    return presentacion.animate(

        [

            {
                opacity: 0,

                transform:
                    "translate(-50%, -50%) scale(.2)"
            },

            {
                opacity: 1,

                transform:
                    "translate(-50%, -50%) scale(1.1)"
            },

            {
                opacity: 1,

                transform:
                    "translate(-50%, -50%) scale(1)"
            }

        ],

        {

            duration: 1000,

            easing:
                "cubic-bezier(.2,.9,.2,1)",

            fill: "forwards"

        }

    ).finished;

})

.then(() => {

    // ======================================================
    // 3. PAUSA
    // ======================================================

    return new Promise(resolve => {

        setTimeout(
            resolve,
            1000
        );

    });

})

.then(() => {

    // ======================================================
    // 4. OVNI APARECE
    // ======================================================

    return ovni.animate(

        [

            {
                opacity: 0,

                transform:
                    "translateX(-50%) translateY(-80px) scale(.35)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) translateY(0) scale(1)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) translateY(0) scale(1)"
            }

        ],

        {

            duration: 1800,

            easing:
                "cubic-bezier(.2,.8,.2,1)",

            fill: "forwards"

        }

    ).finished;

})

.then(() => {

    // ======================================================
    // 5. RAYO TRACTOR
    // ======================================================

    return rayo.animate(

        [

            {
                opacity: 0,

                transform:
                    "translateX(-50%) scaleY(.05)"
            },

            {
                opacity: .4,

                transform:
                    "translateX(-50%) scaleY(.6)"
            },

            {
                opacity: .8,

                transform:
                    "translateX(-50%) scaleY(1)"
            },

            {
                opacity: .65,

                transform:
                    "translateX(-50%) scaleY(.95)"
            }

        ],

        {

            duration: 1200,

            easing:
                "ease-out",

            fill: "forwards"

        }

    ).finished;

})

.then(() => {

    // ======================================================
    // 6. JXMX SUBE Y SE DETIENE JUSTO BAJO EL OVNI
    // ======================================================

    return presentacion.animate(

        [

            {
                opacity: 1,

                transform:
                    "translate(-50%, -50%) scale(1)"
            },

            {
                opacity: 1,

                transform:
                    "translate(-50%, calc(-50% - 110px)) scale(.92)"
            },

            {
                opacity: 1,

                transform:
                    "translate(-50%, calc(-50% - 185px)) scale(.78)"
            }

        ],

        {

            duration: 2300,

            easing:
                "cubic-bezier(.2,.75,.25,1)",

            fill: "forwards"

        }

    ).finished;

})

.then(() => {

    // ======================================================
    // 7. LA JXMX QUEDA SUSPENDIDA
    // ======================================================

    return new Promise(resolve => {

        setTimeout(resolve, 700);

    });

})

.then(() => {

    // ======================================================
    // 7B. EL OVNI LA ABSORBE
    // ======================================================

    const absorcionJXMX =
        presentacion.animate(

            [

                {
                    opacity: 1,

                    transform:
                        "translate(-50%, calc(-50% - 185px)) scale(.78)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(-50%, calc(-50% - 205px)) scale(.68)"
                },

                {
                    opacity: .85,

                    transform:
                        "translate(-50%, calc(-50% - 225px)) scale(.48)"
                },

                {
                    opacity: 0,

                    transform:
                        "translate(-50%, calc(-50% - 245px)) scale(.08)"
                }

            ],

            {

                duration: 1100,

                easing:
                    "cubic-bezier(.35,.8,.15,1)",

                fill: "forwards"

            }

        );


    const movimientoOVNI =
        ovni.animate(

            [

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(0) scale(1)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(18px) scale(1.04)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(5px) scale(1.02)"
                }

            ],

            {

                duration: 1100,

                easing:
                    "cubic-bezier(.25,.8,.2,1)",

                fill: "forwards"

            }

        );


    const vibracion =
        presentacion.animate(

            [

                { transform: "translate(-50%, calc(-50% - 185px)) scale(.78)" },
                { transform: "translate(calc(-50% - 4px), calc(-50% - 185px)) scale(.80)" },
                { transform: "translate(calc(-50% + 4px), calc(-50% - 185px)) scale(.78)" },
                { transform: "translate(calc(-50% - 2px), calc(-50% - 185px)) scale(.79)" },
                { transform: "translate(-50%, calc(-50% - 185px)) scale(.78)" }
            ],

            {
                duration: 420,
                easing: "ease-in-out",
                fill: "none"
            }

        );


    return Promise.all([

        absorcionJXMX.finished,
        movimientoOVNI.finished,
        vibracion.finished

    ]);

})

.then(() => {

    // ======================================================
    // 8. EL RAYO SE APAGA
    // ======================================================

    return rayo.animate(

        [

            {
                opacity: .65
            },

            {
                opacity: .9
            },

            {
                opacity: 0
            }

        ],

        {

            duration: 700,

            easing:
                "ease-in-out",

            fill: "forwards"

        }

    ).finished;

})

.then(() => {

    // ======================================================
    // 9. OVNI SE ALEJA AL HORIZONTE
    // ======================================================

    return ovni.animate(

        [

            {
                opacity: 1,

                transform:
                    "translateX(-50%) translateY(0) scale(1)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) translateY(-100px) scale(.75)"
            },

            {
                opacity: .8,

                transform:
                    "translateX(-50%) translateY(-240px) scale(.5)"
            },

            {
                opacity: .45,

                transform:
                    "translateX(-50%) translateY(-390px) scale(.28)"
            },

            {
                opacity: 0,

                transform:
                    "translateX(-50%) translateY(-520px) scale(.08)"
            }

        ],

        {

            duration: 2300,

            easing:
                "cubic-bezier(.2,.7,.2,1)",

            fill: "forwards"

        }

    ).finished;

})

.then(() => {

    // ======================================================
    // 10. DESTELLO FINAL
    // ======================================================

    return destello.animate(

        [

            {
                opacity: 0
            },

            {
                opacity: .35
            },

            {
                opacity: 0
            }

        ],

        {

            duration: 500,

            easing:
                "ease-out",

            fill: "forwards"

        }

    ).finished;

})

.then(() => {

    // ======================================================
    // 11. DESAPARECE EL ESTADIO
    // ======================================================

    return estadio.animate(

        [

            {
                opacity: 1,

                transform:
                    "translateX(-50%) scale(.75)"
            },

            {
                opacity: .5,

                transform:
                    "translateX(-50%) scale(.72)"
            },

            {
                opacity: 0,

                transform:
                    "translateX(-50%) scale(.68)"
            }

        ],

        {

            duration: 1000,

            easing:
                "ease-in",

            fill: "forwards"

        }

    ).finished;

});

}
