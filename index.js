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
import { FAILED_MESSAGE, INVALID_MESSAGE } from './constants.js';

let curPath = os.homedir();

const userArgs = process.argv.filter((el) => el.includes('username'));
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
          const updatedPath = await cd(newPath, curPath);
          if (updatedPath) curPath = updatedPath;
          break;
        }

        if (operation.startsWith('add')) {
          const fileName = operation.split(' ')[1];
          add(curPath, fileName);
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
          copy(curPath, pathToFile, pathToNewDir);
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
          remove(curPath, pathToFile);
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
