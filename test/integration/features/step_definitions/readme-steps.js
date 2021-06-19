import {promises as fs} from 'fs';
import {Before, Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Before(function () {
  this.projectDescription = any.sentence();
});

Given('the existing README has no section heading', async function () {
  return undefined;
});

Given('the existing README uses modern badge zones', async function () {
  this.existingReadmeContent = `# project-name

${this.projectDescription}

<!--status-badges start -->
<!--status-badges end -->

1. item 1
1. item 2

<!--consumer-badges start -->
<!--consumer-badges end -->

<!--contribution-badges start -->
${this.existingContributingBadges}
<!--contribution-badges end -->

${this.badgeDefinitions.join('\n\n')}`;
});

Given('the existing README uses legacy badge section markers', async function () {
  this.existingReadmeContent = `# project-name

${this.projectDescription}

<!-- status badges -->

1. item 1
1. item 2

<!-- consumer badges -->

<!-- contribution badges -->
${this.existingContributingBadges}

${this.badgeDefinitions.join('\n\n')}`;
});

Then('a README is created', async function () {
  assert.equal(
    await fs.readFile(`${process.cwd()}/README.md`, 'utf-8'),
    `# ${this.projectName}

${this.projectDescription}

<!--status-badges start -->
<!--status-badges end -->

<!--consumer-badges start -->
<!--consumer-badges end -->

<!--contribution-badges start -->
<!--contribution-badges end -->
`
  );
});
