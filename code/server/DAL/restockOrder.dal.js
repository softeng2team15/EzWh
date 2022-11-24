const DatabaseManagement =
    require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
    require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;

const { expect } = require("chai");
var path = require("path");

function restockOrderDAL() {
    const tableName = "restockOrder";

    /* "id":1,
            "issueDate":"2021/11/29 09:33",
            "state": "DELIVERED",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":20},...],
            "supplierId" : 1,
            "transportNote":{"deliveryDate":"2021/12/29"},
            "skuItems" : [{"SKUId":12,"rfid":"12345678901234567890123456789016"},{"SKUId":12,"rfid":"12345678901234567890123456789017"},...]
        
*/

    this._createTable = async () => {
        let db = new DatabaseManagement();
        return await db
            .createTable(tableName, [
                new creationTableFields("id", "integer", false, true, true, true),
                new creationTableFields("issueDate", "text"),
                new creationTableFields("state", "text"),
                new creationTableFields("supplierId", "integer")
            ])
            .then(async () => {
                await db.createTable("restockOrderProducts", [
                    new creationTableFields("id", "integer", false, true, true, true),
                    new creationTableFields("restockOrderId", "integer"),
                    new creationTableFields("SKUId", "integer"),
                    new creationTableFields("itemId", "integer"),
                    new creationTableFields("description", "text"),
                    new creationTableFields("price", "float"),
                    new creationTableFields("qty", "integer")
                ]);
            })
            .then(async () => {
                await db.createTable("restockOrderTransportNotes", [
                    new creationTableFields("id", "integer", false, true, true, true),
                    new creationTableFields("restockOrderId", "integer"),
                    new creationTableFields("deliveryDate", "text")
                ]);
            })
            .then(async () => {
                await db.createTable("restockOrderSkuItems", [
                    new creationTableFields("id", "integer", false, true, true, true),
                    new creationTableFields("restockOrderId", "integer"),
                    new creationTableFields("SKUId", "integer"),
                    new creationTableFields("itemId", "integer"),
                    new creationTableFields("rfid", "text")
                ]);
            })/*
            .then(async () => {
                await db.createTable("restockOrderReturnedSkuItems", [
                    new creationTableFields("id", "integer", false, true, true, true),
                    new creationTableFields("restockOrderId", "integer"),
                    new creationTableFields("SKUId", "integer"),
                    new creationTableFields("rfid", "text")
                ]);
            })*/;
    }

    //get all the restock orders
    this.getAll = async () => {
        let db = new DatabaseManagement();

        let restockOrders = await db.getAllData(tableName);
        if (!restockOrders) {
            return null;
        }

        for (const element of restockOrders) {
            const products = await db.getAllData(
                "restockOrderProducts",
                `restockOrderId = ${element.id}`
            );
            let listProd = [];
            /*add itemId in the db */
            for (prod of products) {
                listProd.push({ "SKUId": prod.SKUId, "itemId": prod.itemId, "description": prod.description, "price": prod.price, "qty": prod.qty });
            }
            element.products = listProd;

            const notes = await db.getAllData(
                "restockOrderTransportNotes",
                `restockOrderId = ${element.id}`
            );
            if (notes.length > 0) {
                element.transportNote = { "deliveryDate": notes.deliveryDate };
            }
            /*add itemId in the db */
            const skuItems = await db.getAllData(
                "restockOrderSkuItems",
                `restockOrderId = ${element.id}`
            );
            element.skuItems = skuItems;
        }
        return restockOrders;
    }

    //get all the restock orders which have state = ISSUED
    this.getAllIssued = async () => {
        let db = new DatabaseManagement();



        const restockOrders = await db.getAllData(tableName, 'state = "ISSUED"');

        if (!restockOrders) return null;

        for (const element of restockOrders) {
            const products = await db.getAllData(
                "restockOrderProducts",
                `restockOrderId = ${element.id}`
            );
            let listProd = [];
            for (prod of products) {
                listProd.push({ "SKUId": prod.SKUId, "itemId": prod.itemId, "description": prod.description, "price": prod.price, "qty": prod.qty });
            }
            element.products = listProd;

            const notes = await db.getAllData(
                "restockOrderTransportNotes",
                `restockOrderId = ${element.id}`
            );
            if (notes.length > 0) {
                element.transportNote = { "deliveryDate": notes.deliveryDate };
            }

            const skuItems = await db.getAllData(
                "restockOrderSkuItems",
                `restockOrderId = ${element.id}`
            );
            element.skuItems = skuItems;
        }

        return restockOrders;
    }

    this.getById = async (id) => {
        let db = new DatabaseManagement();
        const restockOrdersArray = await db.getAllData(tableName, `id = ${id}`);
        if (restockOrdersArray.length <= 0) return null;
        let restockOrder = restockOrdersArray[0];
        const products = await db.getAllData("restockOrderProducts", `restockOrderId = ${id}`);
        let listProd = [];
        for (prod of products) {
            listProd.push({ "SKUId": prod.SKUId, "itemId": prod.itemId, "description": prod.description, "price": prod.price, "qty": prod.qty });
        }
        restockOrder.products = listProd;
        const notes = await db.getAllData("restockOrderTransportNotes", `restockOrderId = ${id}`);
        if (notes.length > 0) {
            restockOrder.transportNote = { "deliveryDate": notes[0].deliveryDate };
        }
        const skuItems = await db.getAllData("restockOrderSkuItems", `restockOrderId = ${id}`);
        restockOrder.skuItems = skuItems.map((s) => { return { "SKUId": s.SKUId, "itemId": s.itemId, "rfid": s.rfid }; });

        return restockOrder;
    }

    this.getReturned = async (id) => {

        /* Save all SKUIds of all the SKUItems from restockOrderSkuItemsDB*/
        /* Search for all the rows with SKUId equal in testResultDB */
        /* If no one of its SKUItem's has result true then add the SSKUItem to outputList */


        let db = new DatabaseManagement();
        const SKUItems = await db.getAllData("restockOrderSkuItems", `restockOrderId=${id}`);
        let rfl = [], tList = [], flag = false;
        for (SItem of SKUItems) {
            let { SKUId, itemId, rfid } = SItem;
            tList.push(await db.getAllData("testResult", `rfid="${rfid}"`));
            if (Array.isArray(tList)) {
                for (singleTest of tList) {
                    flag |= singleTest.Result;
                }
            } else flag |= tList.Result;
            if (flag == false) rfl.push({ "SKUId": SKUId, "itemId": itemId, "rfid": rfid });
            flag = false;
        }

        return rfl;
    }

    this.add = async (newRestockOrder) => {
        let db = new DatabaseManagement();

        const id = await db.insertData(tableName, [
            new insertFields("issueDate", newRestockOrder.issueDate),
            new insertFields("state", "ISSUED"),
            new insertFields("supplierId", newRestockOrder.supplierId)
        ])

        for (const product of newRestockOrder.products) {
            const res = await db.insertData("restockOrderProducts", [
                new insertFields("restockOrderId", id),
                new insertFields("SKUId", product.SKUId),
                new insertFields("itemId", product.itemId),
                new insertFields("description", product.description),
                new insertFields("price", product.price),
                new insertFields("qty", product.qty)
            ])
        }

        return id;
    }

    this.changeState = async (id, data) => {
        const db = new DatabaseManagement();
        let rows = [];
        rows.push(new insertFields("state", data.newState));
        const res = await db.updateData(tableName, rows, `id = ${id}`);
        return res;
    }

    this.addSkuItems = async (id, data) => {
        const db = new DatabaseManagement();

        for (const newSkuItem of data.skuItems) {
            const res = await db.insertData("restockOrderSkuItems", [
                new insertFields("restockOrderId", id),
                new insertFields("SKUId", newSkuItem.SKUId),
                new insertFields("itemId", newSkuItem.itemId),
                new insertFields("rfid", newSkuItem.rfid)
            ])
        }

        return id;
    }

    this.addTransportNote = async (id, data) => {
        const db = new DatabaseManagement();

        const res = await db.insertData("restockOrderTransportNotes", [
            new insertFields("restockOrderId", id),
            new insertFields("deliveryDate", data.transportNote.deliveryDate)
        ]);

        return id;
    }

    this.delete = async (id) => {
        const db = new DatabaseManagement();
        //await _createTable();

        const productsToDelete = await db.getAllData("restockOrderProducts", `restockOrderId = ${id}`);
        for (const p of productsToDelete) {
            await db.delete("restockOrderProducts", p.id);
        }

        const transportNoteToDelete = await db.getAllData("restockOrderTransportNotes", `restockOrderId = ${id}`);
        for (const tN of transportNoteToDelete) {
            await db.delete("restockOrderTransportNotes", tN.id);

        }

        const skuItemsToDelete = await db.getAllData("restockOrderSkuItems", `restockOrderId = ${id}`);
        for (const skuI of skuItemsToDelete) {
            await db.delete("restockOrderSkuItems", skuI.id);
        }
        /*
        const returnedSkuItemsToDelete = await db.getAllData("restockOrderReturnedSkuItems", `restockOrderId = ${id}`);
        for (const retSkuI of returnedSkuItemsToDelete) {
            await db.delete("restockOrderSkuItems", retSkuI.id);

        }*/

        const result = await db.delete(tableName, id);

        return result;
    }
}

exports.restockOrderDAL = restockOrderDAL;