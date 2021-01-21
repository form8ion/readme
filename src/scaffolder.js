import {promises as fs} from 'fs';

export default function ({projectRoot}) {
  return fs.writeFile(`${projectRoot}/README.md`, '');
}
