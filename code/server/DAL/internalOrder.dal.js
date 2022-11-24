const DatabaseManagement =
    require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
    require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;

const { table } = require("console");
var path = require("path");

function internalOrderDAL() {
    const tableName = "internalOrder";

    this._createTable = async () => {
        let db = new DatabaseManagement();
        return await db
            .createTable(tableName, [
                new creationTableFields("id", "integer", false, true, true, true),
                new creationTableFields("issueDate", "text"),
                new creationTableFields("state", "text"),
                new creationTableFields("customerId", "integer")
                /*products?*/
            ])
            .then(async (val) => {
                await db.createTable("internalOrderProducts", [
                    new creationTableFields("id", "integer", false, true, true, true),
                    new creationTableFields("internalOrderId", "integer"),
                    new creationTableFields("skuId", "integer"),
                    new creationTableFields("description", "text"),
                    new creationTableFields("price", "float"),
                    new creationTableFields("qty", "integer"),
                    new creationTableFields("rfid", "text")
                ]);
            });
    }

    this.getAll = async () => {
        let db = new DatabaseManagement();



        const internalOrders = await db.getAllData(tableName);

        if (!internalOrders) return null;

        for (const element of internalOrders) {

            const products = await db.getAllData(
                "internalOrderProducts",
                `internalOrderId = "${element.id}"`
            );
            let listProd = [];
            if(element.state === "COMPLETED"){
                for (prod of products){
                    listProd.push({"SKUId" : prod.skuId, "description" : prod.description, "price" : prod.price, "RFID" : prod.rfid});
                }
            } else for (prod of products){
                listProd.push({"SKUId" : prod.skuId, "description" : prod.description, "price" : prod.price, "qty" : prod.qty});
            }
            element.products = listProd;
        }

        return internalOrders;
    }

    this.getAllIssued = async () => {
        let db = new DatabaseManagement();



        const issuedInternalOrders = await db.getAllData(tableName, 'state = "ISSUED"');

        for (const element of issuedInternalOrders) {
            const products = await db.getAllData(
                "internalOrderProducts",
                `internalOrderId = ${element.id}`
            );
            let listProd = [];
            for (prod of products){
                listProd.push({"SKUId" : prod.skuId, "description" : prod.description, "price" : prod.price, "qty" : prod.qty});
            }
            element.products = listProd;
        }

        return issuedInternalOrders;
    }

    this.getAllAccepted = async () => {
        let db = new DatabaseManagement();



        const acceptedInternalOrders = await db.getAllData(tableName, 'state = "ACCEPTED"');

        for (const element of acceptedInternalOrders) {
            const products = await db.getAllData(
                "internalOrderProducts",
                `internalOrderId = ${element.id}`
            );
            let listProd = [];
            for (prod of products){
                listProd.push({"SKUId" : prod.skuId, "description" : prod.description, "price" : prod.price, "qty" : prod.qty});
            }
            element.products = listProd;
        }

        return acceptedInternalOrders;
    }

    this.getById = async (id) => {
        let db = new DatabaseManagement();

        const internalOrder = (await db.getAllData(tableName, `id = ${id}`))[0];

        if(internalOrder){
            const products = await db.getAllData("internalOrderProducts", `internalOrderId = ${id}`);
            let listProd = [];
            if(internalOrder.state === "COMPLETED"){
                for (prod of products){
                    listProd.push({"SKUId" : prod.skuId, "description" : prod.description, "price" : prod.price, "RFID" : prod.rfid});
                }
            } else for (prod of products){
                listProd.push({"SKUId" : prod.skuId, "description" : prod.description, "price" : prod.price, "qty" : prod.qty});
            }
            internalOrder.products = listProd;
        }
            
        return internalOrder;
    }

    this.add = async (internalOrder) => {
        let db = new DatabaseManagement();



        const id = await db.insertData(tableName, [
            new insertFields("issueDate", internalOrder.issueDate),
            new insertFields("state", "ISSUED"),
            new insertFields("customerId", internalOrder.customerId)
        ])

        /*check internal order insertion error*/

        for( const product of internalOrder.products){
              const res = await db.insertData("internalOrderProducts", [
                new insertFields("internalOrderId", id),
                new insertFields("skuId", product.SKUId),
                new insertFields("description", product.description),
                new insertFields("price", product.price),
                new insertFields("qty", product.qty)
            ])
        }

        return id;
    }

    this.update = async (id, newInternalOrder) => {
        const db = new DatabaseManagement();
        const res = await db.updateData(tableName, [new insertFields("state", newInternalOrder.newState)], `id = ${id}`);
        if (newInternalOrder.newState === "COMPLETED") {
            for (prod of newInternalOrder.products){
                await db.updateData("internalOrderProducts", [new insertFields("rfid", prod.RFID)], `skuId = ${prod.SkuID} AND internalOrderId = ${id}`)
            }
        }
        return res;
    }

    this.remove = async (id) => {
        let db = new DatabaseManagement();

        const result = await db.delete(tableName, id);
        const productsToDelete = await db.getAllData("internalOrderProducts", `internalOrderId = ${id}`);

        for(const p of productsToDelete){
            await db.delete("internalOrderProducts", p.id);
        }

        return result;
    }
}

exports.internalOrderDAL = internalOrderDAL;