import fs from 'fs';
import { stdout } from 'process';
import crypto from 'crypto';
import { FAILED_MESSAGE } from '../constants.js';
import cd from './cd.js';

const hash = async (curPath, filePath) => {
  try {
    const path = await cd(filePath, curPath);
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        throw new Error('Error while reading data');
      } else {
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        console.log(hash);
      }
    });
  } catch {
    stdout.write(FAILED_MESSAGE);
  }
};

export default hash;
