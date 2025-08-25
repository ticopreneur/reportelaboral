const CFG = {
  SPREADSHEET_ID: 'REEMPLAZAR_ID_SPREADSHEET',
  ALLOWED_ORIGINS: ['https://propiedadesadvice.com', 'http://localhost:5173'],
  TZ: 'America/Costa_Rica',
  RRHH_EMAILS: ['rrhh@propiedadesadvice.com']
};
function getSheetByUser(usuario) {
  const ss = SpreadsheetApp.openById(CFG.SPREADSHEET_ID);
  const name = `Logs_${usuario}`;
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(['timestamp_iso','usuario_wp','tarea_id','titulo','descripcion','fogon','eisenhower','inicio','fin','minutos','estado']);
  }
  return sh;
}
