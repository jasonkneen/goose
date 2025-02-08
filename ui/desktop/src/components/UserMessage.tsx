import React from 'react';
import LinkPreview from './LinkPreview';
import { extractUrls } from '../utils/urlUtils';
import MarkdownContent from './MarkdownContent';
import Avatar from './Avatar';

export default function UserMessage({ message }) {
  // Extract URLs which explicitly contain the http:// or https:// protocol
  const urls = extractUrls(message.content, []);

  return (
    <div className="group relative flex items-start gap-3 py-4 px-4">
      <Avatar role="user" />
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="flex flex-col items-start gap-2">
          <div className="rounded-2xl rounded-tl-none bg-primary px-4 py-2 text-white shadow-md">
            <MarkdownContent
              content={message.content}
              className="prose-sm prose-invert max-w-none"
            />
          </div>
        </div>
        {urls.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {urls.map((url, index) => (
              <LinkPreview key={index} url={url} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
