const { 
    testDescriptorValidator,
    testResultValidator,
    userAddValidator,
    userUpdateValidator,
    userDeleteValidator,
    restockOrderProductValidator,
    restockOrderValidator,
    returnOrderProductValidator,
    returnOrderValidator,
    internalOrderProductValidator,
    internalOrderValidator,
    itemValidator } = require("../../services/validators");

/*---------------------testDescriptorValidator testing---------------------*/
describe("testDescriptorValidator testing", () => {
    testTestDescriptorValidator(
        {
            "name":"test descriptor 3",
            "procedureDescription":"This test is described by...",
            "idSKU" :1
        },
        true
    );
    testTestDescriptorValidator(
        {
            "name": null,
            "procedureDescription":"This test is described by...",
            "idSKU" :1
        },
        false
    );
    testTestDescriptorValidator(
        {
            "name": 123,
            "procedureDescription":"This test is described by...",
            "idSKU" :1
        },
        false
    );
    testTestDescriptorValidator(
        {
            "name":"test descriptor 3",
            "procedureDescription": null,
            "idSKU" :1
        },
        false
    );
    testTestDescriptorValidator(
        {
            "name":"test descriptor 3",
            "procedureDescription": "",
            "idSKU" :1
        },
        false
    );
    testTestDescriptorValidator(
        {
            "name":"test descriptor 3",
            "procedureDescription":"This test is described by...",
            "idSKU" :"1"
        },
        false
    );
    testTestDescriptorValidator(
        {
            "name":"test descriptor 3",
            "procedureDescription":"This test is described by...",
            "idSKU" :-1
        },
        false
    );
    testTestDescriptorValidator(
        {
            "name":"test descriptor 3",
            "procedureDescription":"This test is described by...",
            "idSKU" :null
        },
        false
    );
});

function testTestDescriptorValidator(value, expectedResult) {
    test("test testDescriptorValidator" + value, () => {
        expect(testDescriptorValidator(value)).toStrictEqual(expectedResult);
    });
}


/*---------------------testResutDataValidator testing---------------------*/
describe("testResutDataValidator testing", () => {
    testTestResultValidator(
        {
            "rfid": "12345678901234567890123456789016",
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": true
        },
        true
    );
    testTestResultValidator(
        {
            "rfid": "123456789012345678901234567890168",    // 33 chars
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "1234567890123456789012345678901",  // 31 chars
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );

    testTestResultValidator(
        {
            "rfid": "1234567asd1234567890123456789016",
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "-2345678901234567890123456789016",
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "",
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": null,
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "12345678901234567890123456789016",
            "idTestDescriptor": "12",
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "12345678901234567890123456789016",
            "idTestDescriptor": -12,
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "12345678901234567890123456789016",
            "idTestDescriptor": null,
            "Date": "2021/11/28",
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "12345678901234567890123456789016",
            "idTestDescriptor": 12,
            "Date": null,
            "Result": true
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "12345678901234567890123456789016",
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": null
        },
        false
    );
    testTestResultValidator(
        {
            "rfid": "12345678901234567890123456789016",
            "idTestDescriptor": 12,
            "Date": "2021/11/28",
            "Result": "true"
        },
        false
    );
});

function testTestResultValidator(value, expectedResult) {
    test("test testResultValidator: " + value, () => {
        expect(testResultValidator(value)).toStrictEqual(expectedResult);
    });
}


/*---------------------userAddValidator testing---------------------*/
describe("userAddValidator testing", () => {
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        true
    );
    testUserAddValidator(
        {
            "username":"@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.d",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":null,
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":null,
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "",
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : null,
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : 1234,
            "password" : "testpassword",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "test",    //less than 8 chars
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "",
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : null,
            "type" : "customer"
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "manager"  //can't be a manager
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : "empl" //not a role
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : ""
        },
        false
    );
    testUserAddValidator(
        {
            "username":"user1@ezwh.com",
            "name":"John",
            "surname" : "Smith",
            "password" : "testpassword",
            "type" : null
        },
        false
    );
});

