import bannerize from 'bannerize';
import fs from 'fs-extra';
import path from 'path';

/**
 * Runs `bannerize()` with the appropriate banner for a given file glob.
 *
 * @param {String} files
 */
export default files => {
  let banner;

  // Look for a banner.ejs file in the "scripts" directory of the plugin
  // project. If not found fall back to the one here in spellbook.
  try {
    banner = path.join(process.cwd(), 'scripts', 'banner.ejs');
    fs.statSync(banner);
  } catch (x) {
    banner = path.join(__dirname, '..', 'assets', 'banner.ejs');
  }

  bannerize(files, {banner});
};
