# NBA

Armá tu equipo ideal de la NBA, filtrando jugadores por posición.

## IMPORTANTE

Este ejercicio usa una interfaz gráfica bastante compleja, que llama a tus funciones. Para probar errores, usen el debugger o metan console.logs.

## Consigna base

Tenés acceso a una lista de todos los jugadores de la NBA a través de las funciones de `src/lib/jugadores.ts`:

- `cargarJugadores()` — devuelve un array con los IDs (números identificatorios) de todos los jugadores activos.
- `obtenerDato(id, caracteristica)` — dado un ID y el nombre de un campo (`"nombre"`, `"posicion"`, `"pts"`, etc.), devuelve su valor como string.
- `obtenerJugadoresPorIds(ids)` — dado un array de IDs, devuelve los datos completos de esos jugadores.

Implementá las siguientes funciones en `src/index.ts`:

**`estaEnRoster(roster, id)`** — Recibe un array de IDs (el roster actual) y un ID. Devuelve `true` si el ID ya está en el roster, `false` si no.

**`agregarAlRoster(roster, id)`** — Recibe el roster actual y un ID. Devuelve un **nuevo array** con el ID agregado al final. No debe modificar el array original.

**`quitarDelRoster(roster, id)`** — Recibe el roster actual y un ID. Devuelve un **nuevo array** sin ese ID. No debe modificar el array original.

La interfaz ya está implementada: los botones "+" y "×" gestionan el roster (máximo 5 jugadores). En la consigna base, al cambiar de tab se muestran todos los jugadores sin filtrar por posición.

Ejemplo:

| Acción | Resultado |
|--------|-----------|
| El usuario hace click en "+" sobre LeBron James | LeBron aparece en el panel de roster |
| El usuario hace click en "×" sobre LeBron James | LeBron se elimina del roster |
| El roster ya tiene 5 jugadores y el usuario intenta agregar otro | El roster no cambia |

## Consigna manija

Implementá las siguientes funciones en `src/manija.ts`:

**`filtrarPorPosicion(jugadores, posicion)`** — Recibe un array de IDs y una posición (`"G"`, `"F"`, `"C"` o `""`). Devuelve un nuevo array con solo los IDs cuya posición coincide. Si `posicion` es `""`, devuelve todos los IDs sin filtrar.

**`obtenerMejorJugador(ids, caracteristica)`** — Recibe un array de IDs y el nombre de la estadística a comparar (`"pts"`, `"reb"`, `"ast"`, etc.). Devuelve el ID del jugador con el valor más alto en esa estadística. Si `ids` está vacío, devuelve `-1`.

Con estas funciones, los tabs de posición filtran la lista por posición, y el botón "Armar mejor equipo" selecciona automáticamente al mejor base (por `pts`), al mejor alero (por `reb`) y al mejor pivote (por `reb`).

Ejemplo:

| Llamada | Resultado |
|---------|-----------|
| `filtrarPorPosicion([1, 2, 3], 'G')` | IDs de los jugadores con posición `"G"` |
| `filtrarPorPosicion([1, 2, 3], '')` | `[1, 2, 3]` (sin filtrar) |
| `obtenerMejorJugador([1, 2, 3], 'pts')` | ID del jugador con más puntos |
| `obtenerMejorJugador([], 'pts')` | `-1` |

## ¿Qué hay que editar?

- `src/index.ts` — implementar `estaEnRoster`, `agregarAlRoster` y `quitarDelRoster`
- `src/manija.ts` — implementar `filtrarPorPosicion` y `obtenerMejorJugador`

Los archivos en `src/lib/` están completos, no hace falta tocarlos.

## Primeros pasos

```bash
npm install
```

## Cómo correr el programa

```bash
npm run start        # ejecuta src/index.ts
npm run dev          # ejecuta src/index.ts con hot reload
```

Para la manija:

```bash
npm run start-manija # ejecuta src/manija.ts
npm run dev-manija   # ejecuta src/manija.ts con hot reload
```

## Debugger

El proyecto tiene dos configuraciones de debug listas en VS Code (panel "Run and Debug" o `F5`):

- **Debuggear Consigna Base** — lanza `src/index.ts`
- **Debuggear Consigna Manija** — lanza `src/manija.ts`

El debugger saltea automáticamente el código de `src/lib/` y `node_modules`, así los breakpoints y el step-into solo caen en el código que escribiste vos.

**Tip:** no uses F10 (Step Over) sobre `enviarAlFrontend` — como es una operación asíncrona, el debugger va a terminar en código interno de Node. En cambio, poné un breakpoint en la línea siguiente y presioná F5 (Continue) para saltar hasta ahí.

## Tests

```bash
npm run test-base    # consigna base
npm run test-manija  # consigna manija
npm test             # todos
```
