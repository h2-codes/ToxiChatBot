import { Context } from 'grammy';
import { Message } from '@grammyjs/types';
import { isReply, isTextMessage } from '../../utils/typeGuards';
import { toxicityProbability } from '../../modules/api/perspective';

/**
 * Analyze the replied-to message with Perspective and reply with the
 * probability of it being toxic.
 *
 * @param ctx
 */
export const toxicity = async (ctx: Context): Promise<Message.TextMessage> => {
  const { message } = ctx;

  if (!isReply(message) || !isTextMessage(message.reply_to_message))
    return ctx.reply(
      `You'll need to use that command in a reply to a message with text.`,
    );

  const result = await toxicityProbability(
    message.reply_to_message.text,
    message.chat.id,
  );

  if (result.error)
    return ctx.reply(
      `Sorry, the Perspective API request failed. Please try again later.`,
    );

  return ctx.reply(`${result.score}% likely to be toxic.`);
};
