const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


let newObj = {
    "name":"test descr 4",
    "procedureDescription":"test description",
    "idSKU":1
};
const newSku ={
    "description": "a new sku",
    "weight": 100,
    "volume": 50,
    "notes": "first SKU",
    "price": 10.99,
    "availableQuantity": 50
}

describe('testDescriptor.api.getAll', () => {
    let skuId;
    it('Get All test descriptors', async function () {
        const postSku = await agent.post('/api/sku').send(newSku);
        skuId = postSku.body;
        newObj.idSKU = skuId;
        const postRes = await agent.post('/api/testDescriptor').send(newObj);
        postRes.should.have.status(201);
        const getRes = await agent.get('/api/testDescriptors');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { name,procedureDescription,idSKU } = getRes.body[getRes.body.length - 1];

        name.should.be.equal(newObj.name);
        procedureDescription.should.be.equal(newObj.procedureDescription);
        idSKU.should.be.equal(newObj.idSKU);
    });
})

describe('testDescriptor.api.getById', () => {
    let lastId;
    it('Get testDescriptor by ID', async function () {
        const postSku = await agent.post('/api/sku').send(newSku);
        skuId = postSku.body;
        newObj.idSKU = skuId;
        const postRes = await agent.post('/api/testDescriptor').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;


        const getRes = await agent.get('/api/testDescriptors/' + lastId);
        const { name,procedureDescription,idSKU } = getRes.body;

        getRes.should.have.status(200);
        name.should.be.equal(newObj.name);
        procedureDescription.should.be.equal(newObj.procedureDescription);
        idSKU.should.be.equal(newObj.idSKU);
    });
})

describe('testDescriptor.api.save', () => {
    let lastId;
    it('Adding Data', async () => {
        const postSku = await agent.post('/api/sku').send(newSku);
        skuId = postSku.body;
        newObj.idSKU = skuId;
        const postRes = await agent.post('/api/testDescriptor').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/testDescriptors/' + lastId);
        const { name,procedureDescription,idSKU } = getRes.body;

        getRes.should.have.status(200);
        name.should.be.equal(newObj.name);
        procedureDescription.should.be.equal(newObj.procedureDescription);
        idSKU.should.be.equal(newObj.idSKU);
    });
})

describe('testDescriptor.api.update', () => {
    const editedObj = {
        "newName":"test descriptor 1",
        "newProcedureDescription":"This test is described by...",
        "newIdSKU" :1
    }

    let lastId;
    it('Updating Data', async () => {
        const postSku = await agent.post('/api/sku').send(newSku);
        skuId = postSku.body;
        newObj.idSKU = skuId;
        editedObj.newIdSKU = skuId;
        const postRes = await agent.post('/api/testDescriptor').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const putRes = await agent.put('/api/testDescriptor/' + lastId).send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/testDescriptors/' + lastId);
        getRes.should.have.status(200);

        const {
            id,
            name,
            procedureDescription,
            idSKU
        } = getRes.body;

        name.should.be.equal(editedObj.newName);
        procedureDescription.should.be.equal(editedObj.newProcedureDescription);
        idSKU.should.be.equal(editedObj.newIdSKU);
    });
})

describe('testDescriptor.api.delete', () => {
    it('Deleting data', async () => {
        const postSku = await agent.post('/api/sku').send(newSku);
        skuId = postSku.body;
        newObj.idSKU = skuId;
        const postRes = await agent.post('/api/testDescriptor').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const delRes = await agent.delete('/api/testDescriptor/' + lastId);
        delRes.should.have.status(204);

        const getRes = await agent.get('/api/testDescriptors/' + lastId);
        getRes.should.have.status(404);
    });
})
