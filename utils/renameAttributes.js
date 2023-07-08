'use strict';

const path = require('path');
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require('fs');

let valueBefore = ["3", "Layer", "Gola"] //Enter old values here
let valueAfter = [":3", ":|", "Gõla"] //Enter new values here
let traitTypeBefore = [] //Enter old trait_types here
let traitTypeAfter = [] //Enter new trait_trypes here

// Read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

// Create new directory if it doesn't already exist
const dir = `${basePath}/build/json`;
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, {
		recursive: true
	});
}

if (valueBefore.length !== valueAfter.length) {
  throw new Error(`Arrays must have the same number of items! valueBefore count (${valueBefore.length}) must match valueAfter count (${valueAfter.length})`)
}

if (traitTypeBefore.length !== traitTypeAfter.length) {
  throw new Error(`Arrays must have the same number of items! traitTypeBefore count (${traitTypeBefore.length}) must match traitTypeAfter count (${traitTypeAfter.length})`)
}

data.forEach((item) => {
  let attributes = item.attributes;
  attributes.forEach((attribute) => {
    // Update values
    for (let i = 0; i < valueBefore.length; i++) {
      if (attribute.value === valueBefore[i]) {
        let updatedValue = attribute.value.replace(valueBefore[i], valueAfter[i]);
        attribute.value = updatedValue;
      }
    }
    // Update trait_types
    for (let i = 0; i < traitTypeBefore.length; i++) {
      if (attribute.trait_type === traitTypeBefore[i]) {
        let updatedTraitType = attribute.trait_type.replace(traitTypeBefore[i], traitTypeAfter[i]);
        attribute.trait_type = updatedTraitType;
      }
    }
  });

  fs.writeFileSync(`${basePath}/build/json/${item.id}.json`, JSON.stringify(item, null, 2));
});

fs.writeFileSync(`${basePath}/build/json/_metadata.json`, JSON.stringify(data, null, 2));

console.log('Updated attributes that cannot be typed in file system (`:3`, `:|`, `Gõla`)')

// for (let i = 0; i < valueBefore.length; i++) {
//   console.log(`Updated ${valueBefore[i]} to ${valueAfter[i]}`);
// }
// for (let i = 0; i < traitTypeBefore.length; i++) {
//   console.log(`Updated ${traitTypeBefore[i]} to ${traitTypeAfter[i]}`);
// }