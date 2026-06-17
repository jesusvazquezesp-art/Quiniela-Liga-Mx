aplicarEstadosABotones();
document.addEventListener('click',function(e){const box=document.querySelector('.menu-flotante');const m=document.getElementById('menuOpciones');if(box&&m&&!box.contains(e.target))m.classList.remove('abierto')});
async function init(){try{aplicarModoOscuro();esAdmin=localStorage.getItem(ADMIN_SESSION_KEY)==='1';aplicarEstadoAdmin();await cargar();let ultimoAuto=0;setInterval(async()=>{const ahora=Date.now();if(ahora-ultimoAuto>=30000){ultimoAuto=ahora;const cambio=await revisarCierreAutomatico();if(cambio){await cargar();return}}dibResumen();dibPartidos()},1000)}catch(e){msg('Error al cargar: '+e.message,'error');console.error(e)}}
document.addEventListener('DOMContentLoaded',init);
