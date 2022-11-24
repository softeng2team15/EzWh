"use strict";
const baseApi = require("./_baseApiFunctions").baseApi;
const apiResponseModel =
  require("../Models/apiResponse.model").apiResponseModel;
const testResultBAL = require("../BAL/testResult.bal").testResultBAL;
const { skuDAL } = require("../DAL/sku.dal");
const { skuItemDAL } = require("../DAL/skuItem.dal");
const { testDescriptorDAL } = require("../DAL/testDescriptor.dal");
const { testResultDAL } = require("../DAL/testResult.dal");

function testResultApi(app) {
  const api = new baseApi(app);
  const dal = new testResultDAL();
  const siDal = new skuItemDAL();
  const sDal = new skuDAL();
  const tdDal = new testDescriptorDAL();
  const bal = new testResultBAL(dal, siDal, sDal, tdDal);
  this.init = async () => {
    //await  dal._crateTable();
     dal._crateTable();

    this.getAllByRfid();
    this.getByRfid();
    this.add();
    this.update();
    this.delete();
  };

  this.getAllByRfid = () => {
    api.get("/api/skuitems/:rfid/testResults", async (params) => {
      return await bal.getAllByRfid(params.rfid);
    });
  };

  this.getByRfid = () => {
    api.get("/api/skuitems/:rfid/testResults/:id", async (params) => {
      return await bal.getByRfid(params.rfid, parseInt(params.id,10));
    });
  };

  this.add = () => {
    api.post("/api/skuitems/testResult", async (testResult) => {
      return await bal.add(testResult);
    });
  };

  this.update = () => {
    api.put("/api/skuitems/:rfid/testResult/:id", async (params, data) => {
      return await bal.update(params.rfid, parseInt(params.id, 10), data);
    });
  };

  this.delete = () => {
    api.delete("/api/skuitems/:rfid/testResult/:id", async (params, data) => {
      return await bal.delete(params.rfid, parseInt(params.id, 10));
    });
  };
}

exports.testResultApi = testResultApi;
