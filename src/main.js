import {Universe, Cell, wasm_memory} from '../pkg';
const COLUMN = 50;
const ROW = 50;

const CELL_SIZE = 10;
const GRID_COLOR = '#ccc';
const CELL_COLOR = {
    [Cell.Dead]: '#fff',
    [Cell.Alive]: '#000'
};

let prevCells = [];

function createCanvas(column, row) {
    const canvas = document.createElement('canvas');
    const width = (CELL_SIZE + 1) * column + 1;
    const height = (CELL_SIZE + 1) * row + 1;
    canvas.width = width;
    canvas.height = height;
    canvas.style = `width: ${width}px; height: ${height}px`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    // ctx.translate(0.5, 0.5);
    return ctx;
}

function drawGrid(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 1;
    for (let i = 0; i <= COLUMN; i++) {
        ctx.moveTo((CELL_SIZE + 1) * i + 1, 0);
        ctx.lineTo((CELL_SIZE + 1) * i + 1, CELL_SIZE * ROW + ROW + 1);
    }
    for (let j = 0; j <= ROW; j++) {
        ctx.moveTo(0, (CELL_SIZE + 1) * j + 1);
        ctx.lineTo(CELL_SIZE * ROW + ROW + 1, (CELL_SIZE + 1) * j + 1);
    }
    ctx.stroke();
    ctx.restore();
}

function drawCells(ctx, cells, prevCells) {
    for (let x = 0; x < ROW; x++) {
        for (let y = 0; y < COLUMN; y++) {
            const cellIndex = x * COLUMN + y;
            if (cells[cellIndex] !== prevCells[cellIndex]) {
                ctx.save();
                ctx.clearRect(x * (CELL_SIZE + 1) + 1, y * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
                ctx.beginPath();
                ctx.fillStyle = CELL_COLOR[cells[cellIndex]];
                ctx.fillRect(x * (CELL_SIZE + 1) + 1, y * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
                ctx.restore();
            }
        }

    }
}

let count = 0;
function render(ctx, universe) {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(wasm_memory().buffer, cellsPtr, COLUMN * ROW);
    drawCells(ctx, cells, prevCells);
    prevCells = Array.from(cells);
    universe.tick();
    count++;
    requestAnimationFrame(() => {
        render(ctx, universe);
    });
}

function main() {
    const ctx = createCanvas(COLUMN, ROW);
    const universe = Universe.init(COLUMN, ROW);
    drawGrid(ctx);
    requestAnimationFrame(() => {
        render(ctx, universe);
    });
}
//
main();
