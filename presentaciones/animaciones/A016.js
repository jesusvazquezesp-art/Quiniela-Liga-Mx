export function ejecutar(contenedor, numeroJornada) {

    contenedor.innerHTML = `

        <div class="a015">

            <div class="stars">
                ${Array.from({length:18},(_,i)=>`<i class="s${i+1}"></i>`).join("")}
            </div>

            <div class="planet"></div>

            <div class="stadium">

                <div class="roof"></div>

                <div class="stands"></div>

                <div class="field">
                    <div class="circle"></div>
                    <div class="line"></div>
                </div>

                <div class="sign">
                    ESTADIO INTERGALÁCTICO
                </div>

            </div>

            <div class="aliens">
                <span>👽</span>
                <span>👽</span>
                <span>👽</span>
                <span>👽</span>
                <span>👽</span>
                <span>👽</span>
                <span>👽</span>
            </div>

            <div class="jxmx">

                <div>JORNADA</div>

                <strong>${numeroJornada}</strong>

                <small>Liga MX</small>

            </div>

            <div class="signal">

                <div>
                    TRANSMISIÓN ENTRANTE
                </div>

                <strong>
                    MÉXICO
                </strong>

            </div>

            <div class="screen">

                <div class="screen-title">
                    📡 CONEXIÓN ESTABLECIDA
                </div>

                <div class="screen-message">
                    NO ESTÁN SOLOS
                </div>

            </div>

            <div class="portal"></div>

            <div class="silhouette">

                <div class="head">
                    <b></b>
                    <b></b>
                </div>

                <div class="body"></div>

                <div class="antenna left"></div>
                <div class="antenna right"></div>

            </div>

            <div class="mexico">

                <div class="mx-symbol">
                    🇲🇽
                </div>

                <div class="mx-text">
                    MÉXICO
                </div>

            </div>

            <div class="final">
                CONTINUARÁ...
            </div>

        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `

        .a015 {
            position:relative;
            width:100%;
            height:100%;
            overflow:hidden;
            box-sizing:border-box;

            background:
                radial-gradient(
                    circle at 50% 38%,
                    #25103f 0%,
                    #0b1028 40%,
                    #02040c 78%,
                    #000 100%
                );

            font-family:Arial,sans-serif;
            pointer-events:none;
        }

        .stars {
            position:absolute;
            inset:0;
        }

        .stars i {
            position:absolute;
            width:4px;
            height:4px;
            border-radius:50%;
            background:#fff;
            box-shadow:0 0 9px #fff;
            opacity:.75;
        }

        .s1{left:4%;top:11%}
        .s2{left:10%;top:32%}
        .s3{left:18%;top:8%}
        .s4{left:27%;top:24%}
        .s5{left:36%;top:10%}
        .s6{left:46%;top:29%}
        .s7{left:56%;top:8%}
        .s8{left:65%;top:21%}
        .s9{left:75%;top:11%}
        .s10{left:85%;top:30%}
        .s11{left:94%;top:9%}
        .s12{left:8%;top:67%}
        .s13{left:22%;top:76%}
        .s14{left:41%;top:69%}
        .s15{left:58%;top:78%}
        .s16{left:74%;top:69%}
        .s17{left:88%;top:75%}
        .s18{left:96%;top:58%}

        .planet {
            position:absolute;
            width:680px;
            height:680px;
            right:-280px;
            bottom:-300px;
            border-radius:50%;

            background:
                radial-gradient(
                    circle at 30% 27%,
                    #8b6cb0,
                    #392d62 40%,
                    #16152e 67%,
                    #03050c 100%
                );

            box-shadow:
                -30px -25px 100px rgba(150,90,255,.3);

            opacity:0;
        }

        .stadium {
            position:absolute;
            left:50%;
            bottom:7%;
            width:850px;
            height:350px;

            transform:
                translateX(-50%)
                scale(.65);

            opacity:0;
            z-index:5;
        }

        .roof {
            position:absolute;
            left:50%;
            top:0;
            width:730px;
            height:130px;
            transform:translateX(-50%);

            border-radius:50%;

            background:
                linear-gradient(
                    #282242,
                    #0a0a15
                );

            border:4px solid rgba(180,150,240,.4);

            box-shadow:
                0 0 50px rgba(150,80,255,.2);
        }

        .stands {
            position:absolute;
            left:50%;
            bottom:55px;

            width:780px;
            height:220px;

            transform:translateX(-50%);

            border-radius:50% 50% 5% 5%;

            background:
                repeating-linear-gradient(
                    to bottom,
                    #29234c 0,
                    #29234c 7px,
                    #121020 7px,
                    #121020 16px
                );

            border:4px solid rgba(180,150,240,.4);

            box-shadow:
                inset 0 0 50px #000;
        }

        .field {
            position:absolute;
            left:50%;
            bottom:0;

            width:550px;
            height:120px;

            transform:translateX(-50%);

            border-radius:50% 50% 0 0;

            background:
                linear-gradient(
                    #234837,
                    #07130e
                );

            border:3px solid rgba(130,220,160,.4);
        }

        .circle {
            position:absolute;
            left:50%;
            top:50%;

            width:85px;
            height:42px;

            transform:translate(-50%,-50%);

            border:2px solid rgba(255,255,255,.5);
            border-radius:50%;
        }

        .line {
            position:absolute;
            left:50%;
            top:0;
            width:2px;
            height:100%;
            background:rgba(255,255,255,.45);
        }

        .sign {
            position:absolute;
            left:50%;
            bottom:88px;

            transform:translateX(-50%);

            color:#dfc7ff;

            font-size:38px;
            font-weight:900;

            letter-spacing:7px;

            white-space:nowrap;

            text-shadow:
                0 0 10px #fff,
                0 0 28px #9b45ff;
        }

        .aliens {
            position:absolute;
            left:50%;
            bottom:24%;

            transform:
                translateX(-50%)
                scale(.5);

            display:flex;
            gap:42px;

            opacity:0;

            z-index:15;

            font-size:44px;

            filter:
                drop-shadow(
                    0 0 10px rgba(100,255,150,.5)
                );
        }

        .jxmx {
            position:absolute;
            left:50%;
            top:53%;

            width:100%;

            transform:
                translate(-50%,-50%)
                scale(.2);

            opacity:0;

            z-index:25;

            text-align:center;

            color:#fff;

            text-shadow:
                0 0 12px #fff,
                0 0 30px #65d5ff,
                0 0 60px #5360ff;
        }

        .jxmx div {
            font-size:40px;
            font-weight:bold;
            letter-spacing:10px;
        }

        .jxmx strong {
            display:block;
            font-size:270px;
            line-height:.82;
            font-weight:900;
        }

        .jxmx small {
            font-size:28px;
            color:#ffd54f;
        }

        .signal {
            position:absolute;
            left:50%;
            top:23%;

            transform:
                translate(-50%,-50%)
                scale(.6);

            opacity:0;

            z-index:35;

            text-align:center;

            color:#fff;

            font-size:26px;
            font-weight:bold;

            letter-spacing:5px;

            text-shadow:
                0 0 10px #fff,
                0 0 25px #62dfff;
        }

        .signal strong {
            display:block;
            margin-top:8px;

            font-size:58px;

            color:#fff;

            letter-spacing:12px;

            text-shadow:
                0 0 12px #fff,
                0 0 30px #00cfff,
                0 0 55px #0077ff;
        }

        .screen {
            position:absolute;
            left:50%;
            top:25%;

            width:800px;

            transform:
                translate(-50%,-50%)
                scale(.4);

            opacity:0;

            z-index:40;

            padding:20px;

            text-align:center;

            border-radius:18px;

            background:
                rgba(5,8,25,.94);

            border:2px solid rgba(120,220,255,.55);

            box-shadow:
                0 0 35px rgba(40,180,255,.3);
        }

        .screen-title {
            color:#7eefff;

            font-size:22px;
            font-weight:bold;

            letter-spacing:4px;
        }

        .screen-message {
            margin-top:18px;

            color:#fff;

            font-size:25px;
            font-weight:900;

            letter-spacing:7px;

            text-shadow:
                0 0 12px #fff,
                0 0 30px #00cfff;
        }

        .portal {
            position:absolute;
            left:50%;
            top:48%;

            width:300px;
            height:300px;

            transform:
                translate(-50%,-50%)
                scale(.05);

            opacity:0;

            border-radius:50%;

            border:7px solid rgba(210,235,255,.9);

            box-shadow:
                0 0 20px #fff,
                0 0 55px #3dcfff,
                0 0 110px rgba(30,150,255,.65),
                inset 0 0 45px #248fff;

            z-index:45;
        }

        .silhouette {
            position:absolute;
            left:50%;
            top:48%;

            width:220px;
            height:300px;

            transform:
                translate(-50%,-50%)
                scale(.08);

            opacity:0;

            z-index:50;
        }

        .head {
            position:absolute;
            left:50%;
            top:0;

            width:125px;
            height:125px;

            transform:translateX(-50%);

            border-radius:50%;

            background:
                radial-gradient(
                    circle at 35% 25%,
                    #d9f5ff,
                    #4f91b0 58%,
                    #10283a 100%
                );

            box-shadow:
                0 0 35px rgba(90,220,255,.5);
        }

        .head b {
            position:absolute;
            top:47px;

            width:25px;
            height:35px;

            border-radius:50%;

            background:#02070b;
        }

        .head b:first-child {
            left:25px;
        }

        .head b:last-child {
            right:25px;
        }

        .antenna {
            position:absolute;

            top:-42px;

            width:4px;
            height:55px;

            background:#69d9f0;
        }

        .antenna::after {
            content:"";

            position:absolute;
            top:-9px;
            left:-4px;

            width:12px;
            height:12px;

            border-radius:50%;

            background:#a9f6ff;

            box-shadow:
                0 0 15px #63eaff;
        }

        .antenna.left {
            left:62px;
            transform:rotate(-17deg);
        }

        .antenna.right {
            right:62px;
            transform:rotate(17deg);
        }

        .body {
            position:absolute;
            left:50%;
            top:110px;

            width:105px;
            height:150px;

            transform:translateX(-50%);

            border-radius:45% 45% 28% 28%;

            background:
                linear-gradient(
                    #2c6d83,
                    #102a39
                );

            box-shadow:
                0 0 30px rgba(50,210,255,.25);
        }

        .mexico {
            position:absolute;
            left:50%;
            top:51%;

            transform:
                translate(-50%,-50%)
                scale(.1);

            opacity:0;

            z-index:60;

            text-align:center;

            width:400px;
            height:250px;

            border-radius:24px;

            background:
                linear-gradient(
                    135deg,
                    rgba(8,30,50,.96),
                    rgba(10,65,75,.94)
                );

            border:3px solid rgba(100,235,255,.7);

            box-shadow:
                0 0 35px #26dfff,
                0 0 90px rgba(0,170,255,.55);
        }

        .mx-symbol {
            margin-top:25px;
            font-size:82px;
        }

        .mx-text {
            margin-top:8px;

            color:#fff;

            font-size:38px;
            font-weight:900;

            letter-spacing:10px;

            text-shadow:
                0 0 12px #fff,
                0 0 30px #00dfff;
        }

        .final {
            position:absolute;
            left:50%;
            bottom:7%;

            transform:
                translateX(-50%)
                scale(.8);

            opacity:0;

            z-index:80;

            color:#fff;

            font-size:34px;
            font-weight:bold;

            letter-spacing:6px;

            text-shadow:
                0 0 15px #fff,
                0 0 30px #36cfff;
        }

    `;

    contenedor.appendChild(style);

    const planet = contenedor.querySelector(".planet");
    const stadium = contenedor.querySelector(".stadium");
    const aliens = contenedor.querySelector(".aliens");
    const jxmx = contenedor.querySelector(".jxmx");
    const signal = contenedor.querySelector(".signal");
    const screen = contenedor.querySelector(".screen");
    const portal = contenedor.querySelector(".portal");
    const silhouette = contenedor.querySelector(".silhouette");
    const mexico = contenedor.querySelector(".mexico");
    const final = contenedor.querySelector(".final");

    return planet.animate(
        [
            {opacity:0,transform:"scale(.7)"},
            {opacity:1,transform:"scale(1)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished

    .then(() => stadium.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.38)"},
            {opacity:1,transform:"translateX(-50%) scale(.78)"},
            {opacity:1,transform:"translateX(-50%) scale(.65)"}
        ],
        {
            duration:1300,
            easing:"cubic-bezier(.2,.8,.2,1)",
            fill:"forwards"
        }
    ).finished)

    .then(() => aliens.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.5)"},
            {opacity:1,transform:"translateX(-50%) scale(1)"}
        ],
        {duration:700,fill:"forwards"}
    ).finished)

    .then(() => jxmx.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.2)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {
            duration:950,
            easing:"cubic-bezier(.2,.9,.2,1)",
            fill:"forwards"
        }
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,900)))

    .then(() => signal.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.6)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,900)))

    .then(() => screen.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.4)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.02)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:1000,fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,1000)))

    .then(() => Promise.all([
        signal.animate(
            [{opacity:1},{opacity:0}],
            {duration:450,fill:"forwards"}
        ).finished,

        screen.animate(
            [
                {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
                {opacity:.2,transform:"translate(-50%,-50%) scale(.97)"},
                {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
            ],
            {duration:500,iterations:2,fill:"forwards"}
        ).finished
    ]))

    .then(() => portal.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.05) rotate(0deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1) rotate(120deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08) rotate(240deg)"}
        ],
        {
            duration:1300,
            easing:"ease-out",
            fill:"forwards"
        }
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,500)))

    .then(() => silhouette.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.08)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {
            duration:1100,
            easing:"cubic-bezier(.2,.9,.2,1)",
            fill:"forwards"
        }
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,900)))

    .then(() => mexico.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {
            duration:1000,
            fill:"forwards"
        }
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,1000)))

    .then(() => Promise.all([
        silhouette.animate(
            [
                {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
                {opacity:0,transform:"translate(-50%,-50%) scale(.65)"}
            ],
            {duration:650,fill:"forwards"}
        ).finished,

        portal.animate(
            [
                {opacity:1,transform:"translate(-50%,-50%) scale(1.08) rotate(240deg)"},
                {opacity:.35,transform:"translate(-50%,-50%) scale(.7) rotate(420deg)"},
                {opacity:0,transform:"translate(-50%,-50%) scale(.1) rotate(540deg)"}
            ],
            {duration:900,fill:"forwards"}
        ).finished
    ]))

    .then(() => new Promise(resolve => setTimeout(resolve,700)))

    .then(() => mexico.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(.3)"}
        ],
        {
            duration:900,
            fill:"forwards"
        }
    ).finished)

    .then(() => final.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.8)"},
            {opacity:1,transform:"translateX(-50%) scale(1.06)"},
            {opacity:1,transform:"translateX(-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,1200)));

}
