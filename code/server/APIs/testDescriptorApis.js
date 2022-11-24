"use strict";
const baseApi = require("./_baseApiFunctions").baseApi;
const testDescriptorBAL = require("../BAL/testDescriptor.bal").testDescriptorBAL;
const { testDescriptorDAL } = require("../DAL/testDescriptor.dal");
const { skuDAL } = require("../DAL/sku.dal");

function testDescriptorApi(app) {
  const baseURL1 = "/api/testDescriptors/";
  const baseURL2 = "/api/testDescriptor/";
  const api = new baseApi(app);
  const tdDal = new testDescriptorDAL();
  const sDal = new skuDAL();
  const bal = new testDescriptorBAL(tdDal, sDal);
  this.init = async () => {
    // await tdDal._crateTable();
    // await sDal._crateTable();
     tdDal._crateTable();
     sDal._crateTable();

    this.getAll();
    this.getById();
    this.save();
    this.update();
    this.delete();
  };

  this.getAll = () => {
    api.get(baseURL1, async () => {
      return await bal.getAll();
    });
  };

  this.getById = () => {
    api.get(baseURL1 + ":id", async (params) => {
      return await bal.getById(parseInt(params.id,10));
    });
  };

  this.save = () => {
    api.post(baseURL2, async (testDescriptor) => {
      return await bal.save(testDescriptor);
    });
  };

  this.update = () => {
    api.put(baseURL2 + ":id", async (params, data) => {
      return await bal.update(parseInt(params.id,10), data);
    });
  };

  this.delete = () => {
    api.delete(baseURL2 + ":id", async (params) => {
      return await bal.delete(parseInt(params.id,10));
    });
  };
}

exports.testDescriptorApi = testDescriptorApi;
