const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


let newTestResult = {
    "rfid": "12345678901234567890111456789016",
    "idTestDescriptor": 12,
    "Date": "2021/11/28",
    "Result": true
}

let newSkuItem = {
    "RFID": "12345678901234567890111456789016",
    "SKUId": 1,
    "DateOfStock": "2021/11/29 12:30"
}

let newTestDesc = {
    "name": "test descriptor 3",
    "procedureDescription": "This test is described by...",
    "idSKU": 1
}

const newSkuObj = {
    "description": "a new sku",
    "weight": 100,
    "volume": 50,
    "notes": "first SKU",
    "price": 10.99,
    "availableQuantity": 50
};

let testResID;
let testDescPostResId;

describe('testResults.api.getAllByRfid', () => {
    let skuID, SIID;
    it('Get All testResults by RFID', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newSkuItem.SKUId = skuID;
        const postSIRes = await agent.post('/api/skuItem').send(newSkuItem);
        postSIRes.should.have.status(201);
        let SIID=postSIRes.body;

        newTestDesc.idSKU = skuID;
        const testDescriptorRes = await agent.post("/api/testDescriptor").send(newTestDesc);
        testDescriptorRes.should.have.status(201);
        newSkuItem.idTestDescriptor = testDescriptorRes.body;
        newTestResult.idTestDescriptor = testDescriptorRes.body;
        newTestResult.rfid = newSkuItem.RFID;

        const postRes = await agent.post("/api/skuitems/testResult").send(newTestResult);
        testResID = postRes.body;
        postRes.should.have.status(201);

        const getRes = await agent.get(`/api/skuitems/${newSkuItem.RFID}/testResults`);
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const newEl = getRes.body.find(x => x.id == postRes.body);
        newEl.rfid.should.be.equal(newTestResult.rfid);
        newEl.idTestDescriptor.should.be.equal(testDescriptorRes.body);
        newEl.Date.should.be.equal(newTestResult.Date);
        newTestResult.Result.should.be.equal(!!newEl.Result);

        const delRes = await agent.delete(`/api/skuitems/${newSkuItem.RFID}/testResult/${postRes.body}`);
        delRes.should.have.status(204);
        const delSKU = await agent.delete(`/api/skuitems/${newSkuItem.RFID}`);
        delSKU.should.have.status(204);
        const delTDRes = await agent.delete('/api/testDescriptor/' + newSkuItem.idTestDescriptor);
        delTDRes.should.have.status(204);

        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);

    });
})


