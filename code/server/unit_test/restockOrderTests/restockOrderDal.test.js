const { expect } = require('chai');
const { restockOrderDAL } = require('../../DAL/restockOrder.dal');
const dal = new restockOrderDAL();

describe('restockOrder.DAL', () => {
    let restockOrderId;
    const newRestockOrder = {
        "issueDate": "2021/11/29 09:33",
        "products": [
            { "SKUId": 12, "itemId": 10, "description": "a product", "price": 10.99, "qty": 30 },
            { "SKUId": 180, "itemId": 18, "description": "another product", "price": 11.99, "qty": 20 }
        ],
        "supplierId": 1
    }

    beforeAll(async () => {
        restockOrderId = await dal.add(newRestockOrder);
    });

    afterAll(async () => {
        await dal.delete(restockOrderId);
    });

    test('test getAll()', async () => {
        const results = await dal.getAll();
        expect(results.length).greaterThan(0);
        const result = results.find(r => r.id == restockOrderId);
        expect(result.id).equal(restockOrderId);
        expect(result.issueDate).equal(newRestockOrder.issueDate);
        expect(result.state).equal("ISSUED");
        expect(result.products[0].SKUId).equal(newRestockOrder.products[0].SKUId);
        expect(result.products[0].description).equal(newRestockOrder.products[0].description);
        expect(result.products[0].itemId).equal(newRestockOrder.products[0].itemId);
        expect(result.products[0].price).equal(newRestockOrder.products[0].price);
        expect(result.products[0].qty).equal(newRestockOrder.products[0].qty);
        expect(result.products[1].SKUId).equal(newRestockOrder.products[1].SKUId);
        expect(result.products[1].description).equal(newRestockOrder.products[1].description);
        expect(result.products[1].itemId).equal(newRestockOrder.products[1].itemId);
        expect(result.products[1].price).equal(newRestockOrder.products[1].price);
        expect(result.products[1].qty).equal(newRestockOrder.products[1].qty);
        expect(result.supplierId).equal(newRestockOrder.supplierId);
        expect(result).to.not.have.property("transportNote");
        expect(result.skuItems).to.be.an('array').that.is.empty;
    });

    test("test getAllIssued", async () => {
        const results = await dal.getAllIssued();
        expect(results.length).greaterThan(0);
        expect(results).to.be.an('array')
        results.forEach(element => {
            expect(element).to.have.property('state', "ISSUED");
        });
    });

    test("test getById", async () => {
        const result = await dal.getById(restockOrderId);
        expect(result).not.to.be.a('null');
        expect(result.issueDate).equal(newRestockOrder.issueDate);
        expect(result.state).equal("ISSUED");
        expect(result.products[0].SKUId).equal(newRestockOrder.products[0].SKUId);
        expect(result.products[0].description).equal(newRestockOrder.products[0].description);
        expect(result.products[0].itemId).equal(newRestockOrder.products[0].itemId);
        expect(result.products[0].price).equal(newRestockOrder.products[0].price);
        expect(result.products[0].qty).equal(newRestockOrder.products[0].qty);
        expect(result.products[1].SKUId).equal(newRestockOrder.products[1].SKUId);
        expect(result.products[1].description).equal(newRestockOrder.products[1].description);
        expect(result.products[1].itemId).equal(newRestockOrder.products[1].itemId);
        expect(result.products[1].price).equal(newRestockOrder.products[1].price);
        expect(result.products[1].qty).equal(newRestockOrder.products[1].qty);
        expect(result.supplierId).equal(newRestockOrder.supplierId);
        expect(result).to.not.have.property('transportNote');
        expect(result.skuItems).to.be.an('array').that.is.empty;
    });

    test("test getReturned", async () => {
        const returnProducts = await dal.getReturned(restockOrderId);
        expect(returnProducts).to.be.an('array');
        expect(returnProducts.length).equal(0);
    });

    test("test changeState", async () => {
        const retVal = await dal.changeState(restockOrderId, { "newState": "DELIVERY" });
        //expect(retVal).equal(restockOrderId);
        const result = await dal.getById(restockOrderId);
        expect(result).to.have.property('state', "DELIVERY");
    });

    test("test addSkuItems", async () => {
        const skuItems = {
            "skuItems": [
                { "SKUId": 12, "itemId": 10, "rfid": "12345678901234567890123456789016" },
                { "SKUId": 12, "itemId": 10, "rfid": "12345678901234567890123456789017" }
            ]
        };
        const retVal = await dal.addSkuItems(restockOrderId, skuItems);
        const result = await dal.getById(restockOrderId);
        expect(result.skuItems).deep.equal(skuItems.skuItems);
    });

    test("test addTransportNote", async () => {
        const transportNote = {
            "transportNote": { "deliveryDate": "2021/12/29" }
        };
        const retVal = await dal.addTransportNote(restockOrderId, transportNote);
        const result = await dal.getById(restockOrderId);
        expect(result.transportNote).deep.equal(transportNote.transportNote);
    });

    test("test deleteRestockOrder", async () => {
        const res = await dal.delete(restockOrderId);
        const retVal = await dal.getById(restockOrderId);
        expect(retVal).equal(null);
    });
});