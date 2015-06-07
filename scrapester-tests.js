// Write your tests here!
// Here is an example.
if (Meteor.isServer) {

  // Test S.get, a wrapper around request
  Tinytest.add('S retrieves a url and returns a string', function (test) {
    var yahoo = S.get('http://www.yahoo.com');
    var html = yahoo.result;
    var error = yahoo.error;
    test.equal(error, null);
    test.equal(_.isString(html), true);
  });

  Tinytest.add('S returns an error when the url is incorrect', function (test) {
    var yahoo = S.get('http://wwww.ydahoo.comf');
    var html = yahoo.result;
    var error = yahoo.error;
    test.equal(_.isNull(error), false);
    test.equal(_.isNull(html), true);
    test.equal(error.code, 'ENOTFOUND');
  });

  // Test S.parse, a wrapper around request/cheerio
  Tinytest.add('S parses a sites HTML into a cheerio object', function (test) {
    var yahoo = S.parse('http://www.yahoo.com');
    test.equal(_.isObject(yahoo), true);
  });

  // Test S.links, a function to extract all links from a url
  Tinytest.add('S extracts links from a site', function (test) {
    var links = S.links('http://www.yahoo.com');
    test.equal(_.isArray(links), true);
    test.equal((links.length > 0), true);
    links.forEach(function(link){
      var keys = Object.keys(link);
      test.equal(keys[0],'href');
      test.equal(keys[1], 'text');
    });
  });
}
