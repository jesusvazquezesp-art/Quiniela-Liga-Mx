export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A009
    ANILLO DE FUEGO
    ============================================================
    */

    contenedor.innerHTML = `

        <div class="a009-contenedor">

            <div class="a009-anillo">

                <div class="a009-fuego a009-fuego-1"></div>
                <div class="a009-fuego a009-fuego-2"></div>
                <div class="a009-fuego a009-fuego-3"></div>

            </div>


            <div class="a009-chispas">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

            </div>


            <div class="a009-presentacion">

                <div class="a009-titulo">
                    JORNADA
                </div>

                <div class="a009-numero">
                    ${numeroJornada}
                </div>

                <div class="a009-subtitulo">
                    Liga MX
                </div>

            </div>


            <div class="a009-explosion"></div>

        </div>

    `;


    // ----------------------------------------------------------
    // CSS
    // ----------------------------------------------------------

    const estilo =
        document.createElement("style");


    estilo.textContent = `

        .a009-contenedor {

            position: relative;

            width: 100%;
            height: 100%;

            overflow: hidden;

            display: flex;

            justify-content: center;
            align-items: center;

            font-family: Arial, sans-serif;

            pointer-events: none;

            box-sizing: border-box;

            background:
                radial-gradient(
                    circle at center,
                    rgba(120,45,10,.18),
                    transparent 55%
                );

        }


        /* =====================================================
           ANILLO
        ===================================================== */

        .a009-anillo {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 470px;
            height: 470px;

            transform:
                translate(-50%, -50%)
                scale(.15);

            opacity: 0;

            border-radius: 50%;

            z-index: 4;

        }


        .a009-fuego {

            position: absolute;

            inset: 0;

            border-radius: 50%;

            border-style: solid;

            filter:
                blur(2px);

        }


        .a009-fuego-1 {

            border-width: 22px;

            border-color:
                #ffcc33
                #ff6a00
                #ff3300
                #ffcc33;

            box-shadow:

                0 0 12px #ffcc33,

                0 0 30px #ff6a00,

                0 0 60px
                rgba(255,70,0,.75),

                inset 0 0 20px
                rgba(255,180,30,.8);

        }


        .a009-fuego-2 {

            inset: 12px;

            border-width: 12px;

            border-color:
                #fff4a3
                #ff9d00
                #ff4200
                #fff4a3;

            opacity: .85;

            filter:
                blur(3px);

        }


        .a009-fuego-3 {

            inset: 28px;

            border-width: 7px;

            border-color:
                rgba(255,255,210,.9)
                rgba(255,170,30,.7)
                rgba(255,70,0,.7)
                rgba(255,255,210,.9);

            opacity: .7;

            filter:
                blur(5px);

        }


        /* =====================================================
           CHISPAS
        ===================================================== */

        .a009-chispas {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 560px;
            height: 560px;

            transform:
                translate(-50%, -50%)
                scale(.2);

            opacity: 0;

            z-index: 5;

        }


        .a009-chispas span {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 7px;
            height: 7px;

            border-radius: 50%;

            background: #ffd54f;

            box-shadow:

                0 0 8px #ff9800,

                0 0 18px #ff5722;

        }


        .a009-chispas span:nth-child(1) {
            transform:
                translate(-230px,-30px);
        }

        .a009-chispas span:nth-child(2) {
            transform:
                translate(220px,-70px);
        }

        .a009-chispas span:nth-child(3) {
            transform:
                translate(-180px,150px);
        }

        .a009-chispas span:nth-child(4) {
            transform:
                translate(180px,130px);
        }

        .a009-chispas span:nth-child(5) {
            transform:
                translate(-60px,-250px);
        }

        .a009-chispas span:nth-child(6) {
            transform:
                translate(70px,245px);
        }

        .a009-chispas span:nth-child(7) {
            transform:
                translate(-270px,80px);
        }

        .a009-chispas span:nth-child(8) {
            transform:
                translate(260px,40px);
        }

        .a009-chispas span:nth-child(9) {
            transform:
                translate(-100px,240px);
        }

        .a009-chispas span:nth-child(10) {
            transform:
                translate(110px,-235px);
        }


        /* =====================================================
           PRESENTACIÓN
        ===================================================== */

        .a009-presentacion {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 100%;

            display: flex;

            flex-direction: column;

            justify-content: center;
            align-items: center;

            text-align: center;

            opacity: 0;

            transform:
                translate(-50%, -50%)
                scale(.2);

            z-index: 8;

            color: #ffffff;

            text-shadow:

                0 0 10px
                rgba(255,255,255,.95),

                0 0 25px
                rgba(255,190,80,.85),

                0 0 55px
                rgba(255,80,0,.6);

        }


        .a009-titulo {

            font-size: 40px;

            font-weight: bold;

            letter-spacing: 9px;

            margin-bottom: 15px;

        }


        .a009-numero {

            font-size: 300px;

            font-weight: 900;

            line-height: .85;

        }


        .a009-subtitulo {

            margin-top: 20px;

            font-size: 28px;

            color: #ffd54f;

        }


        /* =====================================================
           EXPLOSIÓN FINAL
        ===================================================== */

        .a009-explosion {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 40px;
            height: 40px;

            border-radius: 50%;

            background: #fff6c7;

            box-shadow:

                0 0 20px #ffffff,

                0 0 50px #ffb300,

                0 0 100px #ff5722;

            transform:
                translate(-50%, -50%)
                scale(.1);

            opacity: 0;

            z-index: 12;

        }

    `;


    contenedor.appendChild(estilo);


    // ----------------------------------------------------------
    // ELEMENTOS
    // ----------------------------------------------------------

    const anillo =
        contenedor.querySelector(
            ".a009-anillo"
        );


    const fuego1 =
        contenedor.querySelector(
            ".a009-fuego-1"
        );


    const fuego2 =
        contenedor.querySelector(
            ".a009-fuego-2"
        );


    const fuego3 =
        contenedor.querySelector(
            ".a009-fuego-3"
        );


    const chispas =
        contenedor.querySelector(
            ".a009-chispas"
        );


    const presentacion =
        contenedor.querySelector(
            ".a009-presentacion"
        );


    const explosion =
        contenedor.querySelector(
            ".a009-explosion"
        );


    // ----------------------------------------------------------
    // 1. APARECE EL ANILLO
    // ----------------------------------------------------------

    const entrada =
        anillo.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translate(-50%, -50%) scale(.15)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(-50%, -50%) scale(.8)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(-50%, -50%) scale(1)"
                }

            ],

            {

                duration: 1300,

                easing:
                    "cubic-bezier(.2,.9,.2,1)",

                fill: "forwards"

            }

        );


    // ----------------------------------------------------------
    // 2. FUEGO GIRA
    // ----------------------------------------------------------

    const giro1 =
        fuego1.animate(

            [

                {
                    transform:
                        "rotate(0deg)"
                },

                {
                    transform:
                        "rotate(360deg)"
                },

                {
                    transform:
                        "rotate(720deg)"
                }

            ],

            {

                duration: 2800,

                easing: "linear",

                fill: "forwards"

            }

        );


    const giro2 =
        fuego2.animate(

            [

                {
                    transform:
                        "rotate(360deg)"
                },

                {
                    transform:
                        "rotate(0deg)"
                },

                {
                    transform:
                        "rotate(-360deg)"
                }

            ],

            {

                duration: 2200,

                easing: "linear",

                fill: "forwards"

            }

        );


    const giro3 =
        fuego3.animate(

            [

                {
                    transform:
                        "rotate(0deg)"
                },

                {
                    transform:
                        "rotate(-360deg)"
                }

            ],

            {

                duration: 1800,

                easing: "linear",

                fill: "forwards"

            }

        );


    return entrada.finished.then(() => {


        // ------------------------------------------------------
        // 3. CHISPAS
        // ------------------------------------------------------

        const entradaChispas =
            chispas.animate(

                [

                    {
                        opacity: 0,

                        transform:
                            "translate(-50%, -50%) scale(.2)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%, -50%) scale(1)"
                    }

                ],

                {

                    duration: 900,

                    easing:
                        "ease-out",

                    fill: "forwards"

                }

            );


        const giroChispas =
            chispas.animate(

                [

                    {
                        transform:
                            "translate(-50%, -50%) rotate(0deg) scale(1)"
                    },

                    {
                        transform:
                            "translate(-50%, -50%) rotate(360deg) scale(1.08)"
                    },

                    {
                        transform:
                            "translate(-50%, -50%) rotate(720deg) scale(1)"
                    }

                ],

                {

                    duration: 2600,

                    easing: "linear",

                    fill: "forwards"

                }

            );


        return Promise.all([

            entradaChispas.finished,

            giroChispas.finished,

            giro1.finished,
            giro2.finished,
            giro3.finished

        ]);

    }).then(() => {


        // ------------------------------------------------------
        // 4. JORNADA APARECE
        // ------------------------------------------------------

        return presentacion.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translate(-50%, -50%) scale(.15)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(-50%, -50%) scale(1.12)"
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

    }).then(() => {


        // ------------------------------------------------------
        // 5. ANILLO SE INTENSIFICA
        // ------------------------------------------------------

        return anillo.animate(

            [

                {
                    transform:
                        "translate(-50%, -50%) scale(1)"
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1.12)"
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)"
                }

            ],

            {

                duration: 1000,

                easing:
                    "ease-in-out",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ------------------------------------------------------
        // 6. PAUSA
        // ------------------------------------------------------

        return new Promise(resolve => {

            setTimeout(
                resolve,
                700
            );

        });

    }).then(() => {


        // ------------------------------------------------------
        // 7. GRAN EXPANSIÓN
        // ------------------------------------------------------

        const expansion =
            anillo.animate(

                [

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%, -50%) scale(1)"
                    },

                    {
                        opacity: .9,

                        transform:
                            "translate(-50%, -50%) scale(1.3)"
                    },

                    {
                        opacity: .45,

                        transform:
                            "translate(-50%, -50%) scale(1.65)"
                    },

                    {
                        opacity: 0,

                        transform:
                            "translate(-50%, -50%) scale(2)"
                    }

                ],

                {

                    duration: 1000,

                    easing:
                        "ease-out",

                    fill: "forwards"

                }

            );


        const salidaPresentacion =
            presentacion.animate(

                [

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%, -50%) scale(1)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%, -50%) scale(1.08)"
                    },

                    {
                        opacity: 0,

                        transform:
                            "translate(-50%, -50%) scale(1.18)"
                    }

                ],

                {

                    duration: 1000,

                    easing:
                        "ease-in",

                    fill: "forwards"

                }

            );


        const salidaChispas =
            chispas.animate(

                [

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%, -50%) scale(1)"
                    },

                    {
                        opacity: 0,

                        transform:
                            "translate(-50%, -50%) scale(1.8)"
                    }

                ],

                {

                    duration: 900,

                    easing:
                        "ease-out",

                    fill: "forwards"

                }

            );


        return Promise.all([

            expansion.finished,

            salidaPresentacion.finished,

            salidaChispas.finished

        ]);

    }).then(() => {


        // ------------------------------------------------------
        // 8. DESTELLO FINAL
        // ------------------------------------------------------

        return explosion.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translate(-50%, -50%) scale(.1)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(-50%, -50%) scale(4)"
                },

                {
                    opacity: 0,

                    transform:
                        "translate(-50%, -50%) scale(8)"
                }

            ],

            {

                duration: 600,

                easing:
                    "ease-out",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ------------------------------------------------------
        // 9. ESPERA FINAL
        // ------------------------------------------------------

        return new Promise(resolve => {

            setTimeout(
                resolve,
                700
            );

        });

    });

}