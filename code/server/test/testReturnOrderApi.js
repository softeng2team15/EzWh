const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


let newObj = {
    "returnDate": "2021/11/29 09:33",
    "products": [{ "SKUId": 12, "itemId": 10, "description": "a product", "price": 10.99, "RFID": "12345678901333567890123456789016" },
    { "SKUId": 180, "itemId": 18, "description": "another product", "price": 11.99, "RFID": "12345676661234567890123456789038" }],
    "restockOrderId": 1
};

const newRestockObj = {
    "issueDate": "2021/11/29 09:33",
    "products": [{ "SKUId": 12, "itemId": 10, "description": "a product", "price": 10.99, "qty": 30 },
    { "SKUId": 180, "itemId": 18, "description": "another product", "price": 11.99, "qty": 20 }],
    "supplierId": 1
};

describe('returnOrder.api.getAll', function () {
    let lastId, resOrdID;
    it('Get All return Orders', async () => {
        const postRestockRes = await agent.post('/api/restockOrder').send(newRestockObj);
        resOrdID = postRestockRes.body;
        newObj.restockOrderId = resOrdID;
        const postRes = await agent.post('/api/returnOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/returnOrders');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const { returnDate, products, restockOrderId } = getRes.body[getRes.body.length - 1];
        returnDate.should.be.equal(newObj.returnDate);
        expect(products).to.eql(newObj.products);
        restockOrderId.should.be.equal(newObj.restockOrderId);

        const del0Res = await agent.delete('/api/restockOrder/' + resOrdID);
        del0Res.should.have.status(201);

        const delRes = await agent.delete('/api/returnOrder/' + lastId);
        delRes.should.have.status(201);
    });
})

describe('returnOrder.api.getById', function () {
    let lastId, resOrdID;
    it('Get return Order by ID', async () => {
        const postRestockRes = await agent.post('/api/restockOrder').send(newRestockObj);
        resOrdID = postRestockRes.body;
        newObj.restockOrderId = resOrdID;

        const postRes = await agent.post('/api/returnOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/returnOrders/' + lastId);
        getRes.should.have.status(200);
        const { returnDate, products, restockOrderId } = getRes.body;
        returnDate.should.be.equal(newObj.returnDate);
        expect(products).to.eql(newObj.products);
        restockOrderId.should.be.equal(newObj.restockOrderId);

        const del0Res = await agent.delete('/api/restockOrder/' + resOrdID);
        del0Res.should.have.status(201);

        const delRes = await agent.delete('/api/returnOrder/' + lastId);
        delRes.should.have.status(201);
    });
})

describe('returnOrder.api.add', function () {
    let lastId, resOrdID;
    it('Adding Data', async () => {
        const postRestockRes = await agent.post('/api/restockOrder').send(newRestockObj);
        resOrdID = postRestockRes.body;
        newObj.restockOrderId = resOrdID;
        const postRes = await agent.post('/api/returnOrder').send(newObj)

        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/returnOrders/' + lastId);
        getRes.should.have.status(200);
        const { returnDate, products, restockOrderId } = getRes.body;
        returnDate.should.be.equal(newObj.returnDate);
        expect(products).to.eql(newObj.products);
        restockOrderId.should.be.equal(newObj.restockOrderId);

        const del0Res = await agent.delete('/api/restockOrder/' + resOrdID);
        del0Res.should.have.status(201);

        const delRes = await agent.delete('/api/returnOrder/' + lastId);
        delRes.should.have.status(201);
    })
})

describe('returnOrder.api.delete', () => {
    it('Deleting data', async () => {
        const postRestockRes = await agent.post('/api/restockOrder').send(newRestockObj);
        resOrdID = postRestockRes.body;
        newObj.restockOrderId = resOrdID;
        const postRes = await agent.post('/api/returnOrder').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const del0Res = await agent.delete('/api/restockOrder/' + resOrdID);
        del0Res.should.have.status(201);

        const delRes = await agent.delete('/api/returnOrder/' + lastId);
        delRes.should.have.status(201);

        const getRes = await agent.get('/api/returnOrders/' + lastId);
        getRes.should.have.status(404);
    });
})
