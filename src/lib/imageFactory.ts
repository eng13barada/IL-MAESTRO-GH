import { createRng, randomInt, pickRandom, randomFloat } from './seedRng';
import { COLORS } from '@/config/brand';

export const ImageFactory = {
  generateLogo: (color = COLORS.oro) => {
    // Elegant geometric monogram logo 'IM' suitable for header/hero
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="100" height="100" fill="transparent"/>
      <path d="M20 80 L20 20 L35 20 L35 80 Z" fill="${color}" />
      <path d="M45 80 L45 20 L60 50 L75 20 L75 80 L65 80 L65 40 L60 50 L55 40 L55 80 Z" fill="${color}" />
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  },
  generateHeroTexture: (seed = 1) => {
    // Richer, darker, slightly noisy/metal texture for hero
    const rng = createRng(seed); const numLines = 80; let lines = '';
    for (let i = 0; i < numLines; i++) {
        const x = randomFloat(rng, -10, 110);
        const y = randomFloat(rng, -10, 110);
        const r = randomFloat(rng, 10, 40);
        const op = randomFloat(rng, 0.02, 0.08);
        lines += `<circle cx="${x}%" cy="${y}%" r="${r}%" fill="${COLORS.oro}" opacity="${op}" filter="blur(20px)" />`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${COLORS.nero}"/>
          <stop offset="60%" stop-color="${COLORS.espresso}"/>
          <stop offset="100%" stop-color="#2a201a"/>
        </linearGradient>
        <radialGradient id="spot" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="${COLORS.oro}" stop-opacity="0.15" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      ${lines}
      <rect width="100%" height="100%" fill="url(#spot)" />
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.05" mix-blend-mode="overlay" />
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  },
  generateAvatar: (seed: number, initials: string) => {
    const rng = createRng(seed); const colors = [COLORS.espresso, COLORS.oliva, COLORS.nero];
    const bg = pickRandom(rng, colors);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="${bg}" />
      <text x="100" y="115" font-family="system-ui" font-size="64" font-weight="600" fill="${COLORS.oro}" text-anchor="middle" letter-spacing="2">${initials}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  },
  generateServiceCard: (seed: number, cat: string) => {
    const c = cat === 'hair' ? COLORS.espresso : cat === 'beard' ? COLORS.oliva : COLORS.nero;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="${c}" /><path d="M0 150 Q100 50 200 150 T400 150 L400 300 L0 300 Z" fill="${COLORS.oro}" opacity="0.1" />
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  },
  generateBeforeAfter: (seed: number, isBefore: boolean) => {
    const bg = isBefore ? '#E5E7EB' : '#1F2937'; const tColor = isBefore ? '#4B5563' : '#F3F4F6';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="${bg}" />
      <path d="M50 350 L200 100 L350 350 Z" fill="none" stroke="${COLORS.oro}" stroke-width="2" opacity="0.3"/>
      <circle cx="200" cy="200" r="${isBefore ? 80 : 70}" fill="none" stroke="${tColor}" stroke-width="4" />
      <text x="200" y="210" font-family="system-ui" font-size="24" fill="${tColor}" text-anchor="middle" font-weight="500">${isBefore ? 'BEFORE' : 'AFTER'}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
};
