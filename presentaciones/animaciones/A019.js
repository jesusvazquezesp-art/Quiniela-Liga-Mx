export function ejecutar(contenedor, numeroJornada) {

    contenedor.innerHTML = `
        <div class="a018">

            <div class="stars">
                ${Array.from({length:26},(_,i)=>`<i class="s${i+1}"></i>`).join("")}
            </div>

            <div class="planet"></div>

            <div class="stadium">
                <div class="stands"></div>
                <div class="field">
                    <div class="circle"></div>
                    <div class="line"></div>
                </div>
                <div class="sign">PLANETA PIRATA</div>
            </div>

            <div class="aliens">
                <span>👽</span><span>👽</span><span>👽</span>
                <span>👽</span><span>👽</span><span>👽</span>
            </div>

            <div class="jxmx">
                <div>JORNADA</div>
                <strong>${numeroJornada}</strong>
                <small>Liga MX</small>
            </div>

            <div class="alarm">
                <div>⚠️ ALERTA GALÁCTICA</div>
                <strong>OBJETIVO DETECTADO</strong>
            </div>

            <div class="beam"></div>

            <div class="pod">
                <div class="pod-glow"></div>
                <div class="pod-core">⚽</div>
            </div>

            <div class="message">
                <div>EL ORIGINAL</div>
                <strong>HA DESPERTADO</strong>
            </div>

            <div class="door">
                <div class="door-light"></div>
                <div class="door-symbol">MX</div>
            </div>

            <div class="final">CONTINUARÁ...</div>

        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `
        .a018{
            position:relative;
            width:100%;height:100%;
            overflow:hidden;box-sizing:border-box;
            background:
                radial-gradient(circle at 50% 38%,#281044 0%,#091027 42%,#02040b 80%,#000 100%);
            font-family:Arial,sans-serif;
            pointer-events:none;
        }

        .stars{position:absolute;inset:0}
        .stars i{
            position:absolute;width:4px;height:4px;border-radius:50%;
            background:#fff;box-shadow:0 0 9px #fff;opacity:.75;
        }
        .s1{left:4%;top:8%}.s2{left:10%;top:27%}.s3{left:18%;top:12%}
        .s4{left:27%;top:20%}.s5{left:36%;top:8%}.s6{left:45%;top:26%}
        .s7{left:54%;top:10%}.s8{left:63%;top:22%}.s9{left:72%;top:7%}
        .s10{left:81%;top:28%}.s11{left:91%;top:11%}.s12{left:97%;top:37%}
        .s13{left:6%;top:60%}.s14{left:16%;top:72%}.s15{left:28%;top:66%}
        .s16{left:40%;top:76%}.s17{left:53%;top:68%}.s18{left:66%;top:77%}
        .s19{left:78%;top:67%}.s20{left:89%;top:74%}.s21{left:96%;top:58%}
        .s22{left:3%;top:44%}.s23{left:51%;top:15%}.s24{left:86%;top:43%}
        .s25{left:33%;top:39%}.s26{left:69%;top:35%}

        .planet{
            position:absolute;width:710px;height:710px;
            right:-300px;bottom:-320px;border-radius:50%;
            background:radial-gradient(circle at 30% 27%,#8e70b5,#3a2d62 40%,#15142d 68%,#03050c 100%);
            box-shadow:-30px -25px 100px rgba(150,90,255,.3);
            opacity:0;
        }

        .stadium{
            position:absolute;left:50%;bottom:7%;
            width:830px;height:330px;
            transform:translateX(-50%) scale(.6);
            opacity:0;z-index:5;
        }

        .stands{
            position:absolute;left:50%;bottom:45px;
            width:780px;height:215px;transform:translateX(-50%);
            border-radius:50% 50% 5% 5%;
            background:repeating-linear-gradient(to bottom,#29234c 0,#29234c 7px,#121020 7px,#121020 16px);
            border:4px solid rgba(180,150,240,.4);
            box-shadow:inset 0 0 55px #000;
        }

        .field{
            position:absolute;left:50%;bottom:0;width:540px;height:115px;
            transform:translateX(-50%);border-radius:50% 50% 0 0;
            background:linear-gradient(#234637,#07130e);
            border:3px solid rgba(130,220,160,.4);
        }

        .circle{
            position:absolute;left:50%;top:50%;width:82px;height:40px;
            transform:translate(-50%,-50%);border:2px solid rgba(255,255,255,.5);border-radius:50%;
        }

        .line{
            position:absolute;left:50%;top:0;width:2px;height:100%;
            background:rgba(255,255,255,.4);
        }

        .sign{
            position:absolute;left:50%;bottom:78px;transform:translateX(-50%);
            color:#dfc7ff;font-size:35px;font-weight:900;letter-spacing:7px;
            white-space:nowrap;text-shadow:0 0 10px #fff,0 0 28px #9b45ff;
        }

        .aliens{
            position:absolute;left:50%;bottom:24%;
            transform:translateX(-50%) scale(.5);
            display:flex;gap:44px;opacity:0;z-index:15;
            font-size:44px;
            filter:drop-shadow(0 0 10px rgba(100,255,150,.5));
        }

        .jxmx{
            position:absolute;left:50%;top:54%;width:100%;
            transform:translate(-50%,-50%) scale(.2);
            opacity:0;z-index:25;text-align:center;color:#fff;
            text-shadow:0 0 12px #fff,0 0 30px #65d5ff,0 0 60px #5360ff;
        }

        .jxmx div{font-size:38px;font-weight:bold;letter-spacing:10px}
        .jxmx strong{display:block;font-size:270px;line-height:.82;font-weight:900}
        .jxmx small{font-size:28px;color:#ffd54f}

        .alarm{
            position:absolute;left:50%;top:22%;
            transform:translate(-50%,-50%) scale(.55);
            opacity:0;z-index:35;text-align:center;
            color:#fff;font-size:25px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 10px #fff,0 0 25px #ff385d;
        }

        .alarm strong{
            display:block;margin-top:8px;
            font-size:50px;letter-spacing:7px;color:#ff9aaa;
            text-shadow:0 0 12px #fff,0 0 30px #ff174f;
        }

        .beam{
            position:absolute;left:50%;top:0;
            width:260px;height:100%;
            transform:translateX(-50%) scaleY(0);
            transform-origin:top;
            opacity:0;z-index:20;
            background:linear-gradient(to bottom,
                rgba(180,250,255,.8),
                rgba(50,220,255,.35),
                transparent 85%);
            filter:blur(2px);
            clip-path:polygon(35% 0,65% 0,100% 100%,0 100%);
        }

        .pod{
            position:absolute;left:50%;top:43%;
            width:300px;height:300px;
            transform:translate(-50%,-50%) scale(.05);
            opacity:0;z-index:45;
            border-radius:50%;
        }

        .pod-glow{
            position:absolute;inset:0;border-radius:50%;
            border:7px solid rgba(210,245,255,.9);
            box-shadow:
                0 0 20px #fff,
                0 0 55px #32dfff,
                0 0 120px rgba(20,150,255,.7),
                inset 0 0 50px #258fff;
        }

        .pod-core{
            position:absolute;left:50%;top:50%;
            transform:translate(-50%,-50%);
            font-size:105px;
            filter:drop-shadow(0 0 18px #fff) drop-shadow(0 0 40px #22dfff);
        }

        .message{
            position:absolute;left:50%;top:75%;
            transform:translate(-50%,-50%) scale(.7);
            opacity:0;z-index:55;text-align:center;
            color:#fff;font-size:27px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 12px #fff,0 0 30px #b03cff;
        }

        .message strong{
            display:block;margin-top:9px;
            font-size:52px;color:#efc6ff;letter-spacing:7px;
            text-shadow:0 0 12px #fff,0 0 30px #b33cff;
        }

        .door{
            position:absolute;left:50%;top:50%;
            width:330px;height:390px;
            transform:translate(-50%,-50%) scale(.1);
            opacity:0;z-index:60;
            border-radius:165px 165px 18px 18px;
            border:10px solid #aab2c0;
            background:#050810;
            box-shadow:0 0 25px #b9d4ff,0 0 90px rgba(70,180,255,.5);
        }

        .door-light{
            position:absolute;left:50%;top:50%;
            width:220px;height:300px;
            transform:translate(-50%,-50%);
            border-radius:110px 110px 10px 10px;
            background:radial-gradient(ellipse,#d7ffff,#247f9f 32%,#061321 72%);
            box-shadow:inset 0 0 45px #55dcff;
        }

        .door-symbol{
            position:absolute;left:50%;top:53%;
            transform:translate(-50%,-50%);
            font-size:78px;font-weight:900;
            color:#fff;
            letter-spacing:8px;
            text-shadow:0 0 15px #fff,0 0 35px #00dfff;
        }

        .final{
            position:absolute;left:50%;bottom:7%;
            transform:translateX(-50%) scale(.8);
            opacity:0;z-index:80;
            color:#fff;font-size:34px;font-weight:bold;
            letter-spacing:6px;
            text-shadow:0 0 15px #fff,0 0 30px #36cfff;
        }
    `;

    contenedor.appendChild(style);

    const planet=contenedor.querySelector(".planet");
    const stadium=contenedor.querySelector(".stadium");
    const aliens=contenedor.querySelector(".aliens");
    const jxmx=contenedor.querySelector(".jxmx");
    const alarm=contenedor.querySelector(".alarm");
    const beam=contenedor.querySelector(".beam");
    const pod=contenedor.querySelector(".pod");
    const message=contenedor.querySelector(".message");
    const door=contenedor.querySelector(".door");
    const final=contenedor.querySelector(".final");

    return planet.animate(
        [{opacity:0,transform:"scale(.7)"},{opacity:1,transform:"scale(1)"}],
        {duration:800,fill:"forwards"}
    ).finished

    .then(()=>stadium.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.35)"},
            {opacity:1,transform:"translateX(-50%) scale(.7)"},
            {opacity:1,transform:"translateX(-50%) scale(.62)"}
        ],
        {duration:1100,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"}
    ).finished)

    .then(()=>aliens.animate(
        [{opacity:0,transform:"translateX(-50%) scale(.5)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],
        {duration:650,fill:"forwards"}
    ).finished)

    .then(()=>jxmx.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.2)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,700)))

    .then(()=>alarm.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.55)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>beam.animate(
        [
            {opacity:0,transform:"translateX(-50%) scaleY(0)"},
            {opacity:.9,transform:"translateX(-50%) scaleY(1)"},
            {opacity:.7,transform:"translateX(-50%) scaleY(1)"}
        ],
        {duration:1100,easing:"ease-out",fill:"forwards"}
    ).finished)

    .then(()=>pod.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:1100,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,800)))

    .then(()=>message.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.7)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,900)))

    .then(()=>door.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:1000,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1000)))

    .then(()=>Promise.all([
        alarm.animate([{opacity:1},{opacity:0}],{duration:450,fill:"forwards"}).finished,
        message.animate([{opacity:1},{opacity:0}],{duration:500,fill:"forwards"}).finished,
        beam.animate([{opacity:.7},{opacity:0}],{duration:600,fill:"forwards"}).finished
    ]))

    .then(()=>pod.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.7,transform:"translate(-50%,-50%) scale(1.35)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(1.9)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(()=>door.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.8,transform:"translate(-50%,-50%) scale(1.12)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(1.35)"}
        ],
        {duration:750,fill:"forwards"}
    ).finished)

    .then(()=>final.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.8)"},
            {opacity:1,transform:"translateX(-50%) scale(1.06)"},
            {opacity:1,transform:"translateX(-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1200)));
}
