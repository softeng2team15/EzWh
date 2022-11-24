const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


const newObj = {
    "issueDate": "2021/11/29 09:33",
    "products": [{ "SKUId": 12, "itemId": 10, "description": "a product", "price": 10.99, "qty": 30 },
    { "SKUId": 180, "itemId": 18, "description": "another product", "price": 11.99, "qty": 20 }],
    "supplierId": 1
};

const skuItemsList = {
    "skuItems": [{ "SKUId": 1, "itemId": 10, "rfid": "12345678901234567890123456789016" }, { "SKUId": 1, "itemId": 10, "rfid": "12345678901234567890123456789017" }]
};

const testResultTrue = {
    "rfid": "12345678901234567890123456789017",
    "idTestDescriptor": 1,
    "Date": "2021/11/28",
    "Result": true
};

const newState = {
    "newState": "DELIVERED"
};

const testDescriptor = {
    "name": "test descriptor 3",
    "procedureDescription": "This test is described by...",
    "idSKU": 1
};

const sku = {
    "description": "a new sku",
    "weight": 100,
    "volume": 50,
    "notes": "first SKU",
    "price": 10.99,
    "availableQuantity": 50
};

describe('restockOrder.api.getAll', () => {
    it('Get All Issued restock Orders', async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);

        const getRes = await agent.get('/api/restockOrders');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { issueDate, products, supplierId } = getRes.body[getRes.body.length - 1];
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        supplierId.should.be.equal(newObj.supplierId);

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);
    });
})

describe('restockOrder.api.getAllIssued', () => {
    it('Get All restock Orders', async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);

        const getRes = await agent.get('/api/restockOrdersIssued');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { issueDate, products, supplierId } = getRes.body[getRes.body.length - 1];
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        supplierId.should.be.equal(newObj.supplierId);

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);
    });
})

describe('restockOrder.api.getById', () => {
    let lastId;
    it('Get restock Order by ID', async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/restockOrders/' + lastId);
        getRes.should.have.status(200);
        const { issueDate, products, supplierId } = getRes.body;
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        supplierId.should.be.equal(newObj.supplierId);

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);
    });
})

describe('restockOrder.api.getReturned', () => {
    let lastId, lastTDID, lastSID;
    it("Get Returned restock Order's item by ID", async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        /* Change state */
        const put0Res = await agent.put('/api/restockOrder/' + lastId).send(newState);
        put0Res.should.have.status(200);
        /* Add skuItemsList to Restock Order */
        const putRes = await agent.put('/api/restockOrder/' + lastId + '/skuItems').send(skuItemsList);
        putRes.should.have.status(200);

        /* Change state */
        const put1Res = await agent.put('/api/restockOrder/' + lastId).send({ "newState": "COMPLETEDRETURN" });
        put1Res.should.have.status(200);

        const getRes = await agent.get('/api/restockOrders/' + lastId + '/returnItems');
        getRes.should.have.status(200);

        getRes.body.should.have.lengthOf.above(0);
        const { SKUId, rfid } = getRes.body[getRes.body.length - 1];
        SKUId.should.be.equal(skuItemsList.skuItems[1].SKUId);
        rfid.should.be.equal(skuItemsList.skuItems[1].rfid);

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);
    });
})

describe('restockOrder.api.add', () => {
    let lastId;
    it('Adding Data', async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/restockOrders/' + lastId);
        getRes.should.have.status(200);
        const { issueDate, products, supplierId } = getRes.body;
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        supplierId.should.be.equal(newObj.supplierId);

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);
    })
})

describe('restockOrder.api.changeState', () => {
    let lastId;
    it('Change state', async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const putRes = await agent.put('/api/restockOrder/' + lastId).send({ "newState": "DELIVERED" });
        putRes.should.have.status(200);

        const getRes = await agent.get('/api/restockOrders/' + lastId);
        getRes.should.have.status(200);

        const { issueDate, state, products, supplierId } = getRes.body;
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        supplierId.should.be.equal(newObj.supplierId);
        state.should.be.equal("DELIVERED");

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);
    })
})

describe('restockOrder.api.addSkuItems', () => {
    let lastId;
    it('Add sku items', async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const put0Res = await agent.put('/api/restockOrder/' + lastId).send({ "newState": "DELIVERED" });
        put0Res.should.have.status(200);
        const putRes = await agent.put('/api/restockOrder/' + lastId + '/skuItems').send(skuItemsList);
        putRes.should.have.status(200);

        const getRes = await agent.get('/api/restockOrders/' + lastId);
        getRes.should.have.status(200);

        const { skuItems } = getRes.body;
        expect(skuItems).to.eql(skuItemsList.skuItems);

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);
    })
})

describe('restockOrders.api.addTransportNote', () => {
    let lastId;
    it('Add transport note', async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const put0Res = await agent.put('/api/restockOrder/' + lastId).send({ "newState": "DELIVERY" });
        put0Res.should.have.status(200);
        const putRes = await agent.put('/api/restockOrder/' + lastId + '/transportNote').send({ "transportNote": { "deliveryDate": "2021/12/29" } });
        putRes.should.have.status(200);

        const getRes = await agent.get('/api/restockOrders/' + lastId);
        getRes.should.have.status(200);

        const { transportNote } = getRes.body;
        expect(transportNote).to.eql({ "deliveryDate": "2021/12/29" });

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);
    })
})

describe('restockOrders.api.delete', () => {
    let lastId;
    it('delete', async () => {
        const postRes = await agent.post('/api/restockOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const delRes = await agent.delete('/api/restockOrder/' + lastId);
        delRes.should.have.status(201);

        const getRes = await agent.get('/api/restockOrders/' + lastId);
        getRes.should.have.status(404);
    })
})