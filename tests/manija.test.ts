import { vi, describe, it, expect } from 'vitest';

vi.mock('../src/lib/ui.ts', () => ({
  cuandoPasa: vi.fn(),
  enviarAlFrontend: vi.fn(),
  iniciar: vi.fn(),
}));

vi.mock('../src/lib/jugadores.ts', () => {
  const datos: Record<number, Record<string, string>> = {
    1: { posicion: 'G', pts: '30.0', reb: '5.0' },
    2: { posicion: 'G', pts: '20.0', reb: '4.0' },
    3: { posicion: 'F', pts: '18.0', reb: '11.0' },
    4: { posicion: 'C', pts: '12.0', reb: '14.0' },
  };
  return {
    cargarJugadores: vi.fn().mockReturnValue([1, 2, 3, 4]),
    obtenerDato: vi.fn().mockImplementation((id: number, caracteristica: string): string => {
      return datos[id][caracteristica];
    }),
    obtenerJugadoresPorIds: vi.fn().mockReturnValue([]),
  };
});

import { obtenerMejorJugador, filtrarPorPosicion } from '../src/manija.ts';

describe('NBA Manija', () => {
  describe('filtrarPorPosicion', () => {
    it('devuelve todos los IDs si la posición es vacía', () => {
      expect(filtrarPorPosicion([1, 2, 3, 4], '')).toEqual([1, 2, 3, 4]);
    });

    it('filtra solo guards (G)', () => {
      expect(filtrarPorPosicion([1, 2, 3, 4], 'G')).toEqual([1, 2]);
    });

    it('filtra solo forwards (F)', () => {
      expect(filtrarPorPosicion([1, 2, 3, 4], 'F')).toEqual([3]);
    });

    it('devuelve array vacío si ningún ID coincide con la posición', () => {
      expect(filtrarPorPosicion([1, 2], 'C')).toEqual([]);
    });
  });

  describe('obtenerMejorJugador', () => {
    it('devuelve el ID del jugador con más puntos', () => {
      expect(obtenerMejorJugador([1, 2], 'pts')).toBe(1);
    });

    it('devuelve el ID del jugador con más rebotes', () => {
      expect(obtenerMejorJugador([3, 4], 'reb')).toBe(4);
    });

    it('devuelve -1 si el array de IDs está vacío', () => {
      expect(obtenerMejorJugador([], 'pts')).toBe(-1);
    });

    it('devuelve el único ID si hay un solo jugador', () => {
      expect(obtenerMejorJugador([3], 'reb')).toBe(3);
    });
  });
});
