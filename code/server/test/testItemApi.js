const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


const newObj = {
    "id": 12,
    "description": "a new item",
    "price": 10.99,
    "SKUId": 1,
    "supplierId": 2
};
const newSkuObj = {
    "description": "a new sku",
    "weight": 100,
    "volume": 50,
    "notes": "first SKU",
    "price": 10.99,
    "availableQuantity": 50
};
describe('item.api.getAll', () => {
    let skuID;
    it('Get All items', async function () {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;
        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/item').send(newObj);
        postRes.should.have.status(201);
        const getRes = await agent.get('/api/items');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { description, price, SKUId, supplierId } = getRes.body[getRes.body.length - 1];

        description.should.be.equal(newObj.description);
        price.should.be.equal(newObj.price);
        SKUId.should.be.equal(newObj.SKUId);
        supplierId.should.be.equal(newObj.supplierId);
        const delRes = await agent.delete('/api/items/' + newObj.id + "/" + newObj.supplierId);
        delRes.should.have.status(204);
    });
})

describe('item.api.getById', () => {
    let skuID;
    it('Get item by ID', async function () {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;
        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/item').send(newObj);
        postRes.should.have.status(201);

        const getRes = await agent.get('/api/items/' + newObj.id + "/" + newObj.supplierId);
        const { description, price, SKUId, supplierId } = getRes.body;

        getRes.should.have.status(200);
        description.should.be.equal(newObj.description);
        price.should.be.equal(newObj.price);
        SKUId.should.be.equal(newObj.SKUId);
        supplierId.should.be.equal(newObj.supplierId);
        const delRes = await agent.delete('/api/items/' + newObj.id + "/" + newObj.supplierId);
        delRes.should.have.status(204);
    });
})

describe('item.api.add', () => {
    let skuID;
    it('Adding Data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;
        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/item').send(newObj);
        postRes.should.have.status(201);

        const getRes = await agent.get('/api/items/' + newObj.id + "/" + newObj.supplierId);
        const { description, price, SKUId, supplierId } = getRes.body;

        getRes.should.have.status(200);
        description.should.be.equal(newObj.description);
        price.should.be.equal(newObj.price);
        SKUId.should.be.equal(newObj.SKUId);
        supplierId.should.be.equal(newObj.supplierId);
        const delRes = await agent.delete('/api/items/' + newObj.id + "/" + newObj.supplierId);
        delRes.should.have.status(204);
    });
})

describe('item.api.update', () => {
    const editedObj = {
        "newDescription": "a new sku",
        "newPrice": 10.99
    }
    let skuID;
    it('Updating Data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;
        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/item').send(newObj);
        postRes.should.have.status(201);

        const putRes = await agent.put('/api/item/' + newObj.id + "/" + newObj.supplierId).send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/items/' + newObj.id + "/" + newObj.supplierId);
        getRes.should.have.status(200);

        const {
            id,
            description,
            price,
            SKUId,
            supplierId
        } = getRes.body;

        description.should.be.equal(editedObj.newDescription);
        price.should.be.equal(editedObj.newPrice);
        const delRes = await agent.delete('/api/items/' + newObj.id + "/" + newObj.supplierId);
        delRes.should.have.status(204);
    });
})

describe('item.api.delete', () => {
    it('Deleting data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;
        newObj.SKUId = skuID;
        const postRes = await agent.post('/api/item').send(newObj);
        postRes.should.have.status(201);

        const delRes = await agent.delete('/api/items/' + newObj.id + "/" + newObj.supplierId);
        delRes.should.have.status(204);

        const getRes = await agent.get('/api/items/' + newObj.id + "/" + newObj.supplierId);
        getRes.should.have.status(404);
    });
})
