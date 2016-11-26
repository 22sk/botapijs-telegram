const { Handler } = require('bot22api');
const telegramRequires = require('../requires');
const { Manual } = require('../manuals');

/**
 * Command extends Handler to provide a simple way of creating Command Handlers.
 *
 * @see https://sk22.github.io/botapijs/Handler.html
 */
class Command extends Handler {
  /**
   * For simple commands, use one of the reduced syntaxes.
   * If you need additional properties like options or replaceable, use an
   * object (that usually also includes the callback property)
   *
   * #### **1**. `(object)` - Object constructor
   * #### **2**. `(callable, [manual], [requires])` - Named function constructor
   * #### **3**. `(name, callable, [manual], [requires])` - Function constructor
   *
   * @param {object|Function|string} object            Object, Command's
   *                                                   Callable function with
   *                                                   name, or Command name
   * @param {string}                 object.name       Command
   * @param {Callable~callable}      object.callable   Command's callable
   *                                                   function
   * @param {Manual}                 [object.manual]   Command's Manual
   * @param {Requirement[]}          [object.requires] Requirements
   * @param {Requirement[]|Function} callable          Array of Requirements
   *                                                   or Callable
   * @param {Manual}                 [manual]          Command's Manual
   * @param {Requirement[]}          [requires]        Array of Requirements
   */
  constructor(object = {}, callable, manual, requires) {
    super(object, callable, requires);
    const nameHasCommand = this.name.slice(-7) === 'Command';

    // use name to set command: 'testCommand' -> 'test', 'test' -> 'test'
    this.command = nameHasCommand ? this.name.slice(0, -7) : this.name;

    // if name doesn't already have the Command suffix, add it
    if (!nameHasCommand) this.name += 'Command';

    if (!this.manual) this.manual = manual || new Manual();
    this.manual.command = this.command;
    if (!this.requires) this.requires = [];
    this.requires.push(telegramRequires.command.is(this.command));
  }
}

module.exports = Command;
