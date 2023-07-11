import {promises as fs} from 'node:fs';
import {remark} from 'remark';

import {info} from '@travi/cli-messages';
import badgeInjectorPlugin from '@form8ion/remark-inject-badges';
import readmePlugin from '@form8ion/remark-readme';
import updateLegacyBadgeMarkers from '@form8ion/remark-update-legacy-badge-markers';

import * as remarkConfig from '../.remarkrc.cjs';

export default async function ({projectRoot, results}) {
  info('Lifting README');

  const pathToReadme = `${projectRoot}/README.md`;

  const file = await remark()
    .data('settings', remarkConfig.settings)
    .use(updateLegacyBadgeMarkers)
    .use(badgeInjectorPlugin, results.badges)
    .use(readmePlugin, results.documentation || {})
    .process(await fs.readFile(pathToReadme, 'utf8'));

  return fs.writeFile(pathToReadme, `${file}`);
}
