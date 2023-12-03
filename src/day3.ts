/*
  The engineer explains that an engine part seems to be missing from the engine,
  but nobody can figure out which one. If you can add up all the part numbers in the
  engine schematic, it should be easy to work out which part is missing.

  The engine schematic (your puzzle input) consists of a visual representation of
  the engine. There are lots of numbers and symbols you don't really understand,
  but apparently any number adjacent to a symbol, even diagonally,
  is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

  Of course, the actual engine schematic is much larger.
  What is the sum of all of the part numbers in the engine schematic?
  ----
  The missing part wasn't the only issue - one of the gears in the engine is wrong.
  A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio
  is the result of multiplying those two numbers together.

  this time, you need to find the gear ratio of every gear and add them all up
  so that the engineer can figure out which gear needs to be replaced.
*/

import fs from 'fs';

const PART_TWO = true;

const grid = fs.readFileSync('input/day3.txt', 'ascii').replaceAll('\r', '').split('\n');

function findAdjacent(x: number, y: number, width: number, height: number) {
    let out = [];

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) {
                continue;
            }

            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                out.push([nx, ny]);
            }
        }
    }

    return out;
}

const width = grid[0].length;
const height = grid.length;

const found: string[][] = [];
let sum = 0;

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (!grid[y][x].match(/[0-9]/)) {
            continue;
        }

        const checks = findAdjacent(x, y, width, height);
        let num = grid[y][x];

        for (let i = x + 1; i < width; i++) {
            if (!grid[y][i].match(/[0-9]/)) {
                break;
            }

            num += grid[y][i];
            checks.push(...findAdjacent(i, y, width, height));
            x++;
        }

        if (PART_TWO) {
            for (const [nx, ny] of checks) {
                if (grid[ny][nx] === '*') {
                    if (!found[nx + ny * width]) {
                        found[nx + ny * width] = [];
                    }

                    found[nx + ny * width].push(num);
                    break;
                }
            }
        } else {
            if (checks.some(([nx, ny]) => grid[ny][nx] !== '.' && !grid[ny][nx].match(/[0-9]/))) {
                sum += parseInt(num);
            }
        }
    }
}

if (PART_TWO) {
    for (let i = 0; i < found.length; i++) {
        if (!found[i] || found[i].length !== 2) {
            continue;
        }

        sum += parseInt(found[i][0]) * parseInt(found[i][1]);
    }
}

console.log(sum);
