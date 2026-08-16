export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A002
    BALÓN + JORNADA EN REBOTE CONTINUO
    ============================================================
    */

    contenedor.innerHTML = `
        <div class="a002-contenedor">

            <div class="a002-escena">

                <div class="a002-balon">
                    ⚽
                </div>

                <div class="a002-texto">

                    <div class="a002-titulo">
                        JORNADA
                    </div>

                    <div class="a002-numero">
                        ${numeroJornada}
                    </div>

                    <div class="a002-subtitulo">
                        Liga MX
                    </div>

                </div>

            </div>

        </div>
    `;


    // ----------------------------------------------------------
    // CSS
    // ----------------------------------------------------------

    const estilo = document.createElement("style");

    estilo.textContent = `

        .a002-contenedor {

            width: 100%;
            height: 100%;

            display: flex;

            justify-content: center;
            align-items: center;

            overflow: hidden;

            font-family: Arial, sans-serif;

            color: #ffffff;

            pointer-events: none;

            box-sizing: border-box;

        }


        .a002-escena {

            position: relative;

            width: 100%;
            height: 420px;

            display: flex;

            align-items: center;

            justify-content: center;

        }


        .a002-balon {

            position: absolute;

            left: -180px;

            top: 50%;

            font-size: 100px;

            line-height: 1;

            z-index: 3;

            filter:
                drop-shadow(0 0 8px rgba(255,255,255,.5))
                drop-shadow(0 0 18px rgba(255,255,255,.25));

            transform:
                translateY(-50%);

        }


        .a002-texto {

            position: absolute;

            left: -480px;

            top: 50%;

            transform:
                translateY(-50%);

            display: flex;

            flex-direction: column;

            justify-content: center;

            align-items: center;

            text-align: center;

            z-index: 2;

            white-space: nowrap;

        }


        .a002-titulo {

            font-size: 40px;

            font-weight: bold;

            letter-spacing: 9px;

            margin-bottom: 5px;

            text-shadow:
                0 0 8px rgba(255,255,255,.55),
                0 0 18px rgba(255,255,255,.3);

        }


        .a002-numero {

            font-size: 300px;

            font-weight: 900;

            line-height: .85;

            color: #ffffff;

            text-shadow:
                0 0 12px rgba(255,255,255,.8),
                0 0 30px rgba(255,255,255,.5),
                0 0 55px rgba(255,255,255,.25);

        }


        .a002-subtitulo {

            margin-top: 12px;

            font-size: 28px;

            color: #ffd54f;

            text-shadow:
                0 0 8px rgba(255,213,79,.6);

        }

    `;

    contenedor.appendChild(estilo);


    // ----------------------------------------------------------
    // ELEMENTOS
    // ----------------------------------------------------------

    const escena =
        contenedor.querySelector(".a002-escena");

    const balon =
        contenedor.querySelector(".a002-balon");

    const texto =
        contenedor.querySelector(".a002-texto");


    // ----------------------------------------------------------
    // MOVIMIENTO CONTINUO
    // ----------------------------------------------------------

    const animacionBalon = balon.animate(

        [

            {
                transform:
                    "translate(-180px, -50%) rotate(-180deg)"
            },

            {
                transform:
                    "translate(80px, calc(-50% + 150px)) rotate(180deg)"
            },

            {
                transform:
                    "translate(340px, calc(-50% - 100px)) rotate(540deg)"
            },

            {
                transform:
                    "translate(600px, calc(-50% + 120px)) rotate(900deg)"
            },

            {
                transform:
                    "translate(860px, calc(-50% - 70px)) rotate(1260deg)"
            },

            {
                transform:
                    "translate(1120px, calc(-50% + 100px)) rotate(1620deg)"
            },

            {
                transform:
                    "translate(1450px, calc(-50% - 40px)) rotate(1980deg)"
            }

        ],

        {

            duration: 5000,

            easing: "linear",

            fill: "forwards"

        }

    );


    // ----------------------------------------------------------
    // TEXTO: MISMO RECORRIDO DEL BALÓN
    // ----------------------------------------------------------

    const animacionTexto = texto.animate(

        [

            {
                transform:
                    "translate(-480px, -50%)"
            },

            {
                transform:
                    "translate(-220px, calc(-50% + 150px))"
            },

            {
                transform:
                    "translate(40px, calc(-50% - 100px))"
            },

            {
                transform:
                    "translate(300px, calc(-50% + 120px))"
            },

            {
                transform:
                    "translate(560px, calc(-50% - 70px))"
            },

            {
                transform:
                    "translate(820px, calc(-50% + 100px))"
            },

            {
                transform:
                    "translate(1150px, calc(-50% - 40px))"
            }

        ],

        {

            duration: 5000,

            easing: "linear",

            fill: "forwards"

        }

    );


    // ----------------------------------------------------------
    // ESPERAMOS A QUE LOS DOS TERMINEN
    // ----------------------------------------------------------

    return Promise.all([

        animacionBalon.finished,
        animacionTexto.finished

    ]).then(() => {

        // ------------------------------------------------------
        // ESPERA FINAL
        // ------------------------------------------------------

        return new Promise(resolve => {

            setTimeout(resolve, 1000);

        });

    });

}