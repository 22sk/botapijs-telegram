/**
 * Provides default values for Telegram Bots
 * @module defaults
 */

const { Manual } = require('./manuals');
const { Command } = require('./handlers');
const { parsers } = require('bot22api');
const camelCase = require('camelcase');

/**
 * Array of default handlers
 * @type {Handler[]}
 * @see  https://22sk.github.io/botapijs/Handler.html
 */
exports.handlers = [
  new Command({
    name: 'start',
    options: {
      message: 'Please change your startCommand handler message with a new ' +
        'one by adding something like this to your code:\n' +
        "`bot.handlers.startCommand.options.message = 'Hello friend!'`"
    },
    callable: (done, { data, processor, options }) => {
      processor.send('sendMessage', {
        chat_id: data.message.chat.id,
        text: options.message,
        parse_mode: 'Markdown'
      }); done();
    },
    manual: new Manual({ description: 'Welcome!' }),
    replaceable: true
  }),

  new Command({
    name: 'help',
    callable: (done, { data, params, processor,
      handler: { options }, bot }) => {
      // loop through every manual and add it to the message's text
      if (params.command.args) {
        const requestedCommand = params.command.args.trim().replace('/', '');
        if (!bot.handlers[camelCase(requestedCommand, 'command')]) {
          processor.send('sendMessage', {
            chat_id: data.message.chat.id,
            parse_mode: 'Markdown',
            text: options.templates.notExist(requestedCommand)
          });
        } else {
          processor.send('sendMessage', {
            chat_id: data.message.chat.id,
            parse_mode: 'Markdown',
            text: options.templates.singleCommand(
              bot.handlers[camelCase(requestedCommand, 'command')].manual)
          });
        }
      } else {
        const commands = [];
        for (const key of Object.keys(bot.handlers)) {
          if (bot.handlers[key] && bot.handlers[key].manual) {
            const manual = bot.handlers[key].manual;
            commands.push(options.templates.command(manual));
          }
        }
        const commandsText = options.templates.commands(...commands);
        processor.send('sendMessage', {
          chat_id: data.message.chat.id,
          parse_mode: 'Markdown',
          text: options.templates.body({
            intro: options.templates.intro,
            commands: commandsText
          })
        });
      }
      done();
    },
    options: {
      templates: {
        body: ({ intro, commands }) => `${intro}\n\n${commands}`,
        intro: 'To get help for a specific command, use\n`/help <command>`',
        command: (manual) => {
          let text = typeof manual.command === 'string'
          ? `/${manual.command}`
          : `/${manual.command.join(', /')}`;
          if (manual.description) text += `: ${manual.description}`;
          return text;
        },
        commands: (...commands) => commands.join('\n'),
        notExist: (requestedCommand) => `The command /${requestedCommand} ` +
          'does not exist!\n Consider executing /help to get a list of all ' +
          'available commands. ;)',
        singleCommand: (manual) => `/${manual.command} ` +
          `\`${manual.syntax || ''}\`\n${manual.description || ''}\n\n` +
          `${manual.explanation || ''}`
      }
    },
    manual: new Manual({
      description: 'Get help for commands',
      syntax: '[<command>]',
      explanation: 'This command displays the help page for either all ' +
        'commands or the detailed explanation of a single command by passing ' +
        'the command name to the /help command, for example /help echo to ' +
        'display the in-depth information of the help command.'
    })
  })
];

/**
 * Default parser
 * @type {Requirement}
 */
exports.parser = parsers.json;
