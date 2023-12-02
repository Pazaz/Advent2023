/*
  The Elf would first like to know which games would have been
  possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

  You play several games and record the information from each game (your puzzle input).
  Each game is listed with its ID number (like the 11 in Game 11: ...) followed by
  a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).
  ----
  As you continue your walk, the Elf poses a second question:
  in each game you played, what is the fewest number of cubes of each color
  that could have been in the bag to make the game possible?
*/

import fs from 'fs';

const PART_TWO = true;

const input = fs.readFileSync('input/day2.txt', 'ascii').replaceAll('\r', '').split('\n');
fs.writeFileSync('output/day2.txt', '');

const games = [];

for (let i = 0; i < input.length; i++) {
    const line = input[i];

    const game = line.match(/Game (\d+): (.*)/)!;
    const gameId = parseInt(game[1]);
    const sets = game[2].split('; ');

    const rounds = [];
    for (let j = 0; j < sets.length; j++) {
        const red = sets[j].match(/(\d+) red/);
        const green = sets[j].match(/(\d+) green/);
        const blue = sets[j].match(/(\d+) blue/);

        const colors = {
            red: -1,
            green: -1,
            blue: -1
        }

        if (red) {
            colors.red = parseInt(red[1]);
        }

        if (green) {
            colors.green = parseInt(green[1]);
        }

        if (blue) {
            colors.blue = parseInt(blue[1]);
        }

        rounds.push(colors);
    }

    games.push({
        id: gameId,
        rounds
    });
}

if (!PART_TWO) {
    // Determine which games would have been possible if the bag had
    // been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
    const red = 12;
    const green = 13;
    const blue = 14;

    let sum = 0;
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const { rounds } = game;

        let possible = true;
        for (let j = 0; j < rounds.length; j++) {
            const round = rounds[j];
            const { red: roundRed, green: roundGreen, blue: roundBlue } = round;

            if (roundRed > red || roundGreen > green || roundBlue > blue) {
                possible = false;
                break;
            }
        }

        if (possible) {
            fs.appendFileSync('output/day2.txt', `${game.id}\n`);
            sum += game.id;
        }
    }

    fs.appendFileSync('output/day2.txt', `${sum}`);
} else {
    // The power of a set of cubes is equal to the numbers of red, green,
    // and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48
    let sum = 0;
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const { rounds } = game;

        // we need to check through each round and see how many cubes each set needs to complete
        // and take the minimum of each color to complete any set
        let red = 0;
        let green = 0;
        let blue = 0;

        for (let j = 0; j < rounds.length; j++) {
            const round = rounds[j];
            const { red: roundRed, green: roundGreen, blue: roundBlue } = round;

            if (roundRed > red) {
                red = roundRed;
            }

            if (roundGreen > green) {
                green = roundGreen;
            }

            if (roundBlue > blue) {
                blue = roundBlue;
            }
        }

        const power = red * green * blue;
        fs.appendFileSync('output/day2.txt', `${game.id}: ${power}\n`);

        sum += power;
    }

    fs.appendFileSync('output/day2.txt', `${sum}`);
}
