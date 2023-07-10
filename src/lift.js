import fs from 'node:fs';
import {remark} from 'remark';

import {info} from '@travi/cli-messages';
import badgeInjectorPlugin from '@form8ion/remark-inject-badges';
import readmePlugin from '@form8ion/remark-readme';
import updateLegacyBadgeMarkers from '@form8ion/remark-update-legacy-badge-markers';

import * as remarkConfig from '../.remarkrc.cjs';

export default function ({projectRoot, results}) {
  info('Lifting README');

  const pathToReadme = `${projectRoot}/README.md`;

  return new Promise((resolve, reject) => {
    remark()
      .data('settings', remarkConfig.settings)
      .use(updateLegacyBadgeMarkers)
      .use(badgeInjectorPlugin, results.badges)
      .use(readmePlugin, results.documentation || {})
      .process(fs.readFileSync(pathToReadme, 'utf8'), (err, file) => {
        if (err) reject(err);
        else {
          fs.writeFileSync(pathToReadme, `${file}`);
          resolve();
        }
      });
  });
}
