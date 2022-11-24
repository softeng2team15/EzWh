const DatabaseManagement =
    require("./_baseDalFunctionalities").DatabaseManagement;
const creationTableFields =
    require("../Models/creationTableFields.model").creationTableFields;
const insertFields = require("../Models/insertFields.model").insertFields;

var path = require("path");

function returnOrderDAL() {
    const tableName = "returnOrder";

    this._createTable = async () => {
        let db = new DatabaseManagement();
        return await db
            .createTable(tableName, [
                new creationTableFields("id", "integer", false, true, true, true),
                new creationTableFields("returnDate", "text"),
                new creationTableFields("restockOrderId", "integer")
                /*products?*/
            ])
            .then(async (val) => {
                await db.createTable("returnOrderProducts", [
                    new creationTableFields("id", "integer", false, true, true, true),
                    new creationTableFields("returnOrderId", "integer"),
                    new creationTableFields("skuId", "integer"),
                    new creationTableFields("itemId", "integer"),
                    new creationTableFields("description", "text"),
                    new creationTableFields("price", "float"),
                    new creationTableFields("rfid", "text")
                ]);
            });
    }

    this.getAll = async () => {
        let db = new DatabaseManagement();

        let returnOrders = await db.getAllData(tableName);
        //returnOrders.products =[];
        if (!returnOrders) return null;

        for (const element of returnOrders) {
            const products = await db.getAllData(
                "returnOrderProducts",
                `returnOrderId = ${element.id}`
            );
            //element.products = products.map((x) => )
            let listProd = [];
            for (prod of products) {
                listProd.push({ "SKUId": prod.skuId, "itemId": prod.itemId, "description": prod.description, "price": prod.price, "RFID": prod.rfid });
            }
            element.products = listProd;
        }

        return returnOrders;
    }

    this.getById = async (id) => {
        let db = new DatabaseManagement();


        const returnOrder = await db.getAllData(tableName, `id = ${id}`);
        if (returnOrder[0]) {
            const products = await db.getAllData("returnOrderProducts", `returnOrderId = ${id}`);
            let listProd = [];
            for (prod of products) {
                listProd.push({ "RFID": prod.rfid, "SKUId": prod.skuId, "itemId": prod.itemId, "description": prod.description, "price": prod.price });
            }
            returnOrder[0].products = listProd;
        }
        return returnOrder[0];
    }

    this.add = async (returnOrder) => {
        let db = new DatabaseManagement();



        const id = await db.insertData(tableName, [
            new insertFields("returnDate", returnOrder.returnDate),
            new insertFields("restockOrderId", returnOrder.restockOrderId)
        ])

        /*check return order insertion error*/

        for (const product of returnOrder.products) {
            const res = await db.insertData("returnOrderProducts", [
                new insertFields("returnOrderId", id),
                new insertFields("skuId", product.SKUId),
                new insertFields("itemId", product.itemId),
                new insertFields("description", product.description),
                new insertFields("price", product.price),
                new insertFields("RFID", product.RFID)
            ])
        }

        return id;
    }

    this.delete = async (id) => {
        let db = new DatabaseManagement();



        const result = await db.delete(tableName, id);
        const productsToDelete = await db.getAllData("returnOrderProducts", `returnOrderId = ${id}`);
        for (const p of productsToDelete) {
            await db.delete("returnOrderProducts", p.id);
        }
    }
}

exports.returnOrderDAL = returnOrderDAL;
