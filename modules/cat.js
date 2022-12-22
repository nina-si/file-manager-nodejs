import fs from 'fs';
import { stdout } from 'process';
import { FAILED_MESSAGE, INVALID_MESSAGE } from '../constants.js';
import cd from './cd.js';

const cat = async (curPath, filePath) => {
  try {
    const fileToRead = await cd(filePath, curPath);
    if (fileToRead) {
      const stream = fs.createReadStream(fileToRead, 'utf8');
      stream.pipe(stdout);
    } else throw new Error();
  } catch {
    process.stdout.write(FAILED_MESSAGE);
  }
};

export default cat;
