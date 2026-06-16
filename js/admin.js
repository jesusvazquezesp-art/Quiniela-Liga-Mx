async function loginAdmin(){
  const usuario = $('adminUser').value.trim();
  const pass = $('adminPass').value.trim();

  if(!usuario || !pass){
    msg('Escribe usuario y contraseña.','error');
    return;
  }

  try{
    // Validación segura por Supabase RPC
    const { data, error } = await db.rpc('validar_admin', {
      p_usuario: usuario,
      p_password: pass
    });

    if(error) throw error;

    if(data === true){
      esAdmin = true;
      localStorage.setItem(ADMIN_SESSION_KEY,'1');
      $('login').style.display='none';
      $('panelAdmin').style.display='block';
      msg('Administrador activo.','ok');
      await cargar();
      return;
    }

    msg('Usuario o contraseña incorrectos.','error');

  }catch(e){
    console.error(e);
    msg('No se pudo validar admin. Revisa conexión o función validar_admin.','error');
  }
}
function logoutAdmin(){
  esAdmin=false;
  localStorage.removeItem(ADMIN_SESSION_KEY);
  editandoJornadaId=null;
  aplicarEstadoAdmin();
  cancelarEdicion(false);
  dibujar();
  msg('Admin cerrado. La página volvió a modo usuario.','info')
}
function dibAdmin(){let nums='';for(let i=1;i<=17;i++)nums+=`<option value="${i}">Jornada ${i}</option>`;nums+=`<option value="${NUM_LIGUILLA}">🏆 Liguilla</option>`;$('jNumero').innerHTML=nums;if(!$('jNombre').value)$('jNombre').value='Jornada 1'; if($('jNumero')) $('jNumero').setAttribute('onchange','prepararFormJornada()'); prepararFormJornada();dibJornadas();dibResultados();dibPagos()}

function adminSub(id,b){document.querySelectorAll('.admin-sub').forEach(x=>x.classList.remove('activa'));$(id).classList.add('activa');document.querySelectorAll('.subtabs button').forEach(x=>x.classList.remove('activo'));b.classList.add('activo');if(esAdmin)cargarPrivado()}

async function reiniciarTorneo(){
  try{
    if(!esAdmin)return msg('Solo administrador','error');
    let c1=confirm('Esto borrará boletos, jornadas, partidos, resultados, pagos, fama y auditoría. Se conservan equipos y escudos. ¿Continuar?');
    if(!c1)return;
    let txt=prompt('Para confirmar escribe exactamente: REINICIAR TORNEO');
    if(txt!=='REINICIAR TORNEO')return msg('Reinicio cancelado','info');
    let temporada=prompt('Nombre de temporada para guardar en Salón de la Fama:', 'Apertura 2026') || ('Temporada '+new Date().getFullYear());
    msg('Archivando Salón de la Fama antes de reiniciar...','info');
    await archivarSalonFamaAntesDeReiniciar(temporada);
    try{ await guardarRespaldo('PRE_REINICIO',false); }catch(e){ console.warn('No se pudo crear respaldo PRE_REINICIO:',e.message); }
    // Orden por relaciones.
    await db.from('pronosticos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('pagos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('fama').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('auditoria').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('partidos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('usuarios').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('jornadas').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('tabla_liga_mx').delete().neq('id','00000000-0000-0000-0000-000000000000');
    jornada=null;jornadas=[];partidos=[];usuarios=[];pronosticos=[];pagos=[];auditoria=[];fama=[];tablaLiga=[];
    await cargar();
    msg('Torneo reiniciado. Equipos y escudos se conservaron. Salón de la Fama archivado.','ok');
  }catch(e){msg('Error al reiniciar torneo: '+e.message,'error')}
}

async function forzarRecalculoTabla(){
  try{
    if(!esAdmin)return msg('Solo administrador','error');
    await recalcularTablaLiga();
    await cargar();
    await aud('RECALCULAR_TABLA','Admin forzó actualización de tabla general');
    msg('Tabla general recalculada desde cero','ok');
  }catch(e){msg('Error al recalcular tabla: '+e.message,'error')}
}


