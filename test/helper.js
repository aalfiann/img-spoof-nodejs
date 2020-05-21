 
const assert = require("assert");
const helper = require("../lib/helper.js");

describe("helper function test", function(){

    it("inArray", function() {
        var data = [
            "apng","jpg","jpeg","gif","bmp","png","tiff","webp"
        ];

        assert.equal(helper.inArray(data,"jpeg"),true);
    });

    it("rawurldecode example 1", function() {
        assert.equal(helper.rawurldecode("Kevin+van+Zonneveld%21"),"Kevin+van+Zonneveld!");
    });

    it("rawurldecode example 2", function() {
        assert.equal(helper.rawurldecode("https%3A%2F%2Fkvz.io%2F"),"https://kvz.io/");
    });

    it("rawurldecode example 3", function() {
        assert.equal(helper.rawurldecode("https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3D"),"https://www.google.nl/search?q=Locutus&ie=");
    });

    it("rawurldecode example 4", function() {
        assert.equal(helper.rawurldecode("%%5C%5Cn"),"%\\\\n");
    });

});