function testUserAddValidator(value, expectedResult) {
    test("test userAddValidator " + value, () => {
        expect(userAddValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------userDeleteValidator testing---------------------*/
describe("userUpdateValidator testing", () => {
    testUserUpdateValidator(
        "user1@ezwh.com",
        {oldType: "clerk", newType: "supplier"},
        true
    );
    testUserUpdateValidator(
        "@ezwh.com",
        {oldType: "clerk", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "user1ezwh.com",
        {oldType: "clerk", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "user1@.com",
        {oldType: "clerk", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "user1@ezwhcom",
        {oldType: "clerk", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "user1@ezwh.",
        {oldType: "clerk", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "",
        {oldType: "clerk", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        null,
        {oldType: "clerk", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "user1@ezwh.com",
        {oldType: "manager", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "user1@ezwh.com",
        {oldType: "", newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "user1@ezwh.com",
        {oldType: null, newType: "supplier"},
        false
    );
    testUserUpdateValidator(
        "user1@ezwh.com",
        {oldType: "clerk", newType: "manager"},
        false
    );
    testUserUpdateValidator(
        "user1@ezwh.com",
        {oldType: "clerk", newType: ""},
        false
    );
    testUserUpdateValidator(
        "user1@ezwh.com",
        {oldType: "clerk", newType: null},
        false
    );
});

function testUserUpdateValidator(username, data, expectedResult) {
    test("test userUpdateValidator " + username + " " + data, () => {
        expect(userUpdateValidator(username, data)).toStrictEqual(expectedResult);
    });
}

/*---------------------userDeleteValidator testing---------------------*/
describe("userDeleteValidator testing", () => {
    testUserDeleteValidator("user1@ezwh.com", "clerk", true);
    testUserDeleteValidator("user1@ezwh.com", "supplier", true);
    testUserDeleteValidator("user1@ezwh.com", "manager", false);
    testUserDeleteValidator("user1@ezwh.com", "", false);
    testUserDeleteValidator("user1@ezwh.com", null, false);
    testUserDeleteValidator("@ezwh.com", "clerk", false);
    testUserDeleteValidator("user1ezwh.com", "clerk", false);
    testUserDeleteValidator("user1@.com", "clerk", false);
    testUserDeleteValidator("user1@ezwh.", "clerk", false);
    testUserDeleteValidator("", "clerk", false);
    testUserDeleteValidator(null, "clerk", false);
});

function testUserDeleteValidator(username, type, expectedResult){
    test("test userDeleteValidator " + username + " " + type, () => {
        expect(userDeleteValidator(username, type)).toStrictEqual(expectedResult);
    });
}


/*---------------------restockOrderProductValidator testing---------------------*/
describe("restockOrderProductValidator testing", () => {
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "qty": 3
        },
        true
    );
    testRestockOrderProductValidator(
        {
            "SKUId": "180",
            "description": "another product",
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": null,
            "description": "another product",
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": -180,
            "description": "another product",
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": null,
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": "",
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": -11.99,
            "qty": 3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": "11.99",
            "qty": 3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": null,
            "qty": 3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "qty": -3
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "qty": "3"
        },
        false
    );
    testRestockOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "qty": null
        },
        false
    );
});

function testRestockOrderProductValidator(value, expectedResult) {
    test("test restockOrderProductValidator " + value, () => {
        expect(restockOrderProductValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------restockOrderValidator testing---------------------*/
describe("restockOrderValidator testing", () => {
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": 1
        },
        true
    );
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/34 09:33", //34 isn't a day
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": 1
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": "",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": 1
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": null,
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": 1
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [],
            "supplierId": 1
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": "12", "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": 1
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": "180", "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": 1
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": null,
            "supplierId": 1
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": "1"
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": null
        },
        false
    );
    testRestockOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "supplierId": -1
        },
        false
    );
});

function testRestockOrderValidator(value, expectedResult) {
    test("test restockOrderValidator " + value, () => {
        expect(restockOrderValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------returnOrderProductValidator testing---------------------*/
describe("returnOrderProductValidator testing", () => {
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "RFID": "12345678901234567890123456789038"
        },
        true
    );
    testReturnOrderProductValidator(
        {
            "SKUId": "180",
            "description": "another product",
            "price": 11.99,
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": -180,
            "description": "another product",
            "price": 11.99,
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": null,
            "description": "another product",
            "price": 11.99,
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": 1,
            "price": 11.99,
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "",
            "price": 11.99,
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": null,
            "price": 11.99,
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": -11.99,
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": "11.99",
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": null,
            "RFID": "12345678901234567890123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "RFID": "123456789012345678901234567890384" //33 chars
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "RFID": "1234567890123456789012345678903"   //31 chars
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "RFID": "123456789012345fff90123456789038"
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "RFID": ""
        },
        false
    );
    testReturnOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "RFID": null
        },
        false
    );
});

function testReturnOrderProductValidator(value, expectedResult) {
    test("test returnOrderProductValidator: " + value, () => {
        expect(returnOrderProductValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------returnOrderDataValidator testing---------------------*/
describe("returnOrderValidator testing", () => {
    testReturnOrderValidator(
        {
            "returnDate":"2021/11/29 09:33",
            "products": [
                {
                    "SKUId":12,
                    "description":"a product",
                    "price":10.99,
                    "RFID":"12345678901234567890123456789016"
                },
                {
                    "SKUId":180,
                    "description":"another product",
                    "price":11.99,
                    "RFID":"12345678901234567890123456789038"
                }
            ],
            "restockOrderId" : 1
        },
        true
    );
    testReturnOrderValidator(
        {
            "returnDate":"2021/11/32 09:33",    //wrong date
            "products": [
                {
                    "SKUId":12,
                    "description":"a product",
                    "price":10.99,
                    "RFID":"12345678901234567890123456789016"
                },
                {
                    "SKUId":180,
                    "description":"another product",
                    "price":11.99,
                    "RFID":"12345678901234567890123456789038"
                }
            ],
            "restockOrderId" : 1
        },
        false
    );
    testReturnOrderValidator(
        {
            "returnDate":"",
            "products": [
                {
                    "SKUId":12,
                    "description":"a product",
                    "price":10.99,
                    "RFID":"12345678901234567890123456789016"
                },
                {
                    "SKUId":180,
                    "description":"another product",
                    "price":11.99,
                    "RFID":"12345678901234567890123456789038"
                }
            ],
            "restockOrderId" : 1
        },
        false
    );
    testReturnOrderValidator(
        {
            "returnDate": null,
            "products": [
                {
                    "SKUId":12,
                    "description":"a product",
                    "price":10.99,
                    "RFID":"12345678901234567890123456789016"
                },
                {
                    "SKUId":180,
                    "description":"another product",
                    "price":11.99,
                    "RFID":"12345678901234567890123456789038"
                }
            ],
            "restockOrderId" : 1
        },
        false
    );
    testReturnOrderValidator(
        {
            "returnDate":"2021/11/29 09:33",
            "products": null,
            "restockOrderId" : 1
        },
        false
    );
    testReturnOrderValidator(
        {
            "returnDate":"2021/11/29 09:33",
            "products": [],
            "restockOrderId" : 1
        },
        false
    );
    testReturnOrderValidator(
        {
            "returnDate":"2021/11/29 09:33",
            "products": [
                {
                    "SKUId":12,
                    "description":"a product",
                    "price":10.99,
                    "RFID":"12345678901234567890123456789016"
                },
                {
                    "SKUId":180,
                    "description":"another product",
                    "price":11.99,
                    "RFID":"12345678901234567890123456789038"
                }
            ],
            "restockOrderId" : "1"
        },
        false
    );
    testReturnOrderValidator(
        {
            "returnDate":"2021/11/29 09:33",
            "products": [
                {
                    "SKUId":12,
                    "description":"a product",
                    "price":10.99,
                    "RFID":"12345678901234567890123456789016"
                },
                {
                    "SKUId":180,
                    "description":"another product",
                    "price":11.99,
                    "RFID":"12345678901234567890123456789038"
                }
            ],
            "restockOrderId" : null
        },
        false
    );
});

function testReturnOrderValidator(value, expectedResult) {
    test("test returnOrderValidator: " + value, () => {
        expect(returnOrderValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------internalOrderProductValidator testing---------------------*/
describe("internalOrderProductValidator testing", () => {
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "qty": 3
        },
        true
    );
    testInternalOrderProductValidator(
        {
            "SKUId": "180",
            "description": "another product",
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": null,
            "description": "another product",
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": -180,
            "description": "another product",
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": null,
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": "",
            "price": 11.99,
            "qty": 3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": -11.99,
            "qty": 3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": "11.99",
            "qty": 3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": null,
            "qty": 3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "qty": -3
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "qty": "3"
        },
        false
    );
    testInternalOrderProductValidator(
        {
            "SKUId": 180,
            "description": "another product",
            "price": 11.99,
            "qty": null
        },
        false
    );
});

function testInternalOrderProductValidator(value, expectedResult) {
    test("test internalOrderProductValidator " + value, () => {
        expect(internalOrderProductValidator(value)).toStrictEqual(expectedResult);
    });
}

/*---------------------internalOrderValidator testing---------------------*/
describe("internalOrderValidator testing", () => {
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": 1
        },
        true
    );
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/34 09:33", //34 isn't a day
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": 1
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": "",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": 1
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": null,
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": 1
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [],
            "customerId": 1
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": "12", "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": 1
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": "180", "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": 1
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": null,
            "customerId": 1
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": "1"
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": null
        },
        false
    );
    testInternalOrderValidator(
        {
            "issueDate": "2021/11/29 09:33",
            "products": [{ "SKUId": 12, "description": "a product", "price": 10.99, "qty": 3 },
            { "SKUId": 180, "description": "another product", "price": 11.99, "qty": 3 }],
            "customerId": -1
        },
        false
    );
});

function testInternalOrderValidator(value, expectedResult) {
    test("test internalOrderValidator " + value, () => {
        expect(internalOrderValidator(value)).toStrictEqual(expectedResult);
    });
}


/*---------------------itemValidator testing---------------------*/
describe("itemValidator testing", () => {
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": 10.99,
            "SKUId": 1,
            "supplierId": 2
        },
        true
    );
    testItemValidator(
        {
            "id": "12",
            "description": "a new item",
            "price": 10.99,
            "SKUId": 1,
            "supplierId": 2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": null,
            "price": 10.99,
            "SKUId": 1,
            "supplierId": 2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": "10.99",
            "SKUId": 1,
            "supplierId": 2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": -10.99,
            "SKUId": 1,
            "supplierId": 2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": null,
            "SKUId": 1,
            "supplierId": 2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": 10.99,
            "SKUId": "1",
            "supplierId": 2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": 10.99,
            "SKUId": -1,
            "supplierId": 2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": 10.99,
            "SKUId": null,
            "supplierId": 2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": 10.99,
            "SKUId": 1,
            "supplierId": "2"
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": 10.99,
            "SKUId": 1,
            "supplierId": -2
        },
        false
    );
    testItemValidator(
        {
            "id": 12,
            "description": "a new item",
            "price": 10.99,
            "SKUId": 1,
            "supplierId": null
        },
        false
    );
});

function testItemValidator(value, expectedResult) {
    test("test itemValidator: " + value, () => {
        expect(itemValidator(value)).toStrictEqual(expectedResult);
    });
}