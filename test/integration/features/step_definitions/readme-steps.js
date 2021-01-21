import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('a README is created', async function () {
  assert.equal(
    await fs.readFile(`${process.cwd()}/README.md`, 'utf-8'),
    `# ${this.projectName}

${this.projectDescription}`
  );
});