describe('testResults.api.getByRfid', () => {
    let skuID, SIID;
    it('Get All testResults by RFID', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newSkuItem.SKUId = skuID;
        const postSIRes = await agent.post('/api/skuItem').send(newSkuItem);
        postSIRes.should.have.status(201);
        let SIID=postSIRes.body;

        newTestDesc.idSKU = skuID;
        const testDescriptorRes = await agent.post("/api/testDescriptor").send(newTestDesc);
        testDescriptorRes.should.have.status(201);
        newSkuItem.idTestDescriptor = testDescriptorRes.body;
        newTestResult.idTestDescriptor = testDescriptorRes.body;
        newTestResult.rfid = newSkuItem.RFID;

        const postRes = await agent.post("/api/skuitems/testResult").send(newTestResult);
        testResID = postRes.body;
        postRes.should.have.status(201);

        const getRes = await agent.get(`/api/skuitems/${newSkuItem.RFID}/testResults/${testResID}`);
        getRes.should.have.status(200);
        getRes.body.rfid.should.be.equal(newSkuItem.RFID);
        getRes.body.idTestDescriptor.should.be.equal(newSkuItem.idTestDescriptor);
        getRes.body.Date.should.be.equal(newTestResult.Date);
        newTestResult.Result.should.be.equal(!!getRes.body.Result);

        const delRes = await agent.delete(`/api/skuitems/${newSkuItem.RFID}/testResult/${postRes.body}`);
        delRes.should.have.status(204);
        const delSKU = await agent.delete(`/api/skuitems/${newSkuItem.RFID}`);
        delSKU.should.have.status(204);
        const delTDRes = await agent.delete('/api/testDescriptor/' + newSkuItem.idTestDescriptor);
        delTDRes.should.have.status(204);

        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})



describe('testResults.api.save', () => {

    let skuID, SIID;
    it('Inserting Data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newSkuItem.SKUId = skuID;
        const postSIRes = await agent.post('/api/skuItem').send(newSkuItem);
        postSIRes.should.have.status(201);
        let SIID=postSIRes.body;

        newTestDesc.idSKU = skuID;
        const testDescriptorRes = await agent.post("/api/testDescriptor").send(newTestDesc);
        testDescriptorRes.should.have.status(201);
        newSkuItem.idTestDescriptor = testDescriptorRes.body;
        newTestResult.idTestDescriptor = testDescriptorRes.body;
        newTestResult.rfid = newSkuItem.RFID;

        const postRes = await agent.post("/api/skuitems/testResult").send(newTestResult);
        testResID = postRes.body;
        postRes.should.have.status(201);


        const getRes = await agent.get(`/api/skuitems/${newSkuItem.RFID}/testResults/${postRes.body}`);
        getRes.should.have.status(200);
        getRes.body.rfid.should.be.equal(newSkuItem.RFID);
        getRes.body.idTestDescriptor.should.be.equal(newSkuItem.idTestDescriptor);
        getRes.body.Date.should.be.equal(newTestResult.Date);
        newTestResult.Result.should.be.equal(!!getRes.body.Result);

        const delRes = await agent.delete(`/api/skuitems/${newSkuItem.RFID}/testResult/${postRes.body}`);
        delRes.should.have.status(204);
        const delSKU = await agent.delete(`/api/skuitems/${newSkuItem.RFID}`);
        delSKU.should.have.status(204);
        const delTDRes = await agent.delete('/api/testDescriptor/' + newSkuItem.idTestDescriptor);
        delTDRes.should.have.status(204);

        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})


describe('testResults.api.update', () => {

    let editedObj = {
        "newIdTestDescriptor": 12,
        "newDate": "2021/11/28",
        "newResult": true
    }


    let skuID, SIID;
    it('updating Data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newSkuItem.SKUId = skuID;
        const postSIRes = await agent.post('/api/skuItem').send(newSkuItem);
        postSIRes.should.have.status(201);
        let SIID=postSIRes.body;

        newTestDesc.idSKU = skuID;
        const testDescriptorRes = await agent.post("/api/testDescriptor").send(newTestDesc);
        testDescriptorRes.should.have.status(201);
        newSkuItem.idTestDescriptor = testDescriptorRes.body;
        newTestResult.idTestDescriptor = testDescriptorRes.body;
        newTestResult.rfid = newSkuItem.RFID;

        const postRes = await agent.post("/api/skuitems/testResult").send(newTestResult);
        testResID = postRes.body;
        postRes.should.have.status(201);
        editedObj.newIdTestDescriptor  = newSkuItem.idTestDescriptor;

        const putRes = await agent.put(`/api/skuitems/${newTestResult.rfid}/testResult/${postRes.body}`).send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get(`/api/skuitems/${newTestResult.rfid}/testResults/${postRes.body}`);

        const newEl = getRes.body;
        newEl.idTestDescriptor.should.be.equal(editedObj.newIdTestDescriptor);
        newEl.Date.should.be.equal(editedObj.newDate);
        editedObj.newResult.should.be.equal(!!newEl.Result);

        const delRes = await agent.delete(`/api/skuitems/${newSkuItem.RFID}/testResult/${postRes.body}`);
        delRes.should.have.status(204);
        const delSKU = await agent.delete(`/api/skuitems/${newSkuItem.RFID}`);
        delSKU.should.have.status(204);
        const delTDRes = await agent.delete('/api/testDescriptor/' + newSkuItem.idTestDescriptor);
        delTDRes.should.have.status(204);

        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
    });
})


describe('testResults.api.delete', () => {
    let skuID, SIID;
    it('Deleting data', async () => {
        const postSKURes = await agent.post('/api/sku').send(newSkuObj);
        postSKURes.should.have.status(201);
        skuID = postSKURes.body;

        newSkuItem.SKUId = skuID;
        const postSIRes = await agent.post('/api/skuItem').send(newSkuItem);
        postSIRes.should.have.status(201);
        let SIID=postSIRes.body;

        newTestDesc.idSKU = skuID;
        const testDescriptorRes = await agent.post("/api/testDescriptor").send(newTestDesc);
        testDescriptorRes.should.have.status(201);
        newSkuItem.idTestDescriptor = testDescriptorRes.body;
        newTestResult.idTestDescriptor = testDescriptorRes.body;
        newTestResult.rfid = newSkuItem.RFID;

        const postRes = await agent.post("/api/skuitems/testResult").send(newTestResult);
        testResID = postRes.body;
        postRes.should.have.status(201);

        const delRes = await agent.delete(`/api/skuitems/${newSkuItem.RFID}/testResult/${postRes.body}`);
        delRes.should.have.status(204);

        const getRes = await agent.get(`/api/skuitems/${newSkuItem.RFID}/testResults/${postRes.body}`);
        getRes.should.have.status(404);

        const delSKU = await agent.delete(`/api/skuitems/${newSkuItem.RFID}`);
        delSKU.should.have.status(204);
        const delSRes = await agent.delete('/api/skus/' + skuID);
        delSRes.should.have.status(204);
        const delTDRes = await agent.delete('/api/testDescriptor/' + newSkuItem.idTestDescriptor);
        delTDRes.should.have.status(204);       

    });
})
