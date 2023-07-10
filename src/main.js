const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");
const sha1 = require(`${basePath}/node_modules/sha1`);
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
const {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  resumeNum,
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
  rarityTable
} = require(`${basePath}/src/config.js`);
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;
var metadataList = [];
var attributesList = [];
var statList = [];
var dnaList = new Set();
const DNA_DELIMITER = "-";
const HashlipsGiffer = require(`${basePath}/modules/HashlipsGiffer.js`);
const oldDna = `${basePath}/build_old/_oldDna.json`;
const singleJsonName = '_metadata'
const traitToInvestigate = 'Straitjacket'

let hashlipsGiffer = null;
let allTraitsCount;

const buildSetup = () => {
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/images`);
  } else {
    fs.rmdirSync(buildDir, { recursive: true } );
    fs.mkdirSync(buildDir);
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/images`);
  }
  if (gif.export) {
    fs.mkdirSync(`${buildDir}/gifs`);
  }
  if (importOldDna) {
    let rawdata = fs.readFileSync(oldDna);
    let data = JSON.parse(rawdata);
    if (data.length !== resumeNum) {
      throw new Error(
        `resumeNum (${resumeNum}) does not match count in _oldDna file (${oldDna.length}). 
        Please make sure you have the correct _metadata file in the build_old folder and re-run generateOldDna`);
    }
    data.forEach((item) => {
      dnaList.add(item);
    });
  }
}

const getRarityWeight = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  if (namedWeight) {
    return String(nameWithoutExtension.split(rarityDelimiter).pop())
  } else {
    return Number(nameWithoutExtension.split(rarityDelimiter).pop())
  }
}

function cleanDna(_str) {
  const withoutOptions = removeQueryStrings(_str);
  var dna = Number(withoutOptions.split(":").shift().split('_').pop());
  return dna;
}

const cleanName = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};

const getElements = (path) => fs
  .readdirSync(path)
  .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
  .map((i, index) => {
    if (i.includes("-")) throw new Error(`layer name can not contain dashes, please fix: ${i}`)
    
    return {
      id: index,
      name: cleanName(i),
      filename: i,
      path: `${path}${i}`,
      weight: getRarityWeight(i),
    }
  })

const layersSetup = (layersOrder) => layersOrder.map((layerObj, index) => {
  const selective = []
  const obj = {
    id: index,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    name: layerObj.options?.displayName ?? layerObj.name,
    blend: layerObj.options?.blend ?? "source-over",
    opacity: layerObj.options?.opacity ?? 1,
    bypassDNA: layerObj.options?.bypassDNA ?? false,
    layerVariations:  layerObj.options?.layerVariations ?? undefined,
    ogName: layerObj.name,
  }

  if (layerObj.or) {
    selective.push({ name: layerObj.or.name, elements: getElements(`${layersDir}/${layerObj.or.name}/`) })

    if (layerObj.or.with) {
      selective.push({ name: layerObj.or.with, elements: getElements(`${layersDir}/${layerObj.or.with}/`) })
    }
  }

  if (selective.length) {
    const selectiveWeight = getLayerTotalWeight(selective[0].elements)
    const layerWeight = getLayerTotalWeight(obj.elements)

    let random = getRandomNumber(selectiveWeight + layerWeight)
    const weights = [selectiveWeight, layerWeight]
    
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i]
      if (random < 0) {
        if (i == 0) {
          return {
            ...obj,
            name: layerObj.options?.displayName ?? selective[0].name,
            elements: selective[0].elements,
            ogName: selective[0].name,
            required: selective.length > 1 ? selective[1] : null
          }
        } else {
          return obj
        }
      } 
    } 
  }

  return obj
})

const getLayerTotalWeight = (elements) => {
  let totalWeight = 0
  const rarityCount = getRarityCount(elements)

  for (const key in rarityCount) {
    totalWeight += rarityCount[key]
  }
  
  return Math.floor(totalWeight)
}

const saveImage = (_editionCount) => fs.writeFileSync(`${buildDir}/images/${_editionCount}.png`, canvas.toBuffer("image/png", { resolution: format.dpi }));

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};

const drawBackground = () => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};

