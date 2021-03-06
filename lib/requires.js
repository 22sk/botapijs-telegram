/** @module requires */

const { CommandSeparator } = require('./separators');
const { requires } = require('bot22api');
const { Requirement } = require('bot22api');
const camelCase = require('camelcase');

/**
 * Determines if data looks like a Telegram update
 */
exports.telegram = new Requirement({
  name: 'telegramLike',
  callable: (done, { data }) => {
    if (data && data.update_id) {
      const keys = Object.keys(data);
      const types = [
        'message', 'edited_message', 'inline_query',
        'chosen_inline_result', 'callback_query'
      ];
      for (const type of types) {
        if (keys.includes(type)) {
          return done(null, { type });
        }
      }
    }
    done(true);
  }
});

/**
 * Determines if data looks like given type of Telegram update
 *
 * @param  {string} type Type of Telegram update
 * @return {Requirement}
 */
exports.telegram.type = (type) => (new Requirement({
  name: camelCase('telegramUpdateType', type),
  requires: exports.telegram,
  callable: (done, { params }) => done(params.telegram.type !== type)
}));


/**
 * Checks if data has a usable command
 * (false even if it has a command but the username does not equal to the bot's)
 */
exports.command = new Requirement({
  name: 'command',
  requires: [exports.telegram, requires.has('message', 'text')],
  callable: (done, { data, bot }) => {
    const command = new CommandSeparator(data.message.text);
    if (!command.valid || command.bot && bot.me.username !== command.bot) {
      // command is not valid or not meant to be handled by this bot
      return done(true);
    }
    // command is valid and should be handled by this bot
    // write command into params
    done(null, command);
  }
});

/**
 * Checks if command equals to given name
 *
 * @param  {String|String[]} name    The command or array of possible commands
 * @param  {object}          options
 * @return {Requirement}
 */
exports.command.is = (name, { caseSensitive, noTrim } = {}) => (
  new Requirement({
    name: camelCase('is command',
      name instanceof Array ? name.join(' ') : name),
    requires: [exports.command],
    callable: (done, { params }) => {
      // put name into array if isn't already
      if (typeof name === 'string') name = [name];

      // trim and lowercase every name
      for (let i = 0; i < name.length; i++) {
        name[i] = noTrim ? name[i] : name[i].trim();
        name[i] = caseSensitive ? name[i] : name[i].toLowerCase();
      }
      let command = params.command.command;
      command = noTrim ? command : command.trim();
      command = caseSensitive ? command : command.toLowerCase();
      done(!name.includes(command));
    }
  })
);
