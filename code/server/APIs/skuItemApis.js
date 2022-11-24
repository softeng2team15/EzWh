"use strict";
const baseApi = require("./_baseApiFunctions").baseApi;
const skuItemBAL = require("../BAL/skuItem.bal").skuItemBAL;
const { skuItemDAL } = require("../DAL/skuItem.dal");
const { skuDAL } = require("../DAL/sku.dal");

function skuItemApi(app) {
  const baseURL1 = "/api/skuItems/";
  const baseURL2 = "/api/skuItem/";
  const siDal = new skuItemDAL();
  const sDal = new skuDAL();
  const api = new baseApi(app);
  const bal = new skuItemBAL(siDal, sDal);
  this.init = async () => {
    // await siDal._crateTable();
    // await sDal._crateTable();
     siDal._crateTable();
     sDal._crateTable();

    this.getAll();
    this.getById();
    this.getByRfid();
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
    api.get(baseURL1 + "sku/:id", async (params) => {
      return await bal.getById(params.id);
    });
  };

  this.getByRfid = () => {
    api.get(baseURL1 + ":rfid", async (params) => {
      return await bal.getByRfid(params.rfid);
    });
  };

  this.save = () => {
    api.post(baseURL2, async (skuItem) => {
      return await bal.save(skuItem);
    });
  };

  this.update = () => {
    api.put(baseURL1 + ":rfid", async (params, data) => {
      return await bal.update(params.rfid, data);
    });
  };

  this.delete = () => {
    api.delete(baseURL1 + ":rfid", async (params) => {
      return await bal.delete(params.rfid);
    });
  };
}

exports.skuItemApi = skuItemApi;
