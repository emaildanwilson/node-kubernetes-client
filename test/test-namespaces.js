/**
 * test kubernetes minions
 * @author huangqg
 * @date 2015-03-19
 */

var should = require('should');
var assert = require('assert');
var Client = require('../');
var fs = require('fs');
var testData = require('./json/namespace.json');

describe('Test k8s namespaces API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should create a namespace', function(done) {
    client.namespaces.create(testData, function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata']);
      data.metadata.name.should.be.equal(testData.metadata.name);
      done();
    });
  });
  
  it('should return the list of namespaces', function(done) {
    client.namespaces.get(function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Array)
      data[0].should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata', 'items']);
      data[0].items.should.be.an.instanceOf(Array)
      data[0].kind.should.be.equal('NamespaceList');
      done();
    });
  });

  it('should return the namespace with specified id', function(done) {
    var nsId = testData.metadata.name;
    client.namespaces.get(nsId, function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata']);
      data.metadata.name.should.be.equal(testData.metadata.name);
      done();
    });
  });
  
  it('should delete the namespace with specified id', function(done) {
    client.namespaces.delete(testData.metadata.name, function (err, data) {
      assert(err == null);
      data.should.be.an.instanceOf(Object).and.have.properties(['kind', 'apiVersion', 'metadata']);
      data.metadata.name.should.be.equal(testData.metadata.name);
      done();
    });
  });
  
});