import { Context, InlineKeyboard } from 'grammy';
import { Message } from '@grammyjs/types';
import { isPrivateChat, isUserAdmin } from '../../utils/telegramUtils';

/**
 * Create an "opt-in" message.
 *
 * Creates a message with a button for users to express their desire to stay in the group.
 * If sent in a direct message to the bot, the user will be instructed to forward the
 * generated message to the group they want to track.
 *
 * @param ctx
 */
export const generate = async (ctx: Context): Promise<Message.TextMessage> => {
  if (isPrivateChat(ctx)) {
    // Below commented because the forwarded message doesn't show the button.
    // TODO: Figure out how to make the button forward
    // await ctx.reply(
    //   'Forward the following message to your group, or re-run this command in the group.'
    // );
    return ctx.reply(
      'Run this command in a group to generate a button for its users to click.',
    );
  }

  if (!(await isUserAdmin(ctx, ctx.from.id))) {
    return ctx.reply('Only admins can use this feature.');
  }

  return ctx.reply('Do you want to stay in this group? Click this button.', {
    reply_markup: new InlineKeyboard().text('I want to stay!', 'optin'),
  });
};
