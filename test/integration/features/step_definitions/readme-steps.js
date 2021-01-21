import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import {fileExists} from '@form8ion/core';

Then('a README is created', async function () {
  assert.isTrue(await fileExists(`${process.cwd()}/README.md`));
});
