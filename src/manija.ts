import { cuandoPasa, enviarAlFrontend, iniciar } from './lib/ui.ts';
import { cargarJugadores, obtenerDato, obtenerJugadoresPorIds } from './lib/jugadores.ts';

const ids: number[] = cargarJugadores();
let roster: number[] = [];

export function filtrarPorPosicion(jugadores: number[], posicion: string): number[] {
  let idsFiltrados: number[] = []; // COMPLETAR
  return idsFiltrados;
}

export function obtenerMejorJugador(jugadores: number[], caracteristica: string): number {
  let mejorId: number = -1; // COMPLETAR
  return mejorId;
}

cuandoPasa('filtrar', ({ posicion }: Record<string, string>) => {
  let idsFiltrados: number[] = filtrarPorPosicion(ids, posicion);
  enviarAlFrontend('jugadores', obtenerJugadoresPorIds(idsFiltrados));
});

cuandoPasa('agregar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  let estaEn: boolean = false;
  for (let i: number = 0; i < roster.length; i++) {
    if (roster[i] === idNumero) {
      estaEn = true;
    }
  }
  if (roster.length < 5 && !estaEn) {
    let nuevoRoster: number[] = [];
    for (let i: number = 0; i < roster.length; i++) {
      nuevoRoster.push(roster[i]);
    }
    nuevoRoster.push(idNumero);
    roster = nuevoRoster;
  }
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('quitar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  roster = roster.filter((rid: number) => rid !== idNumero);
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('limpiarRoster', () => {
  roster = [];
  enviarAlFrontend('roster', []);
});

// ---- Zona de pruebas ----
// Podés probar obtenerMejorJugador acá antes de arrancar el servidor.
// Usá ids directamente o filtrá por posición ('G', 'F', 'C').
let idsPrueba: number[] = ids; // COMPLETAR
let mejorJugador: number = obtenerMejorJugador(idsPrueba, 'pts'); // COMPLETAR
console.log(mejorJugador);
// -------------------------

iniciar();
