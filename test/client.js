const expect = require('chai').expect;

let called = 0;
global.fetch = () => {
  called += 1;
  return Promise.resolve();
};

const fetchTests = (name, target, moreTests = []) => {
  describe(name, () => {
    it('should require a single parameter', () => {
      expect(target.length).to.equal(1);
    });

    it('should return a promise', () => {
      expect(
        Promise.prototype.isPrototypeOf(target('beer'))
      ).to.be.true;
    });

    it('should fetch data from the server', (done) => {
      target('beer').then(() => {
        expect(called > 0).to.be.true;
        done();
      }).catch(done);
    });

    moreTests.forEach(test => test());
  });
};

const noPropsTests = (target) => {
  it('should NOT have a "go", "get" or "me" properties', () => {
    expect(target.go).to.equal(undefined);
    expect(target.get).to.equal(undefined);
    expect(target.me).to.equal(undefined);
  });
};

describe('the "Needy User" fluent API client', () => {
  new Promise((resolve) => {
    it('should be an object', () => {
      const api = require('../client/api');
      expect(api).to.be.an('object');
      resolve(api);
    });
  }).then(api => {
    it('should have a "go" property of type object', () => {
      expect(api.go).to.be.an('object');
    });

    it('the api should have a "get" property of type function', () => {
      expect(api.get).to.be.a('function');
    });

    fetchTests('api.get /api.go.get/', api.get, [() => {
      it('should have a "me" property of type function', () => {
        expect(api.get.me).to.be.a('function');
      });

      it('should NOT have a "go" property', () => {
        expect(api.get.go).to.equal(undefined);
      });
    }]);

    describe('api.go', () => {
      it('should have the same "get" property as the api', () => {
        expect(api.go.get).to.be.a('function');
      });

    });

    fetchTests('api.get.me', api.get.me, [() => {
      it('should have a property called "a" of type function', () => {
        expect(api.get.me.a).to.be.a('function');
      });

      it('should have a property called "everything" of type function', () => {
        expect(api.get.me.everything).to.be.a('function');
      });

      noPropsTests(api.get.me);

      fetchTests("api.get.me.a", api.get.me.a, [noPropsTests.bind(null, api.get.me.a)]);
    }]);

    describe('api/.go/.get.me.everything', () => {
      it('should return a promise', () => {
        expect(
          Promise.prototype.isPrototypeOf(api.go.get.me.everything())
        ).to.be.true;
      });

      it('should NOT expect arguments', () => {
        expect(api.go.get.me.everything.length).to.equal(0);
      });

      it('should resolve to an array of objects with food, drink and tv properties', (done) => {
        api.go.get.me.everything().then(array => {
          expect(array.length).to.equal(3);
          done();
        });
      });
    });
  });
});
