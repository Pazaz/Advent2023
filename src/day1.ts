/*
  The newly-improved calibration document consists of lines of text;
  each line originally contained a specific calibration value that the Elves now need to recover.
  On each line, the calibration value can be found by combining
  the first digit and the last digit (in that order) to form a single two-digit number.
  ----
  Your calculation isn't quite right.
  It looks like some of the digits are actually spelled out with letters:
    one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
*/

import fs from 'fs';

const PART_TWO = true;

function matchWord(line: string, index: number, word: string): boolean {
    for (let i = 0; i < word.length; i++) {
        if (line[index + i] !== word[i]) {
            return false;
        }
    }

    return true;
}

const numbers: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

const input = fs.readFileSync('input/day1.txt', 'ascii').replaceAll('\r', '').split('\n');
fs.writeFileSync('output/day1.txt', '');

let sum = 0;
for (let i = 0; i < input.length; i++) {
    // on each line, we want to find the *first* instance of a number and the *last* instance of a number
    const line = input[i];

    let firstNumber = 0;
    for (let j = 0; j < line.length; j++) {
        const char = line[j];

        // check if this is a number
        if (char >= '0' && char <= '9') {
            firstNumber = parseInt(char);
            break;
        }

        if (PART_TWO) {
            // check if this is a word-number
            for (const word in numbers) {
                if (matchWord(line, j, word)) {
                    firstNumber = numbers[word];
                    j = line.length;
                    break;
                }
            }
        }
    }

    let lastNumber = 0;
    for (let j = line.length - 1; j >= 0; j--) {
        const char = line[j];

        // check if this is a number
        if (char >= '0' && char <= '9') {
            lastNumber = parseInt(char);
            break;
        }

        if (PART_TWO) {
            // check if this is a word-number
            for (const word in numbers) {
                if (matchWord(line, j - word.length + 1, word)) {
                    lastNumber = numbers[word];
                    j = -1;
                    break;
                }
            }
        }
    }

    // combine them together (number -> string -> number)
    const value = parseInt(firstNumber + '' + lastNumber);
    fs.appendFileSync('output/day1.txt', line + ' ' + value + '\n');
    sum += value;
}

fs.appendFileSync('output/day1.txt', 'total: ' + sum + '\n');
