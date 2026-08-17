export function ejecutar(contenedor, numeroJornada) {

    contenedor.innerHTML = `

        <div class="a014">

            <div class="a014-stars">
                <i></i><i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i><i></i>
            </div>

            <div class="a014-moon"></div>

            <div class="a014-city">
                <div class="a014-tower"></div>
                <div class="a014-building b1"></div>
                <div class="a014-building b2"></div>
                <div class="a014-building b3"></div>
                <div class="a014-building b4"></div>
            </div>

            <div class="a014-stadium">
                <div class="a014-roof"></div>
                <div class="a014-stand"></div>
                <div class="a014-field">
                    <div class="a014-center"></div>
                    <div class="a014-line"></div>
                </div>
                <div class="a014-sign">ESTADIO INTERGALÁCTICO</div>
            </div>

            <div class="a014-crowd">
                <span>👽</span><span>👽</span><span>👽</span>
                <span>👽</span><span>👽</span><span>👽</span>
                <span>👽</span>
            </div>

            <div class="a014-jxmx">
                <div>JORNADA</div>
                <strong>${numeroJornada}</strong>
                <small>Liga MX</small>
            </div>

            <div class="a014-portal"></div>

            <div class="a014-figura">
                <div class="a014-head">
                    <b></b><b></b>
                </div>
                <div class="a014-antena aa"></div>
                <div class="a014-antena ab"></div>
                <div class="a014-body"></div>
            </div>

            <div class="a014-message">
                <div>IDENTIDAD</div>
                <strong>REVELADA</strong>
            </div>

            <div class="a014-shield">
                <span>⚽</span>
                <b>MX</b>
            </div>

            <div class="a014-final">CONTINUARÁ...</div>

        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `

        .a014 {
            position:relative;
            width:100%;
            height:100%;
            overflow:hidden;
            background:
                radial-gradient(circle at 50% 40%, #251044 0%, #0a0d22 43%, #02030a 82%, #000 100%);
            font-family:Arial,sans-serif;
            pointer-events:none;
            box-sizing:border-box;
        }

        .a014-stars { position:absolute; inset:0; }
        .a014-stars i {
            position:absolute;
            width:4px;height:4px;border-radius:50%;
            background:#fff;
            box-shadow:0 0 9px #fff;
            opacity:.75;
        }
        .a014-stars i:nth-child(1){left:6%;top:12%}
        .a014-stars i:nth-child(2){left:15%;top:30%}
        .a014-stars i:nth-child(3){left:25%;top:9%}
        .a014-stars i:nth-child(4){left:37%;top:21%}
        .a014-stars i:nth-child(5){left:49%;top:8%}
        .a014-stars i:nth-child(6){left:61%;top:27%}
        .a014-stars i:nth-child(7){left:73%;top:10%}
        .a014-stars i:nth-child(8){left:84%;top:25%}
        .a014-stars i:nth-child(9){left:94%;top:12%}
        .a014-stars i:nth-child(10){left:11%;top:65%}
        .a014-stars i:nth-child(11){left:69%;top:68%}
        .a014-stars i:nth-child(12){left:90%;top:61%}

        .a014-moon {
            position:absolute;
            width:300px;height:300px;
            left:-100px;top:80px;
            border-radius:50%;
            background:radial-gradient(circle at 35% 30%,#eee,#85859b 45%,#25253a 100%);
            box-shadow:0 0 80px rgba(180,180,255,.2);
            opacity:0;
        }

        .a014-city {
            position:absolute;
            left:0;right:0;bottom:0;
            height:38%;
            opacity:0;
            z-index:2;
        }

        .a014-building {
            position:absolute;
            bottom:0;
            background:linear-gradient(#17152c,#05050c);
            border:1px solid rgba(180,140,255,.18);
        }
        .b1{left:2%;width:15%;height:65%}
        .b2{left:19%;width:18%;height:45%}
        .b3{right:19%;width:17%;height:58%}
        .b4{right:2%;width:14%;height:38%}

        .a014-tower {
            position:absolute;
            left:50%;bottom:0;
            width:8px;height:100%;
            transform:translateX(-50%);
            background:#151329;
            box-shadow:0 0 20px rgba(160,100,255,.25);
        }
        .a014-tower::before {
            content:"";
            position:absolute;
            left:-35px;top:12%;
            width:78px;height:78px;
            border-radius:50%;
            border:3px solid #544a7d;
            box-shadow:0 0 20px rgba(150,100,255,.4);
        }

        .a014-stadium {
            position:absolute;
            left:50%;bottom:5%;
            width:820px;height:360px;
            transform:translateX(-50%) scale(.45);
            opacity:0;
            z-index:6;
        }

        .a014-roof {
            position:absolute;
            left:50%;top:0;
            width:730px;height:135px;
            transform:translateX(-50%);
            border-radius:50%;
            background:linear-gradient(180deg,#25213f,#0b0b17);
            border:4px solid rgba(170,150,230,.4);
            box-shadow:0 0 50px rgba(140,80,255,.18);
        }

        .a014-stand {
            position:absolute;
            left:50%;bottom:60px;
            width:780px;height:220px;
            transform:translateX(-50%);
            border-radius:50% 50% 8% 8%;
            background:repeating-linear-gradient(to bottom,#29234c 0,#29234c 7px,#111020 7px,#111020 16px);
            border:4px solid rgba(180,150,240,.4);
        }

        .a014-field {
            position:absolute;
            left:50%;bottom:0;
            width:520px;height:125px;
            transform:translateX(-50%);
            border-radius:50% 50% 0 0;
            background:linear-gradient(#234637,#07130e);
            border:3px solid rgba(140,230,170,.4);
        }

        .a014-center {
            position:absolute;left:50%;top:50%;
            width:85px;height:42px;
            transform:translate(-50%,-50%);
            border:2px solid rgba(255,255,255,.5);
            border-radius:50%;
        }

        .a014-line {
            position:absolute;left:50%;top:0;
            width:2px;height:100%;background:rgba(255,255,255,.45);
        }

        .a014-sign {
            position:absolute;left:50%;bottom:88px;
            transform:translateX(-50%);
            color:#f2d9ff;
            font-size:34px;font-weight:900;
            letter-spacing:6px;
            text-shadow:0 0 12px #fff,0 0 30px #9f4cff;
            white-space:nowrap;
        }

        .a014-crowd {
            position:absolute;
            left:50%;bottom:26%;
            transform:translateX(-50%) scale(.6);
            opacity:0;
            z-index:18;
            display:flex;gap:42px;
            font-size:45px;
            filter:drop-shadow(0 0 10px rgba(100,255,150,.5));
        }

        .a014-jxmx {
            position:absolute;
            left:50%;top:54%;
            transform:translate(-50%,-50%) scale(.2);
            opacity:0;
            z-index:30;
            width:100%;
            text-align:center;
            color:#fff;
            text-shadow:0 0 12px #fff,0 0 30px #62cfff,0 0 60px #5360ff;
        }
        .a014-jxmx div{font-size:38px;font-weight:bold;letter-spacing:10px}
        .a014-jxmx strong{display:block;font-size:270px;line-height:.82;font-weight:900}
        .a014-jxmx small{font-size:28px;color:#ffd54f}

        .a014-portal {
            position:absolute;
            left:50%;top:47%;
            width:280px;height:280px;
            transform:translate(-50%,-50%) scale(.05);
            opacity:0;
            border-radius:50%;
            border:7px solid rgba(220,170,255,.9);
            box-shadow:
                0 0 20px #fff,
                0 0 50px #a13cff,
                0 0 110px rgba(130,50,255,.7),
                inset 0 0 45px #8b35ff;
            z-index:40;
        }

        .a014-figura {
            position:absolute;
            left:50%;top:47%;
            width:210px;height:300px;
            transform:translate(-50%,-50%) scale(.1);
            opacity:0;
            z-index:45;
        }

        .a014-head {
            position:absolute;
            left:50%;top:0;
            width:125px;height:125px;
            transform:translateX(-50%);
            border-radius:50%;
            background:radial-gradient(circle at 35% 25%,#e7ffd9,#62ad6c 58%,#173820);
            box-shadow:0 0 40px rgba(100,255,150,.45);
        }

        .a014-head b {
            position:absolute;top:48px;
            width:26px;height:36px;
            border-radius:50%;
            background:#050907;
        }
        .a014-head b:first-child{left:24px}
        .a014-head b:last-child{right:24px}

        .a014-antena {
            position:absolute;top:-42px;
            width:4px;height:55px;
            background:#73df84;
        }
        .a014-antena::after {
            content:"";
            position:absolute;top:-9px;left:-4px;
            width:12px;height:12px;border-radius:50%;
            background:#dcff70;
            box-shadow:0 0 16px #b7ff4e;
        }
        .a014-antena.aa{left:62px;transform:rotate(-16deg)}
        .a014-antena.ab{right:62px;transform:rotate(16deg)}

        .a014-body {
            position:absolute;
            left:50%;top:110px;
            width:100px;height:150px;
            transform:translateX(-50%);
            border-radius:45% 45% 30% 30%;
            background:linear-gradient(#3d8550,#16351f);
            box-shadow:0 0 30px rgba(80,255,130,.2);
        }

        .a014-message {
            position:absolute;
            left:50%;top:76%;
            transform:translate(-50%,-50%) scale(.7);
            opacity:0;
            z-index:55;
            text-align:center;
            color:#fff;
            font-size:30px;
            font-weight:bold;
            letter-spacing:6px;
            text-shadow:0 0 12px #fff,0 0 30px #a43cff;
        }
        .a014-message strong {
            display:block;
            margin-top:10px;
            font-size:58px;
            color:#e6b7ff;
            letter-spacing:11px;
        }

        .a014-shield {
            position:absolute;
            left:50%;top:48%;
            transform:translate(-50%,-50%) scale(.1);
            opacity:0;
            z-index:60;
            width:220px;height:220px;
            border-radius:50%;
            border:6px solid #d8b5ff;
            background:radial-gradient(circle,#2a1552,#080612 70%);
            box-shadow:0 0 30px #fff,0 0 80px #9f35ff;
            text-align:center;
        }
        .a014-shield span {
            display:block;
            margin-top:42px;
            font-size:70px;
        }
        .a014-shield b {
            font-size:35px;
            color:#ffd55b;
            letter-spacing:8px;
        }

        .a014-final {
            position:absolute;
            left:50%;bottom:7%;
            transform:translateX(-50%) scale(.8);
            opacity:0;
            z-index:80;
            color:#fff;
            font-size:34px;font-weight:bold;
            letter-spacing:6px;
            text-shadow:0 0 15px #fff,0 0 30px #9d4cff;
        }

    `;

    contenedor.appendChild(style);

    const moon = contenedor.querySelector(".a014-moon");
    const city = contenedor.querySelector(".a014-city");
    const stadium = contenedor.querySelector(".a014-stadium");
    const crowd = contenedor.querySelector(".a014-crowd");
    const jxmx = contenedor.querySelector(".a014-jxmx");
    const portal = contenedor.querySelector(".a014-portal");
    const figura = contenedor.querySelector(".a014-figura");
    const message = contenedor.querySelector(".a014-message");
    const shield = contenedor.querySelector(".a014-shield");
    const final = contenedor.querySelector(".a014-final");

    return moon.animate(
        [{opacity:0},{opacity:1}],
        {duration:900,fill:"forwards"}
    ).finished

    .then(() => city.animate(
        [{opacity:0,transform:"translateY(70px)"},{opacity:1,transform:"translateY(0)"}],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(() => stadium.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.35)"},
            {opacity:1,transform:"translateX(-50%) scale(.76)"},
            {opacity:1,transform:"translateX(-50%) scale(.68)"}
        ],
        {duration:1400,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"}
    ).finished)

    .then(() => crowd.animate(
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
        {duration:1000,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,900)))

    .then(() => jxmx.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.25,transform:"translate(-50%,-50%) scale(.92)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:650,iterations:3,fill:"forwards"}
    ).finished)

    .then(() => portal.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.05) rotate(0deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1) rotate(120deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08) rotate(240deg)"}
        ],
        {duration:1500,easing:"ease-out",fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,600)))

    .then(() => figura.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:1100,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,900)))

    .then(() => message.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.7)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,1000)))

    .then(() => Promise.all([
        message.animate(
            [{opacity:1},{opacity:0}],
            {duration:500,fill:"forwards"}
        ).finished,

        figura.animate(
            [
                {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
                {opacity:0,transform:"translate(-50%,-50%) scale(.7)"}
            ],
            {duration:650,fill:"forwards"}
        ).finished
    ]))

    .then(() => portal.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08) rotate(240deg)"},
            {opacity:.35,transform:"translate(-50%,-50%) scale(.7) rotate(420deg)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(.1) rotate(540deg)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(() => shield.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.1) rotate(-90deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.12) rotate(0deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1) rotate(0deg)"}
        ],
        {duration:1100,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,1100)))

    .then(() => shield.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.8,transform:"translate(-50%,-50%) scale(1.2)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(1.7)"}
        ],
        {duration:900,easing:"ease-in",fill:"forwards"}
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
