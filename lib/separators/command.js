/**
 * Seperates a message text into what a Telegram command can be seperated into
 *
 * @property {boolean} valid   Is the message text a valid Command?
 *                             If false, all other params do not exist.
 * @property {string}  text    Whole message, equal to the constructor's param
 * @property {string}  command Command, e.g. in '/help test' -> 'help'
 * @property {string}  bot     The mentioned bot, e.g. in '/echo@sk22testbot' ->
 *                             'sk22testbot'
 * @property {string}  args    Command's args, e.g. in '/help test' -> 'test'
 */
class CommandSeparator {
  constructor(text) {
    const regex = /^\/([^@\s]+)@?(?:(\S+)|)\s?([\s\S]*)$/i;
    const command = regex.exec(text);
    if (command) {
      this.valid = true;
      this.text = text;
      this.command = command[1];
      this.bot = command[2];
      this.args = command[3];
    } else {
      this.valid = false;
    }
  }
}

module.exports = CommandSeparator;
