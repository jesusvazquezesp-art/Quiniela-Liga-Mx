export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A013 — EL TORNEO PIRATA

    Continuación de A012:
    Los aliens revelan su torneo pirata.
    La JXMX descubre que copiaron todo el campeonato.
    Los cinco equipos salen al campo.
    Justo cuando comienza el reto, aparece un OVNI enorme.
    ============================================================
    */

    contenedor.innerHTML = `

        <div class="a013-contenedor">

            <div class="a013-estrellas">
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i>
            </div>

            <div class="a013-planeta"></div>

            <div class="a013-estadio">

                <div class="a013-luces">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </div>

                <div class="a013-gradas"></div>

                <div class="a013-cancha">
                    <div class="a013-circulo"></div>
                    <div class="a013-linea"></div>
                </div>

                <div class="a013-letrero">
                    TORNEO PIRATA
                </div>

            </div>


            <!-- ALIENS -->

            <div class="a013-alien alien1">
                <div class="cabeza"><b></b><b></b></div>
                <div class="antena izquierda"></div>
                <div class="antena derecha"></div>
            </div>

            <div class="a013-alien alien2">
                <div class="cabeza"><b></b><b></b></div>
                <div class="antena izquierda"></div>
                <div class="antena derecha"></div>
            </div>

            <div class="a013-alien alien3">
                <div class="cabeza"><b></b><b></b></div>
                <div class="antena izquierda"></div>
                <div class="antena derecha"></div>
            </div>

            <div class="a013-alien alien4">
                <div class="cabeza"><b></b><b></b></div>
                <div class="antena izquierda"></div>
                <div class="antena derecha"></div>
            </div>


            <!-- JXMX -->

            <div class="a013-jxmx">

                <div class="titulo">
                    JORNADA
                </div>

                <div class="numero">
                    ${numeroJornada}
                </div>

                <div class="subtitulo">
                    Liga MX
                </div>

            </div>


            <!-- TABLERO -->

            <div class="a013-tablero">

                <div class="encabezado">
                    🏴‍☠️ TORNEO PIRATA GALÁCTICO
                </div>

                <div class="equipos">

                    <div>🐯 TIGRES GALÁCTICOS 👽</div>
                    <div>🦅 ÁGUILAS CÓSMICAS 👽</div>
                    <div>🔵 MONTERREY ESTELAR 👽</div>
                    <div>🌵 JUÁREZ PIRATA 👽</div>
                    <div>🔴 CHIVAS ESPACIALES 👽</div>

                </div>

            </div>


            <!-- MENSAJE -->

            <div class="a013-reto">

                <div>
                    SI QUIERES RECUPERAR
                </div>

                <strong>
                    TU TORNEO...
                </strong>

            </div>


            <!-- LÍDER -->

            <div class="a013-lider">

                <div class="lider-cabeza">

                    <span></span>
                    <span></span>

                    <i class="antena a"></i>
                    <i class="antena b"></i>

                </div>

                <div class="lider-texto">
                    ¡TENDRÁS QUE DERROTARNOS!
                </div>

            </div>


            <!-- TROFEO -->

            <div class="a013-trofeo">
                🏆
            </div>


            <!-- OVNI GIGANTE -->

            <div class="a013-ovni-gigante">

                <div class="ovni-cuerpo">

                    <div class="ovni-cabina"></div>

                    <div class="ovni-luces">
                        <span></span><span></span><span></span>
                        <span></span><span></span><span></span>
                        <span></span>
                    </div>

                </div>

            </div>


            <div class="a013-alerta">
                ⚠️ SEÑAL DESCONOCIDA
            </div>


            <div class="a013-final">
                CONTINUARÁ...
            </div>

        </div>

    `;


    // ==========================================================
    // CSS
    // ==========================================================

    const estilo = document.createElement("style");

    estilo.textContent = `

        .a013-contenedor {

            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;

            box-sizing: border-box;

            background:
                radial-gradient(
                    circle at 50% 42%,
                    #271044 0%,
                    #0b1029 40%,
                    #02050d 78%,
                    #000 100%
                );

            font-family: Arial, sans-serif;

            pointer-events: none;

        }


        /* ======================================================
           ESTRELLAS
        ====================================================== */

        .a013-estrellas {

            position: absolute;
            inset: 0;
            z-index: 1;

        }

        .a013-estrellas i {

            position: absolute;

            width: 4px;
            height: 4px;

            border-radius: 50%;

            background: #fff;

            box-shadow:
                0 0 9px #fff;

            opacity: .8;

        }

        .a013-estrellas i:nth-child(1){left:5%;top:12%}
        .a013-estrellas i:nth-child(2){left:14%;top:29%}
        .a013-estrellas i:nth-child(3){left:22%;top:8%}
        .a013-estrellas i:nth-child(4){left:31%;top:23%}
        .a013-estrellas i:nth-child(5){left:42%;top:11%}
        .a013-estrellas i:nth-child(6){left:52%;top:26%}
        .a013-estrellas i:nth-child(7){left:63%;top:8%}
        .a013-estrellas i:nth-child(8){left:73%;top:22%}
        .a013-estrellas i:nth-child(9){left:84%;top:10%}
        .a013-estrellas i:nth-child(10){left:94%;top:28%}
        .a013-estrellas i:nth-child(11){left:8%;top:64%}
        .a013-estrellas i:nth-child(12){left:30%;top:72%}
        .a013-estrellas i:nth-child(13){left:68%;top:68%}
        .a013-estrellas i:nth-child(14){left:91%;top:65%}


        /* ======================================================
           PLANETA
        ====================================================== */

        .a013-planeta {

            position: absolute;

            right: -260px;
            bottom: -290px;

            width: 720px;
            height: 720px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle at 30% 28%,
                    #8764ad,
                    #3b2d65 38%,
                    #171632 65%,
                    #040610 100%
                );

            box-shadow:
                -30px -25px 100px
                rgba(150,90,255,.3);

            z-index: 2;

        }


        /* ======================================================
           ESTADIO
        ====================================================== */

        .a013-estadio {

            position: absolute;

            left: 50%;
            bottom: 8%;

            width: 850px;
            height: 350px;

            transform:
                translateX(-50%)
                scale(.68);

            opacity: 0;

            z-index: 5;

        }

        .a013-gradas {

            position: absolute;

            left: 50%;
            bottom: 55px;

            width: 780px;
            height: 220px;

            transform: translateX(-50%);

            border-radius:
                50% 50% 5% 5%;

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

        .a013-cancha {

            position: absolute;

            left: 50%;
            bottom: 0;

            width: 550px;
            height: 120px;

            transform: translateX(-50%);

            border-radius:
                50% 50% 0 0;

            background:
                linear-gradient(
                    to bottom,
                    #233f35,
                    #07130e
                );

            border:
                3px solid
                rgba(130,220,160,.4);

        }

        .a013-circulo {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 85px;
            height: 42px;

            transform:
                translate(-50%,-50%);

            border:
                2px solid
                rgba(255,255,255,.5);

            border-radius: 50%;

        }

        .a013-linea {

            position: absolute;

            left: 50%;
            top: 0;

            width: 2px;
            height: 100%;

            background:
                rgba(255,255,255,.45);

        }

        .a013-luces {

            position: absolute;

            left: 50%;
            top: 0;

            width: 730px;

            transform:
                translateX(-50%);

            display: flex;

            justify-content:
                space-between;

            z-index: 10;

        }

        .a013-luces span {

            width: 14px;
            height: 46px;

            border-radius: 8px;

            background: #fff;

            box-shadow:
                0 0 12px #fff,
                0 0 28px rgba(160,120,255,.8);

        }

        .a013-letrero {

            position: absolute;

            left: 50%;
            bottom: 88px;

            transform:
                translateX(-50%);

            color: #dcbfff;

            font-size: 42px;
            font-weight: 900;

            letter-spacing: 8px;

            text-shadow:
                0 0 10px #fff,
                0 0 25px #a050ff,
                0 0 45px rgba(160,80,255,.7);

        }


        /* ======================================================
           ALIENS
        ====================================================== */

        .a013-alien {

            position: absolute;

            width: 70px;
            height: 110px;

            opacity: 0;

            z-index: 18;

        }

        .a013-alien.alien1 {
            left: 11%;
            bottom: 13%;
        }

        .a013-alien.alien2 {
            left: 27%;
            bottom: 8%;
        }

        .a013-alien.alien3 {
            right: 27%;
            bottom: 8%;
        }

        .a013-alien.alien4 {
            right: 11%;
            bottom: 13%;
        }

        .a013-alien .cabeza {

            position: absolute;

            left: 50%;
            top: 28px;

            width: 62px;
            height: 68px;

            transform:
                translateX(-50%);

            border-radius:
                48% 48% 45% 45%;

            background:
                radial-gradient(
                    circle at 35% 25%,
                    #c9ffbd,
                    #51b86b 55%,
                    #174b2a 100%
                );

            border:
                2px solid
                rgba(190,255,190,.7);

        }

        .a013-alien .cabeza b {

            position: absolute;

            top: 27px;

            width: 14px;
            height: 20px;

            border-radius: 50%;

            background: #07100c;

        }

        .a013-alien .cabeza b:first-child {
            left: 13px;
        }

        .a013-alien .cabeza b:last-child {
            right: 13px;
        }

        .a013-alien .antena {

            position: absolute;

            top: 8px;

            width: 3px;
            height: 25px;

            background: #63d87c;

            transform-origin:
                bottom;

        }

        .a013-alien .antena::before {

            content: "";

            position: absolute;

            top: -7px;
            left: -3px;

            width: 9px;
            height: 9px;

            border-radius: 50%;

            background: #c8ff72;

            box-shadow:
                0 0 10px #9dff50;

        }

        .a013-alien .antena.izquierda {
            left: 22px;
            transform: rotate(-18deg);
        }

        .a013-alien .antena.derecha {
            right: 22px;
            transform: rotate(18deg);
        }


        /* ======================================================
           JXMX
        ====================================================== */

        .a013-jxmx {

            position: absolute;

            left: 50%;
            top: 53%;

            width: 100%;

            transform:
                translate(-50%,-50%)
                scale(.2);

            opacity: 0;

            z-index: 35;

            text-align: center;

            color: #fff;

            text-shadow:
                0 0 12px #fff,
                0 0 30px rgba(100,180,255,.9),
                0 0 60px rgba(80,80,255,.7);

        }

        .a013-jxmx .titulo {

            font-size: 40px;

            font-weight: bold;

            letter-spacing: 10px;

        }

        .a013-jxmx .numero {

            font-size: 280px;

            line-height: .85;

            font-weight: 900;

        }

        .a013-jxmx .subtitulo {

            font-size: 28px;

            color: #ffd54f;

            margin-top: 18px;

        }


        /* ======================================================
           TABLERO
        ====================================================== */

        .a013-tablero {

            position: absolute;

            left: 50%;
            top: 24%;

            width: 850px;

            transform:
                translateX(-50%)
                scale(.3);

            opacity: 0;

            z-index: 28;

            padding: 18px;

            border-radius: 18px;

            background:
                rgba(9,7,27,.94);

            border:
                2px solid
                rgba(210,160,255,.5);

            box-shadow:
                0 0 35px
                rgba(170,70,255,.3);

            color: #fff;

        }

        .a013-tablero .encabezado {

            text-align: center;

            font-size: 27px;

            font-weight: 900;

            letter-spacing: 3px;

            color: #ffd36b;

            text-shadow:
                0 0 12px #ffae32;

            margin-bottom: 14px;

        }

        .a013-tablero .equipos {

            display: grid;

            grid-template-columns:
                repeat(5, 1fr);

            gap: 9px;

        }

        .a013-tablero .equipos div {

            padding: 12px 5px;

            min-height: 58px;

            display: flex;

            align-items: center;

            justify-content: center;

            text-align: center;

            border-radius: 10px;

            background:
                linear-gradient(
                    135deg,
                    #16112c,
                    #4a1f61
                );

            border:
                1px solid
                rgba(220,170,255,.45);

            font-size: 14px;

            font-weight: bold;

        }


        /* ======================================================
           RETO
        ====================================================== */

        .a013-reto {

            position: absolute;

            left: 50%;
            top: 72%;

            transform:
                translate(-50%,-50%)
                scale(.7);

            opacity: 0;

            z-index: 45;

            text-align: center;

            color: #fff;

            font-size: 30px;

            font-weight: bold;

            letter-spacing: 5px;

            text-shadow:
                0 0 12px #fff,
                0 0 30px #d044ff;

        }

        .a013-reto strong {

            display: block;

            margin-top: 10px;

            font-size: 54px;

            color: #ff9cff;

            letter-spacing: 9px;

        }


        /* ======================================================
           LÍDER
        ====================================================== */

        .a013-lider {

            position: absolute;

            left: 50%;
            top: 53%;

            transform:
                translate(-50%,-50%)
                scale(.35);

            opacity: 0;

            z-index: 50;

            text-align: center;

        }

        .a013-lider .lider-cabeza {

            position: relative;

            width: 125px;
            height: 125px;

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
                0 0 35px
                rgba(90,255,120,.5);

        }

        .a013-lider .lider-cabeza span {

            position: absolute;

            top: 47px;

            width: 25px;
            height: 35px;

            border-radius: 50%;

            background: #050807;

        }

        .a013-lider .lider-cabeza span:first-child {
            left: 25px;
        }

        .a013-lider .lider-cabeza span:nth-child(2) {
            right: 25px;
        }

        .a013-lider .antena {

            position: absolute;

            top: -35px;

            width: 4px;
            height: 45px;

            background: #70d87c;

        }

        .a013-lider .antena::after {

            content: "";

            position: absolute;

            top: -9px;
            left: -4px;

            width: 12px;
            height: 12px;

            border-radius: 50%;

            background: #d7ff6b;

            box-shadow:
                0 0 15px #b8ff4d;

        }

        .a013-lider .antena.a {
            left: 36px;
            transform: rotate(-15deg);
        }

        .a013-lider .antena.b {
            right: 36px;
            transform: rotate(15deg);
        }

        .a013-lider .lider-texto {

            color: #ffb4ff;

            font-size: 28px;

            font-weight: 900;

            letter-spacing: 4px;

            text-shadow:
                0 0 12px #fff,
                0 0 30px #c43cff;

        }


        /* ======================================================
           TROFEO
        ====================================================== */

        .a013-trofeo {

            position: absolute;

            left: 50%;
            top: 49%;

            transform:
                translate(-50%,-50%)
                scale(.2);

            opacity: 0;

            z-index: 38;

            font-size: 130px;

            filter:
                drop-shadow(
                    0 0 20px #ffd54f
                );

        }


        /* ======================================================
           OVNI GIGANTE
        ====================================================== */

        .a013-ovni-gigante {

            position: absolute;

            left: 50%;
            top: -230px;

            width: 800px;
            height: 500px;

            transform:
                translateX(-50%)
                scale(.18);

            opacity: 0;

            z-index: 70;

        }

        .a013-ovni-gigante .ovni-cuerpo {

            position: absolute;

            left: 50%;
            top: 0;

            width: 680px;
            height: 240px;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background:
                radial-gradient(
                    ellipse at 50% 25%,
                    #e9f6ff,
                    #8598aa 35%,
                    #374657 65%,
                    #080d15 100%
                );

            border:
                6px solid
                rgba(220,245,255,.9);

            box-shadow:
                0 0 45px
                rgba(150,220,255,.8),

                0 0 130px
                rgba(80,140,255,.5);

        }

        .a013-ovni-gigante .ovni-cabina {

            position: absolute;

            left: 50%;
            top: -80px;

            width: 260px;
            height: 135px;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background:
                radial-gradient(
                    ellipse,
                    #f1ffff,
                    #68a8c5 55%,
                    #14364b 100%
                );

            border:
                5px solid
                rgba(230,250,255,.95);

            box-shadow:
                0 0 40px
                rgba(100,230,255,.9);

        }

        .a013-ovni-gigante .ovni-luces {

            position: absolute;

            left: 50%;
            bottom: 20px;

            width: 530px;

            transform:
                translateX(-50%);

            display: flex;

            justify-content:
                space-between;

        }

        .a013-ovni-gigante .ovni-luces span {

            width: 23px;
            height: 23px;

            border-radius: 50%;

            background:
                #72eaff;

            box-shadow:
                0 0 12px #72eaff,
                0 0 30px
                rgba(80,220,255,.95);

        }


        /* ======================================================
           ALERTA / FINAL
           ====================================================== */

        .a013-alerta {

            position: absolute;

            left: 50%;
            top: 24%;

            transform:
                translate(-50%,-50%)
                scale(.8);

            opacity: 0;

            z-index: 85;

            color: #fff;

            font-size: 30px;

            font-weight: 900;

            letter-spacing: 5px;

            text-shadow:
                0 0 10px #fff,
                0 0 25px #ff3d3d;

        }

        .a013-final {

            position: absolute;

            left: 50%;
            bottom: 7%;

            transform:
                translateX(-50%)
                scale(.8);

            opacity: 0;

            z-index: 90;

            color: #fff;

            font-size: 34px;

            font-weight: bold;

            letter-spacing: 6px;

            text-shadow:
                0 0 15px #fff,
                0 0 30px #a94cff;

        }

    `;

    contenedor.appendChild(estilo);


    // ==========================================================
    // ELEMENTOS
    // ==========================================================

    const estadio =
        contenedor.querySelector(".a013-estadio");

    const aliens =
        contenedor.querySelectorAll(".a013-alien");

    const jxmx =
        contenedor.querySelector(".a013-jxmx");

    const tablero =
        contenedor.querySelector(".a013-tablero");

    const reto =
        contenedor.querySelector(".a013-reto");

    const lider =
        contenedor.querySelector(".a013-lider");

    const trofeo =
        contenedor.querySelector(".a013-trofeo");

    const ovni =
        contenedor.querySelector(".a013-ovni-gigante");

    const alerta =
        contenedor.querySelector(".a013-alerta");

    const final =
        contenedor.querySelector(".a013-final");


    // ==========================================================
    // SECUENCIA
    // ==========================================================

    return estadio.animate(

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
                    "translateX(-50%) scale(.68)"
            }
        ],

        {
            duration: 1400,
            easing:
                "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards"
        }

    ).finished

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
                    duration: 650,
                    delay: i * 130,
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
            duration: 1000,
            easing:
                "cubic-bezier(.2,.9,.2,1)",
            fill: "forwards"
        }

    ).finished)

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 900)
    ))

    .then(() => tablero.animate(

        [
            {
                opacity: 0,
                transform:
                    "translateX(-50%) scale(.25)"
            },
            {
                opacity: 1,
                transform:
                    "translateX(-50%) scale(1.03)"
            },
            {
                opacity: 1,
                transform:
                    "translateX(-50%) scale(1)"
            }
        ],

        {
            duration: 1200,
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
            duration: 900,
            fill: "forwards"
        }

    ).finished)

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 900)
    ))

    .then(() => reto.animate(

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
        setTimeout(resolve, 900)
    ))

    .then(() => lider.animate(

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
            duration: 1100,
            easing: "ease-out",
            fill: "forwards"
        }

    ).finished)

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 1200)
    ))

    .then(() => Promise.all([

        tablero.animate(
            [
                {
                    opacity: 1,
                    transform:
                        "translateX(-50%) scale(1)"
                },
                {
                    opacity: .25,
                    transform:
                        "translateX(-50%) scale(.96)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateX(-50%) scale(1)"
                }
            ],
            {
                duration: 700,
                iterations: 2,
                fill: "forwards"
            }
        ).finished,

        lider.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            {
                duration: 700,
                fill: "forwards"
            }
        ).finished,

        reto.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            {
                duration: 700,
                fill: "forwards"
            }
        ).finished

    ]))

    .then(() => {

        return ovni.animate(

            [
                {
                    opacity: 0,
                    transform:
                        "translateX(-50%) translateY(-50px) scale(.18)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateX(-50%) translateY(180px) scale(.72)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateX(-50%) translateY(280px) scale(1)"
                }
            ],

            {
                duration: 2200,
                easing:
                    "cubic-bezier(.15,.75,.2,1)",
                fill: "forwards"
            }

        ).finished;

    })

    .then(() => alerta.animate(

        [
            {
                opacity: 0,
                transform:
                    "translate(-50%,-50%) scale(.6)"
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
            duration: 800,
            fill: "forwards"
        }

    ).finished)

    .then(() => new Promise(resolve =>
        setTimeout(resolve, 1200)
    ))

    .then(() => ovni.animate(

        [
            {
                opacity: 1,
                transform:
                    "translateX(-50%) translateY(280px) scale(1)"
            },
            {
                opacity: .8,
                transform:
                    "translateX(-50%) translateY(130px) scale(.7)"
            },
            {
                opacity: .35,
                transform:
                    "translateX(-50%) translateY(-20px) scale(.38)"
            },
            {
                opacity: 0,
                transform:
                    "translateX(-50%) translateY(-180px) scale(.12)"
            }
        ],

        {
            duration: 1900,
            easing:
                "cubic-bezier(.15,.7,.2,1)",
            fill: "forwards"
        }

    ).finished)

    .then(() => final.animate(

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
        setTimeout(resolve, 1300)
    ));

}
