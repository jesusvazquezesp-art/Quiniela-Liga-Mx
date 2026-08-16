export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A005
    RAYOS
    ============================================================
    */

    contenedor.innerHTML = `
        <div class="a005-contenedor">

            <div class="a005-rayo a005-rayo-izquierda">⚡</div>

            <div class="a005-rayo a005-rayo-derecha">⚡</div>

            <div class="a005-rayo a005-rayo-centro">⚡</div>

            <div class="a005-explosion">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

            </div>

            <div class="a005-contenido">

                <div class="a005-titulo">
                    JORNADA
                </div>

                <div class="a005-numero">
                    ${numeroJornada}
                </div>

                <div class="a005-subtitulo">
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

        .a005-contenedor {

            width: 100%;
            height: 100%;

            position: relative;

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
           RAYOS
        ===================================================== */

        .a005-rayo {

            position: absolute;

            font-size: 80px;

            line-height: 1;

            opacity: 0;

            z-index: 10;

            filter:
                drop-shadow(0 0 8px rgba(255,255,255,.95))
                drop-shadow(0 0 20px rgba(255,230,80,.9))
                drop-shadow(0 0 45px rgba(255,180,20,.65));

        }


        .a005-rayo-izquierda {

            left: 15%;

            top: -100px;

        }


        .a005-rayo-derecha {

            right: 15%;

            top: -100px;

        }


        .a005-rayo-centro {

            left: 50%;

            top: -120px;

            transform:
                translateX(-50%);

        }


        /* =====================================================
           EXPLOSIÓN
        ===================================================== */

        .a005-explosion {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 40px;
            height: 40px;

            margin-left: -20px;
            margin-top: -20px;

            border-radius: 50%;

            background: #ffffff;

            opacity: 0;

            transform: scale(.1);

            z-index: 8;

            box-shadow:
                0 0 20px #ffffff,
                0 0 45px rgba(255,230,80,.95),
                0 0 90px rgba(255,160,20,.8);

        }


        .a005-explosion span {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 10px;
            height: 10px;

            margin-left: -5px;
            margin-top: -5px;

            border-radius: 50%;

            background: #ffffff;

            box-shadow:
                0 0 10px #ffffff,
                0 0 20px rgba(255,220,60,.9);

        }


        .a005-explosion span:nth-child(1) {
            transform: translate(-70px,-30px);
        }

        .a005-explosion span:nth-child(2) {
            transform: translate(65px,-45px);
        }

        .a005-explosion span:nth-child(3) {
            transform: translate(-85px,35px);
        }

        .a005-explosion span:nth-child(4) {
            transform: translate(80px,40px);
        }

        .a005-explosion span:nth-child(5) {
            transform: translate(0,-90px);
        }

        .a005-explosion span:nth-child(6) {
            transform: translate(0,90px);
        }


        /* =====================================================
           PRESENTACIÓN
        ===================================================== */

        .a005-contenido {

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
                scale(.1);

            z-index: 5;

        }


        .a005-titulo {

            font-size: 40px;

            font-weight: bold;

            letter-spacing: 9px;

            margin-bottom: 20px;

            text-shadow:
                0 0 8px rgba(255,255,255,.7),
                0 0 20px rgba(255,255,255,.45);

        }


        .a005-numero {

            font-size: 300px;

            font-weight: 900;

            line-height: 1;

            color: #ffffff;

            text-shadow:
                0 0 12px rgba(255,255,255,.95),
                0 0 30px rgba(255,255,255,.65),
                0 0 60px rgba(255,220,80,.55);

        }


        .a005-subtitulo {

            margin-top: 20px;

            font-size: 28px;

            color: #ffd54f;

            text-shadow:
                0 0 8px rgba(255,213,79,.8);

        }

    `;

    contenedor.appendChild(estilo);


    // ----------------------------------------------------------
    // ELEMENTOS
    // ----------------------------------------------------------

    const rayoIzquierda =
        contenedor.querySelector(".a005-rayo-izquierda");

    const rayoDerecha =
        contenedor.querySelector(".a005-rayo-derecha");

    const rayoCentro =
        contenedor.querySelector(".a005-rayo-centro");

    const explosion =
        contenedor.querySelector(".a005-explosion");

    const contenido =
        contenedor.querySelector(".a005-contenido");


    // ==========================================================
    // 1. RAYO IZQUIERDO
    // ==========================================================

    const animacionIzquierda =
        rayoIzquierda.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translateY(-120px) rotate(-12deg) scale(.7)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateY(180px) rotate(-12deg) scale(1)"
                },

                {
                    opacity: 0,

                    transform:
                        "translateY(330px) rotate(-12deg) scale(1.15)"
                }

            ],

            {

                duration: 850,

                easing: "ease-in",

                fill: "forwards"

            }

        );


    return animacionIzquierda.finished.then(() => {


        // ======================================================
        // 2. RAYO DERECHO
        // ======================================================

        return rayoDerecha.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translateY(-130px) rotate(12deg) scale(.7)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateY(190px) rotate(12deg) scale(1)"
                },

                {
                    opacity: 0,

                    transform:
                        "translateY(340px) rotate(12deg) scale(1.15)"
                }

            ],

            {

                duration: 850,

                easing: "ease-in",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ======================================================
        // 3. RAYO CENTRAL
        // ======================================================

        return rayoCentro.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) translateY(-160px) scale(.7)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(170px) scale(1.15)"
                },

                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) translateY(300px) scale(1.3)"
                },

                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) translateY(390px) scale(1.5)"
                }

            ],

            {

                duration: 1000,

                easing: "ease-in",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ======================================================
        // 4. EXPLOSIÓN CENTRAL
        // ======================================================

        return explosion.animate(

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
                    opacity: .45,

                    transform:
                        "scale(6)"
                },

                {
                    opacity: 0,

                    transform:
                        "scale(9)"
                }

            ],

            {

                duration: 800,

                easing: "ease-out",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ======================================================
        // 5. JORNADA NACE DE LA EXPLOSIÓN
        // ======================================================

        return contenido.animate(

            [

                {
                    opacity: 0,

                    transform:
                        "translate(-50%, -50%) translateY(80px) scale(.05)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(-50%, -50%) translateY(20px) scale(.65)"
                },

                {
                    opacity: 1,

                    transform:
                        "translate(-50%, -50%) translateY(0) scale(1.08)"
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

        ).finished;

    }).then(() => {


        // ======================================================
        // 6. JORNADA SALE VOLANDO HACIA ARRIBA
        // ======================================================

        return contenido.animate(

           [
    {
        opacity: 1,
        transform:
            "translate(-50%, -50%) translateY(0) scale(1)"
    },

    {
        opacity: 1,
        transform:
            "translate(-50%, -50%) translateY(-180px) scale(.92)"
    },

    {
        opacity: .8,
        transform:
            "translate(-50%, -50%) translateY(-400px) scale(.72)"
    },

    {
        opacity: .45,
        transform:
            "translate(-50%, -50%) translateY(-700px) scale(.48)"
    },

    {
        opacity: 0,
        transform:
            "translate(-50%, -50%) translateY(-1100px) scale(.2)"
    }
],

            {

                duration: 1300,

                easing: "ease-in",

                fill: "forwards"

            }

        ).finished;

    }).then(() => {


        // ======================================================
        // 7. ESPERA FINAL
        // ======================================================

        return new Promise(resolve => {

            setTimeout(resolve, 1000);

        });

    });

}