const addMetadata = (_dna, _edition) => {
  let tempMetadata = {
    name: `${namePrefix} #${_edition}`,
    description: description,
    image: `${baseUri}/${_edition}.png`,
    dna: sha1(_dna),
    id: _edition,
    ...extraMetadata,
    attributes: attributesList,
  }

  if (network == NETWORK.sol) {
    // Add metadata for solana
    tempMetadata = {
      ...tempMetadata,
      symbol: solanaMetadata.symbol,
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `${_edition}.png`,
      external_url: solanaMetadata.external_url,
      properties: {
        files: [
          { uri: `${_edition}.png`, type: "image/png" }
        ],
        category: "image",
        creators: solanaMetadata.creators
      }
    }
  }

  metadataList.push(tempMetadata);
  attributesList = [];
};

const addAttributes = (_element) => attributesList.push({ trait_type: _element.layer.name, value: _element.layer.selectedElement.name });

const addStats = () => {
    statBlocks.forEach((stat) => {
    let min = stat.minValue;
    let max = stat.maxValue;
    let updatedValue = Math.floor(Math.random() * (max - min + 1)) + min;
    let newTrait = stat.attribute
    newTrait.value = updatedValue;
    statList.push(newTrait);
  });
}

const loadLayerImg = (_layer) => {
  return new Promise((resolve, reject) => {
    let path = _layer.selectedElement.path;
    if (_layer.layerVariations != undefined) {
      path = path.split('#')[0];
      path = path.concat(_layer.variant.concat('.png'));
      path = path.replace(_layer.ogName, _layer.ogName.concat('-variant'));
    }
    if (!fs.existsSync(path)) {
      throw new Error(`The selected file (${path}) does not exist. Check spelling and location.`);
    }
    if (debugLogs) console.log('PATH', { path, exists: fs.existsSync(path) });
    loadImage(`${path}`)
      .then((image) => {
        resolve({ layer: _layer, loadedImage: image });
      })
      .catch(() => {
        reject();
      });
  });
};

