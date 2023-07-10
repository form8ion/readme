import {promises as fs} from 'node:fs';

import any from '@travi/any';
import {vi, describe, it, expect, afterEach} from 'vitest';

import scaffoldReadme from './scaffolder.js';

vi.mock('node:fs');

describe('scaffold', () => {
  const projectRoot = any.string();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create the readme', async () => {
    const projectName = any.word();
    const description = any.sentence();

    await scaffoldReadme({projectRoot, projectName, description});

    expect(fs.writeFile).toHaveBeenCalledWith(
      `${projectRoot}/README.md`,
      `# ${projectName}

${description}

<!--status-badges start -->
<!--status-badges end -->

<!--consumer-badges start -->
<!--consumer-badges end -->

<!--contribution-badges start -->
<!--contribution-badges end -->
`
    );
  });
});
