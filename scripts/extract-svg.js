const fs = require('fs');
const { execSync } = require('child_process');

const svg = fs.readFileSync('public/podium rites bg.svg', 'utf8');
const match = svg.match(/data:image\/(?:jpeg|jpg|png);base64,([A-Za-z0-9+/=]+)/);

if (match) {
  const buffer = Buffer.from(match[1], 'base64');
  fs.writeFileSync('public/podium_rites_bg.jpg', buffer);
  console.log('Extracted JPG:', (buffer.length / 1024).toFixed(1), 'KB');
  execSync('ffmpeg -y -i public/podium_rites_bg.jpg -c:v libwebp -quality 85 public/podium_rites_bg.webp');
  console.log('Created WebP:', (fs.statSync('public/podium_rites_bg.webp').size / 1024).toFixed(1), 'KB');
} else {
  console.log('No base64 match found');
}
