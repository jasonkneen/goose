import React from 'react';
import LinkPreview from './LinkPreview';
import { extractUrls } from '../utils/urlUtils';
import MarkdownContent from './MarkdownContent';

export default function UserMessage({ message }) {
  // Extract URLs which explicitly contain the http:// or https:// protocol
  const urls = extractUrls(message.content, []);

  return (
    <div className="user-message flex justify-end mt-[16px] w-full animate-[appear_150ms_ease-in_forwards] user-message-bg">
      <div className="flex-col max-w-[85%]">
        <div className="flex text-white rounded-xl rounded-br-none py-2 px-3 message-content">
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
