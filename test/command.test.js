const Command = require('../lib/handlers/command');
const { assert } = require('chai');

describe('Command', () => {
  it("constructs with reduced syntax: name 'testCommand'", (done) => {
    const command = new Command('testCommand', () => {});
    assert.equal(command.name, 'testCommand');
    assert.equal(command.command, 'test');
    done();
  });

  it("constructs with reduced syntax: name 'test'", (done) => {
    const command = new Command('test', () => {});
    assert.equal(command.name, 'testCommand');
    assert.equal(command.command, 'test');
    done();
  });
});
