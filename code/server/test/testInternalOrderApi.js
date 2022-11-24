const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);



describe('internalOrder.api.getAll', () =>{
    
    const newObj = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":2,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    };
    let lastId;
    it('Get All internal Orders', async () => {
        const postRes = await agent.post('/api/internalOrders').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;
        const getRes = await agent.get('/api/internalOrders');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const {issueDate, state,products, customerId} = getRes.body[getRes.body.length - 1];
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        state.should.be.equal("ISSUED");
        customerId.should.be.equal(newObj.customerId);
        const delRes = await agent.delete('/api/internalOrders/' + lastId);
        delRes.should.have.status(201);
    });
})
describe('internalOrder.api.getAllIssued', () =>{
    
    const newObj = {
        "issueDate":"2021/11/29 09:33",
        "state": "ISSUED",
        "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":2,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    };
    let lastId;
    it('Get All Issued internal Orders', async () => {
        const postRes = await agent.post('/api/internalOrders').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;
        const getRes = await agent.get('/api/internalOrdersIssued');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const {issueDate, state,products, customerId} = getRes.body[getRes.body.length - 1];
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        state.should.be.equal(newObj.state);
        customerId.should.be.equal(newObj.customerId);

        const delRes = await agent.delete('/api/internalOrders/' + lastId);
        delRes.should.have.status(201);
    });
})
describe('internalOrder.api.getAllAccepted', () =>{
    
    const newObj = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":2,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    };
    const editedObj ={
        "newState":"ACCEPTED"
    }
    it('Get All Accepted internal Orders', async () => {
        const postRes = await agent.post('/api/internalOrders').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;
        const putRes = await agent.put('/api/internalOrders/'+lastId).send(editedObj);
        putRes.should.have.status(200);
        const getRes = await agent.get('/api/internalOrdersAccepted');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const {issueDate, state,products, customerId} = getRes.body[getRes.body.length - 1];
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        state.should.be.equal(editedObj.newState);
        customerId.should.be.equal(newObj.customerId);

        const delRes = await agent.delete('/api/internalOrders/' + lastId);
        delRes.should.have.status(201);
    });
})
describe('internalOrder.api.update', () =>{
    
    const newObj = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":2,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    };
    const editedObj ={
        "newState":"COMPLETED",
        "products":[{"SkuID":1,"RFID":"12345678901234567890123456789016"},{"SkuID":2,"RFID":"12345678901234567890123456789038"}]
    }
    const resultObj = {
        "products":[{"SKUId":1,"description":"a product","price":10.99,"RFID":"12345678901234567890123456789016"},{"SKUId":2,"description":"another product","price":11.99,"RFID":"12345678901234567890123456789038"}]
    }
    it('Get All internal Orders', async () => {
        const postRes = await agent.post('/api/internalOrders').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;
        const putRes = await agent.put('/api/internalOrders/'+lastId).send(editedObj);
        putRes.should.have.status(200);
        const getRes = await agent.get('/api/internalOrders/' + lastId);
        getRes.should.have.status(200);
        const {issueDate, state, products, customerId} = getRes.body;
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(resultObj.products);
        state.should.be.equal(editedObj.newState);
        customerId.should.be.equal(newObj.customerId);

        const delRes = await agent.delete('/api/internalOrders/' + lastId);
        delRes.should.have.status(201);
    });
})
describe('internalOrder.api.getById', () => {
    const newObj = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":2,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    };
    let lastId;
    it('Get internal order by ID', async () => {
        const postRes = await agent.post('/api/internalOrders').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/internalOrders/' + lastId);
        getRes.should.have.status(200);
        const {issueDate, state,products, customerId} = getRes.body;
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        state.should.be.equal("ISSUED");
        customerId.should.be.equal(newObj.customerId);

        const delRes = await agent.delete('/api/internalOrders/' + lastId);
        delRes.should.have.status(201);
    });
})
describe('internalOrder.api.add', () => {
    const newObj = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":2,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    };
    let lastId;
    it('Adding Data', async () => {
        const postRes = await agent.post('/api/internalOrders').send(newObj)

        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/internalOrders/' + lastId);
        getRes.should.have.status(200);
        const {issueDate, state,products, customerId} = getRes.body;
        issueDate.should.be.equal(newObj.issueDate);
        expect(products).to.eql(newObj.products);
        state.should.be.equal("ISSUED");
        customerId.should.be.equal(newObj.customerId);
        
        const delRes = await agent.delete('/api/internalOrders/' + lastId);
        delRes.should.have.status(201);

    })
})

describe('internalOrder.api.delete', () => {
    const newObj = {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":1,"description":"a product","price":10.99,"qty":2},
                    {"SKUId":2,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    };
    it('Deleting data', async () => {
        const postRes = await agent.post('/api/internalOrders').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const delRes = await agent.delete('/api/internalOrders/' + lastId);
        delRes.should.have.status(201);

        const getRes = await agent.get('/api/internalOrders/' + lastId);
        getRes.should.have.status(404);
    });
})
