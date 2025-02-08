import React, { useEffect, useRef, useState } from 'react';
import { Message, useChat } from './ai-sdk-fork/useChat';
import { getApiUrl, getSecretKey } from './config';
import BottomMenu from './components/BottomMenu';
import FlappyGoose from './components/FlappyGoose';
import GooseMessage from './components/GooseMessage';
import Input from './components/Input';
import LoadingGoose from './components/LoadingGoose';
import MoreMenu from './components/MoreMenu';
import { Card } from './components/ui/card';
import { ScrollArea, ScrollAreaHandle } from './components/ui/scroll-area';
import UserMessage from './components/UserMessage';
import WingToWing, { Working } from './components/WingToWing';
import { askAi } from './utils/askAI';
import { getStoredModel, Provider } from './utils/providerUtils';
import { ChatLayout } from './components/chat_window/ChatLayout';
import { ChatRoutes } from './components/chat_window/ChatRoutes';
import { WelcomeScreen } from './components/welcome_screen/WelcomeScreen';
import { getStoredProvider, initializeSystem } from './utils/providerUtils';
import { useModel } from './components/settings/models/ModelContext';
import { useRecentModels } from './components/settings/models/RecentModels';
import { createSelectedModel } from './components/settings/models/utils';
import { getDefaultModel } from './components/settings/models/hardcoded_stuff';
import Splash from './components/Splash';

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

