const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const testGet = (api, path, { expectedStatus = 200, expectedBody, expectedProperties = [] } = {}, done) => (
  new Promise(resolve => request(api).get(path).end((err, res) => {
    try {
      if (expectedStatus) {
        expect(res).to.have.status(expectedStatus);
      }

      if (expectedBody) {
        expect(res.body).to.deep.equal(expectedBody);
      }

      expectedProperties.forEach(prop => {
        expect(res.body).to.have.property(prop);
      });
      done();
      resolve(res);
    } catch (error) {
      done(error);
      resolve(res);
    }
  })
));

describe('the "Needy User" express backend', () => {
  new Promise((resolve) => {
    it('should be a module exporting a function', (done) => {
      const api = require('../server/api.js');
      expect(api).to.be.a('function');
      resolve(api);
      done();
    });
  }).then((api) => {
    describe('GET /food', () => {
      it('should return an object with a "food" property', (done) => {
        testGet(api, '/food', { expectedProperties: ['food'] }, done);
      });
    });
    describe('GET /drink', () => {
      it('should return an object with a "drink" property', (done) => {
        testGet(api, '/drink', { expectedProperties: ['drink'] }, done);
      });
    });

    describe('GET /tv', () => {
      it('should return an object with a "tv" property', (done) => {
        testGet(api, '/tv', { expectedProperties: ['tv']} , done);
      });
    });

    describe('API limits', () => {
      it('should allow a total of 10 food/drink/tv requests then return an object with an "error" property', (done) => {
        const requests = [];
        for (let i = 0; i < 15; i+=1) {
          requests.push(testGet(api, '/food', {expectedStatus: null}, () => {}));
        }

        Promise.all(requests).then((results) => {
          const stats = results.reduce((rez, next) => {
            if (next.body.food) {
              rez.food += 1;
            }

            if (next.body.error) {
              rez.errors += 1;
            }

            return rez;
          }, {food:0, errors:0});
          try{
            expect(stats.errors).to.equal(8); // for the 3 previous requests
            expect(stats.food).to.equal(7);
            done();
          }
          catch(error) {
            done(error);
          }
        });
      });
    });

    after(() => {
      setTimeout(() => process.exit(), 100);
    });
  });
});
