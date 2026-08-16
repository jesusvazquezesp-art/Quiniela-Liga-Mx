export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A004
    METEORO
    Entrada superior + caída al centro + impacto
    ============================================================
    */

    contenedor.innerHTML = `
        <div class="a004-contenedor">

            <div class="a004-meteoro">
                <div class="a004-cola"></div>
                <div class="a004-bola">☄️</div>
            </div>

            <div class="a004-impacto"></div>

            <div class="a004-contenido">

                <div class="a004-titulo">
                    JORNADA
                </div>

                <div class="a004-numero">
                    ${numeroJornada}
                </div>

                <div class="a004-subtitulo">
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

        .a004-contenedor {

            position: relative;

            width: 100%;
            height: 100%;

            overflow: hidden;

            display: flex;

            justify-content: center;
            align-items: center;

            font-family: Arial, sans-serif;

            color: #ffffff;

            pointer-events: none;

            box-sizing: border-box;

        }


        /* =====================================================
           METEORO
        ===================================================== */

        .a004-meteoro {

            position: absolute;

            width: 120px;
            height: 120px;

            left: 0;
            top: 0;

            opacity: 0;

            z-index: 10;

        }


        .a004-bola {

            position: absolute;

            right: 0;
            top: 0;

            font-size: 80px;

            line-height: 1;

            filter:
                drop-shadow(0 0 8px rgba(255,200,100,.9))
                drop-shadow(0 0 22px rgba(255,100,20,.8))
                drop-shadow(0 0 45px rgba(255,50,0,.5));

        }


        .a004-cola {

            position: absolute;

            width: 110px;
            height: 28px;

            right: 45px;
            top: 35px;

            border-radius: 50%;

            background:
                linear-gradient(
                    90deg,
                    transparent,
                    rgba(255,80,0,.15),
                    rgba(255,180,50,.85)
                );

            filter: blur(6px);

            transform: rotate(-25deg);

        }


        /* =====================================================
           IMPACTO
        ===================================================== */

        .a004-impacto {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 35px;
            height: 35px;

            margin-left: -17.5px;
            margin-top: -17.5px;

            border-radius: 50%;

            background: #ffffff;

            opacity: 0;

            transform: scale(.1);

            box-shadow:
                0 0 20px #ffffff,
                0 0 50px rgba(255,200,80,.9),
                0 0 100px rgba(255,70,10,.8);

            z-index: 8;

        }


        /* =====================================================
           PRESENTACIÓN
        ===================================================== */

        .a004-contenido {

            position: absolute;

            left: 50%;
            top: 50%;

            transform:
                translate(-50%, -50%)
                scale(.45);

            opacity: 0;

            display: flex;

            flex-direction: column;

            justify-content: center;
            align-items: center;

            text-align: center;

            z-index: 5;

            width: 100%;

        }


        .a004-titulo {

            font-size: 40px;

            font-weight: bold;

            letter-spacing: 9px;

            margin-bottom: 20px;

            text-shadow:
                0 0 8px rgba(255,255,255,.65),
                0 0 20px rgba(255,255,255,.4);

        }


        .a004-numero {

            font-size: 300px;

            font-weight: 900;

            line-height: 1;

            color: #ffffff;

            text-shadow:
                0 0 12px rgba(255,255,255,.9),
                0 0 30px rgba(255,255,255,.6),
                0 0 60px rgba(255,150,50,.45);

        }


        .a004-subtitulo {

            margin-top: 20px;

            font-size: 28px;

            color: #ffd54f;

            text-shadow:
                0 0 8px rgba(255,213,79,.7);

        }

    `;

    contenedor.appendChild(estilo);


    // ----------------------------------------------------------
    // ELEMENTOS
    // ----------------------------------------------------------

    const meteoro =
        contenedor.querySelector(".a004-meteoro");

    const impacto =
        contenedor.querySelector(".a004-impacto");

    const contenido =
        contenedor.querySelector(".a004-contenido");


    // ==========================================================
    // 1. METEORO CRUZA LA PARTE SUPERIOR
    // ==========================================================

    const vueloSuperior =
        meteoro.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translate(-120px, -100px) rotate(-25deg)"

                },

                {
                    opacity: 1,

                    transform:
                        "translate(15vw, 8vh) rotate(-25deg)"

                },

                {
                    opacity: 1,

                    transform:
                        "translate(45vw, 3vh) rotate(-25deg)"

                },

                {
                    opacity: 1,

                    transform:
                        "translate(75vw, 7vh) rotate(-25deg)"

                },

                {
                    opacity: 1,

                    transform:
                        "translate(calc(100vw - 80px), 2vh) rotate(-25deg)"

                }

            ],

            {

                duration: 2400,

                easing: "ease-in-out",

                fill: "forwards"

            }

        );


    // ==========================================================
    // 2. METEORO REGRESA Y CAE AL CENTRO
    // ==========================================================

    return vueloSuperior.finished.then(() => {

        return meteoro.animate(

            [

                {
                    opacity: 1,

                    transform:
                        "translate(calc(100vw - 80px), 2vh) rotate(25deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(78vw, 20vh) rotate(35deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(63vw, 34vh) rotate(45deg)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(50vw, 48vh) rotate(55deg)"
                }

            ],

            {

                duration: 1400,

                easing: "cubic-bezier(.4,.1,.2,1)",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ======================================================
        // 3. IMPACTO
        // ======================================================

        const animacionImpacto =
            impacto.animate(

                [

                    {
                        opacity: 0,

                        transform:
                            "scale(.1)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "scale(1)"
                    },

                    {
                        opacity: .9,

                        transform:
                            "scale(3)"
                    },

                    {
                        opacity: 0,

                        transform:
                            "scale(6)"
                    }

                ],

                {

                    duration: 650,

                    easing: "ease-out",

                    fill: "forwards"

                }

            );


        // ======================================================
        // 4. JORNADA APARECE CON EL IMPACTO
        // ======================================================

        const animacionContenido =
            contenido.animate(

                [

                    {
                        opacity: 0,

                        transform:
                            "translate(-50%, -50%) translateY(80px) scale(.45)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%, -50%) translateY(-8px) scale(1.08)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%, -50%) translateY(0) scale(1)"
                    }

                ],

                {

                    duration: 900,

                    easing: "cubic-bezier(.2,.9,.2,1)",

                    fill: "forwards"

                }

            );


        return Promise.all([

            animacionImpacto.finished,
            animacionContenido.finished

        ]);

    }).then(() => {


        // ======================================================
        // 5. EL METEORO DESAPARECE
        // ======================================================

        return meteoro.animate(

            [

                {
                    opacity: 1,

                    transform:
                        "translate(50vw, 48vh) rotate(55deg) scale(1)"
                },

                {
                    opacity: 0,

                    transform:
                        "translate(50vw, 48vh) rotate(55deg) scale(.35)"
                }

            ],

            {

                duration: 400,

                easing: "ease-in",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ======================================================
        // 6. SALIDA DE JORNADA HACIA EL FRENTE
        // ======================================================

        return contenido.animate(

            [

                {
    opacity: 1,

    transform:
        "translate(-50%, -50%) scale(1)"
},

{
    opacity: .8,

    transform:
        "translate(-50%, -50%) scale(.7)"
},

{
    opacity: .35,

    transform:
        "translate(-50%, -50%) scale(.3)"
},

{
    opacity: 0,

    transform:
        "translate(-50%, -50%) scale(.05)"
}

            ],

            {

                duration: 800,

                easing: "ease-in",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ======================================================
        // 7. PAUSA FINAL
        // ======================================================

        return new Promise(resolve => {

            setTimeout(resolve, 1000);

        });

    });

}