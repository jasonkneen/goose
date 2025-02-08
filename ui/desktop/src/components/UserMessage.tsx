import React from 'react';
import LinkPreview from './LinkPreview';
import { extractUrls } from '../utils/urlUtils';
import MarkdownContent from './MarkdownContent';
import Avatar from './Avatar';

export default function UserMessage({ message }) {
  // Extract URLs which explicitly contain the http:// or https:// protocol
  const urls = extractUrls(message.content, []);

  return (
    <div className="user-message flex w-full animate-[appear_150ms_ease-in_forwards] user-message-bg">
      <Avatar role="user" />
      <div className="flex-col flex-1">
        <div className="flex text-white rounded-xl rounded-br-none py-1.5 px-3 message-content font-medium">
          <MarkdownContent content={message.content} className="text-white" />
        </div>

        {/* TODO(alexhancock): Re-enable link previews once styled well again */}
        {false && urls.length > 0 && (
          <div className="flex flex-wrap mt-1">
            {urls.map((url, index) => (
              <LinkPreview key={index} url={url} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