export function ChatContent({
  chats,
  setChats,
  selectedChatId,
  initialQuery,
  setProgressMessage,
  setWorking,
}: {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  selectedChatId: number;
  setSelectedChatId: React.Dispatch<React.SetStateAction<number>>;
  initialQuery: string | null;
  setProgressMessage: React.Dispatch<React.SetStateAction<string>>;
  setWorking: React.Dispatch<React.SetStateAction<Working>>;
}) {
  const chat = chats.find((c: Chat) => c.id === selectedChatId);
  const [messageMetadata, setMessageMetadata] = useState<Record<string, string[]>>({});
  const [hasMessages, setHasMessages] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
  const [showGame, setShowGame] = useState(false);
  const [working, setWorkingLocal] = useState<Working>(Working.Idle);
  const scrollRef = useRef<ScrollAreaHandle>(null);

  useEffect(() => {
    setWorking(working);
  }, [working, setWorking]);

  const updateWorking = (newWorking: Working) => {
    setWorkingLocal(newWorking);
  };

  const { messages, append, stop, isLoading, error, setMessages } = useChat({
    api: getApiUrl('/reply'),
    initialMessages: chat?.messages || [],
    onToolCall: ({ toolCall }) => {
      updateWorking(Working.Working);
      setProgressMessage(`Executing tool: ${toolCall.toolName}`);
    },
    onResponse: (response) => {
      if (!response.ok) {
        setProgressMessage('An error occurred while receiving the response.');
        updateWorking(Working.Idle);
      } else {
        setProgressMessage('thinking...');
        updateWorking(Working.Working);
      }
    },
    onFinish: async (message, _) => {
      window.electron.stopPowerSaveBlocker();
      setTimeout(() => {
        setProgressMessage('Task finished. Click here to expand.');
        updateWorking(Working.Idle);
      }, 500);

      const fetchResponses = await askAi(message.content);
      setMessageMetadata((prev) => ({ ...prev, [message.id]: fetchResponses }));

      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      window.electron.logInfo('last interaction:' + lastInteractionTime);
      if (timeSinceLastInteraction > 60000) {
        // 60000ms = 1 minute

        window.electron.showNotification({
          title: 'Goose finished the task.',
          body: 'Click here to expand.',
        });
      }
    },
  });

  // Update chat messages when they change
  useEffect(() => {
    const updatedChats = chats.map((c) => (c.id === selectedChatId ? { ...c, messages } : c));
    setChats(updatedChats);
  }, [messages, selectedChatId]);

  const initialQueryAppended = useRef(false);
  useEffect(() => {
    if (initialQuery && !initialQueryAppended.current) {
      append({ role: 'user', content: initialQuery });
      initialQueryAppended.current = true;
    }
  }, [initialQuery]);

  useEffect(() => {
    if (messages.length > 0) {
      setHasMessages(true);
    }
  }, [messages]);

  // Handle submit
  const handleSubmit = (e: { detail?: { value: string } }) => {
    window.electron.startPowerSaveBlocker();
    const content = e.detail?.value || '';
    if (content.trim()) {
      setLastInteractionTime(Date.now());
      append({
        role: 'user',
        content: content,
      });
      if (scrollRef.current?.scrollToBottom) {
        scrollRef.current.scrollToBottom();
      }
    }
  };

  if (error) {
    console.log('Error:', error);
  }

  const onStopGoose = () => {
    stop();
    setLastInteractionTime(Date.now());
    window.electron.stopPowerSaveBlocker();

    const lastMessage: Message = messages[messages.length - 1];
    if (lastMessage.role === 'user' && lastMessage.toolInvocations === undefined) {
      // Remove the last user message.
      if (messages.length > 1) {
        setMessages(messages.slice(0, -1));
      } else {
        setMessages([]);
      }
    } else if (lastMessage.role === 'assistant' && lastMessage.toolInvocations !== undefined) {
      // Add messaging about interrupted ongoing tool invocations
      const newLastMessage: Message = {
        ...lastMessage,
        toolInvocations: lastMessage.toolInvocations.map((invocation) => {
          if (invocation.state !== 'result') {
            return {
              ...invocation,
              result: [
                {
                  audience: ['user'],
                  text: 'Interrupted.\n',
                  type: 'text',
                },
                {
                  audience: ['assistant'],
                  text: 'Interrupted by the user to make a correction.\n',
                  type: 'text',
                },
              ],
              state: 'result',
            };
          } else {
            return invocation;
          }
        }),
      };

      const updatedMessages = [...messages.slice(0, -1), newLastMessage];
      setMessages(updatedMessages);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <div className="relative flex items-center h-[32px] w-full bg-bgSubtle border-b border-borderSubtle">
          <div className="w-full max-w-3xl mx-auto">
            <MoreMenu />
          </div>
        </div>
        <div className="w-full max-w-3xl mx-auto">
          <Card className="flex flex-col flex-1 rounded-2xl h-[calc(100vh-90px)] w-full bg-bgApp mt-0 border-none relative mb-[58px]">
            {messages.length === 0 ? (
              <Splash append={append} />
            ) : (
              <ScrollArea ref={scrollRef} className="flex-1 px-3" autoScroll>
                {messages.map((message) => (
                  <div key={message.id} className="mt-[24px]">
                    {message.role === 'user' ? (
                      <UserMessage message={message} />
                    ) : (
                      <GooseMessage
                        message={message}
                        messages={messages}
                        metadata={messageMetadata[message.id]}
                        append={append}
                      />
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <div onClick={() => setShowGame(true)} style={{ cursor: 'pointer' }}></div>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="text-red-700 dark:text-red-300 bg-red-400/50 p-3 rounded-lg mb-1">
                      {error.message || 'Honk! Goose experienced an error while responding'}
                      {(error as any).status && (
                        <span className="ml-2">(Status: {(error as any).status})</span>
                      )}
                    </div>
                    <div
                      className="px-3 py-2 mt-1 text-center whitespace-nowrap cursor-pointer text-textStandard border border-borderSubtle hover:bg-bgSubtle rounded-full inline-block transition-all duration-150"
                      onClick={async () => {
                        const lastUserMessage = messages.reduceRight(
                          (found, m) => found || (m.role === 'user' ? m : null),
                          null
                        );
                        if (lastUserMessage) {
                          append({
                            role: 'user',
                            content: lastUserMessage.content,
                          });
                        }
                      }}
                    >
                      Retry Last Message
                    </div>
                  </div>
                )}
                <div className="block h-16" />
              </ScrollArea>
            )}

            <div className="relative">
              {isLoading && <LoadingGoose />}
              <Input
                handleSubmit={handleSubmit}
                disabled={isLoading}
                isLoading={isLoading}
                onStop={onStopGoose}
              />
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-screen bg-bgApp border-t border-borderSubtle">
        <div className="w-full">
          <div className="max-w-3xl mx-auto py-2">
            <BottomMenu hasMessages={hasMessages} />
          </div>
        </div>
      </div>

      {showGame && <FlappyGoose onClose={() => setShowGame(false)} />}
    </>
  );
}

export default function ChatWindow() {
  // Shared function to create a chat window
  const openNewChatWindow = () => {
    window.electron.createChatWindow();
  };
  const { switchModel } = useModel(); // Access switchModel via useModel
  const { addRecentModel } = useRecentModels(); // Access addRecentModel from useRecentModels

  // Add keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Command+N (Mac) or Control+N (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        event.preventDefault(); // Prevent default browser behavior
        openNewChatWindow();
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Get initial query and history from URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get('initialQuery');
  const historyParam = searchParams.get('history');
  const initialHistory = historyParam ? JSON.parse(decodeURIComponent(historyParam)) : [];

  const [chats, setChats] = useState<Chat[]>(() => {
    const firstChat = {
      id: 1,
      title: initialQuery || 'Chat 1',
      messages: initialHistory.length > 0 ? initialHistory : [],
    };
    return [firstChat];
  });

  const [selectedChatId, setSelectedChatId] = useState(1);
  const [mode, setMode] = useState<'expanded' | 'compact'>(initialQuery ? 'compact' : 'expanded');
  const [working, setWorking] = useState<Working>(Working.Idle);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string | Provider | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  // Add this useEffect to track changes and update welcome state
  const toggleMode = () => {
    const newMode = mode === 'expanded' ? 'compact' : 'expanded';
    console.log(`Toggle to ${newMode}`);
    setMode(newMode);
  };

  window.electron.logInfo('ChatWindow loaded');

  // Fix the handleSubmit function syntax
  const handleSubmit = () => {
    setShowWelcomeModal(false);
  };

  useEffect(() => {
    // Check if we already have a provider set
    const config = window.electron.getConfig();
    const storedProvider = getStoredProvider(config);

    if (storedProvider) {
      setShowWelcomeModal(false);
    } else {
      setShowWelcomeModal(true);
    }
  }, []);

  const storeSecret = async (key: string, value: string) => {
    const response = await fetch(getApiUrl('/configs/store'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Secret-Key': getSecretKey(),
      },
      body: JSON.stringify({ key, value }),
    });

    if (!response.ok) {
      throw new Error(`Failed to store secret: ${response.statusText}`);
    }

    return response;
  };

  // Initialize system on load if we have a stored provider
  useEffect(() => {
    const setupStoredProvider = async () => {
      const config = window.electron.getConfig();

      if (config.GOOSE_PROVIDER && config.GOOSE_MODEL) {
        window.electron.logInfo(
          'Initializing system with environment: GOOSE_MODEL and GOOSE_PROVIDER as priority.'
        );
        await initializeSystem(config.GOOSE_PROVIDER, config.GOOSE_MODEL);
        return;
      }
      const storedProvider = getStoredProvider(config);
      const storedModel = getStoredModel();
      if (storedProvider) {
        try {
          await initializeSystem(storedProvider, storedModel);

          if (!storedModel) {
            // get the default model
            const modelName = getDefaultModel(storedProvider.toLowerCase());

            // create model object
            const model = createSelectedModel(storedProvider.toLowerCase(), modelName);

            // Call the context's switchModel to track the set model state in the front end
            switchModel(model);

            // Keep track of the recently used models
            addRecentModel(model);

            console.log('set up provider with default model', storedProvider, modelName);
          }
        } catch (error) {
          console.error('Failed to initialize with stored provider:', error);
        }
      }
    };

    setupStoredProvider();
  }, []);

  // Render WelcomeScreen at root level if showing
  if (showWelcomeModal) {
    return <WelcomeScreen onSubmit={handleSubmit} />;
  }

  // Only render ChatLayout if not showing welcome screen
  return (
    <div>
      <ChatLayout mode={mode}>
        <ChatRoutes
          chats={chats}
          setChats={setChats}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
          setProgressMessage={setProgressMessage}
          setWorking={setWorking}
        />
      </ChatLayout>
    </div>
  );
}
