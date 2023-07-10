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
    growEditionSizeTo: 10,
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
      { name: "Hair", or: { name: 'Headwear' } },
      { name: "Nose" },
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

const rarityTable = {
  Common: 60,
  Uncommon: 50,
  Rare: 40,
  Epic: 30,
  Legendary: 20,
  Mythic: 10
}

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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* If `debugExceptions` equals true will log to terminal:
* `X not compatible with Y. Repicking...` and `Picked Z`
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const debugExceptions = false

const exceptions = {
  traitToTrait: {
    // background
    Prison: ['Pig', 'Playboy', 'Fatcraft Blue', 'Fatcraft Red'],
    Hospital: ['Pig'],
    // misc
    Lightsaber: ['Tree', 'Hologram'],
    'Washing Stick': ['Tree', 'Hologram'],
    // Couches
    Gnomes: ['Bear', 'Boxer', 'Croc', 'Fat Cat', 'Fat Michael', 'Fat Ninja', 'Fighter', 'Grim', 'Pink Man', 'PIPEPE', 'Polar Bear', 'Swamp Man', 'Tie Bear'],
    Holograph: ['Washing Stick', 'Lightsaber', 'Stacked Cups'],
    Tree: ['Washing Stick', 'Lightsaber'],
    'Living Room': ['Playboy', 'Fatcraft Blue', 'Fatcraft Red'],
    // Clothes
    FMNT: ['Aviator', 'Dope', 'Franklin', 'Karen', 'Nerd', 'Open', 'Professional'],
    'Bard Blue': ['Magic Wand'],
    'Bard Red': ['Magic Wand'],
    // Eyes
    Spider: ['Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Professional', 'Thug Life', 'Tyson'],
    Frog: ['Aviator', 'Dope', 'Franklin', 'Professional', 'Thug Life', 'Tyson'],
    'Neutral Eyes': ['Venice'],
    // Eyewear
    Aviator: ['Dreadlocks', 'Chef'],
    Dope: ['Chef', 'Froggy', 'Dreadlocks'],
    Franklin: ['Chef', 'Dreadlocks'],
    Tyson: ['Chef'],
    Monocle: ['Chef'],
    Open: ['Chef'],
    Karen: ['Chef', 'Dreadlocks'],
    'Thug Life': ['Chef', 'Dreadlocks'],
    // Mouth
    Tusks: ['Froggy', 'Dreadlocks', 'Ushanka', 'Lion', 'Wolf'],
    Eagle: ['Spartan', 'Ottoman', 'Frog', 'Medusa', 'Nord', 'Wolf', 'Lion', 'Ushanka', 'Clown', 'Dreadlocks'],
    'Lions Roar': ['Clown', 'Pinocchio'],
    'Frog Tongue': ['Dreadlocks', 'Wolf', 'Lion', 'Ushanka'],
    'Snakes Tongue': ['Dreadlocks', 'Wolf', 'Lion', 'Ushanka'],
    // Headwear
    Spartan: ['Toucan', 'Pinocchio', 'Merchant', 'Trunk', 'Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Nerd', 'Professional', 'Thug Life'],
    Nord: ['Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Nerd', 'Professional', 'Thug Life', 'Toucan'],
    Lion: ['Ronikbot', 'Elegant'],
    Wolf: ['Ronikbot', 'Elegant', 'Happy Merchant'],
    // Masks
    Astro: ['Toucan', 'Pinocchio', 'Merchant', 'Trunk', 'Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Nerd', 'Professional', 'Thug Life', 'Frog Tongue', 'Snakes Tongue', 'Eagle', 'Tusks', 'Toucan', 'Pinocchio', 'Happy Merchant'],
    // beard
    Alt: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Alternative'],
    Caterpillar: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Dreadlocks', 'Medusa', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    Elegant: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Medusa', 'Ushanka', 'Lion', 'Wolf', 'Dreadlocks', 'Alternative'],
    Full: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    Heisenberg: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Hobo: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Medusa', 'Ushanka', 'Lion', 'Wolf', 'Dreadlocks', 'Alternative'],
    KiBi: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    Latin: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Mutton: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Plumber: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Ronikbot: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Medusa', 'Ushanka', 'Lion', 'Wolf', 'Dreadlocks', 'Alternative'],
    Tingles: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Alternative'],
    Tom: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Twirl: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks'],
    Viking: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    Wizard: ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Dreadlocks', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    'Van Dyke': ['Snakes Tongue', 'Lions Roar', 'Frog Tongue', 'Eagle', 'Dollar Bill', 'Tusks', 'Froggy', 'Ushanka', 'Lion', 'Wolf', 'Dreadlocks', 'Alternative'],
    // Pants
    Belt: ['Coat'],
  },
  traitToLayer: {
    // background
    Dumpster: ['Mascots'], 
    // clothes
    Onion: ['Eyewear', 'Headwear', 'Hair', 'Eyes', 'Masks', 'Nose', 'Mouth', 'Beard', 'Slippers'],
    Assasson: ['Eyewear', 'Headwear', 'Hair', 'Masks', 'Nose', 'Mouth', 'Slippers', 'Beard'],
    Pirate: ['Headwear', 'Hair', 'Eyes', 'Masks', 'Beard', 'Slippers'],
    Ninja: ['Headwear', 'Eyewear', 'Hair', 'Masks', 'Nose', 'Mouth', 'Beard', 'Slippers'],
    FMNT: ['Slippers', 'Eyewear'],
    Doctor: ['Slippers'],
    Hippie: ['Slippers'],
    Barbarian: ['Slippers', 'Masks', 'Hair'],
    Santa: ['Headwear', 'Hair', 'Beard', 'Slippers'],
    Straitjacket: ['Beard', 'Dudes', 'Eyes', 'Eyewear', 'Hair', 'Headwear', 'Masks', 'Mouth', 'Nose', 'Pants', 'Shirt', 'Slippers'],
    King: ['Headwear', 'Hair'], // Body XL-XXXL
    Footballer: ['Headwear', 'Hair', 'Beard'], // Body XL-XXXL
    'Onion Red': ['Eyewear', 'Headwear', 'Hair', 'Eyes', 'Masks', 'Nose', 'Mouth', 'Beard', 'Slippers'],
    'Cartie Blue': ['Headwear', 'Hair', 'Masks'],
    'Cartie Red': ['Headwear', 'Hair', 'Masks'],
    'Cowboy Black': ['Headwear', 'Hair', 'Masks'],
    'Cowboy Brown': ['Headwear', 'Hair', 'Masks'],
    'Elf Green': ['Headwear', 'Hair', 'Masks'],
    'Elf Red': ['Headwear', 'Hair', 'Masks'],
    'Bard Blue': ['Slippers', 'Food'],
    'Bard Red': ['Slippers', 'Food'],
    // nose
    Pinocchio: ['Beard'],
    Toucan: ['Mouth', 'Masks', 'Beard'],
    Trunk: ['Beard'],
    // headwear
    Ottoman: ['Eyewear', 'Beard'],
    Party: ['Eyewear'],
    Spartan: ['Beard'],
    Nord: ['Beard'],
    // misc    
    'Stacked Cups': ['Food'],
    // Masks
    Astro: ['Headwear', 'Eyewear', 'Hair', 'Beard'],
    Knight: ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    Shock: ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    Stone: ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    Venice: ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth'],
    'Greek Marble': ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    'Plague Doctor': ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    'Space Soldier': ['Headwear', 'Eyewear', 'Hair', 'Beard', 'Nose', 'Mouth', 'Eyes'],
    // mouth
    Eagle: ['Nose', 'Masks', 'Beard'], 
    Tusks: ['Beard'], 
    'Snakes Tongue': ['Beard'],
    'Lions Roar': ['Beard'],
    'Frog Tongue': ['Beard'],
    'Dollar Bill': ['Beard'], 
    // hair
    Afro: ['Masks'],
    Alternative: ['Masks'],
    Buzz: ['Masks'],
    Combed: ['Masks'],
    Dreadlocks: ['Masks'],
    Jojo: ['Masks'],
    Mullet: ['Masks'],
    Orange: ['Masks'],
    Original: ['Masks'],
    Samurai: ['Masks'],
    Short: ['Masks'],
    Slicked: ['Masks'],
    Tonsure: ['Masks'],
    Undercut: ['Masks'],
    'Air Force Pilot': ['Masks'],
    'Big Afro': ['Masks'],
    'Strong Fighter': ['Masks'],
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
  rarityTable,
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
  exceptions,
  debugExceptions
};
