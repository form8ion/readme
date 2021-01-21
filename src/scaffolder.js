import {promises as fs} from 'fs';

export default function ({projectRoot, projectName, description}) {
  return fs.writeFile(
    `${projectRoot}/README.md`,
    `# ${projectName}

${description}`
  );
}
