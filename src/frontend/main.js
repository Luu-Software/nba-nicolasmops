let rosterIds = [];

const ID = 0;
const APELLIDO = 1;
const NOMBRE = 2;
const ID_EQUIPO = 4;
const NOMBRE_EQUIPO = 8;
const POSICION = 11;

function urlFoto(id) {
  return `https://cdn.nba.com/headshots/nba/latest/260x190/${id}.png`;
}

function urlLogo(teamId) {
  return `https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`;
}

function crearTarjetaJugador(jugador) {
  const id = jugador[ID];
  const nombre = `${jugador[NOMBRE]} ${jugador[APELLIDO]}`;
  const posicion = jugador[POSICION];
  const equipo = jugador[NOMBRE_EQUIPO];
  const logo = urlLogo(jugador[ID_EQUIPO]);

  const seleccionado = estaSeleccionado(id);

  const card = document.createElement('div');
  card.className = 'player-card' + (seleccionado ? ' seleccionado' : '');
  card.dataset.id = id;
  card.innerHTML = `
    <div class="player-photo-wrapper">
      <img class="player-photo" src="${urlFoto(id)}" alt="${nombre}" />
    </div>
    <div class="player-name">${nombre}</div>
    <div class="player-pos">${posicion}</div>
    <div class="player-team">
      <img class="team-logo" src="${logo}" alt="${equipo}" />
      <span class="team-name">${equipo}</span>
    </div>
    <button class="btn-agregar" title="Agregar al equipo" ${seleccionado ? 'disabled' : ''}>+</button>
  `;

  card.querySelector('.btn-agregar').addEventListener('click', () => {
    emitirEvento('agregar', { id });
  });

  return card;
}

function crearSlotRoster(jugador) {
  const id = jugador[ID];
  const nombre = `${jugador[NOMBRE]} ${jugador[APELLIDO]}`;
  const posicion = jugador[POSICION];
  const equipo = jugador[NOMBRE_EQUIPO];
  const logo = urlLogo(jugador[ID_EQUIPO]);

  const slot = document.createElement('div');
  slot.className = 'roster-slot';
  slot.innerHTML = `
    <div class="slot-photo-wrapper">
      <img class="slot-photo" src="${urlFoto(id)}" alt="${nombre}" />
    </div>
    <div class="slot-info">
      <div class="slot-name">${nombre}</div>
      <div class="slot-detail">
        <img class="slot-team-logo" src="${logo}" alt="${equipo}" />
        <span>${posicion} · ${equipo}</span>
      </div>
    </div>
    <button class="btn-quitar" title="Quitar del equipo">×</button>
  `;

  slot.querySelector('.btn-quitar').addEventListener('click', () => {
    emitirEvento('quitar', { id });
  });

  return slot;
}

function crearSlotVacio() {
  const slot = document.createElement('div');
  slot.className = 'roster-slot vacio';
  slot.innerHTML = '<span class="slot-empty-label">Vacío</span>';
  return slot;
}

function estaSeleccionado(id) {
  for (let i = 0; i < rosterIds.length; i++) {
    if (rosterIds[i] === id) return true;
  }
  return false;
}

function actualizarEstadoCartas() {
  document.querySelectorAll('.player-card').forEach((card) => {
    const seleccionado = estaSeleccionado(card.dataset.id);
    card.classList.toggle('seleccionado', seleccionado);
    const btn = card.querySelector('.btn-agregar');
    if (btn !== null) {
      btn.disabled = seleccionado;
    }
  });
}

function renderJugadores(jugadores) {
  const grid = document.getElementById('jugadoresGrid');
  grid.innerHTML = '';
  jugadores.forEach((jugador) => {
    grid.appendChild(crearTarjetaJugador(jugador));
  });
  actualizarEstadoCartas();
}

function renderRoster(roster) {
  const slots = document.getElementById('rosterSlots');
  const count = document.getElementById('rosterCount');
  slots.innerHTML = '';
  roster.forEach((jugador) => {
    slots.appendChild(crearSlotRoster(jugador));
  });
  for (let i = roster.length; i < 5; i++) {
    slots.appendChild(crearSlotVacio());
  }
  count.textContent = roster.length;
}

window.addEventListener('jugadores', (evento) => {
  renderJugadores(evento.detail);
});

window.addEventListener('roster', (evento) => {
  rosterIds = evento.detail.map((j) => j[ID]);
  renderRoster(evento.detail);
  actualizarEstadoCartas();
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('activo'));
    tab.classList.add('activo');
    emitirEvento('filtrar', { posicion: tab.dataset.posicion });
  });
});

window.addEventListener('ws:open', () => {
  emitirEvento('filtrar', { posicion: '' });
});
