export function ejecutar(contenedor, numeroJornada) {

    contenedor.innerHTML = `
        <div class="a020">

            <div class="stars">
                ${Array.from({length:30},(_,i)=>`<i class="s${i+1}"></i>`).join("")}
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
                <span>👽</span>
            </div>

            <div class="jxmx">
                <div>JORNADA</div>
                <strong>${numeroJornada}</strong>
                <small>Liga MX</small>
            </div>

            <div class="alarm">
                <div>⚠️ ALERTA MÁXIMA</div>
                <strong>FASE FINAL</strong>
            </div>

            <div class="arena">
                <div class="arena-ring ring1"></div>
                <div class="arena-ring ring2"></div>
                <div class="arena-core">⚽</div>
            </div>

            <div class="teams">
                <span>🐯</span>
                <span>🦅</span>
                <span>🔵</span>
                <span>🌵</span>
                <span>🔴</span>
            </div>

            <div class="message">
                <div>LOS CINCO</div>
                <strong>ESTÁN LISTOS</strong>
            </div>

            <div class="gate">
                <div class="gate-glow"></div>
                <div class="gate-text">TORNEO MX</div>
            </div>

            <div class="final">
                ÚLTIMO PARTIDO
            </div>

        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `
        .a020{
            position:relative;width:100%;height:100%;overflow:hidden;
            box-sizing:border-box;
            background:
                radial-gradient(circle at 50% 38%,#35104d 0%,#0b1028 42%,#02040b 80%,#000 100%);
            font-family:Arial,sans-serif;
            pointer-events:none;
        }

        .stars{position:absolute;inset:0}
        .stars i{
            position:absolute;width:4px;height:4px;border-radius:50%;
            background:#fff;box-shadow:0 0 9px #fff;opacity:.75;
        }

        .s1{left:4%;top:8%}.s2{left:10%;top:27%}.s3{left:18%;top:11%}
        .s4{left:27%;top:22%}.s5{left:36%;top:7%}.s6{left:45%;top:26%}
        .s7{left:54%;top:9%}.s8{left:63%;top:21%}.s9{left:72%;top:8%}
        .s10{left:81%;top:28%}.s11{left:91%;top:10%}.s12{left:97%;top:37%}
        .s13{left:6%;top:60%}.s14{left:16%;top:73%}.s15{left:28%;top:67%}
        .s16{left:40%;top:77%}.s17{left:53%;top:69%}.s18{left:66%;top:76%}
        .s19{left:78%;top:67%}.s20{left:89%;top:75%}.s21{left:96%;top:58%}
        .s22{left:3%;top:44%}.s23{left:51%;top:16%}.s24{left:86%;top:43%}
        .s25{left:33%;top:39%}.s26{left:69%;top:35%}.s27{left:24%;top:51%}
        .s28{left:76%;top:52%}.s29{left:14%;top:46%}.s30{left:84%;top:49%}

        .planet{
            position:absolute;width:720px;height:720px;right:-310px;bottom:-325px;
            border-radius:50%;
            background:
                radial-gradient(circle at 30% 27%,#9473ba,#3a2d62 40%,#15142d 68%,#03050c 100%);
            box-shadow:-30px -25px 110px rgba(150,90,255,.32);
            opacity:0;
        }

        .stadium{
            position:absolute;left:50%;bottom:7%;width:830px;height:330px;
            transform:translateX(-50%) scale(.6);opacity:0;z-index:5;
        }

        .stands{
            position:absolute;left:50%;bottom:45px;width:780px;height:215px;
            transform:translateX(-50%);
            border-radius:50% 50% 5% 5%;
            background:
                repeating-linear-gradient(
                    to bottom,#29234c 0,#29234c 7px,
                    #121020 7px,#121020 16px
                );
            border:4px solid rgba(180,150,240,.4);
            box-shadow:inset 0 0 55px #000;
        }

        .field{
            position:absolute;left:50%;bottom:0;width:540px;height:115px;
            transform:translateX(-50%);
            border-radius:50% 50% 0 0;
            background:linear-gradient(#234637,#07130e);
            border:3px solid rgba(130,220,160,.4);
        }

        .circle{
            position:absolute;left:50%;top:50%;width:82px;height:40px;
            transform:translate(-50%,-50%);
            border:2px solid rgba(255,255,255,.5);border-radius:50%;
        }

        .line{
            position:absolute;left:50%;top:0;width:2px;height:100%;
            background:rgba(255,255,255,.4);
        }

        .sign{
            position:absolute;left:50%;bottom:78px;
            transform:translateX(-50%);
            color:#dfc7ff;font-size:35px;font-weight:900;letter-spacing:7px;
            white-space:nowrap;
            text-shadow:0 0 10px #fff,0 0 28px #9b45ff;
        }

        .aliens{
            position:absolute;left:50%;bottom:24%;
            transform:translateX(-50%) scale(.5);
            display:flex;gap:42px;opacity:0;z-index:15;
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
            position:absolute;left:50%;top:21%;
            transform:translate(-50%,-50%) scale(.55);
            opacity:0;z-index:35;text-align:center;
            color:#fff;font-size:24px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 10px #fff,0 0 25px #ff3d5c;
        }

        .alarm strong{
            display:block;margin-top:8px;
            font-size:56px;letter-spacing:9px;color:#ff9aaa;
            text-shadow:0 0 12px #fff,0 0 35px #ff174f;
        }

        .arena{
            position:absolute;left:50%;top:46%;
            width:430px;height:430px;
            transform:translate(-50%,-50%) scale(.05);
            opacity:0;z-index:40;
        }

        .arena-ring{
            position:absolute;left:50%;top:50%;
            border-radius:50%;transform:translate(-50%,-50%);
            border:5px solid rgba(150,240,255,.85);
            box-shadow:0 0 25px #36ddff,0 0 70px rgba(30,150,255,.6);
        }

        .ring1{width:330px;height:330px}
        .ring2{width:220px;height:220px;border-color:rgba(230,190,255,.8)}

        .arena-core{
            position:absolute;left:50%;top:50%;
            transform:translate(-50%,-50%);
            font-size:120px;
            filter:drop-shadow(0 0 20px #fff) drop-shadow(0 0 45px #2bdfff);
        }

        .teams{
            position:absolute;left:50%;top:47%;
            transform:translate(-50%,-50%) scale(.2);
            opacity:0;z-index:45;
            display:flex;gap:32px;
            font-size:58px;
            filter:drop-shadow(0 0 12px rgba(255,255,255,.7));
        }

        .message{
            position:absolute;left:50%;top:76%;
            transform:translate(-50%,-50%) scale(.7);
            opacity:0;z-index:55;text-align:center;
            color:#fff;font-size:28px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 12px #fff,0 0 30px #b03cff;
        }

        .message strong{
            display:block;margin-top:9px;font-size:52px;
            color:#efc6ff;letter-spacing:7px;
            text-shadow:0 0 12px #fff,0 0 30px #b33cff;
        }

        .gate{
            position:absolute;left:50%;top:51%;
            width:460px;height:300px;
            transform:translate(-50%,-50%) scale(.08);
            opacity:0;z-index:60;
            border-radius:230px 230px 18px 18px;
            border:8px solid #aab8c9;
            background:#050810;
            box-shadow:0 0 30px #b9dfff,0 0 100px rgba(60,190,255,.6);
        }

        .gate-glow{
            position:absolute;left:50%;top:52%;
            width:320px;height:210px;
            transform:translate(-50%,-50%);
            border-radius:160px 160px 12px 12px;
            background:radial-gradient(ellipse,#e4ffff,#277d9c 34%,#061321 74%);
            box-shadow:inset 0 0 50px #55dcff;
        }

        .gate-text{
            position:absolute;left:50%;top:53%;
            transform:translate(-50%,-50%);
            color:#fff;font-size:45px;font-weight:900;
            letter-spacing:8px;
            text-shadow:0 0 15px #fff,0 0 35px #00dfff;
        }

        .final{
            position:absolute;left:50%;bottom:8%;
            transform:translateX(-50%) scale(.8);
            opacity:0;z-index:80;
            color:#fff;font-size:36px;font-weight:bold;
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
    const arena=contenedor.querySelector(".arena");
    const teams=contenedor.querySelector(".teams");
    const message=contenedor.querySelector(".message");
    const gate=contenedor.querySelector(".gate");
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
        [
            {opacity:0,transform:"translateX(-50%) scale(.5)"},
            {opacity:1,transform:"translateX(-50%) scale(1)"}
        ],
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
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>arena.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.05) rotate(-180deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08) rotate(0deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1) rotate(0deg)"}
        ],
        {duration:1200,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,650)))

    .then(()=>teams.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.2)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:950,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,900)))

    .then(()=>message.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.7)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1000)))

    .then(()=>gate.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.08)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:1100,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1100)))

    .then(()=>Promise.all([
        alarm.animate([{opacity:1},{opacity:0}],{duration:450,fill:"forwards"}).finished,
        message.animate([{opacity:1},{opacity:0}],{duration:500,fill:"forwards"}).finished,
        teams.animate(
            [
                {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
                {opacity:.5,transform:"translate(-50%,-50%) scale(1.3)"},
                {opacity:0,transform:"translate(-50%,-50%) scale(1.8)"}
            ],
            {duration:800,fill:"forwards"}
        ).finished
    ]))

    .then(()=>arena.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.7,transform:"translate(-50%,-50%) scale(1.25)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(1.7)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(()=>gate.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.75,transform:"translate(-50%,-50%) scale(1.15)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(1.45)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>final.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.8)"},
            {opacity:1,transform:"translateX(-50%) scale(1.07)"},
            {opacity:1,transform:"translateX(-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1200)));
}
