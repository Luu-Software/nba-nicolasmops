import { cuandoPasa, enviarAlFrontend, iniciar } from './lib/ui.ts';
import { cargarJugadores, obtenerJugadoresPorIds } from './lib/jugadores.ts';

const ids: number[] = cargarJugadores();
let roster: number[] = [];

export function estaEnRoster(roster: number[], id: number): boolean {
  let esta: boolean = false; // COMPLETAR
  return esta;
}

export function agregarAlRoster(roster: number[], id: number): number[] {
  let nuevoRoster: number[] = []; // COMPLETAR
  return nuevoRoster;
}

export function quitarDelRoster(roster: number[], id: number): number[] {
  let nuevoRoster: number[] = []; // COMPLETAR
  return nuevoRoster;
}

cuandoPasa('filtrar', () => {
  enviarAlFrontend('jugadores', obtenerJugadoresPorIds(ids));
});

cuandoPasa('agregar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  if (roster.length < 5 && !estaEnRoster(roster, idNumero)) {
    roster = agregarAlRoster(roster, idNumero);
  }
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('quitar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  roster = quitarDelRoster(roster, idNumero);
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('limpiarRoster', () => {
  roster = [];
  enviarAlFrontend('roster', []);
});

iniciar();
