const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);



describe('user.api.getAllSuppliers', () => {
    
    it('Get All supplier users', async () => {
        const getRes = await agent.get('/api/suppliers');
        getRes.should.have.status(200);
    });
})

describe('user.api.getAllUsersExceptManagers', () => {

    it('Get All users except Managers', async () => {
        const getRes = await agent.get('/api/users');
        getRes.should.have.status(200);
    });
})

describe('user.api.newUser', () => {
    const newObj = {
        
        "username":"user1@ezwh.com",
        "name":"John",
        "surname" : "Snow",
        "password" : "testpassword",
        "type" : "supplier"
    }
    let lastId;
    it('Adding Data', async () => {
        const postRes = await agent.post('/api/newUser').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const getRes = await agent.get('/api/users/');
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const newUser = getRes.body.find(x => x.id == lastId);
        newUser.email.should.be.equal(newObj.username);
        newUser.name.should.be.equal(newObj.name);
        newUser.surname.should.be.equal(newObj.surname);
        newUser.password.should.be.equal(newObj.password);
        newUser.type.should.be.equal(newObj.type);
        const delRes = await agent.delete('/api/users/' + newObj.username + '/' + newObj.type);
        delRes.should.have.status(204);
    });
})

describe('user.api.update', () => {
    const newObj = {

        "username":"user1@ezwh.com",
        "name":"John",
        "surname" : "Snow",
        "password" : "testpassword",
        "type" : "qualityEmployee"
    }
    const editedObj = {
        "oldType" : "qualityEmployee",
        "newType" : "clerk"
    }  

    let lastId;
    it('Updating Data', async () => {
        const postRes = await agent.post('/api/newUser').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const putRes = await agent.put('/api/users/' + newObj.username).send(editedObj);
        putRes.should.have.status(200);
        putRes.body.changes.should.be.equal(1);

        const getRes = await agent.get('/api/users/');
        getRes.should.have.status(200);

        const userList = getRes.body;
        let c=0;
        for (user of userList){
            if (user.id == lastId){
                (user.email).should.be.equal(newObj.username);
                (user.name).should.be.equal(newObj.name);
                (user.surname).should.be.equal(newObj.surname);
                (user.password).should.be.equal(newObj.password);
                (user.type).should.be.equal(editedObj.newType);
                c=1;
            }
        }

        c.should.be.equal(1);   
        const delRes = await agent.delete('/api/users/' + newObj.username + '/' + editedObj.newType);
        delRes.should.have.status(204);  
    });
})

describe('user.api.delete', () => {
    const newObj = {
        "username":"user3@ezwh.com",
        "name":"John",
        "surname" : "Snow",
        "password" : "testpassword",
        "type" : "supplier"
    }
    it('Deleting data', async () => {
        const postRes = await agent.post('/api/newUser').send(newObj);
        postRes.should.have.status(201);
        lastId = postRes.body;

        const delRes = await agent.delete('/api/users/' + newObj.username + '/' + newObj.type);
        delRes.should.have.status(204);

        const getRes = await agent.get('/api/users/');
        getRes.should.have.status(200);
        getRes.body.should.not.have.deep.include(newObj)
    });
})