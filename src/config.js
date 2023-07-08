const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const collectionSize = 1000;
const toCreateNow = 30;

// If using scaleSize system, simply change growEditionSizeTo to use scaleSize(#) instead of #
const scaleSize = (num) => {
  if (collectionSize === toCreateNow) return num;
  return Math.ceil((num / collectionSize) * toCreateNow);
};

// ********* Advanced weight options *********
// Note: only one of these options can be marked true at once. 

// Set this to true if you want to use named rarity instead of numbers. 
const namedWeight = true;
/* 
* Set this to true if you want to use EXACT weights. 
* Note that your weights must add up to the total number
* you want of that trait.
*/
const exactWeight = false;


const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://TESTING";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://linktr.ee/datboi1337",
  creators: [
    {
      address: "8DsAhDisG5eYjBwedSiakTKwrYCWpQ4tNDRuZyniMXaX",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 150,
    layersOrder: [
      { name: "Background" },
      { name: "Couches" },
      { name: "Dudes" },
      { name: "Eyes" },
      { name: "Clothes", or: { name: 'Pants', with: 'Shirt' }},
      { name: "Mascots" },
      { name: "Misc" },
      { name: "Slippers" },
      { name: "Eyewear" },
      { name: "Food" },
      { name: "Masks" },
      { name: "Mouth" },
      { name: "Beard" },
      { name: "Nose" },
      { name: "Hair", or: { name: 'Headwear' } },
      // { name: "Headwear" },
    ]
  }
];

const enableStats = false;
const statBlocks = [
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 1599,
  height: 1499,
  dpi: 72,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const extraAttributes = [];

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Rarity distribution can be adjusted
* Keep range [0 - 10,000]
* Because weight is up to 10,000, percentages can determined up to 
* two decimal places. ie: 10.15% would be 1015
* DO NOT change the rarity names unless you know what you're doing in main.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const rarity_config = {
  Mythic: { ranks: [0, 100] }, //, fileName: 'Mythic.png' },
  Legendary: { ranks: [100, 600] }, //, fileName: 'Legendary.png' },
  Epic: { ranks: [600, 1500] }, //, fileName: 'Epic.png' },
  Rare: { ranks: [1500, 3100] }, //, fileName: 'Rare.png' },
  Uncommon: { ranks: [3100, 5600] }, //, fileName: 'Uncommon.png' },
  Common: { ranks: [5600, 10000] }, //, fileName: 'Common.png' },
};

const layerVariations = [
  // {
  //   variationCount: 1,
  //   name: 'Color',
  //   variations: [
  //     'Blue',
  //     'Green',
  //     'Purple',
  //     'Red',
  //   ],
  //   Weight: [
  //     15,
  //     25,
  //     25,
  //     35,
  //   ],
  // }
];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Do not use this unless 100% necessary and you understand the risk
* Generating collection in stages leads to potential duplicates. 
* 99% of the time, regenerating is the appropriate option. 
* This is here for the 1%
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const resumeNum = 0;
const importOldDna = false;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* NOTE: As the name implies, this will allow duplicates to be
* generated in the collection. Do not set this to true unless
* you specifically want duplicates in your collection.
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const allowDuplicates = false;

