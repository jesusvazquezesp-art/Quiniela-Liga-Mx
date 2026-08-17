export function ejecutar(contenedor, numeroJornada) {

    contenedor.innerHTML = `
        <div class="a016">
            <div class="a016-stars">
                ${Array.from({length:22},(_,i)=>`<i class="s${i+1}"></i>`).join("")}
            </div>

            <div class="a016-horizon"></div>

            <div class="a016-ovni">
                <div class="a016-dome"></div>
                <div class="a016-ring"></div>
                <div class="a016-lights">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </div>
            </div>

            <div class="a016-stadium">
                <div class="a016-stand"></div>
                <div class="a016-field">
                    <div class="a016-circle"></div>
                    <div class="a016-line"></div>
                </div>
                <div class="a016-sign">PLANETA PIRATA</div>
            </div>

            <div class="a016-jxmx">
                <div>JORNADA</div>
                <strong>${numeroJornada}</strong>
                <small>Liga MX</small>
            </div>

            <div class="a016-warning">
                <div>⚠️ ACCESO RESTRINGIDO</div>
                <strong>NIVEL 7</strong>
            </div>

            <div class="a016-door">
                <div class="a016-frame"></div>
                <div class="a016-door-light"></div>
                <div class="a016-symbol">⚽</div>
            </div>

            <div class="a016-shadow">
                <div class="a016-head"><b></b><b></b></div>
                <div class="a016-antena left"></div>
                <div class="a016-antena right"></div>
                <div class="a016-body"></div>
            </div>

            <div class="a016-files">
                <div>TORNEO ORIGINAL</div>
                <strong>MX</strong>
                <small>ARCHIVO CLASIFICADO</small>
            </div>

            <div class="a016-final">CONTINUARÁ...</div>
        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `
        .a016 {
            position:relative;
            width:100%;
            height:100%;
            overflow:hidden;
            box-sizing:border-box;
            background:
                radial-gradient(circle at 50% 38%,#291148 0%,#0b1027 42%,#02040b 80%,#000 100%);
            font-family:Arial,sans-serif;
            pointer-events:none;
        }

        .a016-stars {position:absolute;inset:0}
        .a016-stars i {
            position:absolute;width:4px;height:4px;border-radius:50%;
            background:#fff;box-shadow:0 0 9px #fff;opacity:.75;
        }
        .s1{left:5%;top:9%}.s2{left:13%;top:28%}.s3{left:21%;top:12%}
        .s4{left:30%;top:22%}.s5{left:39%;top:8%}.s6{left:48%;top:27%}
        .s7{left:57%;top:10%}.s8{left:66%;top:23%}.s9{left:76%;top:8%}
        .s10{left:85%;top:29%}.s11{left:94%;top:11%}.s12{left:8%;top:61%}
        .s13{left:18%;top:73%}.s14{left:31%;top:66%}.s15{left:44%;top:76%}
        .s16{left:57%;top:69%}.s17{left:70%;top:76%}.s18{left:82%;top:66%}
        .s19{left:91%;top:73%}.s20{left:97%;top:55%}.s21{left:3%;top:44%}
        .s22{left:53%;top:17%}

        .a016-horizon {
            position:absolute;left:0;right:0;bottom:0;height:34%;
            background:linear-gradient(to top,#020308,#080719 45%,transparent);
            opacity:0;
        }

        .a016-ovni {
            position:absolute;left:50%;top:7%;
            width:620px;height:210px;
            transform:translateX(-50%) scale(.25);
            opacity:0;z-index:4;
        }

        .a016-ovni::before {
            content:"";position:absolute;left:50%;top:45px;
            width:600px;height:155px;transform:translateX(-50%);
            border-radius:50%;
            background:radial-gradient(ellipse at 50% 20%,#eefaff,#7e9bab 38%,#283844 70%,#05090e);
            border:5px solid rgba(220,250,255,.85);
            box-shadow:0 0 45px #64dfff,0 0 110px rgba(60,180,255,.45);
        }

        .a016-dome {
            position:absolute;left:50%;top:0;
            width:220px;height:115px;transform:translateX(-50%);
            border-radius:50% 50% 45% 45%;
            background:radial-gradient(ellipse,#efffff,#72b5ce 55%,#173445);
            border:4px solid rgba(230,255,255,.9);
            box-shadow:0 0 35px rgba(80,220,255,.9);
            z-index:2;
        }

        .a016-ring {
            position:absolute;left:50%;bottom:24px;
            width:500px;height:50px;transform:translateX(-50%);
            border-radius:50%;
            border:3px solid rgba(120,240,255,.8);
            box-shadow:0 0 20px #42dcff;
            z-index:3;
        }

        .a016-lights {
            position:absolute;left:50%;bottom:30px;width:430px;
            transform:translateX(-50%);
            display:flex;justify-content:space-between;z-index:5;
        }

        .a016-lights span {
            width:17px;height:17px;border-radius:50%;
            background:#7cefff;
            box-shadow:0 0 12px #7cefff,0 0 30px #209cff;
        }

        .a016-stadium {
            position:absolute;left:50%;bottom:7%;
            width:820px;height:330px;
            transform:translateX(-50%) scale(.55);
            opacity:0;z-index:6;
        }

        .a016-stand {
            position:absolute;left:50%;bottom:45px;
            width:760px;height:215px;transform:translateX(-50%);
            border-radius:50% 50% 5% 5%;
            background:repeating-linear-gradient(to bottom,#29234c 0,#29234c 7px,#121020 7px,#121020 16px);
            border:4px solid rgba(180,150,240,.4);
            box-shadow:inset 0 0 55px #000;
        }

        .a016-field {
            position:absolute;left:50%;bottom:0;width:530px;height:115px;
            transform:translateX(-50%);border-radius:50% 50% 0 0;
            background:linear-gradient(#234637,#07130e);
            border:3px solid rgba(130,220,160,.4);
        }

        .a016-circle {
            position:absolute;left:50%;top:50%;width:82px;height:40px;
            transform:translate(-50%,-50%);border:2px solid rgba(255,255,255,.5);border-radius:50%;
        }

        .a016-line {
            position:absolute;left:50%;top:0;width:2px;height:100%;background:rgba(255,255,255,.4);
        }

        .a016-sign {
            position:absolute;left:50%;bottom:78px;transform:translateX(-50%);
            color:#dfc7ff;font-size:35px;font-weight:900;letter-spacing:7px;
            white-space:nowrap;text-shadow:0 0 10px #fff,0 0 28px #9b45ff;
        }

        .a016-jxmx {
            position:absolute;left:50%;top:53%;width:100%;
            transform:translate(-50%,-50%) scale(.2);
            opacity:0;z-index:25;text-align:center;color:#fff;
            text-shadow:0 0 12px #fff,0 0 30px #65d5ff,0 0 60px #5360ff;
        }
        .a016-jxmx div{font-size:38px;font-weight:bold;letter-spacing:10px}
        .a016-jxmx strong{display:block;font-size:270px;line-height:.82;font-weight:900}
        .a016-jxmx small{font-size:28px;color:#ffd54f}

        .a016-warning {
            position:absolute;left:50%;top:22%;
            transform:translate(-50%,-50%) scale(.5);
            opacity:0;z-index:30;text-align:center;color:#fff;
            font-size:25px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 10px #fff,0 0 25px #ff3d5c;
        }
        .a016-warning strong {
            display:block;margin-top:7px;font-size:54px;color:#ff728d;
            letter-spacing:9px;text-shadow:0 0 12px #fff,0 0 28px #ff174f;
        }

        .a016-door {
            position:absolute;left:50%;top:52%;
            width:330px;height:390px;
            transform:translate(-50%,-50%) scale(.15);
            opacity:0;z-index:35;
        }

        .a016-frame {
            position:absolute;inset:0;border-radius:165px 165px 18px 18px;
            border:10px solid #9da6b5;
            background:linear-gradient(135deg,#111522,#05070e);
            box-shadow:0 0 25px #b9d4ff,0 0 80px rgba(90,170,255,.5);
        }

        .a016-door-light {
            position:absolute;left:50%;top:50%;width:220px;height:300px;
            transform:translate(-50%,-50%);
            border-radius:110px 110px 10px 10px;
            background:radial-gradient(ellipse,#b8f5ff 0%,#267b9d 30%,#061321 72%);
            opacity:.9;box-shadow:inset 0 0 40px #55dcff;
        }

        .a016-symbol {
            position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);
            font-size:85px;filter:drop-shadow(0 0 15px #fff);
        }

        .a016-shadow {
            position:absolute;left:50%;top:49%;
            width:190px;height:290px;
            transform:translate(-50%,-50%) scale(.05);
            opacity:0;z-index:45;
        }

        .a016-head {
            position:absolute;left:50%;top:0;width:120px;height:120px;
            transform:translateX(-50%);border-radius:50%;
            background:radial-gradient(circle at 35% 25%,#d8e6f0,#516c80 58%,#0c1721);
            box-shadow:0 0 35px rgba(130,220,255,.45);
        }

        .a016-head b {
            position:absolute;top:46px;width:25px;height:35px;border-radius:50%;background:#020508;
        }
        .a016-head b:first-child{left:23px}
        .a016-head b:last-child{right:23px}

        .a016-antena {
            position:absolute;top:-43px;width:4px;height:55px;background:#7adcf0;
        }
        .a016-antena::after {
            content:"";position:absolute;top:-9px;left:-4px;width:12px;height:12px;
            border-radius:50%;background:#b9f7ff;box-shadow:0 0 16px #69eaff;
        }
        .a016-antena.left{left:55px;transform:rotate(-16deg)}
        .a016-antena.right{right:55px;transform:rotate(16deg)}

        .a016-body {
            position:absolute;left:50%;top:105px;width:95px;height:155px;
            transform:translateX(-50%);border-radius:45% 45% 25% 25%;
            background:linear-gradient(#285267,#091924);
            box-shadow:0 0 30px rgba(50,210,255,.25);
        }

        .a016-files {
            position:absolute;left:50%;top:52%;
            width:440px;padding:22px;
            transform:translate(-50%,-50%) scale(.1);
            opacity:0;z-index:55;text-align:center;
            border-radius:22px;background:rgba(6,10,24,.96);
            border:3px solid rgba(120,230,255,.65);
            box-shadow:0 0 35px #35dfff,0 0 90px rgba(20,160,255,.4);
            color:#fff;
        }

        .a016-files div{font-size:25px;font-weight:bold;letter-spacing:5px;color:#8deeff}
        .a016-files strong{display:block;font-size:92px;line-height:1;color:#fff;text-shadow:0 0 15px #fff,0 0 35px #00dfff}
        .a016-files small{display:block;margin-top:10px;font-size:18px;letter-spacing:4px;color:#ffd35b}

        .a016-final {
            position:absolute;left:50%;bottom:7%;
            transform:translateX(-50%) scale(.8);
            opacity:0;z-index:70;color:#fff;font-size:34px;font-weight:bold;
            letter-spacing:6px;text-shadow:0 0 15px #fff,0 0 30px #3acfff;
        }
    `;

    contenedor.appendChild(style);

    const ovni = contenedor.querySelector(".a016-ovni");
    const stadium = contenedor.querySelector(".a016-stadium");
    const jxmx = contenedor.querySelector(".a016-jxmx");
    const warning = contenedor.querySelector(".a016-warning");
    const door = contenedor.querySelector(".a016-door");
    const shadow = contenedor.querySelector(".a016-shadow");
    const files = contenedor.querySelector(".a016-files");
    const final = contenedor.querySelector(".a016-final");

    return ovni.animate(
        [
            {opacity:0,transform:"translateX(-50%) translateY(-30px) scale(.25)"},
            {opacity:1,transform:"translateX(-50%) translateY(100px) scale(.65)"},
            {opacity:1,transform:"translateX(-50%) translateY(150px) scale(.58)"}
        ],
        {duration:1500,easing:"cubic-bezier(.15,.75,.2,1)",fill:"forwards"}
    ).finished

    .then(() => stadium.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.35)"},
            {opacity:1,transform:"translateX(-50%) scale(.65)"}
        ],
        {duration:1000,fill:"forwards"}
    ).finished)

    .then(() => jxmx.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.2)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,700)))

    .then(() => warning.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.5)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:800,fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,850)))

    .then(() => door.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.15)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.03)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:1000,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,900)))

    .then(() => shadow.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:1100,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,1000)))

    .then(() => files.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:1000,fill:"forwards"}
    ).finished)

    .then(() => new Promise(resolve => setTimeout(resolve,1200)))

    .then(() => Promise.all([
        warning.animate([{opacity:1},{opacity:0}],{duration:500,fill:"forwards"}).finished,
        files.animate([{opacity:1},{opacity:0}],{duration:600,fill:"forwards"}).finished,
        shadow.animate([{opacity:1},{opacity:0}],{duration:650,fill:"forwards"}).finished
    ]))

    .then(() => door.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.8,transform:"translate(-50%,-50%) scale(1.12)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(1.35)"}
        ],
        {duration:800,fill:"forwards"}
    ).finished)

    .then(() => ovni.animate(
        [
            {opacity:1,transform:"translateX(-50%) translateY(150px) scale(.58)"},
            {opacity:.75,transform:"translateX(-50%) translateY(70px) scale(.45)"},
            {opacity:.35,transform:"translateX(-50%) translateY(-30px) scale(.25)"},
            {opacity:0,transform:"translateX(-50%) translateY(-180px) scale(.1)"}
        ],
        {duration:1400,easing:"ease-in",fill:"forwards"}
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
