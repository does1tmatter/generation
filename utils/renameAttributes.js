'use strict';

const path = require('path');
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require('fs');
const chalk = require('chalk')

//Enter old values here
let valueBefore = [
  "3",
  "Layer",
  "Gola",
  "Dope Soda",
  "Lion Slippers",
  "E Cig"
]

//Enter new values here
let valueAfter = [
  ":3",
  ":|",
  "Gõla",
  "Dope",
  "Lion",
  "E-Cig"
]
let traitTypeBefore = [] //Enter old trait_types here
let traitTypeAfter = [] //Enter new trait_trypes here

const main = () => {
  if (fs.existsSync(`${basePath}/build/json/_metadata.json`)) {
      // Read json data
    let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
    let data = JSON.parse(rawdata);

    // Create new directory if it doesn't already exist
    const dir = `${basePath}/build/json`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    if (valueBefore.length !== valueAfter.length) {
      console.log(chalk.bold.red(`Arrays must have the same number of items! valueBefore count (${valueBefore.length}) must match valueAfter count (${valueAfter.length})`))
      return
    }

    if (traitTypeBefore.length !== traitTypeAfter.length) {
      console.log(chalk.bold.red(`Arrays must have the same number of items! traitTypeBefore count (${traitTypeBefore.length}) must match traitTypeAfter count (${traitTypeAfter.length})`))
      return
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
  }
}

exports.default = main
main()