const exceptions = {
  traitToTrait: {
    Prison: ['Pig', 'Playboy', 'Fatcraft Blue', 'Fatcraft Red'],
    Hospital: ['Pig'],
    Lightsaber: ['Tree', 'Hologram'],
    'Washing Stick': ['Tree', 'Hologram'],
    FMNT: ['Aviator', 'Dope', 'Franklin', 'Karen', 'Nerd', 'Open', 'Professional'],
    Spider: ['Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Professional', 'Thug Life', 'Tyson'],
    Aviator: ['Frog'],
    Dope: ['Frog', 'Chef'],
    Franklin: ['Frog', 'Chef'],
    Professional: ['Frog'],
    'Thug Life': ['Frog', 'Chef'],
    Tyson: ['Frog', 'Chef'],
    Tusks: ['Frog'],
    Clown: ['Lions Roar', 'Eagle'],
    Pinocchio: ['Lions Roar', 'Eagle', 'Astro'],
    Toucan: ['Spartan', 'Nord'],
    Eagle: ['Spartan', 'Ottoman', 'Frog', 'Medusa', 'Nord'],
    Spartan: ['Toucan', 'Pinocchio', 'Merchant', 'Trunk', 'Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Nerd', 'Professional', 'Thug Life'],
    Astro: ['Toucan', 'Pinocchio', 'Merchant', 'Trunk', 'Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Nerd', 'Professional', 'Thug Life', 'Frog Tongue', 'Snakes Tongue', 'Eagle', 'Tusks', 'Toucan', 'Pinocchio', 'Happy Merchant'],
    Nord: ['Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Nerd', 'Professional', 'Thug Life'],
    Karen: ['Chef'],
    Monocle: ['Chef'],
    Open: ['Chef'],
    'Bard Blue': ['Magic Wand'],
    'Bard Red': ['Magic Wand'],
    Gnomes: ['Bear', 'Boxer', 'Croc', 'Fat Cat', 'Fat Michael', 'Fat Ninja', 'Fighter', 'Grim', 'Pink Man', 'PIPEPE', 'Polar Bear', 'Swamp Man', 'Tie Bear'],
    'Living Room': ['Playboy', 'Fatcraft Blue', 'Fatcraft Red'],
    Caterpillar: ['Medusa', 'Ushanka'],
    Lion: ['Ronikbot', 'Elegant'],
    Wolf: ['Ronikbot', 'Elegant'],
    Rocker: ['Alt', 'Caterpillar', 'Elegant', 'Full', 'Hobo', 'KiBi', 'Ronikbot', 'Tingles', 'Van Dyke', 'Viking', 'Wizard'],
    Alt: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog'],
    Caterpillar: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog'],
    Elegant: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog', 'Medusa', 'Ushanka'],
    Full: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog'],
    Heisenberg: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Hobo: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog', 'Medusa', 'Ushanka'],
    KiBi: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog'],
    Latin: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Mutton: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Plumber: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Ronikbot: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog', 'Medusa', 'Ushanka'],
    Tingles: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog'],
    Tom: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Twirl: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    'Van Dyke': ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog', 'Ushanka'],
    Viking: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Frog'],
    Wizard: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    'M 2': ['Pinocchio'],
    'M 4': ['Pinocchio'],
    'M 5': ['Pinocchio'],
    Holograph: ['Washing Stick', 'Lightsaber', 'Stacked Cups'],
    Tree: ['Washing Stick', 'Lightsaber'],
    Belt: ['Coat'],
    'Big Afro': ['Beanie']
  },
  traitToLayer: {
    Onion: ['Eyewear', 'Headwear', 'Hair', 'Eyes', 'Masks', 'Nose', 'Mouth', 'Beard', 'Slippers'],
    'Onion Red': ['Eyewear', 'Headwear', 'Hair', 'Eyes', 'Masks', 'Nose', 'Mouth', 'Beard', 'Slippers'],
    Assasson: ['Eyewear', 'Headwear', 'Hair', 'Masks', 'Nose', 'Mouth', 'Slippers'],
    Pirate: ['Headwear', 'Hair', 'Eyes', 'Masks', 'Beard', 'Slippers'],
    Ninja: ['Headwear', 'Hair', 'Masks', 'Nose', 'Mouth', 'Beard', 'Slippers'],
    'Cartie Blue': ['Headwear', 'Hair', 'Masks'],
    'Cartie Red': ['Headwear', 'Hair', 'Masks'],
    'Cowboy Black': ['Headwear', 'Hair', 'Masks'],
    'Cowboy Brown': ['Headwear', 'Hair', 'Masks'],
    Santa: ['Headwear', 'Hair', 'Beard', 'Slippers'],
    King: ['Headwear', 'Hair'],
    Footballer: ['Headwear', 'Hair'],
    Straitjacket: ['Beard', 'Dudes', 'Clothes', 'Eyes', 'Eyewear', 'Hair', 'Headwear', 'Masks', 'Mouth', 'Nose', 'Pants', 'Shirt', 'Slippers'],
    'Elf Green': ['Headwear', 'Hair', 'Masks'],
    'Elf Blue': ['Headwear', 'Hair', 'Masks'],
    Eagle: ['Nose', 'Masks', 'Beard'],
    Toucan: ['Mouth', 'Masks', 'Beard'],
    Ottoman: ['Eyewear', 'Beard'],
    // Pig: ['Food', 'Mascots'],
    Dumpster: ['Mascots'], 
    Party: ['Eyewear'],
    Pinocchio: ['Beard'],
    Spartan: ['Beard'],
    Nord: ['Beard'],
    Trunk: ['Beard'],
    Footballer: ['Beard'],
    Doctor: ['Slippers'],
    'Bard Blue': ['Slippers', 'Food'],
    'Bard Red': ['Slippers', 'Food'],
    Barbarian: ['Slippers', 'Masks'],
    FMNT: ['Slippers'],
    Hippie: ['Slippers'],
    'Stacked Cups': ['Food'],
    // Masks
    Astro: ['Headwear', 'Eyewear', 'Hair', 'Beard'],
    'Greek Marble': ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    Knight: ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    'Plague Doctor': ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    Shock: ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    'Space Soldier': ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    Stone: ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    Venice: ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth'],
    // mouth
    'Snakes Tongue': ['Beard'],
    'Lions Roar': ['Beard'],
    'Frog Tongue': ['Beard'],
    'Eagle': ['Beard'], 
    'Dollar Bill': ['Beard'], 
    'Tusks': ['Beard'], 
  }
}

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  resumeNum,
  rarity_config,
  toCreateNow,
  collectionSize,
  namedWeight,
  exactWeight,
  layerVariations,
  importOldDna,
  allowDuplicates,
  enableStats,
  statBlocks,
  extraAttributes,
  exceptions
};
