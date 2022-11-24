"use strict";
const express = require("express");
const skuApi = require('./APIs/skuApis').skuApi;
const userApi = require('./APIs/userApis').userApi;
const internalOrderApi = require('./APIs/internalOrderApis').internalOrderApi;
const itemApi = require('./APIs/itemApis').itemApi;
const positionApi = require('./APIs/positionApis').positionApi;
const restockOrderApi = require('./APIs/restockOrderApis').restockOrderApi;
const returnOrderApi = require('./APIs/returnOrderApis').returnOrderApi;
const testDescriptorApi = require('./APIs/testDescriptorApis').testDescriptorApi;
const skuItemApi = require('./APIs/skuItemApis').skuItemApi;
const testResultApi = require('./APIs/testResultApis').testResultApi;
const app = new express();
const port = 3001;
app.use(express.json());


const init = async () => {
  // ******************* initialize the APIs *************
  await new skuApi(app).init();
  await new userApi(app).init();
  await new internalOrderApi(app).init();
  await new itemApi(app).init();
  await new positionApi(app).init();
  await new restockOrderApi(app).init();
  await new returnOrderApi(app).init();
  await new testDescriptorApi(app).init();
  await new skuItemApi(app).init();
  await new testResultApi(app).init();
  // *****************************************************
}

init().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});



module.exports = app;
