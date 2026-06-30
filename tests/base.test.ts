import { vi, describe, it, expect } from 'vitest';

vi.mock('../src/lib/ui.ts', () => ({
  cuandoPasa: vi.fn(),
  enviarAlFrontend: vi.fn(),
  iniciar: vi.fn(),
}));

vi.mock('../src/lib/jugadores.ts', () => {
  const posiciones: Record<number, string> = {
    1: 'G',
    2: 'F',
    3: 'C',
    4: 'G',
    5: 'F',
  };
  return {
    cargarJugadores: vi.fn().mockReturnValue([1, 2, 4]),
    obtenerDato: vi.fn().mockImplementation((id: number, caracteristica: string): string => {
      if (caracteristica === 'posicion') {
        return posiciones[id] ?? '';
      }
      return '';
    }),
    obtenerJugadoresPorIds: vi.fn().mockReturnValue([]),
  };
});

import { estaEnRoster, agregarAlRoster, quitarDelRoster } from '../src/index.ts';

describe('NBA', () => {
  describe('estaEnRoster', () => {
    it('devuelve true si el ID está en el roster', () => {
      expect(estaEnRoster([1, 2, 3], 2)).toBe(true);
    });

    it('devuelve false si el ID no está en el roster', () => {
      expect(estaEnRoster([1, 2, 3], 5)).toBe(false);
    });

    it('devuelve false para roster vacío', () => {
      expect(estaEnRoster([], 1)).toBe(false);
    });
  });

  describe('agregarAlRoster', () => {
    it('devuelve un nuevo array con el ID agregado', () => {
      expect(agregarAlRoster([1, 2], 3)).toEqual([1, 2, 3]);
    });

    it('no modifica el roster original', () => {
      const roster: number[] = [1, 2];
      agregarAlRoster(roster, 3);
      expect(roster).toEqual([1, 2]);
    });

    it('agrega al roster vacío', () => {
      expect(agregarAlRoster([], 7)).toEqual([7]);
    });
  });

  describe('quitarDelRoster', () => {
    it('devuelve un nuevo array sin el ID', () => {
      expect(quitarDelRoster([1, 2, 3], 2)).toEqual([1, 3]);
    });

    it('no modifica el roster original', () => {
      const roster: number[] = [1, 2, 3];
      quitarDelRoster(roster, 2);
      expect(roster).toEqual([1, 2, 3]);
    });

    it('devuelve el mismo array si el ID no está', () => {
      expect(quitarDelRoster([1, 2, 3], 5)).toEqual([1, 2, 3]);
    });

    it('devuelve array vacío si era el único elemento', () => {
      expect(quitarDelRoster([4], 4)).toEqual([]);
    });
  });
});
