let _ws = null;

function conectar() {
  _ws = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`);

  _ws.onopen = () => {
    window.dispatchEvent(new CustomEvent('ws:open'));
  };

  _ws.onmessage = ({ data }) => {
    const { tipo, mensaje } = JSON.parse(data);
    window.dispatchEvent(new CustomEvent(tipo, { detail: mensaje }));
  };

  _ws.onclose = (event) => {
    if (event.code !== 1000) {
      setTimeout(conectar, 1000);
    }
  };
}

conectar();

/**
 * Envía un evento al servidor Node.
 * @param {string} nombre - Nombre del evento; el servidor escucha con `cuandoPasa(nombre, ...)`.
 * @param {Record<string, string>} datos - Datos del evento.
 */
function emitirEvento(nombre, datos) {
  if (_ws !== null && _ws.readyState === WebSocket.OPEN) {
    _ws.send(JSON.stringify({ evento: nombre, datos }));
  }
}
