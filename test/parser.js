var underscored = require("./../index.js");

describe("string to object properties", function(){
	it("should parse underscored properties into a nested object", function(){
		var obj = {
			"foo_a": "prop",
			"foo_b": 2
		};

		var objExpected = {
			foo: {
				a: "prop",
				b: 2
			}
		};

		expect(underscored.parse(obj)).to.deep.equal(objExpected);
	});
});