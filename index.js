import up from './modules/up.js';
import cd from './modules/cd.js';
import { stdin, stdout } from 'process';
import logOs from './modules/os.js';

let curPath = process.cwd();

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
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    stdout.write(`\nYou are currently in ${curPath}\n`);
  }
});
