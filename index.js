import * as os from 'os';
import { stdin, stdout } from 'process';
import list from './modules/ls.js';
import up from './modules/up.js';
import cd from './modules/cd.js';
import add from './modules/add.js';
import cat from './modules/cat.js';
import remove from './modules/rm.js';
import copy from './modules/cp.js';
import rename from './modules/rn.js';
import logOs from './modules/os.js';
import hash from './modules/hash.js';
import compress from './modules/compress.js';
import decompress from './modules/decompress.js';
import { FAILED_MESSAGE, INVALID_MESSAGE } from './constants.js';

let curPath = os.homedir();

const userArgs = process.argv.filter((el) => el.includes('--username'));
const user = !!userArgs.length ? userArgs[0].split('=')[1] : 'Guest';

stdout.write(`Welcome to the File Manager, ${user}!\n`);
console.log(`You are currently in ${curPath}`);

stdin.on('data', async (input) => {
  const operation = input.toString().trim();

  try {
    switch (operation) {
      case '.exit': {
        stdout.write(`\nThank you for using File Manager, ${user}, goodbye!`);
        process.exit();
      }

      case 'ls': {
        list(curPath);
        break;
      }

      case 'up': {
        curPath = up(curPath);
        break;
      }

      default: {
        if (operation.startsWith('os')) {
          logOs(operation.split('--')[1]);
          break;
        }

        if (operation.startsWith('cd')) {
          const newPath = operation.split(' ')[1];
          if (!!newPath) {
            const updatedPath = await cd(newPath, curPath);
            if (updatedPath) curPath = updatedPath;
          } else {
            console.log(INVALID_MESSAGE);
          }
          break;
        }

        if (operation.startsWith('add')) {
          const fileName = operation.split(' ')[1];
          if (!!fileName) add(curPath, fileName);
          else {
            console.log(INVALID_MESSAGE);
          }
          break;
        }

        if (operation.startsWith('cat')) {
          const filePath = operation.split(' ')[1];
          if (!!filePath) cat(curPath, filePath);
          else {
            stdout.write(INVALID_MESSAGE);
          }
          break;
        }

        if (operation.startsWith('cp')) {
          const pathToFile = operation.split(' ')[1];
          const pathToNewDir = operation.split(' ')[2];
          if (!pathToFile || !pathToNewDir) console.log(INVALID_MESSAGE);
          else {
            copy(curPath, pathToFile, pathToNewDir);
          }
          break;
        }

        if (operation.startsWith('rn')) {
          const pathToFile = operation.split(' ')[1];
          const newName = operation.split(' ')[2];
          if (!!pathToFile && !!newName) {
            rename(curPath, pathToFile, newName);
          } else {
            stdout.write(INVALID_MESSAGE);
          }
          break;
        }

        if (operation.startsWith('rm')) {
          const pathToFile = operation.split(' ')[1];
          if (!pathToFile) console.log(INVALID_MESSAGE);
          else {
            remove(curPath, pathToFile);
          }
          break;
        }

        if (operation.startsWith('hash')) {
          const pathToFile = operation.split(' ')[1];
          if (!!pathToFile) {
            await hash(curPath, pathToFile);
          } else {
            stdout.write(INVALID_MESSAGE);
          }
          break;
        }

        if (operation.startsWith('compress')) {
          const pathToFile = operation.split(' ')[1];
          const destination = operation.split(' ')[2];
          if (!!pathToFile && !!destination) {
            await compress(curPath, pathToFile, destination);
          } else {
            stdout.write(INVALID_MESSAGE);
          }
          break;
        }

        if (operation.startsWith('decompress')) {
          const pathToArchive = operation.split(' ')[1];
          const destination = operation.split(' ')[2];
          if (!!pathToArchive && !!destination) {
            await decompress(curPath, pathToArchive, destination);
          } else {
            stdout.write(INVALID_MESSAGE);
          }
          break;
        } else {
          stdout.write(INVALID_MESSAGE);
        }
      }
    }
  } catch {
    stdout.write(FAILED_MESSAGE);
  } finally {
    stdout.write(`\nYou are currently in ${curPath}\n`);
  }
});

process.on('SIGINT', () => {
  stdout.write(`\nThank you for using File Manager, ${user}, goodbye!`);
  process.exit();
});
