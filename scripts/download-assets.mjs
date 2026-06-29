// Downloads the curated homepage and services assets from the target site into public/.
// Run: node scripts/download-assets.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const BASE = 'https://kitphotography.com.au';
const OUT = 'public';

// [remoteUrl, localPath]
const assets = [
  // Brand / logos / favicon
  ['/wp-content/themes/kit-photography/images/logo.svg', 'images/logo.svg'],
  ['/wp-content/themes/kit-photography/images/logo-rev.svg', 'images/logo-rev.svg'],
  ['/wp-content/uploads/2024/03/cropped-kiticon-192x192.png', 'seo/icon-192.png'],
  ['/wp-content/uploads/2024/03/cropped-kiticon-180x180.png', 'seo/apple-touch-icon.png'],
  ['/wp-content/uploads/2024/03/cropped-kiticon-32x32.png', 'seo/favicon-32.png'],
  ['/wp-content/smush-webp/2024/01/KP-HOMEPAGE-logo-1024x512.png.webp', 'images/brands-logos.webp'],
  // Case study / portfolio grid (largest reasonable: 1200px webp)
  ['/wp-content/uploads/2025/07/01_01_kh_205_gh-hm_181018c-1200x800.webp', 'images/work/work-01.webp'],
  ['/wp-content/uploads/2025/07/KH-096-BL-Outdoor-Education-270523-logo-1200x800.webp', 'images/work/work-02.webp'],
  ['/wp-content/uploads/2025/07/KP-067-YPMA-141223-1200x800.webp', 'images/work/work-03.webp'],
  ['/wp-content/uploads/2025/07/Nab-Hero-2023-FINAL-1200x708.webp', 'images/work/work-04.webp'],
  ['/wp-content/uploads/2025/07/03_03_kh_106_attwell-lifestyle_240517-1200x800.webp', 'images/work/work-05.webp'],
  ['/wp-content/uploads/2025/07/KH-080-CG-CSG-Brand-Story-061222-1200x800.webp', 'images/work/work-06.webp'],
  ['/wp-content/uploads/2025/07/01_KH-1065-CH-Campaign-210223-1200x697.webp', 'images/work/work-07.webp'],
  ['/wp-content/uploads/2025/07/04_KH_169_SamWood_160419-1200x800.webp', 'images/work/work-08.webp'],
  ['/wp-content/uploads/2025/07/KP-031-Rolex-Chadstone-131224-1200x800.webp', 'images/work/work-09.webp'],
  ['/wp-content/uploads/2025/07/2022_SCS_Scholarships_Principal_Year_2-4_MalvernCentral_VMO_1920x1080px-1200x675.webp', 'images/work/work-10.webp'],
  ['/wp-content/uploads/2025/07/05_KH_39_AO23_310123-1200x800.webp', 'images/work/work-11.webp'],
  ['/wp-content/smush-webp/2024/01/06_06_kh_038_xmasredhill_121226crop-1200x1200.jpg.webp', 'images/work/work-12.webp'],
  // About / portrait-oriented images reused around the page
  ['/wp-content/smush-webp/2023/12/01_01_KH_050_MAB-DMs_240217-1024x1024.jpg.webp', 'images/about-1.webp'],
  ['/wp-content/smush-webp/2024/02/21_29_kh_004_0056_150416crop-1200x1028.jpg.webp', 'images/about-2.webp'],
  ['/wp-content/smush-webp/2024/01/15_kh_042_ch1_9555_060614-1200x800.jpg.webp', 'images/testimonial-bg.webp'],
  // Services page
  ['/wp-content/smush-webp/2023/10/46619e1e77c556fad5b05c2b5024fb7f-1536x804.png.webp', 'images/services/overview.webp'],
  ['/wp-content/smush-webp/2023/11/01_kh_077_sealife_101219-1200x801.jpg.webp', 'images/services/commercial.webp'],
  ['/wp-content/smush-webp/2023/11/20_KH_347_WCG-Olderfleet_111120-1200x800.jpg.webp', 'images/services/corporate.webp'],
  ['/wp-content/smush-webp/2023/12/01_01_KH_050_MAB-DMs_240217-1200x1200.jpg.webp', 'images/services/headshot.webp'],
  ['/wp-content/smush-webp/2023/12/03_03_kh_106_attwell-lifestyle_240517-1200x800.jpg.webp', 'images/services/lifestyle.webp'],
  ['/wp-content/smush-webp/2023/12/06_04_kh_061_samwood_160419-1-scaled-e1703938853609-1200x628.jpg.webp', 'images/services/portrait.webp'],
  ['/wp-content/smush-webp/2023/12/OL-creative-3-rock-crop-1200x800.jpg.webp', 'images/services/product.webp'],
  ['/wp-content/smush-webp/2023/11/01_01_kh_205_gh-hm_181018c-1200x800.jpg.webp', 'images/services/event.webp'],
  ['/wp-content/smush-webp/2023/12/13_kh_202_kx_270219-1200x800.jpg.webp', 'images/services/fitness.webp'],
  ['/wp-content/smush-webp/2023/12/18_Kit_Haselden_Photographer_property_003-1200x800.jpg.webp', 'images/services/property.webp'],
  ['/wp-content/smush-webp/2023/12/17_17_21_kh_017_ra-zoo-food_150318-1200x800.jpg.webp', 'images/services/food.webp'],
  ['/wp-content/smush-webp/2023/11/video.jpeg.webp', 'images/services/videography.webp'],
];

async function download(remote, local) {
  const url = remote.startsWith('http') ? remote : BASE + remote;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = join(OUT, local);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return `${local} (${(buf.length / 1024).toFixed(0)}kb)`;
}

const queue = [...assets];
const results = [];
async function worker() {
  while (queue.length) {
    const [r, l] = queue.shift();
    try { results.push('OK  ' + (await download(r, l))); }
    catch (e) { results.push('ERR ' + l + ' :: ' + e.message); }
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
console.log(results.join('\n'));
console.log(`\nDone: ${results.filter(r => r.startsWith('OK')).length}/${assets.length}`);
