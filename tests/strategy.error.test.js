/* global describe, it, expect, before */

var chai = require('chai'),
    Strategy = require('../lib/strategy');


describe('Strategy', function() {

    describe('encountering an error during verification', function() {
        var strategy = new Strategy(function(token, done) {
            done(new Error('something went wrong'));
        });

        var err;

        before(function(done) {
            chai.passport(strategy)
                .error(function(e) {
                    err = e;
                    done();
                })
                .req(function(req) {
                    req.body = {};
                    req.body.token = 'sdcoidsho3453oihrviowhv9082*é';
                })
                .authenticate();
        });

        it('should error', function() {
            expect(err).to.be.an.instanceof(Error);
            expect(err.message).to.equal('something went wrong');
        });
    });

    describe('encountering an exception during verification', function() {
        var strategy = new Strategy(function(token, done) {
            throw new Error('something went horribly wrong');
        });

        var err;

        before(function(done) {
            chai.passport(strategy)
                .error(function(e) {
                    err = e;
                    done();
                })
                .req(function(req) {
                    req.body = {};
                    req.body.token = 'sdcqbiu234iub2fudsv89df35489ynhu';
                })
                .authenticate();
        });

        it('should error', function() {
            expect(err).to.be.an.instanceof(Error);
            expect(err.message).to.equal('something went horribly wrong');
        });
    });

});
