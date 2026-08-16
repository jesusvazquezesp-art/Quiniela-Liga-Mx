export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A003
    AGUJERO NEGRO
    ============================================================
    */

    contenedor.innerHTML = `
        <div class="a003-contenedor">

            <div class="a003-portal">

                <div class="a003-anillo"></div>

                <div class="a003-particulas">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

            <div class="a003-contenido">

                <div class="a003-titulo">
                    JORNADA
                </div>

                <div class="a003-numero">
                    ${numeroJornada}
                </div>

                <div class="a003-subtitulo">
                    Liga MX
                </div>

            </div>

        </div>
    `;


    // ----------------------------------------------------------
    // CSS
    // ----------------------------------------------------------

    const estilo = document.createElement("style");

    estilo.textContent = `

        .a003-contenedor {

            width: 100%;
            height: 100%;

            position: relative;

            display: flex;

            justify-content: center;
            align-items: center;

            text-align: center;

            font-family: Arial, sans-serif;

            color: #ffffff;

            pointer-events: none;

            overflow: hidden;

            box-sizing: border-box;

        }


        /* ----------------------------------------------------
           AGUJERO NEGRO / PORTAL
        ---------------------------------------------------- */

        .a003-portal {

            position: absolute;

            width: 180px;
            height: 180px;

            border-radius: 50%;

            display: flex;

            justify-content: center;
            align-items: center;

            opacity: 0;

            z-index: 10;

        }


        .a003-anillo {

            position: absolute;

            width: 100%;
            height: 100%;

            border-radius: 50%;

            border: 5px solid rgba(255,255,255,.9);

            box-shadow:
                0 0 15px rgba(255,255,255,.9),
                0 0 35px rgba(120,180,255,.8),
                0 0 70px rgba(80,130,255,.5);

            box-sizing: border-box;

        }


        .a003-anillo::before {

            content: "";

            position: absolute;

            inset: 18px;

            border-radius: 50%;

            border: 2px solid rgba(255,255,255,.6);

            box-shadow:
                0 0 15px rgba(255,255,255,.7);

        }


        .a003-anillo::after {

            content: "";

            position: absolute;

            inset: 38px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    #000000 0%,
                    #000000 38%,
                    rgba(20,20,40,.95) 48%,
                    rgba(80,130,255,.25) 68%,
                    transparent 78%
                );

            box-shadow:
                inset 0 0 25px rgba(0,0,0,.9),
                0 0 20px rgba(80,130,255,.6);

        }


        /* ----------------------------------------------------
           PARTÍCULAS
        ---------------------------------------------------- */

        .a003-particulas {

            position: absolute;

            width: 100%;
            height: 100%;

            animation:
                a003-giro 2.5s linear infinite;

        }


        .a003-particulas span {

            position: absolute;

            width: 8px;
            height: 8px;

            border-radius: 50%;

            background: #ffffff;

            box-shadow:
                0 0 8px #ffffff,
                0 0 18px rgba(100,170,255,.8);

        }


        .a003-particulas span:nth-child(1) {
            top: -15px;
            left: 50%;
        }

        .a003-particulas span:nth-child(2) {
            top: 12%;
            right: 8%;
        }

        .a003-particulas span:nth-child(3) {
            top: 50%;
            right: -15px;
        }

        .a003-particulas span:nth-child(4) {
            bottom: 10%;
            right: 12%;
        }

        .a003-particulas span:nth-child(5) {
            bottom: -15px;
            left: 50%;
        }

        .a003-particulas span:nth-child(6) {
            bottom: 10%;
            left: 10%;
        }

        .a003-particulas span:nth-child(7) {
            top: 50%;
            left: -15px;
        }

        .a003-particulas span:nth-child(8) {
            top: 12%;
            left: 10%;
        }


        /* ----------------------------------------------------
           CONTENIDO
        ---------------------------------------------------- */

        .a003-contenido {

            position: relative;

            z-index: 5;

            display: flex;

            flex-direction: column;

            justify-content: center;
            align-items: center;

            opacity: 0;

            transform:
                translateY(-180px)
                scale(.8);

        }


        .a003-titulo {

            font-size: 40px;

            font-weight: bold;

            letter-spacing: 9px;

            margin-bottom: 20px;

            text-shadow:
                0 0 8px rgba(255,255,255,.6),
                0 0 20px rgba(255,255,255,.4);

        }


        .a003-numero {

            font-size: 300px;

            font-weight: 900;

            line-height: 1;

            color: #ffffff;

            text-shadow:
                0 0 12px rgba(255,255,255,.85),
                0 0 30px rgba(255,255,255,.6),
                0 0 60px rgba(100,170,255,.45);

        }


        .a003-subtitulo {

            margin-top: 20px;

            font-size: 28px;

            color: #ffd54f;

            text-shadow:
                0 0 8px rgba(255,213,79,.6);

        }


        @keyframes a003-giro {

            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }

        }

    `;

    contenedor.appendChild(estilo);


    // ----------------------------------------------------------
    // ELEMENTOS
    // ----------------------------------------------------------

    const portal =
        contenedor.querySelector(".a003-portal");

    const contenido =
        contenedor.querySelector(".a003-contenido");


    // ----------------------------------------------------------
    // ENTRADA DEL PORTAL
    // ----------------------------------------------------------

    const animacionPortal = portal.animate(

        [

            {
                opacity: 0,

                transform:
                    "translateX(700px) scale(.2) rotate(-180deg)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(350px) scale(.7) rotate(-80deg)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(120px) scale(1) rotate(20deg)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(0) scale(1) rotate(360deg)"
            }

        ],

        {

            duration: 2200,

            easing: "cubic-bezier(.2,.8,.2,1)",

            fill: "forwards"

        }

    );


    // ----------------------------------------------------------
    // ENTRADA DE JORNADA
    // MISMA SENSACIÓN DE A001
    // ----------------------------------------------------------

    const animacionContenido =
        contenido.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translateY(-180px) scale(.8)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateY(80px) scale(1)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateY(10px) scale(1)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateY(0) scale(1)"
                }

            ],

            {

                duration: 3000,

                easing: "ease-out",

                fill: "forwards"

            }

        );


    // ----------------------------------------------------------
    // ESPERAMOS LA ENTRADA
    // ----------------------------------------------------------

    return Promise.all([

        animacionPortal.finished,
        animacionContenido.finished

    ]).then(() => {


        // ------------------------------------------------------
        // PAUSA BREVE
        // ------------------------------------------------------

        return new Promise(resolve => {

            setTimeout(resolve, 500);

        });

    }).then(() => {


        // ------------------------------------------------------
        // EL AGUJERO NEGRO SE ACERCA
        // ------------------------------------------------------

        const acercamiento =
            portal.animate(

                [

                    {
                        transform:
                            "translateX(0) scale(1) rotate(360deg)"
                    },

                    {
                        transform:
                            "translateX(-40px) scale(1.4) rotate(720deg)"
                    },

                    {
                        transform:
                            "translateX(0) scale(1.8) rotate(1080deg)"
                    }

                ],

                {

                    duration: 1200,

                    easing: "ease-in-out",

                    fill: "forwards"

                }

            );


        // ------------------------------------------------------
        // EL CONTENIDO EMPIEZA A SER ABSORBIDO
        // ------------------------------------------------------

        const absorcion =
            contenido.animate(

                [

                    {
                        opacity: 1,

                        transform:
                            "translate(0,0) scale(1) rotate(0deg)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translate(80px,0) scale(.9) rotate(25deg)"
                    },

                    {
                        opacity: .8,

                        transform:
                            "translate(130px,10px) scale(.65) rotate(80deg)"
                    },

                    {
                        opacity: .55,

                        transform:
                            "translate(150px,5px) scale(.4) rotate(180deg)"
                    },

                    {
                        opacity: .25,

                        transform:
                            "translate(145px,0) scale(.18) rotate(300deg)"
                    },

                    {
                        opacity: 0,

                        transform:
                            "translate(140px,0) scale(.02) rotate(520deg)"
                    }

                ],

                {

                    duration: 1800,

                    easing: "cubic-bezier(.4,0,.2,1)",

                    fill: "forwards"

                }

            );


        return Promise.all([

            acercamiento.finished,
            absorcion.finished

        ]);

    }).then(() => {


        // ------------------------------------------------------
        // EL AGUJERO NEGRO SE VA HACIA EL FONDO
        // ------------------------------------------------------

        return portal.animate(

            [

                {
                    opacity: 1,

                    transform:
                        "translateX(0) scale(1.8) rotate(1080deg)"
                },

                {
                    opacity: .8,

                    transform:
                        "translateX(0) scale(1.2) rotate(1260deg)"
                },

                {
                    opacity: .4,

                    transform:
                        "translateX(0) scale(.55) rotate(1440deg)"
                },

                {
                    opacity: 0,

                    transform:
                        "translateX(0) scale(.05) rotate(1620deg)"
                }

            ],

            {

                duration: 1200,

                easing: "ease-in",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ------------------------------------------------------
        // ESPERA ANTES DE CONTINUAR
        // ------------------------------------------------------

        return new Promise(resolve => {

            setTimeout(resolve, 1000);

        });

    });

}