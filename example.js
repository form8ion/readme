// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {lift, scaffold} from './lib/index.js';

// remark-usage-ignore-next
stubbedFs();

// #### Execute

(async () => {
  const logger = {
    info: () => undefined
  };

  await scaffold(
    {projectRoot: process.cwd(), projectName: 'foo', description: 'Short description of the project'},
    {logger}
  );

  await lift({projectRoot: process.cwd(), results: {badges: {}, documentation: {}}}, {logger});
})();
