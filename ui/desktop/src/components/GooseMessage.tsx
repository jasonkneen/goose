import React from 'react';
import ToolInvocations from './ToolInvocations';
import LinkPreview from './LinkPreview';
import GooseResponseForm from './GooseResponseForm';
import { extractUrls } from '../utils/urlUtils';
import MarkdownContent from './MarkdownContent';
import Avatar from './Avatar';

interface GooseMessageProps {
  message: any;
  messages: any[];
  metadata?: any;
  append: (value: any) => void;
}

export default function GooseMessage({ message, metadata, messages, append }: GooseMessageProps) {
  // Extract URLs under a few conditions
  // 1. The message is purely text
  // 2. The link wasn't also present in the previous message
  // 3. The message contains the explicit http:// or https:// protocol at the beginning
  const messageIndex = messages?.findIndex((msg) => msg.id === message.id);
  const previousMessage = messageIndex > 0 ? messages[messageIndex - 1] : null;
  const previousUrls = previousMessage ? extractUrls(previousMessage.content) : [];
  const urls = !message.toolInvocations ? extractUrls(message.content, previousUrls) : [];

  return (
    <div className="group relative flex items-start gap-3 py-4 px-4 opacity-0 animate-[appear_150ms_ease-in_forwards]">
      <Avatar role="assistant" />
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="flex flex-col items-start gap-2">
          {message.content && (
            <div
              className={`rounded-2xl rounded-tl-none bg-muted px-4 py-2 text-muted-foreground shadow-sm ${message.toolInvocations ? 'rounded-b-none border-b-0' : ''}`}
            >
              <MarkdownContent content={message.content} className="prose-sm max-w-none" />
            </div>
          )}

          {message.toolInvocations && (
            <div className="w-full bg-muted/50 border border-t-0 border-border/50 rounded-2xl rounded-t-none px-4 py-2">
              <ToolInvocations toolInvocations={message.toolInvocations} />
            </div>
          )}
        </div>

        {urls.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {urls.map((url, index) => (
              <LinkPreview key={index} url={url} />
            ))}
          </div>
        )}

        {metadata && (
          <div className="flex">
            <GooseResponseForm message={message.content} metadata={metadata} append={append} />
          </div>
        )}
      </div>
    </div>
  );
}
