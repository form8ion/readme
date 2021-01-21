import {promises as fs} from 'fs';

export default function ({projectRoot, projectName, description}) {
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
