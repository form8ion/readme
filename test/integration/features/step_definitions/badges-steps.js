import {promises as fs} from 'fs';
import {Before, Given, Then} from '@cucumber/cucumber';
import any from '@travi/any';
import {assert} from 'chai';

Before(function () {
  this.badgeDefinitions = [];
});

Given('the existing README has no badges', async function () {
  this.existingContributingBadges = '';
});

Given('the existing README has existing badges', async function () {
  const imageReference = `${any.word()}-badge`;
  const linkReference = `${any.word()}-link`;
  const otherImageReference = `${any.word()}-badge`;
  const otherLinkReference = `${any.word()}-link`;

  this.existingContributingBadges = `[![${any.word()}][${imageReference}]][${linkReference}]
[![${any.word()}][${otherImageReference}]][${otherLinkReference}]
`;
  this.badgeDefinitions.push(`[${imageReference}]: ${any.url()}

[${linkReference}]: ${any.url()}`);
  this.badgeDefinitions.push(`[${otherImageReference}]: ${any.url()}

[${otherLinkReference}]: ${any.url()}`);
});

Given('the results include badges', async function () {
  this.badges = {
    contribution: {
      [any.word()]: {
        text: any.word(),
        link: any.url(),
        img: any.url()
      },
      [any.word()]: {
        text: any.word(),
        img: any.url()
      }
    }
  };
});

Given('the results do not include badges', async function () {
  this.badges = null;
});

Then('the badges from the results are added to the README', async function () {
  const actual = await fs.readFile(`${process.cwd()}/README.md`, 'utf-8');

  assert.equal(
    actual,
    `# project-name

${this.projectDescription}

<!--status-badges start -->

<!--status-badges end -->

1. item 1
1. item 2

<!--consumer-badges start -->

<!--consumer-badges end -->

<!--contribution-badges start -->

${this.existingContributingBadges}${
  Object.entries(this.badges.contribution)
    .map(([name, details]) => (
      details.link
        ? `[![${details.text}][${name}-badge]][${name}-link]`
        : `![${details.text}][${name}-badge]`
    ))
    .join('\n')
}

<!--contribution-badges end -->${this.badgeDefinitions.length ? `

${this.badgeDefinitions.join('\n\n')}
` : `
`}
${
  Object.entries(this.badges.contribution)
    .map(([name, details]) => (`${details.link
      ? `[${name}-link]: ${details.link}

`
      : ''
    }[${name}-badge]: ${details.img}`)).join('\n\n')
}
`
  );
});

Then('the badges remain as they were in the README', async function () {
  assert.equal(
    await fs.readFile(`${process.cwd()}/README.md`, 'utf-8'),
    `# project-name

${this.projectDescription}

<!--status-badges start -->

<!--status-badges end -->

1. item 1
1. item 2

<!--consumer-badges start -->

<!--consumer-badges end -->

<!--contribution-badges start -->

${this.existingContributingBadges}
<!--contribution-badges end -->${this.badgeDefinitions.length ? `

${this.badgeDefinitions.join('\n\n')}
` : `
`}`
  );
});
