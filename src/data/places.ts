export type Place = {
  id: string;
  title: string;
  description: string;
  coordinates: { latitude: number; longitude: number };
  imageName: string;
};

export const places: Place[] = [
  {
    id: 'sky_tower',
    title: 'Sky Tower, Auckland',
    description:
      'A 328m observation tower in the centre of Auckland, the highest observation deck in the Southern Hemisphere, with restaurants and entertainment.',
    coordinates: { latitude: -36.84845, longitude: 174.76219 },
    imageName: 'sky_tower',
  },
  {
    id: 'hobbiton',
    title: 'Hobbiton Movie Set',
    description:
      'A live Shire set from the Lord of the Rings and The Hobbit film trilogies. Notable houses, a pond, the Green Dragon pub and farm tours.',
    coordinates: { latitude: -37.85757, longitude: 175.68056 },
    imageName: 'hobbiton',
  },
  {
    id: 'waitomo',
    title: 'Waitomo Glowworm Caves',
    description:
      'Caves with unique bioluminescent worms that glow above the water gallery - an atmospheric night boat tour under the stars.',
    coordinates: { latitude: -38.2611, longitude: 175.1045 },
    imageName: 'waitomo',
  },
  {
    id: 'milford',
    title: 'Milford Sound / Piopiotahi',
    description:
      'The fjord in Fiordland is one of the most famous natural wonders of the world, with cruises, waterfalls, mountain panoramas and rare fauna.',
    coordinates: { latitude: -44.64806, longitude: 167.90556 },
    imageName: 'milford',
  },
  {
    id: 'sutherland_falls',
    title: 'Sutherland Falls',
    description:
      'The highest waterfall in New Zealand (≈580m), falling from Lake Quill - a walk along part of the Milford Track (≈90min there and back).',
    coordinates: { latitude: -44.67, longitude: 167.92 },
    imageName: 'sutherland_falls',
  },
  {
    id: 'mirror_lakes',
    title: 'Mirror Lakes',
    description:
      'Small mirror lakes with a beautiful reflection of the Eglinton and Earl Mountains - a convenient viewing stop right by the road.',
    coordinates: { latitude: -44.85, longitude: 167.9 },
    imageName: 'mirror_lakes',
  },
  {
    id: 'aoraki',
    title: 'Aoraki / Mount Cook',
    description:
      'The highest peak in the country (3724m); the national park offers tracks, glaciers, starry night themes and mountain panoramas.',
    coordinates: { latitude: -43.736, longitude: 170.094 },
    imageName: 'aoraki',
  },
  {
    id: 'queenstown',
    title: 'Queenstown',
    description:
      'A city in the Southern Alps, a center of adventure: bungee, skiing, picturesque lakes, extreme tours and a legendary view of Lake Wakatipu.',
    coordinates: { latitude: -45.03116, longitude: 168.66264 },
    imageName: 'queenstown',
  },
  {
    id: 'nevis_highwire',
    title: 'Nevis Highwire / Bungee',
    description:
      'The third largest bungee jump in the world (134m) over the Nevis River Valley is an extreme attraction for true adrenaline junkies.',
    coordinates: { latitude: -45.06294, longitude: 168.02872 },
    imageName: 'nevis_highwire',
  },
  {
    id: 'bowen_falls',
    title: 'Bowen Falls, Milford Sound',
    description:
      'A tall (≈162m) waterfall right in the fjord, accessible by a short walk or boat from Milford wharf.',
    coordinates: { latitude: -44.6705, longitude: 167.9217 },
    imageName: 'bowen_falls',
  },
];
