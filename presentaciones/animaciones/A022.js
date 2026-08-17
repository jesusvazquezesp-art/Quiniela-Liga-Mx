export function ejecutar(contenedor, numeroJornada) {

    /*
    ============================================================
    A021 — REGRESO A JUÁREZ

    Planeta pirata
    → JORNADA ya está allí
    → Aparece el OVNI
    → La encuentra
    → La sube a bordo
    → El OVNI emprende el regreso
    → Viaje espacial
    → Aparece el estadio JUÁREZ FC
    → El OVNI baja sobre el estadio
    → Rayo tractor hacia abajo
    → JORNADA baja del OVNI
    → Queda en casa
    → OVNI desaparece en el horizonte
    ============================================================
    */

    contenedor.innerHTML = `

        <div class="a021-contenedor">

            <div class="a021-cielo">
                <span class="e1"></span><span class="e2"></span>
                <span class="e3"></span><span class="e4"></span>
                <span class="e5"></span><span class="e6"></span>
                <span class="e7"></span><span class="e8"></span>
                <span class="e9"></span><span class="e10"></span>
                <span class="e11"></span><span class="e12"></span>
            </div>

            <div class="a021-planeta"></div>
            <div class="a021-luna"></div>

            <div class="a021-planeta-nombre">
                PLANETA PIRATA
            </div>

            <div class="a021-jornada">
                <div class="titulo">JORNADA</div>
                <div class="numero">${numeroJornada}</div>
                <div class="subtitulo">Liga MX</div>
            </div>

            <div class="a021-ovni">

                <div class="ovni-cuerpo">
                    <div class="ovni-cabina"></div>
                    <div class="ovni-luces">
                        <span></span><span></span><span></span>
                        <span></span><span></span><span></span>
                    </div>
                </div>

                <div class="a021-rayo">
                    <div class="rayo-interior"></div>
                </div>

            </div>

            <div class="a021-destello"></div>

            <div class="a021-transicion">
                REGRESANDO A CASA
            </div>

            <div class="a021-estadio">

                <div class="luces">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </div>

                <div class="gradas">
                    <div class="grada-fondo"></div>
                    <div class="grada-frente"></div>
                </div>

                <div class="cancha">
                    <div class="linea"></div>
                    <div class="circulo"></div>
                </div>

                <div class="nombre">
                    JUÁREZ FC
                </div>

            </div>

            <div class="a021-casa-jornada">
                <div class="titulo">JORNADA</div>
                <div class="numero">${numeroJornada}</div>
                <div class="subtitulo">DE VUELTA A CASA</div>
            </div>

            <div class="a021-final">
                BIENVENIDA A CASA
            </div>

        </div>
    `;

    const estilo = document.createElement("style");

    estilo.textContent = `

        .a021-contenedor{
            position:relative;
            width:100%;
            height:100%;
            overflow:hidden;
            box-sizing:border-box;
            font-family:Arial,sans-serif;
            pointer-events:none;
            background:
                radial-gradient(circle at 50% 40%,
                    #35104d 0%,
                    #0b1028 42%,
                    #02040b 82%,
                    #000 100%);
        }

        .a021-cielo{
            position:absolute;
            inset:0;
            z-index:1;
        }

        .a021-cielo span{
            position:absolute;
            width:4px;
            height:4px;
            border-radius:50%;
            background:#fff;
            box-shadow:0 0 9px #fff;
            opacity:.8;
        }

        .e1{left:5%;top:10%}.e2{left:13%;top:27%}
        .e3{left:22%;top:8%}.e4{left:31%;top:20%}
        .e5{left:41%;top:9%}.e6{left:50%;top:25%}
        .e7{left:60%;top:7%}.e8{left:70%;top:22%}
        .e9{left:80%;top:9%}.e10{left:90%;top:28%}
        .e11{left:95%;top:12%}.e12{left:76%;top:40%}

        .a021-planeta{
            position:absolute;
            width:850px;
            height:850px;
            right:-390px;
            bottom:-430px;
            border-radius:50%;
            background:
                radial-gradient(circle at 32% 28%,
                    #a77bc7 0%,
                    #573878 32%,
                    #282047 61%,
                    #080a18 100%);
            box-shadow:
                -30px -25px 120px rgba(180,90,255,.45);
            z-index:2;
            opacity:0;
        }

        .a021-luna{
            position:absolute;
            width:90px;
            height:90px;
            right:13%;
            top:10%;
            border-radius:50%;
            background:
                radial-gradient(circle at 35% 35%,
                    #fff,#d9e4ef 55%,#8e9bae);
            box-shadow:0 0 35px rgba(220,235,255,.35);
            opacity:.75;
            z-index:3;
        }

        .a021-planeta-nombre{
            position:absolute;
            left:50%;
            top:13%;
            transform:translateX(-50%);
            color:#dcbaff;
            font-size:27px;
            font-weight:900;
            letter-spacing:7px;
            text-shadow:0 0 10px #fff,0 0 28px #a13cff;
            opacity:0;
            z-index:6;
            white-space:nowrap;
        }

        .a021-jornada{
            position:absolute;
            left:50%;
            top:55%;
            width:100%;
            transform:translate(-50%,-50%) scale(.9);
            opacity:0;
            text-align:center;
            color:#fff;
            z-index:12;
            text-shadow:
                0 0 12px #fff,
                0 0 30px #65d5ff,
                0 0 60px #5360ff;
        }

        .a021-jornada .titulo,
        .a021-casa-jornada .titulo{
            font-size:40px;
            font-weight:bold;
            letter-spacing:10px;
        }

        .a021-jornada .numero,
        .a021-casa-jornada .numero{
            font-size:270px;
            line-height:.82;
            font-weight:900;
        }

        .a021-jornada .subtitulo{
            font-size:28px;
            color:#ffd54f;
            margin-top:18px;
        }

        .a021-ovni{
            position:absolute;
            left:50%;
            top:15%;
            width:430px;
            height:430px;
            transform:translateX(-50%) scale(.7);
            opacity:0;
            z-index:25;
        }

        .ovni-cuerpo{
            position:absolute;
            left:50%;
            top:0;
            width:360px;
            height:135px;
            transform:translateX(-50%);
            border-radius:50% 50% 45% 45%;
            background:
                radial-gradient(ellipse at 50% 30%,
                    #dce9f5 0%,
                    #77899d 35%,
                    #283443 70%,
                    #080d14 100%);
            border:4px solid rgba(210,235,255,.85);
            box-shadow:
                0 0 25px rgba(150,210,255,.7),
                0 0 70px rgba(70,150,255,.45);
        }

        .ovni-cabina{
            position:absolute;
            left:50%;
            top:-48px;
            width:150px;
            height:80px;
            transform:translateX(-50%);
            border-radius:50% 50% 40% 40%;
            background:
                radial-gradient(ellipse at center,
                    #effcff,#68a8c5 55%,#17364a);
            border:3px solid rgba(220,245,255,.9);
            box-shadow:0 0 25px rgba(100,225,255,.85);
        }

        .ovni-luces{
            position:absolute;
            left:50%;
            bottom:12px;
            width:270px;
            transform:translateX(-50%);
            display:flex;
            justify-content:space-between;
        }

        .ovni-luces span{
            width:15px;
            height:15px;
            border-radius:50%;
            background:#72eaff;
            box-shadow:0 0 8px #72eaff,0 0 22px rgba(80,220,255,.9);
        }

        .a021-rayo{
            position:absolute;
            left:50%;
            top:105px;
            width:360px;
            height:330px;
            transform:translateX(-50%) scaleY(.05);
            transform-origin:top center;
            clip-path:polygon(15% 0%,85% 0%,100% 100%,0% 100%);
            background:
                linear-gradient(to bottom,
                    rgba(130,250,255,.65),
                    rgba(80,225,255,.30),
                    rgba(70,170,255,.08));
            filter:blur(2px);
            opacity:0;
            z-index:-1;
        }

        .rayo-interior{
            position:absolute;
            inset:20px;
            background:
                linear-gradient(to bottom,
                    rgba(235,255,255,.45),
                    rgba(120,240,255,.10));
            clip-path:polygon(25% 0%,75% 0%,100% 100%,0% 100%);
        }

        .a021-transicion{
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%) scale(.8);
            color:#fff;
            font-size:34px;
            font-weight:900;
            letter-spacing:7px;
            text-shadow:0 0 15px #fff,0 0 35px #2bdfff;
            opacity:0;
            z-index:70;
            white-space:nowrap;
        }

        .a021-estadio{
            position:absolute;
            left:50%;
            bottom:7%;
            width:820px;
            height:330px;
            transform:translateX(-50%) scale(.75);
            opacity:0;
            z-index:4;
        }

        .gradas{
            position:absolute;
            left:50%;
            bottom:65px;
            width:760px;
            height:210px;
            transform:translateX(-50%);
            overflow:hidden;
            border-radius:45% 45% 5% 5%;
            background:linear-gradient(to bottom,#18263a,#0b111c);
            border:4px solid rgba(100,120,145,.5);
            box-shadow:0 0 40px rgba(80,120,180,.2),inset 0 0 40px rgba(0,0,0,.8);
        }

        .grada-fondo{
            position:absolute;
            inset:20px;
            border-radius:45% 45% 0 0;
            background:
                repeating-linear-gradient(
                    to bottom,
                    rgba(100,120,150,.3) 0px,
                    rgba(100,120,150,.3) 4px,
                    transparent 4px,
                    transparent 14px);
        }

        .grada-frente{
            position:absolute;
            left:50%;
            bottom:0;
            width:680px;
            height:100px;
            transform:translateX(-50%);
            border-radius:50% 50% 0 0;
            background:linear-gradient(to bottom,#101b2a,#05080d);
        }

        .luces{
            position:absolute;
            left:50%;
            top:0;
            width:720px;
            transform:translateX(-50%);
            display:flex;
            justify-content:space-between;
            z-index:5;
        }

        .luces span{
            width:13px;
            height:45px;
            border-radius:8px;
            background:#fff;
            box-shadow:0 0 10px #fff,0 0 25px rgba(170,210,255,.8);
        }

        .cancha{
            position:absolute;
            left:50%;
            bottom:0;
            width:520px;
            height:110px;
            transform:translateX(-50%);
            border-radius:50% 50% 0 0;
            background:linear-gradient(to bottom,#173b28,#081a10);
            border:3px solid rgba(100,180,120,.35);
            z-index:7;
        }

        .linea{
            position:absolute;
            left:50%;
            top:0;
            width:2px;
            height:100%;
            background:rgba(255,255,255,.5);
        }

        .circulo{
            position:absolute;
            left:50%;
            top:50%;
            width:70px;
            height:35px;
            transform:translate(-50%,-50%);
            border:2px solid rgba(255,255,255,.5);
            border-radius:50%;
        }

        .nombre{
            position:absolute;
            left:50%;
            bottom:88px;
            transform:translateX(-50%);
            font-size:48px;
            font-weight:900;
            letter-spacing:8px;
            color:#fff;
            text-shadow:
                0 0 10px rgba(255,255,255,.9),
                0 0 25px rgba(70,160,255,.8),
                0 0 50px rgba(30,100,220,.5);
            z-index:10;
        }

        .a021-casa-jornada{
            position:absolute;
            left:50%;
            top:54%;
            width:100%;
            transform:translate(-50%,-50%) scale(.25);
            opacity:0;
            text-align:center;
            color:#fff;
            z-index:35;
            text-shadow:
                0 0 12px #fff,
                0 0 30px rgba(100,180,255,.9),
                0 0 60px rgba(60,120,255,.65);
        }

        .a021-casa-jornada .subtitulo{
            margin-top:20px;
            font-size:30px;
            color:#ffd54f;
        }

        .a021-final{
            position:absolute;
            left:50%;
            bottom:8%;
            transform:translateX(-50%) scale(.8);
            opacity:0;
            color:#fff;
            font-size:26px;
            font-weight:900;
            letter-spacing:5px;
            max-width:90%;
            text-align:center;
            text-shadow:0 0 15px #fff,0 0 35px #36cfff;
            z-index:60;
            white-space:nowrap;
        }

        .a021-destello{
            position:absolute;
            inset:0;
            background:#fff;
            opacity:0;
            z-index:90;
        }
    `;

    contenedor.appendChild(estilo);

    const planeta = contenedor.querySelector(".a021-planeta");
    const planetaNombre = contenedor.querySelector(".a021-planeta-nombre");
    const jornada = contenedor.querySelector(".a021-jornada");
    const ovni = contenedor.querySelector(".a021-ovni");
    const rayo = contenedor.querySelector(".a021-rayo");
    const transicion = contenedor.querySelector(".a021-transicion");
    const estadio = contenedor.querySelector(".a021-estadio");
    const casaJornada = contenedor.querySelector(".a021-casa-jornada");
    const final = contenedor.querySelector(".a021-final");
    const destello = contenedor.querySelector(".a021-destello");

    // 1. PLANETA PIRATA
    return planeta.animate(
        [
            {opacity:0,transform:"scale(.7)"},
            {opacity:1,transform:"scale(1)"}
        ],
        {duration:1000,fill:"forwards"}
    ).finished

    .then(()=>planetaNombre.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.7)"},
            {opacity:1,transform:"translateX(-50%) scale(1)"}
        ],
        {duration:700,fill:"forwards"}
    ).finished)

    // 2. JXMX YA ESTÁ AQUÍ
    .then(()=>jornada.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.2)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.06)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:900,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,900)))

    // 3. LLEGA EL OVNI
    .then(()=>ovni.animate(
        [
            {opacity:0,transform:"translateX(-50%) translateY(-100px) scale(.3)"},
            {opacity:1,transform:"translateX(-50%) translateY(0) scale(1)"},
            {opacity:1,transform:"translateX(-50%) translateY(0) scale(1)"}
        ],
        {duration:1400,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"}
    ).finished)

    // 4. RAYO: AHORA LO RECOGE PARA LLEVARLO A CASA
    .then(()=>rayo.animate(
        [
            {opacity:0,transform:"translateX(-50%) scaleY(.05)"},
            {opacity:.5,transform:"translateX(-50%) scaleY(.65)"},
            {opacity:.8,transform:"translateX(-50%) scaleY(1)"}
        ],
        {duration:900,easing:"ease-out",fill:"forwards"}
    ).finished)

    .then(()=>jornada.animate(
        [
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"},
            {opacity:1,transform:"translate(-50%,calc(-50% - 100px)) scale(.9)"},
            {opacity:.85,transform:"translate(-50%,calc(-50% - 185px)) scale(.72)"},
            {opacity:0,transform:"translate(-50%,calc(-50% - 245px)) scale(.08)"}
        ],
        {duration:1700,easing:"cubic-bezier(.25,.8,.15,1)",fill:"forwards"}
    ).finished)

    // 5. DESPEGUE DEL PLANETA
    .then(()=>rayo.animate(
        [{opacity:.8},{opacity:0}],
        {duration:500,fill:"forwards"}
    ).finished)

    .then(()=>ovni.animate(
        [
            {opacity:1,transform:"translateX(-50%) translateY(0) scale(1)"},
            {opacity:1,transform:"translateX(-50%) translateY(-180px) scale(.72)"},
            {opacity:.7,transform:"translateX(-50%) translateY(-360px) scale(.45)"},
            {opacity:0,transform:"translateX(-50%) translateY(-540px) scale(.08)"}
        ],
        {duration:1700,easing:"cubic-bezier(.2,.7,.2,1)",fill:"forwards"}
    ).finished)

    // 6. VIAJE
    .then(()=>transicion.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.7)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1.05)"},
            {opacity:1,transform:"translate(-50%,-50%) scale(1)"}
        ],
        {duration:800,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,900)))

    .then(()=>transicion.animate(
        [{opacity:1},{opacity:0}],
        {duration:600,fill:"forwards"}
    ).finished)

    // 7. REGRESAMOS A LA TIERRA
    .then(()=>Promise.all([
        planeta.animate(
            [
                {opacity:1,transform:"scale(1)"},
                {opacity:.55,transform:"scale(1.08)"},
                {opacity:0,transform:"scale(1.18)"}
            ],
            {duration:700,fill:"forwards"}
        ).finished,
        planetaNombre.animate(
            [
                {opacity:1,transform:"translateX(-50%) scale(1)"},
                {opacity:0,transform:"translateX(-50%) scale(.85)"}
            ],
            {duration:500,fill:"forwards"}
        ).finished,
        estadio.animate(
            [
                {opacity:0,transform:"translateX(-50%) scale(.55)"},
                {opacity:1,transform:"translateX(-50%) scale(.8)"},
                {opacity:1,transform:"translateX(-50%) scale(.75)"}
            ],
            {duration:1300,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"}
        ).finished
    ]))

    // 8. EL OVNI APARECE SOBRE JUÁREZ
    .then(()=>ovni.animate(
        [
            {opacity:0,transform:"translateX(-50%) translateY(-140px) scale(.25)"},
            {opacity:1,transform:"translateX(-50%) translateY(0) scale(1)"},
            {opacity:1,transform:"translateX(-50%) translateY(0) scale(1)"}
        ],
        {duration:1300,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"}
    ).finished)

    // 9. RAYO HACIA ABAJO
    .then(()=>rayo.animate(
        [
            {opacity:0,transform:"translateX(-50%) scaleY(.05)"},
            {opacity:.5,transform:"translateX(-50%) scaleY(.65)"},
            {opacity:.85,transform:"translateX(-50%) scaleY(1)"}
        ],
        {duration:900,easing:"ease-out",fill:"forwards"}
    ).finished)

    // 10. JXMX BAJA DEL OVNI Y REGRESA AL ESTADIO
    .then(()=>casaJornada.animate(
        [
            {opacity:0,transform:"translate(-50%,-50%) scale(.08)"},
            {opacity:1,transform:"translate(-50%,-40%) scale(.25)"},
            {opacity:1,transform:"translate(-50%,-10%) scale(.55)"},
            {opacity:1,transform:"translate(-50%,20%) scale(.75)"},
            {opacity:1,transform:"translate(-50%,28%) scale(.48)"}
        ],
        {duration:1900,easing:"cubic-bezier(.2,.75,.25,1)",fill:"forwards"}
    ).finished)

    // 11. EL RAYO SE APAGA
    .then(()=>rayo.animate(
        [{opacity:.85},{opacity:0}],
        {duration:650,fill:"forwards"}
    ).finished)

    // 12. EL OVNI SE ALEJA
    .then(()=>ovni.animate(
        [
            {opacity:1,transform:"translateX(-50%) translateY(0) scale(1)"},
            {opacity:1,transform:"translateX(-50%) translateY(-110px) scale(.75)"},
            {opacity:.7,transform:"translateX(-50%) translateY(-260px) scale(.48)"},
            {opacity:.35,transform:"translateX(-50%) translateY(-400px) scale(.25)"},
            {opacity:0,transform:"translateX(-50%) translateY(-530px) scale(.06)"}
        ],
        {duration:2200,easing:"cubic-bezier(.2,.7,.2,1)",fill:"forwards"}
    ).finished)

    // 13. JXMX QUEDA EN CASA
    .then(()=>final.animate(
        [
            {opacity:0,transform:"translateX(-50%) scale(.8)"},
            {opacity:1,transform:"translateX(-50%) scale(1.08)"},
            {opacity:1,transform:"translateX(-50%) scale(1)"}
        ],
        {duration:850,fill:"forwards"}
    ).finished)

    .then(()=>new Promise(r=>setTimeout(r,1300)));

}
