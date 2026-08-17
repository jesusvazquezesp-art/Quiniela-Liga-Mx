export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A012 — EL PLANETA PIRATA

    Tercera parte de la historia:
    OVNI → nuevo planeta → estadio alienígena →
    equipos piratas → JXMX descubre que secuestraron el torneo.
    ============================================================
    */

    contenedor.innerHTML = `

        <div class="a012-contenedor">

            <!-- ESPACIO -->

            <div class="a012-estrellas">
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
            </div>

            <div class="a012-planeta-fondo"></div>


            <!-- ESTADIO ALIENÍGENA -->

            <div class="a012-estadio">

                <div class="a012-luces">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </div>

                <div class="a012-gradas"></div>

                <div class="a012-cancha">

                    <div class="a012-circulo"></div>

                    <div class="a012-linea"></div>

                </div>

                <div class="a012-letrero">
                    PLANETA PIRATA
                </div>

            </div>


            <!-- ALIENS / AFICIÓN -->

            <div class="a012-alien a1">
                <div class="a012-cabeza">
                    <b></b><b></b>
                </div>
                <div class="a012-antena ant1"></div>
                <div class="a012-antena ant2"></div>
            </div>

            <div class="a012-alien a2">
                <div class="a012-cabeza">
                    <b></b><b></b>
                </div>
                <div class="a012-antena ant1"></div>
                <div class="a012-antena ant2"></div>
            </div>

            <div class="a012-alien a3">
                <div class="a012-cabeza">
                    <b></b><b></b>
                </div>
                <div class="a012-antena ant1"></div>
                <div class="a012-antena ant2"></div>
            </div>

            <div class="a012-alien a4">
                <div class="a012-cabeza">
                    <b></b><b></b>
                </div>
                <div class="a012-antena ant1"></div>
                <div class="a012-antena ant2"></div>
            </div>

            <div class="a012-alien a5">
                <div class="a012-cabeza">
                    <b></b><b></b>
                </div>
                <div class="a012-antena ant1"></div>
                <div class="a012-antena ant2"></div>
            </div>


            <!-- JXMX -->

            <div class="a012-jxmx">

                <div class="a012-jxmx-titulo">
                    JORNADA
                </div>

                <div class="a012-jxmx-numero">
                    ${numeroJornada}
                </div>

                <div class="a012-jxmx-subtitulo">
                    Liga MX
                </div>

            </div>


            <!-- EQUIPOS PIRATAS -->

            <div class="a012-equipos">

                <div class="a012-equipo equipo1">
                    <span>🐯</span>
                    <strong>TIGRES GALÁCTICOS</strong>
                    <small>👽 👽</small>
                </div>

                <div class="a012-equipo equipo2">
                    <span>🦅</span>
                    <strong>ÁGUILAS CÓSMICAS</strong>
                    <small>👽 👽</small>
                </div>

                <div class="a012-equipo equipo3">
                    <span>🔵</span>
                    <strong>MONTERREY ESTELAR</strong>
                    <small>👽 👽</small>
                </div>

                <div class="a012-equipo equipo4">
                    <span>🌵</span>
                    <strong>JUÁREZ PIRATA</strong>
                    <small>👽 👽</small>
                </div>

                <div class="a012-equipo equipo5">
                    <span>🔴</span>
                    <strong>CHIVAS ESPACIALES</strong>
                    <small>👽 👽</small>
                </div>

            </div>


            <!-- TROFEO -->

            <div class="a012-trofeo">

                <div class="a012-trofeo-copa">
                    🏆
                </div>

                <div class="a012-trofeo-texto">
                    TORNEO MX
                </div>

            </div>


            <!-- MENSAJE -->

            <div class="a012-mensaje">

                <div>
                    TORNEO SECUESTRADO
                </div>

                <strong>
                    LIGA PIRATA
                </strong>

            </div>


            <!-- LÍDER -->

            <div class="a012-lider">

                <div class="a012-lider-alien">

                    <div class="ojo"></div>
                    <div class="ojo"></div>

                    <div class="antena izquierda"></div>
                    <div class="antena derecha"></div>

                </div>

                <div class="a012-lider-texto">
                    ¡EL TORNEO AHORA ES NUESTRO!
                </div>

            </div>


            <div class="a012-continuara">
                🛸 CONTINUARÁ...
            </div>

        </div>

    `;


    // ==========================================================
    // CSS
    // ==========================================================

    const estilo = document.createElement("style");

    estilo.textContent = `

        .a012-contenedor {

            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            box-sizing: border-box;

            background:
                radial-gradient(
                    circle at 50% 40%,
                    #241044 0%,
                    #0b1029 38%,
                    #030611 75%,
                    #000 100%
                );

            font-family: Arial, sans-serif;
            pointer-events: none;

        }


        /* ======================================================
           ESTRELLAS
        ====================================================== */

        .a012-estrellas {
            position: absolute;
            inset: 0;
            z-index: 1;
        }

        .a012-estrellas i {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 9px #fff;
            opacity: .8;
        }

        .a012-estrellas i:nth-child(1){left:5%;top:10%}
        .a012-estrellas i:nth-child(2){left:13%;top:28%}
        .a012-estrellas i:nth-child(3){left:21%;top:8%}
        .a012-estrellas i:nth-child(4){left:31%;top:22%}
        .a012-estrellas i:nth-child(5){left:40%;top:11%}
        .a012-estrellas i:nth-child(6){left:50%;top:25%}
        .a012-estrellas i:nth-child(7){left:60%;top:8%}
        .a012-estrellas i:nth-child(8){left:70%;top:20%}
        .a012-estrellas i:nth-child(9){left:81%;top:9%}
        .a012-estrellas i:nth-child(10){left:91%;top:28%}
        .a012-estrellas i:nth-child(11){left:8%;top:61%}
        .a012-estrellas i:nth-child(12){left:27%;top:70%}
        .a012-estrellas i:nth-child(13){left:67%;top:68%}
        .a012-estrellas i:nth-child(14){left:94%;top:65%}


        /* ======================================================
           PLANETA
        ====================================================== */

        .a012-planeta-fondo {

            position: absolute;

            width: 720px;
            height: 720px;

            right: -260px;
            bottom: -300px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle at 32% 28%,
                    #8060a8,
                    #392b62 35%,
                    #171633 65%,
                    #050713 100%
                );

            box-shadow:
                -30px -25px 100px
                rgba(150,90,255,.35);

            opacity: 0;

            z-index: 2;

        }


        /* ======================================================
           ESTADIO
        ====================================================== */

        .a012-estadio {

            position: absolute;

            left: 50%;
            bottom: 8%;

            width: 850px;
            height: 350px;

            transform:
                translateX(-50%)
                scale(.65);

            opacity: 0;

            z-index: 5;

        }

        .a012-gradas {

            position: absolute;

            left: 50%;
            bottom: 55px;

            width: 780px;
            height: 220px;

            transform: translateX(-50%);

            border-radius: 50% 50% 5% 5%;

            background:
                repeating-linear-gradient(
                    to bottom,
                    #29234c 0,
                    #29234c 6px,
                    #17162e 6px,
                    #17162e 15px
                );

            border:
                4px solid
                rgba(180,150,240,.45);

            box-shadow:
                inset 0 0 50px #000,
                0 0 50px rgba(120,70,220,.25);

        }

        .a012-cancha {

            position: absolute;

            left: 50%;
            bottom: 0;

            width: 550px;
            height: 120px;

            transform: translateX(-50%);

            border-radius: 50% 50% 0 0;

            background:
                linear-gradient(
                    to bottom,
                    #233f35,
                    #07130e
                );

            border:
                3px solid
                rgba(130,220,160,.4);

            z-index: 4;

        }

        .a012-circulo {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 85px;
            height: 42px;

            transform: translate(-50%,-50%);

            border:
                2px solid
                rgba(255,255,255,.5);

            border-radius: 50%;

        }

        .a012-linea {

            position: absolute;

            left: 50%;
            top: 0;

            width: 2px;
            height: 100%;

            background:
                rgba(255,255,255,.45);

        }

        .a012-luces {

            position: absolute;

            left: 50%;
            top: 0;

            width: 730px;

            transform: translateX(-50%);

            display: flex;
            justify-content: space-between;

            z-index: 10;

        }

        .a012-luces span {

            width: 14px;
            height: 46px;

            border-radius: 8px;

            background: #fff;

            box-shadow:
                0 0 12px #fff,
                0 0 28px rgba(160,120,255,.8);

        }

        .a012-letrero {

            position: absolute;

            left: 50%;
            bottom: 88px;

            transform: translateX(-50%);

            color: #dcbfff;

            font-size: 42px;
            font-weight: 900;

            letter-spacing: 8px;

            text-shadow:
                0 0 10px #fff,
                0 0 25px #a050ff,
                0 0 45px rgba(160,80,255,.7);

            z-index: 12;

        }


        /* ======================================================
           ALIENS
        ====================================================== */

        .a012-alien {

            position: absolute;

            width: 70px;
            height: 110px;

            opacity: 0;

            z-index: 15;

        }

        .a012-alien.a1 { left: 8%; bottom: 14%; }
        .a012-alien.a2 { left: 23%; bottom: 10%; }
        .a012-alien.a3 { right: 24%; bottom: 10%; }
        .a012-alien.a4 { right: 9%; bottom: 15%; }
        .a012-alien.a5 { left: 46%; bottom: 4%; }

        .a012-cabeza {

            position: absolute;

            left: 50%;
            top: 28px;

            width: 62px;
            height: 68px;

            transform: translateX(-50%);

            border-radius: 48% 48% 45% 45%;

            background:
                radial-gradient(
                    circle at 35% 25%,
                    #baffb2,
                    #52b86c 55%,
                    #174c2b 100%
                );

            border:
                2px solid
                rgba(190,255,190,.7);

            box-shadow:
                0 0 18px rgba(80,255,120,.3);

        }

        .a012-cabeza b {

            position: absolute;

            top: 27px;

            width: 14px;
            height: 20px;

            border-radius: 50%;

            background: #07100c;

            box-shadow:
                inset 3px 2px 5px rgba(180,255,230,.35);

        }

        .a012-cabeza b:first-child {
            left: 13px;
        }

        .a012-cabeza b:last-child {
            right: 13px;
        }

        .a012-antena {

            position: absolute;

            top: 8px;

            width: 3px;
            height: 25px;

            background: #63d87c;

            transform-origin: bottom;

        }

        .a012-antena::before {

            content: "";

            position: absolute;

            top: -7px;
            left: -3px;

            width: 9px;
            height: 9px;

            border-radius: 50%;

            background: #c8ff72;

            box-shadow: 0 0 10px #9dff50;

        }

        .a012-antena.ant1 {
            left: 22px;
            transform: rotate(-18deg);
        }

        .a012-antena.ant2 {
            right: 22px;
            transform: rotate(18deg);
        }


        /* ======================================================
           JXMX
        ====================================================== */

        .a012-jxmx {

            position: absolute;

            left: 50%;
            top: 52%;

            width: 100%;

            transform:
                translate(-50%,-50%)
                scale(.2);

            opacity: 0;

            z-index: 30;

            text-align: center;

            color: #fff;

            text-shadow:
                0 0 12px #fff,
                0 0 30px rgba(100,180,255,.9),
                0 0 60px rgba(80,80,255,.7);

        }

        .a012-jxmx-titulo {

            font-size: 40px;
            font-weight: bold;
            letter-spacing: 10px;

        }

        .a012-jxmx-numero {

            font-size: 280px;
            line-height: .85;
            font-weight: 900;

        }

        .a012-jxmx-subtitulo {

            font-size: 28px;
            color: #ffd54f;
            margin-top: 18px;

        }


        /* ======================================================
           EQUIPOS
        ====================================================== */

        .a012-equipos {

            position: absolute;

            left: 50%;
            top: 24%;

            width: 900px;

            transform:
                translateX(-50%)
                scale(.5);

            opacity: 0;

            z-index: 22;

            display: flex;

            flex-wrap: wrap;

            justify-content: center;

            gap: 14px;

        }

        .a012-equipo {

            min-width: 245px;

            padding: 13px 18px;

            border-radius: 14px;

            background:
                linear-gradient(
                    135deg,
                    rgba(20,12,45,.94),
                    rgba(63,28,91,.94)
                );

            border:
                2px solid
                rgba(205,160,255,.45);

            box-shadow:
                0 0 18px rgba(140,70,255,.22);

            text-align: center;

            color: #fff;

        }

        .a012-equipo span {

            display: inline-block;

            font-size: 29px;

            margin-right: 8px;

        }

        .a012-equipo strong {

            font-size: 16px;
            letter-spacing: 1px;

        }

        .a012-equipo small {

            display: block;

            margin-top: 5px;

            font-size: 17px;

            letter-spacing: 7px;

        }


        /* ======================================================
           TROFEO
        ====================================================== */

        .a012-trofeo {

            position: absolute;

            left: 50%;
            top: 49%;

            transform:
                translate(-50%,-50%)
                scale(.2);

            opacity: 0;

            z-index: 35;

            text-align: center;

        }

        .a012-trofeo-copa {

            font-size: 120px;

            filter:
                drop-shadow(0 0 20px #ffd54f);

        }

        .a012-trofeo-texto {

            margin-top: -8px;

            color: #ffd54f;

            font-size: 26px;
            font-weight: 900;

            letter-spacing: 5px;

            text-shadow:
                0 0 12px #ffd54f;

        }


        /* ======================================================
           MENSAJE
        ====================================================== */

        .a012-mensaje {

            position: absolute;

            left: 50%;
            top: 73%;

            transform:
                translate(-50%,-50%)
                scale(.7);

            opacity: 0;

            z-index: 40;

            text-align: center;

            color: #fff;

            font-size: 30px;
            font-weight: bold;

            letter-spacing: 6px;

            text-shadow:
                0 0 10px #fff,
                0 0 25px #ff5bff;

        }

        .a012-mensaje strong {

            display: block;

            margin-top: 10px;

            font-size: 52px;

            color: #ff9cff;

            letter-spacing: 10px;

            text-shadow:
                0 0 12px #fff,
                0 0 30px #c33cff;

        }


        /* ======================================================
           LÍDER
        ====================================================== */

        .a012-lider {

            position: absolute;

            left: 50%;
            top: 55%;

            transform:
                translate(-50%,-50%)
                scale(.4);

            opacity: 0;

            z-index: 50;

            text-align: center;

        }

        .a012-lider-alien {

            position: relative;

            width: 120px;
            height: 120px;

            margin: 0 auto 18px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle at 35% 25%,
                    #d2ffbd,
                    #4da864 60%,
                    #143b23
                );

            box-shadow:
                0 0 35px rgba(90,255,120,.5);

        }

        .a012-lider-alien .ojo {

            position: absolute;

            top: 47px;

            width: 25px;
            height: 35px;

            border-radius: 50%;

            background: #050807;

        }

        .a012-lider-alien .ojo:first-child {
            left: 25px;
        }

        .a012-lider-alien .ojo:nth-child(2) {
            right: 25px;
        }

        .a012-lider-alien .antena {

            position: absolute;

            top: -35px;

            width: 4px;
            height: 45px;

            background: #70d87c;

        }

        .a012-lider-alien .antena::after {

            content: "";

            position: absolute;

            top: -9px;
            left: -4px;

            width: 12px;
            height: 12px;

            border-radius: 50%;

            background: #d7ff6b;

            box-shadow: 0 0 15px #b8ff4d;

        }

        .a012-lider-alien .izquierda {
            left: 35px;
            transform: rotate(-15deg);
        }

        .a012-lider-alien .derecha {
            right: 35px;
            transform: rotate(15deg);
        }

        .a012-lider-texto {

            color: #ffb4ff;

            font-size: 28px;
            font-weight: 900;

            letter-spacing: 4px;

            text-shadow:
                0 0 12px #fff,
                0 0 30px #c43cff;

        }


        /* ======================================================
           FINAL
        ====================================================== */

        .a012-continuara {

            position: absolute;

            left: 50%;
            bottom: 7%;

            transform:
                translateX(-50%)
                scale(.8);

            opacity: 0;

            z-index: 60;

            color: #fff;

            font-size: 32px;
            font-weight: bold;

            letter-spacing: 5px;

            text-shadow:
                0 0 15px #fff,
                0 0 30px #a94cff;

        }

    `;

    contenedor.appendChild(estilo);


    // ==========================================================
    // ELEMENTOS
    // ==========================================================

    const planeta =
        contenedor.querySelector(".a012-planeta-fondo");

    const estadio =
        contenedor.querySelector(".a012-estadio");

    const aliens =
        contenedor.querySelectorAll(".a012-alien");

    const jxmx =
        contenedor.querySelector(".a012-jxmx");

    const equipos =
        contenedor.querySelector(".a012-equipos");

    const trofeo =
        contenedor.querySelector(".a012-trofeo");

    const mensaje =
        contenedor.querySelector(".a012-mensaje");

    const lider =
        contenedor.querySelector(".a012-lider");

    const continuara =
        contenedor.querySelector(".a012-continuara");


    // ==========================================================
    // SECUENCIA
    // ==========================================================

    return planeta.animate(

        [
            {
                opacity: 0,
                transform: "scale(.7)"
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

    ).finished

    .then(() => estadio.animate(

        [
            {
                opacity: 0,
                transform:
                    "translateX(-50%) scale(.45)"
            },
            {
                opacity: 1,
                transform:
                    "translateX(-50%) scale(.78)"
            },
            {
                opacity: 1,
                transform:
                    "translateX(-50%) scale(.72)"
            }
        ],

        {
            duration: 1500,
            easing:
                "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards"
        }

    ).finished)

    .then(() => Promise.all(

        [...aliens].map((alien, i) =>
            alien.animate(

                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(40px) scale(.7)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0) scale(1)"
                    }
                ],

                {
                    duration: 700,
                    delay: i * 120,
                    easing: "ease-out",
                    fill: "forwards"
                }

            ).finished
        )

    ))

    .then(() => jxmx.animate(

        [
            {
                opacity: 0,
                transform:
                    "translate(-50%,-50%) scale(.2)"
            },
            {
                opacity: 1,
                transform:
                    "translate(-50%,-50%) scale(1.05)"
            },
            {
                opacity: 1,
                transform:
                    "translate(-50%,-50%) scale(1)"
            }
        ],

        {
            duration: 1100,
            easing:
                "cubic-bezier(.2,.9,.2,1)",
            fill: "forwards"
        }

    ).finished)

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 1000)
    ))

    .then(() => equipos.animate(

        [
            {
                opacity: 0,
                transform:
                    "translateX(-50%) scale(.3)"
            },
            {
                opacity: 1,
                transform:
                    "translateX(-50%) scale(1)"
            }
        ],

        {
            duration: 1300,
            easing: "ease-out",
            fill: "forwards"
        }

    ).finished)

    .then(() => trofeo.animate(

        [
            {
                opacity: 0,
                transform:
                    "translate(-50%,-50%) scale(.2)"
            },
            {
                opacity: 1,
                transform:
                    "translate(-50%,-50%) scale(1.12)"
            },
            {
                opacity: 1,
                transform:
                    "translate(-50%,-50%) scale(1)"
            }
        ],

        {
            duration: 1000,
            fill: "forwards"
        }

    ).finished)

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 1000)
    ))

    .then(() => mensaje.animate(

        [
            {
                opacity: 0,
                transform:
                    "translate(-50%,-50%) scale(.7)"
            },
            {
                opacity: 1,
                transform:
                    "translate(-50%,-50%) scale(1.08)"
            },
            {
                opacity: 1,
                transform:
                    "translate(-50%,-50%) scale(1)"
            }
        ],

        {
            duration: 900,
            fill: "forwards"
        }

    ).finished)

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 1100)
    ))

    .then(() => {

        equipos.animate(
            [
                {
                    opacity: 1,
                    transform:
                        "translateX(-50%) scale(1)"
                },
                {
                    opacity: .15,
                    transform:
                        "translateX(-50%) scale(.92)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateX(-50%) scale(1)"
                }
            ],
            {
                duration: 900,
                iterations: 2,
                fill: "forwards"
            }
        );

        return lider.animate(

            [
                {
                    opacity: 0,
                    transform:
                        "translate(-50%,-50%) scale(.35)"
                },
                {
                    opacity: 1,
                    transform:
                        "translate(-50%,-50%) scale(1.05)"
                },
                {
                    opacity: 1,
                    transform:
                        "translate(-50%,-50%) scale(1)"
                }
            ],

            {
                duration: 1200,
                easing: "ease-out",
                fill: "forwards"
            }

        ).finished;

    })

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 1300)
    ))

    .then(() => Promise.all([

        lider.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            {
                duration: 600,
                fill: "forwards"
            }
        ).finished,

        mensaje.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            {
                duration: 600,
                fill: "forwards"
            }
        ).finished,

        trofeo.animate(
            [
                {
                    opacity: 1,
                    transform:
                        "translate(-50%,-50%) scale(1)"
                },
                {
                    opacity: 0,
                    transform:
                        "translate(-50%,-50%) scale(.8)"
                }
            ],
            {
                duration: 700,
                fill: "forwards"
            }
        ).finished

    ]))

    .then(() => continuara.animate(

        [
            {
                opacity: 0,
                transform:
                    "translateX(-50%) scale(.8)"
            },
            {
                opacity: 1,
                transform:
                    "translateX(-50%) scale(1.05)"
            },
            {
                opacity: 1,
                transform:
                    "translateX(-50%) scale(1)"
            }
        ],

        {
            duration: 900,
            fill: "forwards"
        }

    ).finished)

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 1200)
    ));

}
