const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const chalk = require('chalk')
const fs = require("fs");

const {
  baseUri,
  description,
  namePrefix,
  network,
  solanaMetadata,
} = require(`${basePath}/src/config.js`);

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  if (network == NETWORK.sol) {
    item.name = `${namePrefix} #${item.id}`;
    item.description = description;
    item.creators = solanaMetadata.creators;
  } else {
    item.name = `${namePrefix} #${item.id}`;
    item.description = description;
    item.image = `${baseUri}/${item.id}.png`;
  }
  fs.writeFileSync(
    `${basePath}/build/json/${item.id}.json`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(`${basePath}/build/json/_metadata.json`, JSON.stringify(data, null, 2));

if (network == NETWORK.sol) {
  console.log(chalk.bold(`Updated description for images to ==> ${chalk.green(description)}`))
  console.log(chalk.bold(`Updated name prefix for images to ==> ${chalk.green(namePrefix)}`))
  console.log(chalk.bold(`Updated creators for images to ==> ${chalk.green(solanaMetadata.creators)}`))
} else {
  console.log(chalk.bold(`Updated baseUri for images to       ->   ${chalk.green(baseUri)}`))
  console.log(chalk.bold(`Updated description for images to   ->   ${chalk.green(description)}`))
  console.log(chalk.bold(`Updated name prefix for images to   ->   ${chalk.green(namePrefix)}`))
}
