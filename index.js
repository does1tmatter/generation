const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

(async () => {
  try {
    await buildSetup();
    await startCreating();
  } catch (error) {
    console.log(Date.now(), error)
  }
})();