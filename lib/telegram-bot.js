const Bot = require('bot22api');
const parsers = { Bot };
const defaults = require('./defaults');

/**
 * Telegram-optimized Bot
 * Sets default values etc. to what Telegram's Bot API requires
 *
 * @property {object} me Telegram Bot's identity (data returned by `getMe`)
 */
class TelegramBot extends Bot {

  /**
   * @param {object} options       Normal Bot class' constructor object
   * @param {string} options.token Bot's API token without Telegram's URL
   *                               If set, it replaces object.apiUrl
   *
   * @see https://22sk.github.io/botapijs/Bot.html
   */
  constructor(object = {}) {
    if (object.token) {
      Object.assign(object, {
        apiUrl: `https://api.telegram.org/bot${object.token}/`
      });
    }
    super(object);

    if (!this.parser) this.parser = parsers.json;

    // registering default handlers
    defaults.handlers.forEach((handler) => this.register(handler));

    // identifying the bot
    this.identify();

    this.parser = defaults.parser;
  }

  /**
   * Gets the bot's identity using Telegram Bot API's /getMe method
   * and saves it to this.me
   */
  identify() {
    this.send('getMe', {}, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      this.me = body.ok ? body.result : null;
      if (body.result) this.logPrefix = body.result.username;
      this.log.http('telegram', 'Me', this.me);
    }, true); // true (silent) prevents the send method from logging the result
  }
}

module.exports = TelegramBot;
