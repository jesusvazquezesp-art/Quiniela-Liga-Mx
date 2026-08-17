export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A011 — JXMX EN EL ESPACIO

    Continuación de A010:
    OVNI → espacio → planeta → compuerta → JXMX flotando
    → señal intergaláctica → JXMX vuelve a la nave → despegue.
    ============================================================
    */

    contenedor.innerHTML = `

        <div class="a011-contenedor">

            <div class="a011-estrellas">
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i>
            </div>

            <div class="a011-nebulosa"></div>

            <div class="a011-planeta">
                <div class="a011-planeta-anillos"></div>
                <div class="a011-planeta-luz"></div>
            </div>

            <div class="a011-ovni">

                <div class="a011-ovni-cuerpo">

                    <div class="a011-cabina"></div>

                    <div class="a011-luces">
                        <span></span><span></span><span></span>
                        <span></span><span></span><span></span>
                    </div>

                </div>

                <div class="a011-compuerta"></div>

            </div>

            <div class="a011-jxmx">

                <div class="a011-titulo">
                    JORNADA
                </div>

                <div class="a011-numero">
                    ${numeroJornada}
                </div>

                <div class="a011-subtitulo">
                    Liga MX
                </div>

            </div>

            <div class="a011-senal">

                <div class="a011-senal-titulo">
    SEÑAL INTERGALÁCTICA
</div>

                <strong>DETECTADA</strong>

            </div>

            <div class="a011-continuara">
                 CONTINUARÁ... ✨
            </div>

        </div>

    `;

    const estilo = document.createElement("style");

    estilo.textContent = `

        .a011-contenedor {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            box-sizing: border-box;
            background:
                radial-gradient(
                    circle at 50% 45%,
                    #172044 0%,
                    #080d20 38%,
                    #02040c 75%,
                    #000 100%
                );
            font-family: Arial, sans-serif;
            pointer-events: none;
        }

        .a011-estrellas {
            position: absolute;
            inset: 0;
            z-index: 1;
        }

        .a011-estrellas i {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 8px #fff;
            opacity: .75;
        }

        .a011-estrellas i:nth-child(1){left:5%;top:12%}
        .a011-estrellas i:nth-child(2){left:12%;top:31%}
        .a011-estrellas i:nth-child(3){left:18%;top:8%}
        .a011-estrellas i:nth-child(4){left:26%;top:22%}
        .a011-estrellas i:nth-child(5){left:33%;top:10%}
        .a011-estrellas i:nth-child(6){left:42%;top:28%}
        .a011-estrellas i:nth-child(7){left:53%;top:9%}
        .a011-estrellas i:nth-child(8){left:61%;top:25%}
        .a011-estrellas i:nth-child(9){left:70%;top:12%}
        .a011-estrellas i:nth-child(10){left:78%;top:30%}
        .a011-estrellas i:nth-child(11){left:88%;top:10%}
        .a011-estrellas i:nth-child(12){left:94%;top:25%}
        .a011-estrellas i:nth-child(13){left:8%;top:66%}
        .a011-estrellas i:nth-child(14){left:23%;top:78%}
        .a011-estrellas i:nth-child(15){left:39%;top:69%}
        .a011-estrellas i:nth-child(16){left:57%;top:80%}
        .a011-estrellas i:nth-child(17){left:76%;top:72%}
        .a011-estrellas i:nth-child(18){left:91%;top:62%}

        .a011-nebulosa {
            position: absolute;
            width: 650px;
            height: 300px;
            left: 50%;
            top: 42%;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            background:
                radial-gradient(
                    ellipse,
                    rgba(90,110,255,.18),
                    rgba(100,40,180,.08) 45%,
                    transparent 72%
                );
            filter: blur(25px);
            opacity: 0;
            z-index: 2;
        }

        .a011-planeta {
            position: absolute;
            right: -210px;
            bottom: -170px;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background:
                radial-gradient(
                    circle at 32% 30%,
                    #9db8d0 0%,
                    #496783 28%,
                    #1d3047 55%,
                    #070c15 78%,
                    #000 100%
                );
            box-shadow:
                -25px -20px 90px rgba(90,170,255,.3);
            opacity: 0;
            z-index: 3;
        }

        .a011-planeta-luz {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background:
                radial-gradient(
                    circle at 28% 24%,
                    rgba(255,255,255,.35),
                    transparent 22%
                );
        }

        .a011-planeta-anillos {
            position: absolute;
            left: -120px;
            top: 205px;
            width: 820px;
            height: 150px;
            border: 18px solid rgba(160,190,220,.28);
            border-radius: 50%;
            transform: rotate(-14deg);
        }

        .a011-ovni {
            position: absolute;
            left: 50%;
            top: 18%;
            width: 430px;
            height: 310px;
            transform: translate(-50%,-50%) scale(.08);
            opacity: 0;
            z-index: 12;
        }

        .a011-ovni-cuerpo {
            position: absolute;
            left: 50%;
            top: 0;
            width: 360px;
            height: 135px;
            transform: translateX(-50%);
            border-radius: 50%;
            background:
                radial-gradient(
                    ellipse at 50% 25%,
                    #dbe8f4,
                    #72869a 38%,
                    #263443 70%,
                    #070c12 100%
                );
            border: 4px solid rgba(210,235,255,.85);
            box-shadow:
                0 0 25px rgba(130,210,255,.7),
                0 0 70px rgba(70,140,255,.35);
        }

        .a011-cabina {
            position: absolute;
            left: 50%;
            top: -48px;
            width: 150px;
            height: 80px;
            transform: translateX(-50%);
            border-radius: 50%;
            background:
                radial-gradient(
                    ellipse,
                    #effcff,
                    #64a5c4 55%,
                    #153348
                );
            border: 3px solid rgba(220,245,255,.9);
            box-shadow: 0 0 25px rgba(100,225,255,.8);
        }

        .a011-luces {
            position: absolute;
            left: 50%;
            bottom: 12px;
            width: 270px;
            transform: translateX(-50%);
            display: flex;
            justify-content: space-between;
        }

        .a011-luces span {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: #72eaff;
            box-shadow:
                0 0 8px #72eaff,
                0 0 22px rgba(80,220,255,.9);
        }

        .a011-compuerta {
            position: absolute;
            left: 50%;
            top: 104px;
            width: 120px;
            height: 55px;
            transform: translateX(-50%);
            border-radius: 0 0 60px 60px;
            background:
                linear-gradient(
                    to bottom,
                    rgba(150,245,255,.7),
                    rgba(40,130,190,.15)
                );
            box-shadow: 0 0 25px rgba(80,220,255,.7);
            opacity: 0;
        }

        .a011-jxmx {
            position: absolute;
            left: 50%;
            top: 58%;
            width: 100%;
            transform: translate(-50%,-50%) scale(.9);
            opacity: 0;
            z-index: 18;
            text-align: center;
            color: #fff;
            text-shadow:
                0 0 12px #fff,
                0 0 30px rgba(100,180,255,.9),
                0 0 60px rgba(60,120,255,.65);
        }

        .a011-titulo {
            font-size: 40px;
            font-weight: bold;
            letter-spacing: 10px;
        }

        .a011-numero {
            font-size: 270px;
            line-height: .85;
            font-weight: 900;
        }

        .a011-subtitulo {
            font-size: 28px;
            color: #ffd54f;
            margin-top: 18px;
        }

        .a011-senal {
            position: absolute;
            left: 50%;
            top: 76%;
            transform: translate(-50%,-50%) scale(.7);
            opacity: 0;
            z-index: 25;
            text-align: center;
            color: #aefaff;
            font-size: 22px;
            letter-spacing: 5px;
            text-shadow: 0 0 18px #55efff;
        }

        .a011-senal strong {
            display: block;
            margin-top: 10px;
            font-size: 42px;
            color: #fff;
            letter-spacing: 9px;
        }

        .a011-continuara {
            position: absolute;
            left: 50%;
            bottom: 9%;
            transform: translateX(-50%) scale(.8);
            opacity: 0;
            z-index: 30;
            color: #fff;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            text-shadow: 0 0 20px #fff;
        }

.a011-senal-titulo {
    color: #ffffff;
    text-shadow:
        0 0 8px #ffffff,
        0 0 18px #800080,
        0 0 30px #800080;
}

    `;

    contenedor.appendChild(estilo);

    const nebulosa = contenedor.querySelector(".a011-nebulosa");
    const planeta = contenedor.querySelector(".a011-planeta");
    const ovni = contenedor.querySelector(".a011-ovni");
    const compuerta = contenedor.querySelector(".a011-compuerta");
    const jxmx = contenedor.querySelector(".a011-jxmx");
    const senal = contenedor.querySelector(".a011-senal");
    const continuara = contenedor.querySelector(".a011-continuara");

    return nebulosa.animate(
        [
            { opacity: 0 },
            { opacity: .75 }
        ],
        { duration: 1000, fill: "forwards" }
    ).finished

    .then(() => planeta.animate(
        [
            {
                opacity: 0,
                transform: "scale(.75)"
            },
            {
                opacity: 1,
                transform: "scale(1)"
            }
        ],
        {
            duration: 1300,
            easing: "ease-out",
            fill: "forwards"
        }
    ).finished)

    .then(() => ovni.animate(
        [
            {
                opacity: 0,
                transform: "translate(-50%,-50%) scale(.08)"
            },
            {
                opacity: 1,
                transform: "translate(-50%,-50%) scale(.75)"
            },
            {
                opacity: 1,
                transform: "translate(-50%,-50%) scale(1)"
            }
        ],
        {
            duration: 1700,
            easing: "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards"
        }
    ).finished)

    .then(() => compuerta.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 700,
            fill: "forwards"
        }
    ).finished)

    .then(() => jxmx.animate(
        [
            {
                opacity: 0,
                transform: "translate(-50%,-50%) scale(.2)"
            },
            {
                opacity: 1,
                transform: "translate(-50%,-50%) scale(1)"
            }
        ],
        {
            duration: 1000,
            easing: "cubic-bezier(.2,.9,.2,1)",
            fill: "forwards"
        }
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve, 900)))

    .then(() => jxmx.animate(
        [
            {
                opacity: 1,
                transform: "translate(-50%,-50%) scale(1)"
            },
            {
                opacity: 1,
                transform: "translate(-50%,-42%) scale(.82)"
            },
            {
                opacity: 1,
                transform: "translate(-50%,-31%) scale(.62)"
            }
        ],
        {
            duration: 1800,
            easing: "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards"
        }
    ).finished)

    .then(() => senal.animate(
        [
            {
                opacity: 0,
                transform: "translate(-50%,-50%) scale(.7)"
            },
            {
                opacity: 1,
                transform: "translate(-50%,-50%) scale(1)"
            }
        ],
        {
            duration: 900,
            fill: "forwards"
        }
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve, 1100)))

    .then(() => jxmx.animate(
        [
            {
                opacity: 1,
                transform: "translate(-50%,-31%) scale(.62)"
            },
            {
                opacity: .85,
                transform: "translate(-50%,-35%) scale(.55)"
            },
            {
                opacity: .3,
                transform: "translate(-50%,-48%) scale(.3)"
            },
            {
                opacity: 0,
                transform: "translate(-50%,-60%) scale(.08)"
            }
        ],
        {
            duration: 1100,
            easing: "ease-in",
            fill: "forwards"
        }
    ).finished)

    .then(() => compuerta.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 500,
            fill: "forwards"
        }
    ).finished)

    .then(() => senal.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 500,
            fill: "forwards"
        }
    ).finished)

    .then(() => ovni.animate(
        [
            {
                opacity: 1,
                transform: "translate(-50%,-50%) scale(1)"
            },
            {
                opacity: 1,
                transform: "translate(-50%,-55%) scale(.75)"
            },
            {
                opacity: .7,
                transform: "translate(-50%,-62%) scale(.42)"
            },
            {
                opacity: 0,
                transform: "translate(-50%,-70%) scale(.12)"
            }
        ],
        {
            duration: 1900,
            easing: "cubic-bezier(.15,.7,.2,1)",
            fill: "forwards"
        }
    ).finished)

    .then(() => continuara.animate(
        [
            {
                opacity: 0,
                transform: "translateX(-50%) scale(.8)"
            },
            {
                opacity: 1,
                transform: "translateX(-50%) scale(1.05)"
            },
            {
                opacity: 1,
                transform: "translateX(-50%) scale(1)"
            }
        ],
        {
            duration: 900,
            fill: "forwards"
        }
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve, 1200)));

}
