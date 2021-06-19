import {promises as fs} from 'fs';
import remark from 'remark';
import find from 'unist-util-find';
import heading from 'mdast-util-heading-range';
import {Given, Then} from '@cucumber/cucumber';
import any from '@travi/any';
import {assert} from 'chai';

Given('the existing README has no {string} heading', async function (sectionName) {
  this[`${sectionName.toLowerCase()}-heading`] = null;
});

Given('content is provided for the {string} section', async function (sectionName) {
  this[sectionName.toLowerCase()] = any.sentence();
});

Then('there is a {string} heading', async function (sectionName) {
  const readmeTree = remark().parse(await fs.readFile(`${process.cwd()}/README.md`, 'utf-8'));

  assert.equal(find(readmeTree, {type: 'heading', depth: 2}), sectionName);
});

Then('the {string} content is populated', async function (sectionName) {
  const readmeTree = remark().parse(await fs.readFile(`${process.cwd()}/README.md`, 'utf-8'));

  heading(readmeTree, sectionName, (start, nodes, end) => [start, nodes, end]);
});
