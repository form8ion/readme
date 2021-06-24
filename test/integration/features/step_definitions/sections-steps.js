import {promises as fs} from 'fs';
import remark from 'remark';
import find from 'unist-util-find';
import findBetween from 'unist-util-find-all-between';
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

  assert.equal(find(readmeTree, {type: 'heading', depth: 2}).children[0].value, sectionName);
});

Then('the {string} content is populated', async function (sectionName) {
  const readmeTree = remark().parse(await fs.readFile(`${process.cwd()}/README.md`, 'utf-8'));

  const paragraphs = findBetween(
    readmeTree,
    {type: 'heading', depth: 2, children: [{type: 'text', value: 'Usage'}]},
    {type: 'html', value: '<!--contribution-badges start -->'},
    'paragraph'
  );

  assert.equal(paragraphs[0].children[0].value, this[sectionName.toLowerCase()]);
});
