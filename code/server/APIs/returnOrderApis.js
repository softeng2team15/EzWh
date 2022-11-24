"use strict";
const baseApi = require("./_baseApiFunctions").baseApi;
const apiResponseModel =
    require("../Models/apiResponse.model").apiResponseModel;
const returnOrderBAL = require("../BAL/returnOrder.bal").returnOrderBAL;
const restockOrderDAL = require("../DAL/restockOrder.dal").restockOrderDAL;
const returnOrderDAL = require("../DAL/returnOrder.dal").returnOrderDAL;

function returnOrderApi(app) {
    const baseURL1 = "/api/returnOrders/";
    const baseURL2 = "/api/returnOrder/";
    const api = new baseApi(app);
    const rsDal = new restockOrderDAL();
    const rtDal = new returnOrderDAL();
    const bal = new returnOrderBAL(rsDal, rtDal);
    
    this.init = async () => {
         rsDal._createTable();
         rtDal._createTable();

        this.getAll();
        this.getById();
        this.add();
        this.delete();
    };

    this.getAll = () => {
        api.get(baseURL1, async() => {
            return await bal.getAll();
        });
    };

    this.getById = () => {
        api.get(baseURL1 + ":id", async(params) => {
            return await bal.getById(parseInt(params.id),10);
        });
    };

    this.add = () => {
        api.post(baseURL2, async(returnOrder) => {
            return await bal.add(returnOrder);
        });
    };

    this.delete = () => {
        api.delete(baseURL2 + ":id", async(params, data) => {
            return await bal.delete(parseInt(params.id),10);
        });
    };
}

exports.returnOrderApi = returnOrderApi;
