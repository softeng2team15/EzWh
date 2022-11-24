"use strict";
const baseApi = require("./_baseApiFunctions").baseApi;
const apiResponseModel =
    require("../Models/apiResponse.model").apiResponseModel;
const internalOrderBAL = require("../BAL/internalOrder.bal").internalOrderBAL;
const internalOrderDAL = require("../DAL/internalOrder.dal").internalOrderDAL;

function internalOrderApi(app) {
    const baseURL1 = "/api/internalOrders/";
    const baseURL2 = "/api/internalOrders";
    const api = new baseApi(app);
    const dal = new internalOrderDAL();
    const bal = new internalOrderBAL(dal);
    this.init = async () => {
         dal._createTable();
        this.getAll();
        this.getAllIssued();
        this.getAllAccepted();
        this.getById();
        this.save();
        this.update();
        this.delete();
    };

    this.getAll = () => {
        api.get(baseURL2, async () => {
            return await bal.getAll();
        });
    };

    this.getAllIssued = () => {
        api.get(baseURL2 + "Issued", async () => {
            return await bal.getAllIssued();
        });
    };

    this.getAllAccepted = () => {
        api.get(baseURL2 + "Accepted", async () => {
            return await bal.getAllAccepted();
        });
    };

    this.getById = () => {
        api.get("/api/internalOrders/:id", async (params) => {
            return await bal.getById(parseInt(params.id));
        });
    };

    this.save = () => {
        api.post(baseURL1, async (internalOrder) => {
            return await bal.add(internalOrder);
        });
    };

    this.update = () => {
        api.put(baseURL1 + ":id", async (params, data) => {
            return await bal.update(parseInt(params.id), data);
        });
    };

    this.delete = () => {
        api.delete(baseURL1 + ":id", async (params, data) => {
            return await bal.delete(parseInt(params.id));
        });
    };
}

exports.internalOrderApi = internalOrderApi;
