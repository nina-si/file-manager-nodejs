import * as os from 'os';
import { stdout } from 'process';

const logOs = (operation) => {
  switch (operation) {
    case 'EOL': {
      stdout.write(`Default system End-Of-Line is\n ${JSON.stringify(os.EOL)}`);
      break;
    }
    case 'homedir': {
      stdout.write(`Home directory is ${os.homedir()}`);
      break;
    }
    case 'username': {
      stdout.write(`System username is ${os.userInfo().username}`);
      break;
    }
    case 'architecture': {
      stdout.write(`CPU architecture is ${os.arch()}`);
      break;
    }
    case 'cpus': {
      stdout.write(`Overall amount of CPUS is ${os.cpus().length}\n`);
      console.log(
        os.cpus().map((el) => {
          return {
            model: el.model,
            clock_rate: Math.round(el.speed / 100) / 10,
          };
        })
      );
      break;
    }
    default: {
      console.log('Invalid input');
      break;
    }
  }
};

export default logOs;
