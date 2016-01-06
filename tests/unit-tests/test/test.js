var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json');


var should = require('should'),
    supertest =require('supertest');

describe('API routing for CRUD operations on hotels', function () {
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path + "/");

    var tmpHotelId = null;
    var tmpHotelResponse;

    before(function (done) {
        done();
    });

    describe('CREATE hotel', function () {
        it('should post /hotels', function (done) {
            request
                .post('/hotels')
                .send({
                    "hotelName": "Great hotel!" + Date.now(),
                    "picture": "",
                    "address": "Almerestraat 2",
                    "postcode": "6666QQ",
                    "phoneNumber": "123456789",
                    "locationId": "5681a4a0c0a2cb0c18fcce9f"
                })
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('create');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');

                    tmpHotelId = JSON.parse(res.text).doc._id;
                    done();
                });
        });
    });

    describe('RETREVE all hotels', function () {
        it('should GET /hotels', function (done) {
            request
                .get('/hotels')
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);

                    tmpHotelResponse = res.text;
                    done();
                });
        });
    });

    describe('RETREVE 1 hotel', function () {
        it('should GET /hotels/{id}', function (done) {
            request
                .get('/hotels/' + tmpHotelId)
                .expect(200)
                .expect('Content-Type', /application.json/)
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('detail');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 hotel', function () {
        it('should Put /hotels/{id}', function (done) {
            request
                .put('/hotels/' + tmpHotelId)
                .send({
                    "doc": {
                        "hotelName": "Great hotel!" + Date.now(),
                        "picture": "",
                        "address": "Updated",
                        "postcode": "6666QQ",
                        "phoneNumber": "123456789",
                        "locationId": "5681a4a0c0a2cb0c18fcce9f"
                    }
                })
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('update');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 hotel', function () {
        it('should DELETE /hotels/{id}', function (done) {
            request
                .del('/hotels/' + tmpHotelId)
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('delete');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('ok')
                        .be.exactly(1);
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('n')
                        .be.exactly(1);
                    JSON.parse(res.text).should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('RETREVE all hotels to verify that the original collection is restored', function () {
        it('should GET /hotels', function (done) {
            request
                .get('/hotels')
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'uft-8')
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });
    /** TODO: Create assertions with should */

});

