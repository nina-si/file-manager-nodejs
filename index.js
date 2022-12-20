import up from './modules/up.js';
import { stdin, stdout } from 'process';

let curPath = process.cwd();
const user = 'Username';

stdout.write(`Welcome to the File Manager, ${user}\n`);
console.log(`You are currently in ${curPath}`);

stdin.on('data', async (input) => {
  const operation = input.toString().trim();
  switch (operation) {
    case '.exit': {
      stdout.write(`\nThank you for using File Manager, ${user}, goodbye!`);
      process.exit();
    }

    case 'up': {
      curPath = up(curPath);
      console.log(curPath);
      break;
    }
  }
});
