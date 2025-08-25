function doGet(e) { return HtmlService.createHtmlOutput('OK'); }

function doPost(e) {
  try {
    const origin = e?.parameter?.origin || (e?.headers && e.headers['Origin']);
    if (origin && CFG.ALLOWED_ORIGINS.indexOf(origin) === -1) {
      return ContentService.createTextOutput(JSON.stringify({ ok:false, error:'origin_not_allowed' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    const data = JSON.parse(e.postData.contents);
    const sh = getSheetByUser(data.usuario_wp || 'anon');
    sh.appendRow([
      data.timestamp_iso || new Date().toISOString(),
      data.usuario_wp, data.tarea_id, data.titulo || '', data.descripcion || '',
      data.fogon, data.eisenhower, data.inicio_iso || '', data.fin_iso || '',
      data.minutos || '', data.accion || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok:true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok:false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