const addText = (_sig, x, y, size) => {
  ctx.fillStyle = text.color;
  ctx.font = `${text.weight} ${size}pt ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;
  ctx.fillText(_sig, x, y);
};

const drawElement = (_renderObject, _index, _layersLen) => {
  ctx.globalAlpha = _renderObject.layer.opacity;
  ctx.globalCompositeOperation = _renderObject.layer.blend;
  text.only
    ? addText(
        `${_renderObject.layer.name}${text.spacer}${_renderObject.layer.selectedElement.name}`,
        text.xGap,
        text.yGap * (_index + 1),
        text.size
      )
    : ctx.drawImage(
        _renderObject.loadedImage,
        0,
        0,
        format.width,
        format.height
      );

  addAttributes(_renderObject);
};

const constructLayerToDna = (_dna = "", _layers = [], layerConfigIndex) => {
  let mappedDnaToLayers = _layers.map((layer, index) => {
    if (_dna.split(DNA_DELIMITER)[index] == undefined) {
      throw new Error(`Some weights in your ${layer.name} folder are either undefined or incorrect.
      NOTE: All layers must include a weight. If using 'namedWeight' system, all layers must contain NAMED weight, no numbers!`);
    }
    let selectedElement = layer.elements?.find((e) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index]));
    let requiredLayer

    if (layer.required) {
      requiredLayer = layer.required.elements?.find((e) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index].split('?required=').pop()))
      if (_dna.search(requiredLayer.name) < 0) {
        throw new Error(`Some weights in your ${layer.name} folder are either undefined or incorrect.
        NOTE: All layers must include a weight. If using 'namedWeight' system, all layers must contain NAMED weight, no numbers!`);
      }
    }

    if (_dna.search(selectedElement.name) < 0) {
      throw new Error(`Some weights in your ${layer.name} folder are either undefined or incorrect.
      NOTE: All layers must include a weight. If using 'namedWeight' system, all layers must contain NAMED weight, no numbers!`);
    }

    let variant = layer.layerVariations != undefined ? (_dna.split('&').pop()).split(DNA_DELIMITER).shift() : '';

    return {
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement,
      layerVariations: layer.layerVariations,
      variant,
      ogName: layer.ogName,
      required: layer.required ? {
        name: layer.required.name,
        blend: layer.blend,
        opacity: layer.opacity,
        layerVariations: layer.layerVariations,
        selectedElement: requiredLayer,
        ogName: layer.required.name
      } : null
    }
  });

  return filterTraitExceptions(mappedDnaToLayers, layerConfigIndex);
};

const filterTraitExceptions = (layers) => {
  const layersToRemove = new Set()

  layers.forEach(layer => {
    const traitName = getTraitName(layer)
    const layerName = getLayerName(layer)

    if (exceptions.traitToLayer[traitName] && !traitName.includes('None')) {
      if (traitToInvestigate && traitName === traitToInvestigate) {
        console.log(`--------------------------- found ${traitToInvestigate}`)
        console.log(exceptions.traitToLayer[traitName])
        console.log(`---------------------------`)
      }
      exceptions.traitToLayer[traitName].forEach(val => {
        layers.forEach((x, i) => {
          if (getLayerName(x) === val && (!layersToRemove.has(getLayerName(x)) && !layersToRemove.has(layerName))) {
            if (traitToInvestigate && traitName === traitToInvestigate) console.log(getLayerName(x), 'added to remove')
            layersToRemove.add(getLayerName(x))
          }
        })
      })
    }

    if (layer.required) {
      const requiredTrait = getTraitName(layer)

      if (exceptions.traitToLayer[requiredTrait]) {
        exceptions.traitToLayer[requiredTrait].forEach(val => {
          layers.forEach((x, i) => {
            if (getLayerName(x) === val && (!layersToRemove.has(getLayerName(x)) && !layersToRemove.has(layerName))) {
              layersToRemove.add(getLayerName(x))
            }
          })
        })
      }
    }
  })

  layersToRemove.forEach(lname => {
    const index = layers.findIndex(obj => getLayerName(obj) === lname)
    layers.splice(index, 1)
  })

  return layers
}

const getLayerName = (layer) => layer.ogName
const getTraitName = (layer) => layer.selectedElement.name

const filterDNAOptions = (_dna) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

const removeQueryStrings = (_dna) => _dna.replace(/(\?.*$)/, "");
const isDnaUnique = (_DnaList = new Set(), _dna = "") => !_DnaList.has(filterDNAOptions(_dna));

const createDnaNames = (_layers, _variant) => {
  const traitRules = new Map()
  const randNum = _layers.map((layer) => createNamedLayer(layer, traitRules));

  return randNum.join(DNA_DELIMITER);
};

const createNamedLayer = (layer, traitRules) => {
  let requiredLayer = ''
  let selectedTrait = selectNamedTrait(layer.elements)

  if (exceptions.traitToTrait[layer.elements[selectedTrait].name]) {
    traitRules.set(layer.elements[selectedTrait].name, exceptions.traitToTrait[layer.elements[selectedTrait].name])
  }

  if (traitRules?.size) {
    traitRules.forEach((value, key) => {
      value.forEach(val => {
        if (val === layer.elements[selectedTrait].name) {
          while (val === layer.elements[selectedTrait].name) {
            selectedTrait = selectNamedTrait(layer.elements)
          }
        }
      })
    })
  }

  if (layer.required) {
    let requiredTrait = selectNamedTrait(layer.required.elements)

    if (exceptions.traitToTrait[layer.required.elements[requiredTrait].name]) {
      traitRules.set(layer.required.elements[requiredTrait].name, exceptions.traitToTrait[layer.required.elements[requiredTrait].name])
    }

    if (traitRules?.size) {
      traitRules.forEach((value, key) => {
        value.forEach(val => {
          if (val === layer.required.elements[requiredTrait].name) {
            while (val === layer.required.elements[requiredTrait].name) {
              requiredTrait = selectNamedTrait(layer.required.elements)
            }
          }
        })
      })
    }

    requiredLayer = `?required=${layer.required.name}_${layer.required.elements[requiredTrait].id}:${layer.required.elements[requiredTrait].filename}`
  }

  if(layer.layerVariations != undefined) {
    return `${layer.name}_${layer.elements[selectedTrait].id}:${layer.elements[selectedTrait].name}& ${_variant}${requiredLayer}`;
  } else {
    return `${layer.name}_${layer.elements[selectedTrait].id}:${layer.elements[selectedTrait].filename}${layer.bypassDNA ? "?bypassDNA=true" : ""}${requiredLayer}`
  }
}

const selectNamedTrait = (elements) => {
  const weights = []
  let totalWeight = 0

  elements.forEach(ele => {
    const weight = rarityTable[ele.weight]

    weights.push(weight)
    totalWeight += weight
  })

  let random = getRandomNumber(totalWeight)

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i]
    
    if (random < 0) return i
  } 
}

const getRandomNumber = (totalWeight) => Math.floor(Math.random() * totalWeight)

const getRarityCount = (layers) => {
  const rarity_config = {
    Mythic: { ranks: [0, 100] },
    Legendary: { ranks: [100, 600] },
    Epic: { ranks: [600, 1500] },
    Rare: { ranks: [1500, 3100] },
    Uncommon: { ranks: [3100, 5600] },
    Common: { ranks: [5600, 10000] },
  };
  
  const rarityCount = {
    Mythic: 0,
    Legendary: 0,
    Epic: 0,
    Rare: 0,
    Uncommon: 0,
    Common: 0
  }

  // Get count of each rarity in layer folders
  layers.forEach((element) => {
    switch (element.weight) {
      case "Mythic":
        rarityCount.Mythic++;
        break;
      case "Legendary":
        rarityCount.Legendary++;
        break;
      case "Epic":
        rarityCount.Epic++;
        break;
      case "Rare":
        rarityCount.Rare++;
        break;
      case "Uncommon":
        rarityCount.Uncommon++;
        break;
      case "Common":
        rarityCount.Common++;
        break;
      default:
        rarityCount.Common++;
    }
  });


  // Find any missing rarities and log the remainder of 10,000
  let remainder = 0;
  for (const key in rarityCount) {
    let diff = (rarity_config[key]['ranks'][1] - rarity_config[key]['ranks'][0]);
    if (rarityCount[key] !== 0) {
      rarityCount[key] = diff / rarityCount[key]
    } else {
      remainder += diff;
      delete rarityCount[key];
    }
  }
  

  // Split remainder evenly among remaining rarities
  let remainingRarity = Object.keys(rarityCount).length;
  remainder /= remainingRarity;
  for (const key in rarityCount) {
    rarityCount[key] += remainder;
  }
  // Check for any where higher rarity has larger weight than lower rarity
  let uncommonDiff = (rarityCount.Uncommon > rarityCount.Common) ? Math.floor(rarityCount.Uncommon - rarityCount.Common) : 0
  let rareDiff = (rarityCount.Rare > rarityCount.Uncommon) ? Math.floor(rarityCount.Rare - rarityCount.Uncommon) : 0
  let epicDiff = (rarityCount.Epic > rarityCount.Rare) ? Math.floor(rarityCount.Epic - rarityCount.Rare) : 0
  let legendaryDiff = (rarityCount.Legendary > rarityCount.Epic) ? Math.floor(rarityCount.Legendary - rarityCount.Epic) : 0
  let mythicDiff = (rarityCount.Mythic > rarityCount.Legendary) ? Math.floor(rarityCount.Mythic - rarityCount.Legendary) : 0

  // Redistribute weight to ensure weights match rarities      
  if (rarityCount.Common) rarityCount.Common += uncommonDiff;
  if (rarityCount.Uncommon) rarityCount.Uncommon -= uncommonDiff;
  if (rarityCount.Uncommon) rarityCount.Uncommon += rareDiff;
  if (rarityCount.Rare) rarityCount.Rare -= rareDiff;
  if (rarityCount.Rare) rarityCount.Rare += epicDiff;
  if (rarityCount.Epic) rarityCount.Epic -= epicDiff;
  if (rarityCount.Epic) rarityCount.Epic += legendaryDiff;
  if (rarityCount.Legendary) rarityCount.Legendary -= legendaryDiff;
  if (rarityCount.Legendary) rarityCount.Legendary += mythicDiff;
  if (rarityCount.Mythic) rarityCount.Mythic -= mythicDiff;

  return rarityCount
}

const createDnaExact = (_layers, _remainingInLayersOrder, _currentEdition, _variant) => {
  let randNum = [];
  let layerSizes = allLayerSizes();
  _layers.forEach((layer) => {
    var totalWeight = 0;
    let expected = layerSizes[layer.name] - _currentEdition;
    let remaining = toCreateNow - _currentEdition
    layer.elements.forEach((element) => {
      totalWeight += allTraitsCount[element.name];
    });

    // Require totalWeight to match either current remaining layersOrder, overall size for multiple layersOrders, or remaining collectionSize. 
    if (totalWeight != _remainingInLayersOrder && totalWeight != expected && totalWeight != remaining) {
      throw new Error(`${layer.name} layer total weight (${totalWeight}) does not match either layersOrder weight (${_remainingInLayersOrder}),
      overall expected weight from multiple layersOrders (${expected}), or remaining collection size (${remaining})`);
    };

    // number between 0 - totalWeight
    // We keep the random function here to ensure we don't generate all the same layers back to back.
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < layer.elements.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      let lookup = allTraitsCount[layer.elements[i].name];
      if (lookup > 0) {
        random -= allTraitsCount[layer.elements[i].name];
      }
      if (random < 0) {
        if(layer.layerVariations != undefined) {
          return randNum.push(
            `${layer.elements[i].id}:${layer.elements[i].name}& ${_variant}`
          );
        } else {
          return randNum.push(
            `${layer.elements[i].id}:${layer.elements[i].filename}${
              layer.bypassDNA ? "?bypassDNA=true" : ""
            }`
          );
        }
      }
    }
  });
  return randNum.join(DNA_DELIMITER);
};

const createDna = (_layers, _variant) => {
  let randNum = [];
  _layers.forEach((layer) => {
    var totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < layer.elements.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= layer.elements[i].weight;
      if (random < 0) {
        if(layer.layerVariations != undefined) {
          return randNum.push(
            `${layer.elements[i].id}:${layer.elements[i].name}& ${_variant}`
          );
        } else {
          return randNum.push(
            `${layer.elements[i].id}:${layer.elements[i].filename}${
              layer.bypassDNA ? "?bypassDNA=true" : ""
            }`
          );
        }
      }
    }
  });
  return randNum.join(DNA_DELIMITER);
};

const writeMetaData = (filename, _data) => fs.writeFileSync(`${buildDir}/json/${filename}.json`, JSON.stringify(_data, null, 2))

const sortedMetadata = () => {
  let files = fs.readdirSync(`${buildDir}/json`);
  let filenames  = [];
  let allMetadata = [];
  files.forEach(file => {
    const str = file
    const filename = Number(str.split('.').slice(0, -1).join('.'));
    return filenames.push(filename);
  })

  filenames.sort(function(a, b) {
    return a - b;
  });

  for (let i = 0; i < filenames.length; i++) {
    if (!isNaN(filenames[i])) {
      let rawFile = fs.readFileSync(`${basePath}/build/json/${filenames[i]}.json`);
      let data = JSON.parse(rawFile);
      writeMetaData(data.id, data)
      allMetadata.push(data);
    } 
  }

  writeMetaData(singleJsonName, allMetadata)
  console.log(`Ordered all items numerically in ${singleJsonName}.json. Saved in ${basePath}/build/json`);
}

const saveMetaDataSingleFile = (_editionCount) => {
  let metadata = metadataList.find((meta) => meta.id == _editionCount);
  debugLogs ? console.log(`Writing metadata for ${_editionCount}: ${JSON.stringify(metadata)}`) : null;
  writeMetaData(_editionCount, metadata)
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const traitCount = (_layers) => {
  let count = new Object();
  _layers.forEach((layer) => layer.elements.forEach((element) => count[element.name] = element.weight));
  return count;
};

const allLayersOrders = () => {
  let layerList = [];

  for (let i = 0; i < layerConfigurations.length; i++) {
    const layers = layersSetup(layerConfigurations[i].layersOrder);
    layers.forEach((layer) => layerList.push(layer))
  }

  return layerList;
}

const allLayerSizes = () => {
  let layerList = new Object();

  for (let i = 0; i < layerConfigurations.length; i++) {
    const layers = layersSetup(layerConfigurations[i].layersOrder)
    layers.forEach((layer) => layerList[layer.name] = layerConfigurations[i].growEditionSizeTo)
  }

  return layerList;
}

const createVariation = (_variations) => {
  let setVariant = [];
  _variations.forEach((variant) => {
    var totalWeight = 0;
    variant.Weight.forEach((Weight) => {
      totalWeight += Weight;
    });
    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < variant.Weight.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= variant.Weight[i];
      if (random < 0) {
        return setVariant.push(
          `${variant.name}:${variant.variations[i]}`
        );
      }
    }
  });
  return setVariant.join(DNA_DELIMITER);
};

const startCreating = async () => {
  if (exactWeight) {
    let allLayers = allLayersOrders();
    allTraitsCount = traitCount(allLayers);
  }

  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  let abstractedIndexes = [];

  for (
    let i = network == NETWORK.sol ? 0 : 1;
    i <= layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
    i++
  ) {
    abstractedIndexes.push(i);
  }

  if (shuffleLayerConfigurations) abstractedIndexes = shuffle(abstractedIndexes)
  debugLogs ? console.log("Editions left to create: ", abstractedIndexes) : null

  while (layerConfigIndex < layerConfigurations.length) {

    while (editionCount <= layerConfigurations[layerConfigIndex].growEditionSizeTo) {
      const layers = layersSetup(layerConfigurations[layerConfigIndex].layersOrder)

      let currentEdition = editionCount - 1;
      let remainingInLayersOrder = layerConfigurations[layerConfigIndex].growEditionSizeTo - currentEdition;
      
      if (exactWeight && namedWeight) throw new Error(`namedWeight and exactWeight can't be used together. Please mark one or both as false in config.js`)

      let newVariant = createVariation(layerVariations);
      let variant = newVariant.split(':').pop();
      let variantName = newVariant.split(':')[0];

      let newDna = (exactWeight) ? createDnaExact(layers, remainingInLayersOrder, currentEdition, variant) : (namedWeight) ? createDnaNames(layers, variant) : createDna(layers, variant);
      let duplicatesAllowed = (allowDuplicates) ? true : isDnaUnique(dnaList, newDna);

      // if (isDnaUnique(dnaList, newDna)) {
      if (duplicatesAllowed) {
        let results = constructLayerToDna(newDna, layers, layerConfigIndex);
        if (exactWeight) results.forEach((layer) => allTraitsCount[layer.selectedElement.name]--)

        let loadedElements = [];

        results.forEach((layer) => {
          loadedElements.push(loadLayerImg(layer));
          if (layer.required) loadedElements.push(loadLayerImg(layer.required))
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          debugLogs ? console.log("Clearing canvas") : null;
          ctx.clearRect(0, 0, format.width, format.height);
          if (gif.export) {
            hashlipsGiffer = new HashlipsGiffer(canvas, ctx, `${buildDir}/gifs/${abstractedIndexes[0]}.gif`, gif.repeat, gif.quality, gif.delay)
            hashlipsGiffer.start()
          }

          if (background.generate) drawBackground()
          let variantMetadata = false

          renderObjectArray.forEach((renderObject, index) => {
            Object.keys(renderObject.layer).forEach(key => {
              if (renderObject.layer.layerVariations !== undefined) variantMetadata = true
            })
            
            drawElement(renderObject, index, layerConfigurations[layerConfigIndex].layersOrder.length)
            if (gif.export) hashlipsGiffer.add()
          });

          extraAttributes.forEach((attr) => attributesList.push(attr))
          if (variantMetadata) attributesList.push({ trait_type: variantName, value: variant })

          if (enableStats) {
            addStats()
            statList.forEach((stat) => attributesList.push(stat))
            statList = []
          }

          if (gif.export) hashlipsGiffer.stop()
          debugLogs ? console.log("Editions left to create: ", abstractedIndexes) : null
          saveImage(abstractedIndexes[0] + resumeNum)
          addMetadata(newDna, abstractedIndexes[0] + resumeNum)
          saveMetaDataSingleFile(abstractedIndexes[0] + resumeNum)
          console.log(`Created edition: ${abstractedIndexes[0]+resumeNum}, with DNA: ${sha1(newDna)}`)
        });
        dnaList.add(filterDNAOptions(newDna));
        editionCount++;
        abstractedIndexes.shift();
      } else {
        console.log("DNA exists!");
        failedCount++;
        if (failedCount >= uniqueDnaTorrance) {
          console.log(
            `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
          );
          process.exit();
        }
      }
    }
    layerConfigIndex++;
  }
  
  sortedMetadata();
};

module.exports = { startCreating, buildSetup, getElements };