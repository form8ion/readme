import {promises as fs} from 'fs';
import {info} from '@travi/cli-messages';

export default function ({projectRoot, projectName, description}) {
  info('Creating README file');

  return fs.writeFile(
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
}
