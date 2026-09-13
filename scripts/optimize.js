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

console.log('ALL OPTIMIZATIONS FINISHED SUCCESSFULLY!');
