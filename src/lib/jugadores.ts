import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const CARACTERISTICAS: Record<string, number> = {
  apellido: 1,
  nombre: 2,
  equipo: 8,
  ciudad: 7,
  camiseta: 10,
  posicion: 11,
  altura: 12,
  peso: 13,
  pais: 15,
  pts: 20,
  reb: 21,
  ast: 22,
};

const _jugadoresMap: Map<number, string[]> = new Map();

/**
 * Carga los jugadores desde `data/players.json` y devuelve los IDs de los jugadores activos.
 * Un jugador es activo si su estado de roster es distinto de `"null"`.
 * @returns Array de IDs numéricos de los jugadores activos.
 * @example
 * const ids = cargarJugadores();
 * // ids => [1630173, 1641706, ...]
 */
export function cargarJugadores(): number[] {
  const __filename: string = fileURLToPath(import.meta.url);
  const __dirname: string = dirname(__filename);
  const raw: { resultSets: Array<{ rowSet: unknown[][] }> } = JSON.parse(
    readFileSync(join(__dirname, '../../data/players.json'), 'utf-8'),
  ) as { resultSets: Array<{ rowSet: unknown[][] }> };
  const ids: number[] = [];
  for (const row of raw.resultSets[0].rowSet) {
    const fila: string[] = row.map((val: unknown) => String(val));
    const id: number = Number(fila[0]);
    _jugadoresMap.set(id, fila);
    if (fila[19] !== 'null') {
      ids.push(id);
    }
  }
  return ids;
}

/**
 * Devuelve el valor de una característica de un jugador dado su ID.
 * @param id - ID del jugador.
 * @param caracteristica - Nombre del campo a consultar. Valores posibles:
 * `apellido`, `nombre`, `equipo`, `ciudad`, `camiseta`, `posicion`, `altura`, `peso`, `pais`, `pts`, `reb`, `ast`.
 * @returns El valor del campo como string. Devuelve `''` si el ID no existe.
 * @throws Error si la característica no existe.
 * @example
 * obtenerDato(2544, 'nombre');    // => 'LeBron'
 * obtenerDato(2544, 'posicion');  // => 'F'
 * obtenerDato(2544, 'pts');       // => '25.7'
 */
export function obtenerDato(id: number, caracteristica: string): string {
  const columna: number = CARACTERISTICAS[caracteristica] ?? -1;
  if (columna === -1) {
    throw new Error(`Característica desconocida: ${caracteristica}`);
  }
  const fila: string[] | undefined = _jugadoresMap.get(id);
  if (fila === undefined || columna === -1) {
    return '';
  }
  return fila[columna];
}

/**
 * Devuelve los datos completos de los jugadores correspondientes a los IDs dados.
 * El orden del resultado respeta el orden del array de entrada.
 * @param ids - Array de IDs de jugadores.
 * @returns Array de filas, donde cada fila es un array de strings con todos los campos del jugador.
 * @example
 * const jugadores = obtenerJugadoresPorIds([2544, 201939]);
 * // jugadores[0][2] => 'LeBron'
 * // jugadores[1][2] => 'Stephen'
 */
export function obtenerJugadoresPorIds(ids: number[]): string[][] {
  const resultado: string[][] = [];
  for (let i: number = 0; i < ids.length; i++) {
    const fila: string[] | undefined = _jugadoresMap.get(ids[i]);
    if (fila !== undefined) {
      resultado.push(fila);
    }
  }
  return resultado;
}
