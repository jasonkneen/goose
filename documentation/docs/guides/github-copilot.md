# Setting Up and Using the Github Copilot Language Server SDK

This guide will walk you through the steps to set up and use the Github Copilot Language Server SDK in your project.

## Prerequisites

Before you begin, ensure you have the following:

- A Github account
- Access to the Github Copilot Language Server SDK
- Node.js installed on your machine

## Step 1: Install the SDK

First, you need to install the Github Copilot Language Server SDK. You can do this using npm:

```bash
npm install @github/copilot-language-server-sdk
```

## Step 2: Configure the SDK

Next, you need to configure the SDK in your project. Open the `ui/desktop/src/config.ts` file and add the following configuration setting for the Github Copilot Language Server API key:

```typescript
export const getCopilotApiKey = (): string => {
  return window.appConfig.get('COPILOT_API_KEY');
};
```

## Step 3: Initialize the SDK

Now, you need to initialize the SDK in your project. Open the `ui/desktop/src/App.tsx` file and add the following code to configure the Github Copilot Language Server:

```typescript
import { CopilotLanguageServer } from '@github/copilot-language-server-sdk';

const copilotServer = new CopilotLanguageServer(api, { headers, fetch });
```

## Step 4: Use the SDK

Finally, you can use the SDK in your project. Open the `ui/desktop/src/ai-sdk-fork/call-custom-chat-api.ts` file and add the following code to call the Github Copilot Language Server API:

```typescript
import { CopilotLanguageServer } from '@github/copilot-language-server-sdk';

async function callCopilotLanguageServerApi({
  api,
  body,
  headers,
  abortController,
  onResponse,
  onUpdate,
  onFinish,
  onToolCall,
  generateId,
  fetch = getOriginalFetch(),
}: {
  api: string;
  body: Record<string, any>;
  headers: HeadersInit | undefined;
  abortController: (() => AbortController | null) | undefined;
  onResponse: ((response: Response) => void | Promise<void>) | undefined;
  onUpdate: (newMessages: Message[], data: JSONValue[] | undefined) => void;
  onFinish: UseChatOptions['onFinish'];
  onToolCall: UseChatOptions['onToolCall'];
  generateId: IdGenerator;
  fetch: ReturnType<typeof getOriginalFetch> | undefined;
}) {
  const copilotServer = new CopilotLanguageServer(api, { headers, fetch });
  const response = await copilotServer.sendRequest(body, abortController?.()?.signal);

  if (onResponse) {
    try {
      await onResponse(response);
    } catch (err) {
      throw err;
    }
  }

  if (!response.ok) {
    throw new Error((await response.text()) ?? 'Failed to fetch the chat response.');
  }

  if (!response.body) {
    throw new Error('The response body is empty.');
  }

  await processCustomChatResponse({
    stream: response.body,
    update: onUpdate,
    onToolCall,
    onFinish({ message, finishReason, usage }) {
      if (onFinish && message != null) {
        onFinish(message, { usage, finishReason });
      }
    },
    generateId,
  });
}
```

## Conclusion

You have successfully set up and used the Github Copilot Language Server SDK in your project. You can now leverage the power of Github Copilot to enhance your development workflow.
