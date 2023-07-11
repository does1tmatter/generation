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
    growEditionSizeTo: 3,
    type: 'M',
    layersOrder: [
      { name: "Background" },
      { name: "WOOP WOOP" },
      { name: "Couches" },
      { name: "Dudes" },
      { name: "Eyes" },
      { name: "Clothes", or: { name: 'Pants', with: 'Shirts' }},
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
  },
  {
    growEditionSizeTo: 6,
    type: 'L',
    layersOrder: [
      { name: "Background" },
      { name: "WOOP WOOP" },
      { name: "Couches" },
      { name: "Dudes" },
      { name: "Eyes" },
      { name: "Clothes", or: { name: 'Pants', with: 'Shirts' }},
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
  },
  {
    growEditionSizeTo: 9,
    type: 'XL',
    layersOrder: [
      { name: "Background" },
      { name: "WOOP WOOP" },
      { name: "Couches" },
      { name: "Dudes" },
      { name: "Eyes" },
      { name: "Clothes", or: { name: 'Pants', with: 'Shirts' }},
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
  },
  {
    growEditionSizeTo: 12,
    type: 'XXL',
    layersOrder: [
      { name: "Background" },
      { name: "WOOP WOOP" },
      { name: "Couches" },
      { name: "Dudes" },
      { name: "Eyes" },
      { name: "Clothes", or: { name: 'Pants', with: 'Shirts' }},
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
  },
  {
    growEditionSizeTo: 15,
    type: 'XXXL',
    layersOrder: [
      { name: "Background" },
      { name: "WOOP WOOP" },
      { name: "Couches" },
      { name: "Dudes" },
      { name: "Eyes" },
      { name: "Clothes", or: { name: 'Pants', with: 'Shirts' }},
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

const shuffleLayerConfigurations = true;

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
    Hospital: ['Pig'],
    Prison: ['Pig', 'Playboy', 'Fatcraft Blue', 'Fatcraft Red'],

    // Couches
    Gnomes: ['Bear', 'Boxer', 'Croc', 'Fat Cat', 'Fat Michael', 'Fat Ninja', 'Fighter', 'Grim', 'Pink Man', 'PIPEPE', 'Polar Bear', 'Swamp Man', 'Tie Bear'],
    Holograph: ['Washing Stick', 'Lightsaber', 'Stacked Cups'],
    Tree: ['Washing Stick', 'Lightsaber'],
    Pig: ['Bear'],
    'Cotton Candy': ['Dope Soda', 'Chicken'],
    'Living Room': ['Playboy', 'Fatcraft Blue', 'Fatcraft Red'],

    // Eyes
    Spider: ['Aviator', 'Dope', 'Franklin', 'Karen', 'Open', 'Professional', 'Thug Life', 'Tyson'],
    Frog: ['Aviator', 'Dope', 'Franklin', 'Professional', 'Thug Life', 'Tyson', 'Eagle'],
    'Neutral Eyes': ['Venice'],

    // Clothes
    FMNT: ['Aviator', 'Dope', 'Franklin', 'Karen', 'Nerd', 'Open', 'Professional'],
    'Bard Blue': ['Magic Wand'],
    'Bard Red': ['Magic Wand'],

    // Pants
    Belt: ['Coat'],

    // Eyewear
    Aviator: ['Dreadlocks', 'Chef', 'Spartan', 'Nord'],
    Dope: ['Chef', 'Froggy', 'Dreadlocks', 'Spartan', 'Nord'],
    Franklin: ['Chef', 'Dreadlocks', 'Spartan', 'Nord'],
    Tyson: ['Chef'],
    Monocle: ['Chef'],
    Open: ['Chef', 'Spartan', 'Nord'],
    Karen: ['Chef', 'Dreadlocks', 'Spartan', 'Nord'],
    Nerd: ['Astro', 'Spartan', 'Nord'],
    Professional: ['Spartan', 'Nord'],
    'Thug Life': ['Chef', 'Dreadlocks', 'Spartan', 'Nord'],

    // Masks
    Astro: ['Toucan', 'Liar', 'Happy Merchant', 'Trunk', 'Frog Tongue', 'Snakes Tongue', 'Eagle', 'Tusks'],
    
    // Mouth
    Tusks: ['Froggy', 'Dreadlocks', 'Ushanka', 'Lion', 'Wolf'],
    Eagle: ['Spartan', 'Ottoman', 'Medusa', 'Nord', 'Wolf', 'Lion', 'Ushanka', 'Clown', 'Alternative', 'Dreadlocks'],
    'Lions Roar': ['Clown', 'Liar'],
    'Frog Tongue': ['Dreadlocks', 'Wolf', 'Lion', 'Ushanka'],
    'Snakes Tongue': ['Dreadlocks', 'Wolf', 'Lion', 'Ushanka'],
    'Dollar Bill': ['Dreadlocks', 'Wolf', 'Lion', 'Ushanka', 'Froggy'],

    // beard
    Alt: ['Froggy', 'Alternative'],
    Caterpillar: ['Froggy', 'Dreadlocks', 'Medusa', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    Elegant: ['Froggy', 'Medusa', 'Ushanka', 'Lion', 'Wolf', 'Dreadlocks', 'Alternative'],
    Full: ['Froggy', 'Dreadlocks', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    Hobo: ['Froggy', 'Medusa', 'Ushanka', 'Lion', 'Wolf', 'Dreadlocks', 'Alternative'],
    KiBi: ['Froggy', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    Ronikbot: ['Froggy', 'Medusa', 'Ushanka', 'Lion', 'Wolf', 'Dreadlocks', 'Alternative'],
    Tingles: ['Froggy', 'Alternative'],
    Viking: ['Froggy', 'Dreadlocks', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    Wizard: ['Dreadlocks', 'Ushanka', 'Lion', 'Wolf', 'Alternative'],
    'Van Dyke': ['Froggy', 'Ushanka', 'Lion', 'Wolf', 'Dreadlocks', 'Alternative'],

    // Headwear
    Spartan: ['Toucan', 'Liar', 'Happy Merchant', 'Trunk'],
    Nord: ['Toucan'],
    Wolf: ['Happy Merchant'],
  },
  traitToLayer: {
    // background
    Dumpster: ['Mascots'], 

    // couches
    Stage: ['Mascots'],
    Pig: ['Food'],

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
    Straitjacket: ['Beard', 'Dudes', 'Eyes', 'Eyewear', 'Hair', 'Headwear', 'Masks', 'Mouth', 'Nose', 'Pants', 'Shirts', 'Slippers'],
    King: ['Headwear', 'Hair'], // Body XL-XXXL
    Footballer: ['Headwear', 'Hair', 'Beard'], // Body XL-XXXL
    'Red Onion': ['Eyewear', 'Headwear', 'Hair', 'Eyes', 'Masks', 'Nose', 'Mouth', 'Beard', 'Slippers'],
    'Cartie Blue': ['Headwear', 'Hair', 'Masks'],
    'Cartie Red': ['Headwear', 'Hair', 'Masks'],
    'Cowboy Black': ['Headwear', 'Hair', 'Masks'],
    'Cowboy Brown': ['Headwear', 'Hair', 'Masks'],
    'Elf Green': ['Headwear', 'Hair', 'Masks'],
    'Elf Red': ['Headwear', 'Hair', 'Masks'],
    'Bard Blue': ['Slippers', 'Food'],
    'Bard Red': ['Slippers', 'Food'],

    // misc    
    'Stacked Cups': ['Food'],

    // headwear
    Ottoman: ['Eyewear', 'Beard'],
    Party: ['Eyewear'],
    Spartan: ['Beard'],
    Nord: ['Beard'],

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

    // nose
    Liar: ['Beard'],
    Toucan: ['Mouth', 'Masks', 'Beard'],
    Trunk: ['Beard'],
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
