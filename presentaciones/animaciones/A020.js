export function ejecutar(contenedor, numeroJornada) {

    contenedor.innerHTML = `
        <div class="a019">

            <div class="stars">
                ${Array.from({length:28},(_,i)=>`<i class="s${i+1}"></i>`).join("")}
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

            <div class="countdown">
                <div>⚠️ CUENTA REGRESIVA</div>
                <strong>00:03</strong>
            </div>

            <div class="energy"></div>

            <div class="portal">
                <div class="portal-ring"></div>
                <div class="portal-core">⚽</div>
            </div>

            <div class="message">
                <div>EL TORNEO</div>
                <strong>DEBE REGRESAR</strong>
            </div>

            <div class="final">
                LA HORA SE ACERCA...
            </div>

        </div>
    `;

    const style = document.createElement("style");

    style.textContent = `
        .a019{
            position:relative;width:100%;height:100%;overflow:hidden;
            box-sizing:border-box;
            background:
                radial-gradient(circle at 50% 38%,#2b1047 0%,#0a1028 43%,#02040b 80%,#000 100%);
            font-family:Arial,sans-serif;pointer-events:none;
        }

        .stars{position:absolute;inset:0}
        .stars i{
            position:absolute;width:4px;height:4px;border-radius:50%;
            background:#fff;box-shadow:0 0 9px #fff;opacity:.75;
        }

        .s1{left:4%;top:8%}.s2{left:11%;top:28%}.s3{left:19%;top:10%}
        .s4{left:27%;top:22%}.s5{left:36%;top:7%}.s6{left:45%;top:27%}
        .s7{left:54%;top:9%}.s8{left:63%;top:21%}.s9{left:72%;top:8%}
        .s10{left:81%;top:29%}.s11{left:91%;top:10%}.s12{left:97%;top:38%}
        .s13{left:6%;top:60%}.s14{left:16%;top:73%}.s15{left:28%;top:67%}
        .s16{left:40%;top:77%}.s17{left:53%;top:69%}.s18{left:66%;top:76%}
        .s19{left:78%;top:67%}.s20{left:89%;top:75%}.s21{left:96%;top:58%}
        .s22{left:3%;top:44%}.s23{left:51%;top:16%}.s24{left:86%;top:43%}
        .s25{left:33%;top:39%}.s26{left:69%;top:35%}.s27{left:24%;top:51%}
        .s28{left:76%;top:52%}

        .planet{
            position:absolute;width:720px;height:720px;right:-310px;bottom:-325px;
            border-radius:50%;
            background:radial-gradient(circle at 30% 27%,#9172b8,#392d62 40%,#15142d 68%,#03050c 100%);
            box-shadow:-30px -25px 110px rgba(150,90,255,.32);
            opacity:0;
        }

        .stadium{
            position:absolute;left:50%;bottom:7%;width:830px;height:330px;
            transform:translateX(-50%) scale(.6);opacity:0;z-index:5;
        }

        .stands{
            position:absolute;left:50%;bottom:45px;width:780px;height:215px;
            transform:translateX(-50%);border-radius:50% 50% 5% 5%;
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
            transform:translate(-50%,-50%);
            border:2px solid rgba(255,255,255,.5);border-radius:50%;
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
            display:flex;gap:42px;opacity:0;z-index:15;font-size:44px;
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

        .countdown{
            position:absolute;left:50%;top:21%;
            transform:translate(-50%,-50%) scale(.6);
            opacity:0;z-index:35;text-align:center;color:#fff;
            font-size:24px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 10px #fff,0 0 25px #ff3d5c;
        }

        .countdown strong{
            display:block;margin-top:8px;font-size:62px;
            letter-spacing:9px;color:#ff9caf;
            text-shadow:0 0 12px #fff,0 0 35px #ff174f;
        }

        .energy{
            position:absolute;left:50%;top:47%;
            width:20px;height:20px;border-radius:50%;
            transform:translate(-50%,-50%) scale(.1);
            opacity:0;z-index:38;background:#fff;
            box-shadow:0 0 25px #fff,0 0 65px #6ce7ff,0 0 140px #198dff;
        }

        .portal{
            position:absolute;left:50%;top:48%;
            width:350px;height:350px;
            transform:translate(-50%,-50%) scale(.05);
            opacity:0;z-index:45;
        }

        .portal-ring{
            position:absolute;inset:0;border-radius:50%;
            border:8px solid rgba(215,245,255,.95);
            box-shadow:
                0 0 20px #fff,0 0 55px #2edfff,
                0 0 120px rgba(20,150,255,.7),
                inset 0 0 50px #258fff;
        }

        .portal-core{
            position:absolute;left:50%;top:50%;
            transform:translate(-50%,-50%);
            font-size:125px;
            filter:drop-shadow(0 0 18px #fff) drop-shadow(0 0 45px #22dfff);
        }

        .message{
            position:absolute;left:50%;top:75%;
            transform:translate(-50%,-50%) scale(.7);
            opacity:0;z-index:55;text-align:center;color:#fff;
            font-size:28px;font-weight:bold;letter-spacing:5px;
            text-shadow:0 0 12px #fff,0 0 30px #b03cff;
        }

        .message strong{
            display:block;margin-top:9px;font-size:52px;color:#efc6ff;
            letter-spacing:7px;text-shadow:0 0 12px #fff,0 0 30px #b33cff;
        }

        .final{
            position:absolute;left:50%;bottom:8%;
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
    const countdown=contenedor.querySelector(".countdown");
    const energy=contenedor.querySelector(".energy");
    const portal=contenedor.querySelector(".portal");
    const message=contenedor.querySelector(".message");
    const final=contenedor.querySelector(".final");
    const counter=countdown.querySelector("strong");

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

    .then(()=>countdown.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.6)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:800,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(resolve=>{
        let n=3;
        counter.textContent="00:03";
        const timer=setInterval(()=>{
            n--;
            if(n>0) counter.textContent=`00:0${n}`;
            else{
                counter.textContent="00:00";
                clearInterval(timer);
                resolve();
            }
        },650);
    }))

    .then(()=>energy.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.1)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.2)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:700,fill:"forwards"}
    ).finished)

    .then(()=>portal.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.05) rotate(-180deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.08) rotate(0deg)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1) rotate(0deg)"}
        ],
        {duration:1100,easing:"cubic-bezier(.2,.9,.2,1)",fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,700)))

    .then(()=>message.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.7)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1000)))

    .then(()=>Promise.all([
        countdown.animate([{opacity:1},{opacity:0}],{duration:400,fill:"forwards"}).finished,
        energy.animate(
            [
                {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
                {opacity:.5,transform:"translate(-50%,-50%) scale(2.5)"},
                {opacity:0,transform:"translate(-50%,-50%) scale(4)"}
            ],
            {duration:800,fill:"forwards"}
        ).finished
    ]))

    .then(()=>portal.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:.7,transform:"translate(-50%,-50%) scale(1.25)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(1.7)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(()=>message.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:0,transform:"translate(-50%,-50%) scale(.7)"}
        ],
        {duration:600,fill:"forwards"}
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
