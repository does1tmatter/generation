'use strict';

const path = require('path');
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require('fs');

let removeValue = ["None"] //Enter values you want to remove here. (ie: "None")
let removeTraitType = [] //Enter a Traits you want to remove here. (ie: "Head")

const main = () => {
  if (fs.existsSync(`${basePath}/build/json/_metadata.json`)) {
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

    data.forEach((item) => {
      removeValue.forEach((traitValue) => {
        let newValue = item.attributes.filter(obj=> obj.value !== traitValue);
        item.attributes = newValue;
      })
      removeTraitType.forEach((traitType) => {
        let newValue = item.attributes.filter(obj=> obj.trait_type !== traitType);
        item.attributes = newValue;
      })
      fs.writeFileSync(`${basePath}/build/json/${item.id}.json`, JSON.stringify(item, null, 2));
    });

    fs.writeFileSync(`${basePath}/build/json/_metadata.json`, JSON.stringify(data, null, 2));
  }
}

exports.default = main
main()