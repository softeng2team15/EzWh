"use strict";

const { positionDAL } = require("../DAL/position.dal");
const { testDescriptorDAL } = require("../DAL/testDescriptor.dal");

const baseApi = require("./_baseApiFunctions").baseApi;
const skuBAL = require("../BAL/Sku.bal").skuBAL;
const skuDAL = require("../DAL/sku.dal").skuDAL;

function skuApi(app) {
  const baseURL1 = "/api/skus/";
  const baseURL2 = "/api/sku/";
  const api = new baseApi(app);
  const tdDal = new testDescriptorDAL();
  const pDal = new positionDAL();
  const dal = new skuDAL();
  const bal = new skuBAL(dal, tdDal, pDal);
  this.init = async () => {
    //await  dal._crateTable();
     dal._crateTable();

    this.getAll();
    this.getById();
    this.save();
    this.update();
    this.updatePosition();
    this.delete();
  };

  this.getAll = () => {
    api.get(baseURL1, async () => {
      return await bal.getAll();
    });
  };

  this.getById = () => {
    api.get(baseURL1 + ":id", async (params) => {
      return await bal.getById(parseInt(params.id, 10));
    });
  };

  this.save = () => {
    api.post(baseURL2, async (sku) => {
      return await bal.save(sku);
    });
  };

  this.update = () => {
    api.put(baseURL2 + ":id", async (params, data) => {
      return await bal.update(parseInt(params.id, 10), data);
    });
  };

  this.updatePosition = () => {
    api.put(baseURL2 + ":id/position", async (params, data) => {
      return await bal.updatePosition(parseInt(params.id, 10), data);
    });
  };

  this.delete = () => {
    api.delete(baseURL1 + ":id", async (params, data) => {
      return await bal.delete(parseInt(params.id,10));
    });
  };
}

exports.skuApi = skuApi;
