export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A001
    Animación base de presentación
    Basada en la presentación original de index.html
    ============================================================
    */

    // ----------------------------------------------------------
    // HTML
    // ----------------------------------------------------------

    contenedor.innerHTML = `
        <div class="a001-contenedor">

            <div class="a001-titulo">
                JORNADA
            </div>

            <div class="a001-numero">
                ${numeroJornada}
            </div>

            <div class="a001-subtitulo">
                Liga MX
            </div>

        </div>
    `;


    // ----------------------------------------------------------
    // CSS PROPIO
    // ----------------------------------------------------------

    const estilo = document.createElement("style");

    estilo.textContent = `

        .a001-contenedor {

            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;

            justify-content: center;
            align-items: center;

            text-align: center;

            font-family: Arial, sans-serif;

            color: #ffffff;

            pointer-events: none;

            box-sizing: border-box;

        }


        .a001-titulo {

            font-size: 40px;

            font-weight: bold;

            letter-spacing: 9px;

            margin-bottom: 20px;

text-shadow:
        0 0 8px rgba(255,255,255,.45),
        0 0 18px rgba(255,255,255,.25);

        }


        .a001-numero {

            font-size: 300px;

            font-weight: 900;

            line-height: 1;

            color: #ffffff;

    text-shadow:
        0 0 12px rgba(255,255,255,.75),
        0 0 30px rgba(255,255,255,.45),
        0 0 55px rgba(255,255,255,.20);

        }


       .a001-subtitulo {

    margin-top: 20px;

    font-size: 28px;

    color: #ffd54f;

    text-shadow:
        0 0 8px rgba(255,213,79,.55);

}
    `;

    contenedor.appendChild(estilo);


    // ----------------------------------------------------------
    // ANIMACIÓN
    // ----------------------------------------------------------

    const elemento =
        contenedor.querySelector(".a001-contenedor");


    const animacion = elemento.animate(

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
                    "translateY(10px)"
            },

            {
                opacity: 1,

                transform:
                    "translateY(12px)"
            },

            {
                opacity: 1,

                transform:
                    "translateY(0px)"
            },

            {
                opacity: 0,

                transform:
                    "scale(1.45)"
            }

        ],

        {

            duration:3000,

            easing: "ease-out",

            fill: "forwards"

        }

    );


    // ----------------------------------------------------------
    // DEVOLVEMOS LA PROMESA
    // ----------------------------------------------------------

return animacion.finished.then(() => {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
});

}
