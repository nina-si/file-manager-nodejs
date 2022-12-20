import * as path from 'path';

const up = (curPath) => {
  return path.join(curPath, '..');
};

export default up;
