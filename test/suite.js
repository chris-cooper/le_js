wru.test([
  {
    name: 'single arg stream construction',
    test: function() {
      wru.assert(true, LE.init('TOKEN'));
    }
  },
  {
    name: 'basic stream construction with dict',
    test: function() {
      wru.assert(true, LE.init({token: 'foo'}));
    }
  },
  {
    name: 'submit simple string event',
    test: function() {
      XMLHttpRequest.spy = function(data) {
        wru.assert(true, data === "Hello, world!");
      }
      LE.init({token:'foo'});
      LE.log("Hello, world!");
    }
  },
  {
    name: 'submit interpolated string event',
    test: function() {
      XMLHttpRequest.spy = function(data) {
        wru.assert(true, data === "Hello, 1 more...");
      }
      LE.init({token:'foo'});
      LE.log("Hello,", 1, "more...");
    }
  },
  {
    name: 'submit array of strings',
    test: function() {
      XMLHttpRequest.spy = function(data) {
        wru.assert(true, data === "Hello, logger");
      }
      LE.init({token:'foo'});
      LE.log("Hello,", "logger");
    }
  },
  {
    name: 'submit object event',
    test: function() {
      XMLHttpRequest.spy = function(data) {
        wru.assert(true, data === "Hello=world!");
      }
      LE.init({token:'foo'});
      LE.log({"Hello": "world!"});
    }
  },
  {
    name: 'init cannot work without token',
    test: function() {
      var didFail = false;
      try {
        var le = LE.init();
      } catch (err) {
        wru.assert(err.message === "Token not present.");
        wru.assert(true, le === undefined);
        didFail = true;
      }

      wru.assert(true, didFail);
    }
  },
  {
    name: 'init cannot work without token (with object param)',
    test: function() {
      var didFail = false;
      try {
        var le = LE.init({});
      } catch (err) {
        wru.assert(err.message === "Token not present.");
        wru.assert(true, le === undefined);
        didFail = true;
      }

      wru.assert(true, didFail);
    }
  },
  {
    name: 'test catchall handler works',
    test: function() {
      LE.init({token: 'SOME-TOKEN', catchall: true});
      wru.assert(true, onerror !== undefined);
    }
  },
  {
    name: 'test log() with null array values handled properly',
    test: function() {
      LE.init('SOME-TOKEN');

      XMLHttpRequest.spy = function(data) {
        wru.assert(true, data === "This is null null");
      }

      LE.log("This is null", null);
    }
  },
  {
    name: 'test log() with undef array values handled properly',
    test: function() {
      LE.init('SOME-TOKEN');

      XMLHttpRequest.spy = function(data) {
        wru.assert(true, data === "This is null undefined");
      }

      LE.log("This is null", undefined);
    }
  },
  {
    name: 'test log() with object w/ nullish members handled properly',
    test: function() {
      LE.init('SOME-TOKEN');

      XMLHttpRequest.spy = function(data) {
        wru.assert(true, data === "event=data&complex.a=null&complex.b=undefined");
      }

      LE.log({
        event: 'data',
        complex: {
          a: null,
          b: undefined
        }
      });
    }
  },
  {
    name: 'test log() w/ nullish nested array elements',
    test: function() {
      LE.init('SOME-TOKEN');

      XMLHttpRequest.spy = function(data) {
        wru.assert(true, data === "[some,event,[nested,null]]");
      }

      LE.log(["some", "event", ["nested", null]]);
    }
  },
  {
    name: 'test log() w/ nullish objects + arrays',
    test: function() {
      LE.init('SOME-TOKEN');

      XMLHttpRequest.spy = function(data) {
        var str = "some=event&complex.nested=[null,[again]]&complex.some=undefined";
        wru.assert(true, data === str);
      }

      LE.log({
        some: 'event',
        complex: {
          nested: [null, ['again']],
          some: undefined
        }
      });
    }
  }
]);
