const fs = require('fs');
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const dir = `${basePath}/build/json`;

const traitToFind = 'Lion'

const tokens = []
const files = fs.readdirSync(dir)
files.forEach(file => {
  const json = JSON.parse(fs.readFileSync(`${dir}/${file}`))

  json.attributes?.forEach(attr => {
    if (attr.value === traitToFind) tokens.push(file.split('.').shift())
  })
})

if (tokens.length) {
  console.log(JSON.stringify(tokens, null, 2))
} else {
  console.log(`No tokens with trait ${traitToFind} found`)
}