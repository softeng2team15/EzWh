const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


const newObj = {
    "description": "a new sku",
    "weight": 100,
    "volume": 50,
    "notes": "first SKU",
    "price": 10.99,
    "availableQuantity": 50
};

describe('sku.api.getAll', () => {
    let lastId;
    it('Get All Skus', async () => {

        const postRes = await agent.post('/api/sku').send(newObj);
        postRes.should.have.status(201);
        let lastId=postRes.body;

        const getRes = await agent.get('/api/skus');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        getRes.body[getRes.body.length - 1].should.have.deep.include(newObj)

        const delRes = await agent.delete('/api/skus/' + lastId);
        delRes.should.have.status(204);

    });
})

describe('sku.api.getById', () => {

    let lastId;
    it('Get SKU by ID', async () => {


        const postRes = await agent.post('/api/sku').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/skus/' + lastId);
        getRes.should.have.status(200);
        getRes.body.should.have.deep.include(newObj)

        const delRes = await agent.delete('/api/skus/' + lastId);
        delRes.should.have.status(204);

    });
})

describe('sku.api.save', () => {

    let lastId;
    it('Inserting Data', async () => {
        const postRes = await agent.post('/api/sku').send(newObj)

        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/skus/' + lastId);
        getRes.should.have.status(200);
        getRes.body.should.have.deep.include(newObj)

        const delRes = await agent.delete('/api/skus/' + lastId);
        delRes.should.have.status(204);

    });
})


describe('sku.api.update', () => {

    const editedObj = {
        "newDescription": "a edited sku",
        "newWeight": 150,
        "newVolume": 60,
        "newNotes": "first SKU",
        "newPrice": 11.99,
        "newAvailableQuantity": 50
    };

    let lastId;
    it('Inserting Data', async () => {

        const postRes = await agent.post('/api/sku').send(newObj);

        postRes.should.have.status(201);
        lastId = postRes.body;

        const putRes = await agent.put("/api/sku/" + lastId).send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/skus/' + lastId);

        const {
            description,
            weight,
            volume,
            notes,
            price,
            availableQuantity,
        } = getRes.body;

        description.should.be.equal(editedObj.newDescription);
        weight.should.be.equal(editedObj.newWeight);
        volume.should.be.equal(editedObj.newVolume);
        notes.should.be.equal(editedObj.newNotes);
        price.should.be.equal(editedObj.newPrice);
        availableQuantity.should.be.equal(editedObj.newAvailableQuantity);

        const delRes = await agent.delete('/api/skus/' + lastId);
        delRes.should.have.status(204);
    });
})

describe('sku.api.updatePosition', async () => {
    const newPosition = {
        "positionID": "800234543333",
        "aisleID": "8002",
        "row": "3454",
        "col": "3333",
        "maxWeight": 1000,
        "maxVolume": 1000
    }

    const posi = {
        "position": "800234543333"
    }

    let lastId;
    it('update position', async function () {

        await agent.delete('/api/position/' + newPosition.positionID);
        await agent.post('/api/position').send(newPosition);

        const postRes = await agent.post('/api/sku').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const putRes = await agent.put(`/api/sku/${lastId}/position`).send(posi);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/skus/' + lastId);
        getRes.should.have.status(200);
        const { position } = getRes.body;

        position.should.be.equal(posi.position);

        const delRes = await agent.delete('/api/skus/' + lastId);
        delRes.should.have.status(204);
    });
})


describe('sku.api.delete', () => {
    it('Deleting data', async () => {

        const postRes = await agent.post('/api/sku').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const delRes = await agent.delete('/api/skus/' + lastId);
        delRes.should.have.status(204);

        const getRes = await agent.get('/api/skus/' + lastId);
        getRes.should.have.status(404);

    });
})
