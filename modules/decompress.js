import fs from 'fs';
import { stdout } from 'process';
import path from 'path';
import zlib from 'zlib';
import cd from './cd.js';
import { FAILED_MESSAGE } from '../constants.js';

const decompress = async (curPath, pathToArchive, destination) => {
  try {
    const archive = await cd(pathToArchive, curPath);
    const destFolder = await cd(path.dirname(destination), curPath);
    const destPath = path.resolve(
      curPath,
      destFolder,
      `${path.basename(archive).slice(0, -3)}`
    );

    const readable = fs.createReadStream(archive);
    const writable = fs.createWriteStream(destPath);
    const decompressor = zlib.createBrotliDecompress();

    readable.pipe(decompressor).pipe(writable);
  } catch {
    stdout.write(FAILED_MESSAGE);
  }
};

export default decompress;
