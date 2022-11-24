const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

let newObj = {
    "RFID":"12345678901234599990123456789050",
    "SKUId":1,
    "DateOfStock":"2021/11/29 12:30"
};

const newSkuObj = {
    "description": "a new sku",
    "weight": 100,
    "volume": 50,
    "notes": "first SKU",
    "price": 10.99,
    "availableQuantity": 50
};

describe('skuItem.api.getAll', () => {
    let skuID;
    it('Get All skuItems', async function () {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/skuItem').send(newObj);
        postRes.should.have.status(201);
        let lastId=postRes.body;
        const getRes = await agent.get('/api/skuItems');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { RFID,SKUId,Available,DateOfStock } = getRes.body[getRes.body.length - 1];

        RFID.should.be.equal(newObj.RFID);
        SKUId.should.be.equal(newObj.SKUId);
        Available.should.be.equal(0);
        DateOfStock.should.be.equal(newObj.DateOfStock);
        const delRes = await agent.delete('/api/skuItems/' + newObj.RFID);
        delRes.should.have.status(204);

        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})

describe('skuItem.api.getById', () => {
    
    const editedObj = {
        "newRFID":"12345678944434567890123456789060",
        "newAvailable":1,
        "newDateOfStock":"2021/11/29 12:30"
    }
    let skuID;
    it('Get skuItem by ID', async function () {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/skuItem').send(newObj);
        postRes.should.have.status(201);
        const putRes = await agent.put('/api/skuItems/' + newObj.RFID).send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/skuItems/sku/' + newObj.SKUId)
        const { RFID,SKUId,Available,DateOfStock } = getRes.body[getRes.body.length - 1];

        getRes.should.have.status(200);
        RFID.should.be.equal(editedObj.newRFID);
        SKUId.should.be.equal(newObj.SKUId);
        Available.should.be.equal(editedObj.newAvailable);
        DateOfStock.should.be.equal(editedObj.newDateOfStock);
        const delRes = await agent.delete('/api/skuItems/' + editedObj.newRFID);
        delRes.should.have.status(204);

        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})

describe('skuItem.api.getByRfid', () => {
    let skuID;
    it('Get skuItem by RFID', async function () {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/skuItem').send(newObj);
        postRes.should.have.status(201);


        const getRes = await agent.get('/api/skuItems/' + newObj.RFID);
        const { RFID,SKUId,Available,DateOfStock } = getRes.body;

        getRes.should.have.status(200);
        RFID.should.be.equal(newObj.RFID);
        SKUId.should.be.equal(newObj.SKUId);
        Available.should.be.equal(0);
        DateOfStock.should.be.equal(newObj.DateOfStock);
        const delRes = await agent.delete('/api/skuItems/' + newObj.RFID);
        delRes.should.have.status(204);
        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})

describe('skuItem.api.save', () => {
    let skuID;
    it('Adding Data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/skuItem').send(newObj);
        postRes.should.have.status(201);

        const getRes = await agent.get('/api/skuItems/' + newObj.RFID);
        const { RFID,SKUId,Available,DateOfStock  } = getRes.body;

        getRes.should.have.status(200);
        RFID.should.be.equal(newObj.RFID);
        SKUId.should.be.equal(newObj.SKUId);
        Available.should.be.equal(0);
        DateOfStock.should.be.equal(newObj.DateOfStock);
        const delRes = await agent.delete('/api/skuItems/' + newObj.RFID);
        delRes.should.have.status(204);
        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})

describe('skuItem.api.update', () => {
    
    const editedObj = {
        "newRFID":"12345678901234566690123456789055",
        "newAvailable":1,
        "newDateOfStock":"2021/11/29 12:30"
    }
    let skuID;
    it('Updating Data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/skuItem').send(newObj);
        postRes.should.have.status(201);

        const putRes = await agent.put('/api/skuItems/' + newObj.RFID).send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/skuItems/' + editedObj.newRFID);
        getRes.should.have.status(200);

        const {
            RFID,
            SKUId,
            Available,
            DateOfStock
        } = getRes.body;

        RFID.should.be.equal(editedObj.newRFID);
        SKUId.should.be.equal(newObj.SKUId);
        Available.should.be.equal(editedObj.newAvailable);
        DateOfStock.should.be.equal(editedObj.newDateOfStock);
        const delRes = await agent.delete('/api/skuItems/' + editedObj.newRFID);
        delRes.should.have.status(204);
        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})

describe('skuItem.api.delete', () => {
    let skuID;
    it('Deleting data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/skuItem').send(newObj);
        postRes.should.have.status(201);

        const delRes = await agent.delete('/api/skuItems/' + newObj.RFID);
        delRes.should.have.status(204);

        const getRes = await agent.get('/api/skuItems/' + newObj.RFID);
        getRes.should.have.status(404);
        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})
