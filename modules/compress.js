import fs from 'fs';
import path from 'path';
import { stdout } from 'process';
import zlib from 'zlib';
import cd from './cd.js';
import { FAILED_MESSAGE } from '../constants.js';

const compress = async (curPath, file, destination) => {
  try {
    const filePath = await cd(file, curPath);
    const destFolder = await cd(path.dirname(destination), curPath);
    const archivePath = path.resolve(
      destFolder,
      `${path.basename(filePath)}.br`
    );
    const readable = fs.createReadStream(filePath);
    const writable = fs.createWriteStream(archivePath);
    const archive = zlib.createBrotliCompress();

    readable.pipe(archive).pipe(writable);
  } catch {
    stdout.write(FAILED_MESSAGE);
  }
};

export default compress;
