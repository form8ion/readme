import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';

const __dirname = dirname(fileURLToPath(import.meta.url));          // eslint-disable-line no-underscore-dangle
const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  this.projectName = any.word();
  this.projectDescription = any.sentence();
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = await import('@form8ion/readme');

  stubbedFs({
    node_modules: stubbedNodeModules
  });

  await scaffold({projectRoot: process.cwd(), projectName: this.projectName, description: this.projectDescription});
});

When('the project is lifted', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {lift} = await import('@form8ion/readme');

  stubbedFs({
    node_modules: stubbedNodeModules,
    'README.md': this.existingReadmeContent
  });

  await lift({
    projectRoot: process.cwd(),
    results: {badges: this.badges, ...this.usage && {documentation: {usage: this.usage}}}
  });
});
