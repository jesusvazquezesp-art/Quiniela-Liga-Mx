export function ejecutar(contenedor, numeroJornada) {

    contenedor.innerHTML = `
        <div class="a017">

            <div class="stars">
                ${Array.from({length:24},(_,i)=>`<i class="s${i+1}"></i>`).join("")}
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

            <div class="transmission">
                <div>TRANSMISIÓN PRIORITARIA</div>
                <strong>NO APAGAR</strong>
            </div>

            <div class="sky-signal"></div>

            <div class="giant-symbol">
                <div class="top"></div>
                <div class="middle">⚽</div>
                <div class="bottom"></div>
            </div>

            <div class="message">
                <div>EL TORNEO</div>
                <strong>NO FUE ROBADO</strong>
            </div>

            <div class="archive">
                <div>ARCHIVO ORIGINAL</div>
                <b>JXMX</b>
                <small>ACTIVO</small>
            </div>

            <div class="final">CONTINUARÁ...</div>

        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `
        .a017{
            position:relative;
            width:100%;height:100%;
            overflow:hidden;box-sizing:border-box;
            background:
                radial-gradient(circle at 50% 40%,#271044 0%,#0a1027 42%,#02040b 80%,#000 100%);
            font-family:Arial,sans-serif;
            pointer-events:none;
        }

        .stars{position:absolute;inset:0}
        .stars i{
            position:absolute;width:4px;height:4px;border-radius:50%;
            background:#fff;box-shadow:0 0 9px #fff;opacity:.75;
        }
        .s1{left:4%;top:10%}.s2{left:11%;top:29%}.s3{left:19%;top:7%}
        .s4{left:28%;top:22%}.s5{left:37%;top:11%}.s6{left:46%;top:27%}
        .s7{left:55%;top:8%}.s8{left:64%;top:21%}.s9{left:73%;top:10%}
        .s10{left:82%;top:28%}.s11{left:92%;top:9%}.s12{left:97%;top:37%}
        .s13{left:7%;top:61%}.s14{left:17%;top:74%}.s15{left:30%;top:67%}
        .s16{left:42%;top:76%}.s17{left:56%;top:69%}.s18{left:68%;top:77%}
        .s19{left:79%;top:67%}.s20{left:89%;top:75%}.s21{left:95%;top:60%}
        .s22{left:3%;top:43%}.s23{left:52%;top:16%}.s24{left:87%;top:45%}

        .planet{
            position:absolute;width:700px;height:700px;
            right:-300px;bottom:-310px;border-radius:50%;
            background:radial-gradient(circle at 30% 27%,#8d6db4,#392d62 40%,#15142d 68%,#03050c 100%);
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

        .transmission{
            position:absolute;left:50%;top:22%;
            transform:translate(-50%,-50%) scale(.6);
            opacity:0;z-index:35;text-align:center;color:#fff;
            font-size:24px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 10px #fff,0 0 25px #47ddff;
        }
        .transmission strong{
            display:block;margin-top:8px;font-size:54px;color:#fff;
            letter-spacing:8px;text-shadow:0 0 12px #fff,0 0 30px #00cfff;
        }

        .sky-signal{
            position:absolute;left:50%;top:42%;
            width:40px;height:40px;border-radius:50%;
            transform:translate(-50%,-50%) scale(.1);
            opacity:0;z-index:40;
            background:#fff;
            box-shadow:0 0 25px #fff,0 0 70px #5adfff,0 0 150px #167dff;
        }

        .giant-symbol{
            position:absolute;left:50%;top:43%;
            width:360px;height:360px;
            transform:translate(-50%,-50%) scale(.05);
            opacity:0;z-index:45;
        }

        .giant-symbol .middle{
            position:absolute;left:50%;top:50%;
            transform:translate(-50%,-50%);
            font-size:150px;
            filter:drop-shadow(0 0 25px #fff) drop-shadow(0 0 60px #28cfff);
        }

        .giant-symbol .top,
        .giant-symbol .bottom{
            position:absolute;left:50%;
            width:250px;height:90px;
            transform:translateX(-50%);
            border:6px solid #8eefff;
            border-radius:50%;
            box-shadow:0 0 25px #32dfff;
        }
        .giant-symbol .top{top:5px}
        .giant-symbol .bottom{bottom:5px}

        .message{
            position:absolute;left:50%;top:75%;
            transform:translate(-50%,-50%) scale(.7);
            opacity:0;z-index:50;text-align:center;color:#fff;
            font-size:28px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 12px #fff,0 0 30px #b03cff;
        }
        .message strong{
            display:block;margin-top:9px;font-size:51px;
            color:#f1c9ff;letter-spacing:7px;
            text-shadow:0 0 12px #fff,0 0 30px #b33cff;
        }

        .archive{
            position:absolute;left:50%;top:51%;
            width:410px;padding:22px;
            transform:translate(-50%,-50%) scale(.1);
            opacity:0;z-index:55;text-align:center;
            border-radius:20px;background:rgba(5,10,25,.96);
            border:3px solid rgba(120,230,255,.7);
            box-shadow:0 0 35px #35dfff,0 0 90px rgba(20,160,255,.4);
            color:#fff;
        }
        .archive div{font-size:22px;font-weight:bold;letter-spacing:5px;color:#8deeff}
        .archive b{display:block;font-size:82px;line-height:1;text-shadow:0 0 15px #fff,0 0 35px #00dfff}
        .archive small{display:block;margin-top:9px;color:#77ffb2;font-size:18px;letter-spacing:5px}

        .final{
            position:absolute;left:50%;bottom:7%;
            transform:translateX(-50%) scale(.8);
            opacity:0;z-index:70;color:#fff;font-size:34px;font-weight:bold;
            letter-spacing:6px;text-shadow:0 0 15px #fff,0 0 30px #36cfff;
        }
    `;

    contenedor.appendChild(style);

    const planet=contenedor.querySelector(".planet");
    const stadium=contenedor.querySelector(".stadium");
    const aliens=contenedor.querySelector(".aliens");
    const jxmx=contenedor.querySelector(".jxmx");
    const transmission=contenedor.querySelector(".transmission");
    const signal=contenedor.querySelector(".sky-signal");
    const symbol=contenedor.querySelector(".giant-symbol");
    const message=contenedor.querySelector(".message");
    const archive=contenedor.querySelector(".archive");
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
        {duration:1100,fill:"forwards",easing:"cubic-bezier(.2,.8,.2,1)"}
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

    .then(()=>transmission.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.6)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,850)))

    .then(()=>signal.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(()=>symbol.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.05) rotate(-180deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08) rotate(0deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1) rotate(0deg)"}
        ],
        {duration:1200,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,900)))

    .then(()=>message.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.7)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.07)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1000)))

    .then(()=>archive.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1000)))

    .then(()=>Promise.all([
        transmission.animate([{opacity:1},{opacity:0}],{duration:450,fill:"forwards"}).finished,
        message.animate([{opacity:1},{opacity:0}],{duration:500,fill:"forwards"}).finished
    ]))

    .then(()=>signal.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.5,transform:"translate(-50%,-50%) scale(2.4)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(4)"}
        ],
        {duration:1000,fill:"forwards"}
    ).finished)

    .then(()=>archive.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(.7)"}
        ],
        {duration:600,fill:"forwards"}
    ).finished)

    .then(()=>symbol.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.65,transform:"translate(-50%,-50%) scale(1.2)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(1.7)"}
        ],
        {duration:900,fill:"forwards"}
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
