/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');

console.log('Public dir:', publicDir);

// 1. Process PNGs to WebP
const pngs = fs.readdirSync(publicDir).filter((f) => f.endsWith('.png'));
for (const p of pngs) {
  const input = path.join(publicDir, p);
  const webp = path.join(publicDir, p.replace('.png', '.webp'));
  console.log(`Converting ${p} -> WebP...`);
  try {
    execSync(`ffmpeg -y -i "${input}" -c:v libwebp -quality 80 "${webp}"`, { stdio: 'inherit' });
    console.log(`[OK] Created ${path.basename(webp)}`);
  } catch (err) {
    console.error(`[Error] ${p}:`, err.message);
  }
}

// 2. Process videos
const videos = ['about me.mp4', 'footer.mp4', 'loading_bg.mp4'];
for (const v of videos) {
  const input = path.join(publicDir, v);
  const tempMp4 = path.join(publicDir, 'temp_' + v);
  const webm = path.join(publicDir, v.replace('.mp4', '.webm'));

  console.log(`Optimizing ${v} -> MP4 (faststart)...`);
  try {
    execSync(
      `ffmpeg -y -i "${input}" -vcodec libx264 -crf 26 -preset fast -an -pix_fmt yuv420p -movflags +faststart "${tempMp4}"`,
      { stdio: 'inherit' }
    );
    fs.copyFileSync(tempMp4, input);
    fs.unlinkSync(tempMp4);
    console.log(`[OK] Faststart MP4 ${v}`);
  } catch (err) {
    console.error(`[Error MP4] ${v}:`, err.message);
  }

  console.log(`Optimizing ${v} -> WebM (VP9)...`);
  try {
    execSync(
      `ffmpeg -y -i "${input}" -c:v libvpx-vp9 -crf 32 -b:v 0 -deadline good -cpu-used 4 -row-mt 1 -threads 0 -an "${webm}"`,
      { stdio: 'inherit' }
    );
    console.log(`[OK] Created ${path.basename(webm)}`);
  } catch (err) {
    console.error(`[Error WebM] ${v}:`, err.message);
  }
}

// 3. Process Heavy SVGs to high-res WebP
const svgs = ['podium rites bg.svg', 'ritesh standing.svg', 'ritesh mic.svg', 'ritesh podium.svg'];
for (const s of svgs) {
  const input = path.join(publicDir, s);
  if (fs.existsSync(input)) {
    const webp = path.join(publicDir, s.replace(/\.svg$/, '.webp').replace(/\s+/g, '_'));
    console.log(`Converting SVG ${s} -> ${path.basename(webp)}...`);
    try {
      execSync(`ffmpeg -y -i "${input}" -c:v libwebp -quality 90 "${webp}"`, { stdio: 'inherit' });
      console.log(`[OK] Created ${path.basename(webp)} (${(fs.statSync(webp).size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`[Error SVG] ${s}:`, err.message);
    }
  }
}

// 4. Create URL-safe duplicates for space-named videos
const spacesToUnderscore = ['about me.mp4', 'about me.webm'];
for (const f of spacesToUnderscore) {
  const src = path.join(publicDir, f);
  const dest = path.join(publicDir, f.replace(' ', '_'));
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`[OK] Created URL-safe copy: ${path.basename(dest)}`);
  }
}

console.log('ALL OPTIMIZATIONS FINISHED SUCCESSFULLY!');
