"use client";

import * as React from "react";
import { Paperclip, User, Bot, Copy, Check, Brain, Send, FileText, Shield, Target, BarChart } from "lucide-react";
import { AssistantStream } from "openai/lib/AssistantStream";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ChatSideBar } from "@/components/ChatSideBar";
import { Logo } from "@/components/ui/logo";
import { generateSalesScript, handleObjection, generateComparables, researchLocation } from "@/utils/real-estate";
import { performWebSearch } from "@/utils/search";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  SalesScriptDialog, 
  ObjectionHandlerDialog, 
  ComparablesDialog, 
  LocationResearchDialog 
} from "@/components/dialogs/tool-dialogs";

import { Header } from "@/components/ui/header";
import { useSession, signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCircle, LogOut } from "lucide-react";

type MessageProps = {
  role: "user" | "assistant" | "code";
  content: string;
};

type SessionProps = {
  id: string;
  messages: MessageProps[];
  title?: string;
  createdAt: number;
};

interface CodeProps {
  className?: string;
  children: React.ReactNode;
}



const LoadingSpinner = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-white" />
      <span className="text-sm text-neutral-400">Thinking...</span>
    </div>
  );
};

const Message = ({ role, content }: MessageProps) => {
  const isUser = role === "user";
  const isGenerating = content === "" && role === "assistant";
  const [isCopied, setIsCopied] = useState(false);
  

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group w-full text-gray-100 border-b border-neutral-800",
        isUser ? "" : "bg-neutral-900"
      )}
    >
      <div className="text-base gap-4 md:gap-6 m-auto flex p-4 md:py-6 lg:px-8 xl:px-16 max-w-3xl">
        <div className="flex-shrink-0 flex flex-col relative items-end">
          <div
            className={cn(
              "rounded-sm flex items-center justify-center w-[30px] h-[30px]",
              isUser ? "bg-reva-600" : "bg-teal-500"
            )}
          >
            {isUser ? (
              <User className="h-5 w-5 text-white" />
            ) : (
              <Bot className="h-5 w-5 text-white" />
            )}
          </div>
        </div>
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3">
          {isUser ? (
            <p className="text-white whitespace-pre-wrap">{content}</p>
          ) : isGenerating ? (
            <LoadingSpinner />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children }: CodeProps) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeText = String(children).replace(/\n$/, "");

                  if (match) {
                    return (
                      <div className="relative group/code">
                        <div className="absolute right-2 top-2 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleCopy(codeText)}
                            className={cn(
                              "flex items-center gap-1.5 px-2 py-1 rounded-md",
                              "bg-neutral-700/50 hover:bg-neutral-700",
                              "text-xs text-neutral-200 hover:text-white",
                              "transition-colors duration-200"
                            )}
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-green-500" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>Copy code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="relative rounded-md border border-neutral-700/50 overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 bg-[#1E1E1E] border-b border-neutral-700/50">
                            <span className="text-xs text-neutral-400">
                              {match[1].toUpperCase()}
                            </span>
                          </div>
                          <SyntaxHighlighter
                            style={{
                              ...tomorrow,
                              'pre[class*="language-"]': {
                                ...tomorrow['pre[class*="language-"]'],
                                backgroundColor: "#1E1E1E",
                                margin: 0,
                                padding: "1rem",
                                userSelect: "text",
                              },
                              'code[class*="language-"]': {
                                ...tomorrow['code[class*="language-"]'],
                                backgroundColor: "#1E1E1E",
                                color: "#D4D4D4",
                                textShadow: "none",
                                userSelect: "text",
                              },
                              comment: { color: "#6A9955" },
                              string: { color: "#CE9178" },
                              "template-string": { color: "#CE9178" },
                              keyword: { color: "#569CD6" },
                              boolean: { color: "#569CD6" },
                              function: { color: "#DCDCAA" },
                              "function-name": { color: "#DCDCAA" },
                              "method-definition": { color: "#DCDCAA" },
                              "function-variable": { color: "#DCDCAA" },
                              "class-name": { color: "#4EC9B0" },
                              "maybe-class-name": { color: "#4EC9B0" },
                              builtin: { color: "#4EC9B0" },
                              variable: { color: "#9CDCFE" },
                              parameter: { color: "#9CDCFE" },
                              property: { color: "#9CDCFE" },
                              "attr-name": { color: "#9CDCFE" },
                              def: { color: "#9CDCFE" },
                              number: { color: "#B5CEA8" },
                              operator: { color: "#D4D4D4" },
                              punctuation: { color: "#D4D4D4" },
                              decorator: { color: "#DCDCAA" },
                              "control-flow": { color: "#C586C0" },
                              constant: { color: "#569CD6" },
                              regex: { color: "#CE9178" },
                              module: { color: "#569CD6" },
                              imports: { color: "#569CD6" },
                              tag: { color: "#569CD6" },
                              namespace: { color: "#4EC9B0" },
                              this: { color: "#569CD6" },
                              super: { color: "#569CD6" },
                            }}
                            language={match[1]}
                            useInlineStyles={true}
                            showLineNumbers={false}
                            wrapLines={false}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              padding: "1rem",
                              backgroundColor: "#1E1E1E",
                              userSelect: "text",
                              WebkitUserSelect: "text",
                              MozUserSelect: "text",
                              msUserSelect: "text",
                              fontSize: "14px",
                              fontFamily: "JetBrains Mono, monospace",
                              lineHeight: "1.5",
                            }}
                          >
                            {codeText}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <code
                      className={cn(
                        "bg-[#1E1E1E] rounded px-1.5 py-0.5 text-[#D4D4D4]",
                        className
                      )}
                    >
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return (
                    <p className="text-gray-100 whitespace-pre-wrap mb-4">
                      {children}
                    </p>
                  );
                },
                h1({ children }) {
                  return (
                    <h1 className="text-3xl font-bold text-white mb-6 leading-tight">
                      {children}
                    </h1>
                  );
                },
                h2({ children }) {
                  return (
                    <h2 className="text-2xl font-semibold text-white mb-4 leading-tight">
                      {children}
                    </h2>
                  );
                },
                h3({ children }) {
                  return (
                    <h3 className="text-xl font-semibold text-white mb-4 leading-tight">
                      {children}
                    </h3>
                  );
                },
                ul({ children }) {
                  return (
                    <ul className="pl-6 text-gray-100 mb-6 space-y-2 list-none">
                      {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                          return React.cloneElement(child as React.ReactElement, {
                            style: {
                              position: 'relative',
                              paddingLeft: '1.5rem',
                              '::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: 'rgb(156 163 175)'
                              }
                            }
                          });
                        }
                        return child;
                      })}
                    </ul>
                  );
                },
                ol({ children }) {
                  return (
                    <ol className="pl-6 text-gray-100 mb-6 space-y-2 list-none counter-reset-item">
                      {React.Children.map(children, (child, index) => {
                        if (React.isValidElement(child)) {
                          return React.cloneElement(child as React.ReactElement, {
                            style: {
                              position: 'relative',
                              paddingLeft: '1.5rem',
                              '::before': {
                                content: `"${index + 1}."`,
                                position: 'absolute',
                                left: 0,
                                color: 'rgb(156 163 175)'
                              }
                            }
                          });
                        }
                        return child;
                      })}
                    </ol>
                  );
                },
                li({ children, className, ...props }) {
                  if (props["data-counter"]) {
                    return (
                      <li className={cn("relative", className)} {...props}>
                        <span className="absolute left-0 text-gray-400">
                          {props["data-counter"]}.
                        </span>
                        {children}
                      </li>
                    );
                  }
                  return (
                    <li className={cn("text-gray-100", className)} {...props}>
                      {children}
                    </li>
                  );
                },
                a({ node, ...props }) {
                  return (
                    <a
                      {...props}
                      className="text-reva-400 hover:text-reva-300 transition-colors border-b border-reva-400/30 hover:border-reva-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  );
                },
                table({ node, ...props }) {
                  return (
                    <div className="overflow-x-auto mb-6 rounded-lg border border-neutral-700">
                      <table
                        {...props}
                        className="w-full border-collapse bg-neutral-800"
                      />
                    </div>
                  );
                },
                th({ node, ...props }) {
                  return (
                    <th
                      {...props}
                      className="border-b border-neutral-700 px-6 py-3 bg-neutral-800 text-white font-semibold text-left"
                    />
                  );
                },
                td({ node, ...props }) {
                  return (
                    <td
                      {...props}
                      className="border-b border-neutral-700 px-6 py-3 text-gray-100"
                    />
                  );
                },
                blockquote({ node, ...props }) {
                  return (
                    <blockquote
                      {...props}
                      className="border-l-4 border-neutral-700 pl-6 my-6 italic text-gray-200 bg-neutral-800/50 py-4 rounded-r"
                    />
                  );
                },
                strong({ children }) {
                  return (
                    <strong className="font-semibold text-white">
                      {children}
                    </strong>
                  );
                },
                em({ children }) {
                  return <em className="italic text-gray-100">{children}</em>;
                },
                hr() {
                  return <hr className="border-neutral-700 my-8" />;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

const autoResizeTextArea = (element: HTMLTextAreaElement) => {
  element.style.height = "inherit";
  element.style.height = `${Math.min(element.scrollHeight, 200)}px`; // Max height of 200px
};

const plugins = [
  {
    id: 'script-generation',
    icon: FileText,
    label: 'Script Generation',
    description: 'Generate customized sales scripts',
    color: 'text-blue-400',
    options: [
      {
        id: 'cold-call',
        label: 'Cold Call Script',
        function: 'generate_sales_script',
        args: { type: 'cold_call' }
      },
      {
        id: 'industry-script',
        label: 'Industry Specific',
        function: 'generate_sales_script',
        args: { type: 'industry_specific' }
      },
      {
        id: 'template-script',
        label: 'Template Management',
        function: 'generate_sales_script',
        args: { type: 'template' }
      }
    ]
  },
  {
    id: 'objection-handling',
    icon: Shield,
    label: 'Objection Handling',
    description: 'Handle common sales objections',
    color: 'text-red-400',
    options: [
      {
        id: 'objection-detect',
        label: 'Real-time Detection',
        function: 'handle_objection',
        args: { type: 'realtime' }
      },
      {
        id: 'response-db',
        label: 'Response Database',
        function: 'handle_objection',
        args: { type: 'database' }
      },
      {
        id: 'context-suggest',
        label: 'Context Suggestions',
        function: 'handle_objection',
        args: { type: 'context' }
      }
    ]
  },
  {
    id: 'value-proposition',
    icon: Target,
    label: 'Value Proposition',
    description: 'Create compelling value propositions',
    color: 'text-green-400',
    options: [
      {
        id: 'federal-data',
        label: 'Federal Data Analysis',
        function: 'research_location',
        args: { type: 'federal' }
      },
      {
        id: 'market-analysis',
        label: 'Market Analysis',
        function: 'research_location',
        args: { type: 'market' }
      },
      {
        id: 'uvp-template',
        label: 'UVP Templates',
        function: 'research_location',
        args: { type: 'template' }
      }
    ]
  },
  {
    id: 'comparables',
    icon: BarChart,
    label: 'Comparables',
    description: 'Analyze comparable properties',
    color: 'text-purple-400',
    options: [
      {
        id: 'property-compare',
        label: 'Property Comparison',
        function: 'generate_comparables',
        args: { type: 'property' }
      },
      {
        id: 'sales-data',
        label: 'Recent Sales Data',
        function: 'generate_comparables',
        args: { type: 'sales' }
      },
      {
        id: 'market-trends',
        label: 'Market Trends',
        function: 'generate_comparables',
        args: { type: 'trends' }
      }
    ]
  }
];

const ChatToolbar = ({ onToolSelect }: { onToolSelect: (tool: string) => void }) => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {plugins.map((plugin) => (
          <Popover key={plugin.id}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "text-neutral-400 hover:text-white",
                  "transition-all duration-200",
                  "flex items-center gap-2.5",
                  "rounded-lg px-3 py-2",
                  "hover:bg-neutral-800/50",
                  "group relative"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg",
                  "bg-neutral-800/50 group-hover:bg-neutral-700/50",
                  "transition-all duration-200 ease-in-out",
                  "ring-1 ring-neutral-700/50 group-hover:ring-neutral-600/50",
                  plugin.color
                )}>
                  <plugin.icon className="h-4 w-4" />
                </div>
                <span className="font-medium">{plugin.label}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className={cn(
                "w-72 p-0",
                "bg-neutral-900 border border-neutral-800",
                "shadow-2xl shadow-black/20",
                "backdrop-blur-xl"
              )}
              sideOffset={8}
            >
              <div className="p-4 border-b border-neutral-800">
                <h3 className="text-sm font-semibold text-white mb-1.5">{plugin.label}</h3>
                <p className="text-xs text-neutral-400">{plugin.description}</p>
              </div>
              <div className="p-2">
                <div className="flex flex-col">
                  {plugin.options.map((option) => (
                    <Button
                      key={option.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => onToolSelect(option.id)}
                      className={cn(
                        "justify-start text-neutral-400",
                        "hover:text-white hover:bg-neutral-800",
                        "transition-all duration-150",
                        "rounded-md px-3 py-2 h-auto",
                        "font-medium"
                      )}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>

      {/* User Profile Section */}
      {session?.user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center text-white">
                  {session.user.name ? session.user.name[0].toUpperCase() : session.user.email?.[0].toUpperCase()}
                </div>
                <span className="font-medium">{session.user.name || session.user.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-neutral-900 border border-neutral-800">
            <DropdownMenuItem className="text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer">
              <UserCircle className="h-4 w-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-800" />
            <DropdownMenuItem 
              className="text-red-400 hover:text-red-300 hover:bg-neutral-800 cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = React.useState<MessageProps[]>([]);
  const [sessions, setSessions] = React.useState<SessionProps[]>([]);
  const [isClient, setIsClient] = React.useState(false);
  const [activeSessionIndex, setActiveSessionIndex] = React.useState<
    number | null
  >(null);
  const [userInput, setUserInput] = React.useState("");
  const [fileInfo, setFileInfo] = React.useState("");
  const [threadId, setThreadId] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [activeDialog, setActiveDialog] = React.useState<string | null>(null);

  // Handle localStorage after component mounts
  React.useEffect(() => {
    const savedSessions = localStorage.getItem("chatSessions");
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions);
      setSessions(parsedSessions);
    }
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, { method: "POST" });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (activeSessionIndex !== null && sessions[activeSessionIndex]) {
      const updatedSessions = [...sessions];
      updatedSessions[activeSessionIndex] = {
        ...updatedSessions[activeSessionIndex],
        messages: messages,
      };
      setSessions(updatedSessions);
      localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
    }
  }, [messages, activeSessionIndex]);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      toast({
        title: "Uploading file...",
        description: file.name,
      });

      const response = await fetch("/api/assistants/files/code-interpreter", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();
      setFileInfo(`${file.name} (ID: ${result.fileId})`);
      setUserInput(`Analyze the uploaded file: ${file.name}`);

      toast({
        title: "File uploaded successfully",
        description: "You can now ask questions about the file.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error uploading file",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const functionCallHandler = async (toolCall: any) => {
    if (!toolCall?.function?.name) return;

    const args = JSON.parse(toolCall.function.arguments);
    let result;

    switch (toolCall.function.name) {
      case "generate_sales_script":
        result = generateSalesScript(args);
        break;
      case "handle_objection":
        result = handleObjection(args);
        break;
      case "generate_comparables":
        result = generateComparables(args);
        break;
      case "research_location":
        result = researchLocation(args);
        break;
      case "web_search":
        result = await performWebSearch(args);
        break;
      default:
        return;
    }

    return JSON.stringify(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading || (!userInput.trim() && !fileInfo)) return;

    if (!checkSubscriptionLimit()) {
      return;
    }

    const messageContent = `${userInput} ${fileInfo}`.trim();

    try {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: messageContent },
      ]);

      // Create first chat session if none exists
      if (sessions.length === 0) {
        const newSession: SessionProps = {
          id: crypto.randomUUID(),
          messages: [{ role: "user", content: messageContent }],
          title: messageContent.slice(0, 30) + (messageContent.length > 30 ? "..." : ""),
          createdAt: Date.now(),
        };
        setSessions([newSession]);
        setActiveSessionIndex(0);
        localStorage.setItem("chatSessions", JSON.stringify([newSession]));
      }

      setUserInput("");
      setFileInfo("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "56px";
      }

      setTimeout(scrollToBottom, 100);

      await sendMessage(messageContent);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      showError("Failed to send message. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const sendMessage = async (text: string) => {
    if (!threadId) {
      showError("Chat thread not initialized. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `/api/assistants/threads/${threadId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: text }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to send message");
      }

      const stream = AssistantStream.fromReadableStream(response.body);
      handleReadableStream(stream);
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  const submitActionResult = async (runId: string, toolCallOutputs: any[]) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          runId: runId,
          toolCallOutputs: toolCallOutputs,
        }),
      }
    );
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  const handleReadableStream = (stream: AssistantStream) => {
    // Set up stream handlers
    stream.on("textCreated", () => {
      appendMessage("assistant", "");
    });

    stream.on("textDelta", (delta) => {
      if (delta.value != null) {
        appendToLastMessage(delta.value);
      }
    });

    stream.on("error", (error) => {
      console.error("Stream error:", error);
      showError("Error receiving response. Please try again.");
      // Remove the failed assistant message
      setMessages((prev) => prev.slice(0, -1));
    });

    stream.on("toolCallCreated", (toolCall) => {
      if (toolCall.type === "function") {
        appendMessage("assistant", "");
      }
    });

    stream.on("toolCallDelta", (delta, snapshot) => {
      if (delta.type === "function" && delta.function?.output) {
        appendToLastMessage(delta.function.output);
      }
    });

    stream.on("event", (event) => {
      if (event.event === "thread.run.requires_action") {
        handleRequiresAction(event);
      }
      if (event.event === "thread.run.completed") {
        handleRunCompleted();
      }
    });
  };

  const handleTextCreated = () => {
    appendMessage("assistant", "");
  };

  const handleTextDelta = (delta: any) => {
    if (delta.value != null) {
      appendToLastMessage(delta.value);
    }
  };

  const handleImageFileDone = (image: any) => {
    appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
  };

  const toolCallCreated = (toolCall: any) => {
    if (toolCall.type !== "function") return;
    appendMessage("assistant", "");
  };

  const toolCallDelta = (delta: any, snapshot: any) => {
    if (delta.type !== "function") return;
    if (!delta.function?.output) return;
    appendToLastMessage(delta.function.output);
  };

  const handleRequiresAction = async (event: any) => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    
    const toolCallOutputs = await Promise.all(
      toolCalls.map(async (toolCall: any) => {
        const result = await functionCallHandler(toolCall);
        return { output: result, tool_call_id: toolCall.id };
      })
    );
    
    submitActionResult(runId, toolCallOutputs);
  };

  const handleRunCompleted = () => {
    // Re-enable input if needed
  };

  const appendToLastMessage = (text: string) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      const updatedMessages = [
        ...prev.slice(0, -1),
        { ...lastMessage, content: lastMessage.content + text },
      ];
      setTimeout(scrollToBottom, 100);
      return updatedMessages;
    });
  };

  const appendMessage = (
    role: "user" | "assistant" | "code",
    content: string
  ) => {
    setMessages((prev) => [...prev, { role, content }]);
  };

  const handleNewChat = () => {
    const newSession: SessionProps = {
      id: crypto.randomUUID(),
      messages: [],
      createdAt: Date.now(),
    };

    setSessions((prevSessions) => [newSession, ...prevSessions]);
    setMessages([]);
    setActiveSessionIndex(0);

    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, { method: "POST" });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  };

  const handleSelectChat = (index: number) => {
    if (index >= 0 && index < sessions.length) {
      setActiveSessionIndex(index);
      setMessages(sessions[index].messages);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showError = (message: string) => {
    toast({
      variant: "destructive",
      description: message,
    });
  };

  const checkSubscriptionLimit = () => {
    return true;
  };

  const handleClearAllChats = () => {
    setSessions([]);
    localStorage.removeItem("chatSessions");
    setActiveSessionIndex(null);
    setMessages([]);
  };

  const handleDeleteChat = (index: number) => {
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    setSessions(updatedSessions);
    localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));

    // If we deleted the active chat, clear the messages
    if (index === activeSessionIndex) {
      setMessages([]);
      setActiveSessionIndex(null);
    } else if (index < activeSessionIndex!) {
      // If we deleted a chat before the active one, update the index
      setActiveSessionIndex(activeSessionIndex! - 1);
    }
  };

  const handleRenameChat = (index: number, newTitle: string) => {
    const updatedSessions = [...sessions];
    updatedSessions[index] = {
      ...updatedSessions[index],
      title: newTitle,
    };
    setSessions(updatedSessions);
    localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
  };

  const handleToolSelect = (toolId: string) => {
    const plugin = plugins.find(p => p.options.find(o => o.id === toolId));
    const option = plugin?.options.find(o => o.id === toolId);
    
    if (!option) return;

    setActiveDialog(option.function);
  };

  const handleDialogSubmit = (data: any) => {
    if (!activeDialog) return;

    const functionCall = {
      name: activeDialog,
      arguments: JSON.stringify(data)
    };

    // Add the function call to the message
    const prompt = `Using the ${activeDialog} tool with the following parameters:\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;
    setUserInput(prompt);
    setActiveDialog(null);
    
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex h-[100vh] overflow-hidden bg-neutral-900">
      
      {isClient && (
        <>
          <ChatSideBar
            sessions={sessions}
            activeSessionIndex={activeSessionIndex}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onClearAllChats={handleClearAllChats}
            onDeleteChat={handleDeleteChat}
            onRenameChat={handleRenameChat}
            subscription={null}
          />
          <div className="relative flex h-full w-full flex-1 flex-col">
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full overflow-y-auto">
                <ChatToolbar onToolSelect={handleToolSelect} />
                {messages.length === 0 && (
                  <div className="text-center px-3 py-10 mt-12">
                    <div className="flex items-baseline justify-center mb-8">
                      <span className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600 tracking-tight">
                        reva
                      </span>
                      <span className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/70">
                        .
                      </span>
                      <span className="text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600">
                        ai
                      </span>
                    </div>
                    <h2 className="text-4xl font-semibold text-white mb-2">
                      How can I help you today?
                    </h2>
                    <p className="text-neutral-400 text-lg">
                      Ask me anything about real estate analysis
                    </p>
                  </div>
                )}
                {messages.map((msg, index) => (
                  <Message
                    key={index}
                    role={msg.role}
                    content={msg.content}
                  />
                ))}
                <div
                  ref={messagesEndRef}
                  className="h-32 md:h-48 flex-shrink-0"
                />
              </ScrollArea>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent pt-10">
              <form
                onSubmit={handleSubmit}
                className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
              >
                <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                  <div className="relative flex flex-grow flex-col rounded-lg border border-neutral-700/40 bg-neutral-800 shadow-[0_0_15px_rgba(0,0,0,0.10)] backdrop-blur-sm">
                    <div className="absolute left-3 top-3.5 flex items-center gap-2">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div
                          className={cn(
                            "h-7 w-7 rounded-lg flex items-center justify-center transition-all duration-200",
                            "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/50",
                            isUploading && "animate-pulse text-reva-400"
                          )}
                        >
                          <Paperclip className="h-4 w-4" />
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                          accept=".csv,.xlsx,.xls,.txt,.json,.pdf"
                        />
                      </label>
                      {fileInfo && (
                        <span className="flex items-center gap-2 text-xs">
                          <span className="text-neutral-400 truncate max-w-[150px]">
                            {fileInfo.split(" (ID:")[0]}
                          </span>
                          <button
                            onClick={() => setFileInfo("")}
                            className="text-neutral-500 hover:text-neutral-300 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                    <Textarea
                      ref={textareaRef}
                      value={userInput}
                      onChange={(e) => {
                        setUserInput(e.target.value);
                        autoResizeTextArea(e.target);
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Message Reva..."
                      className={cn(
                        "min-h-[56px] w-full resize-none bg-transparent px-4 py-[14px]",
                        "text-base text-white placeholder:text-neutral-400",
                        "border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                        "pl-16",
                        fileInfo && "pl-32"
                      )}
                      style={{
                        height: "56px",
                      }}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className={cn(
                        "absolute right-3 top-3 h-7 w-7 rounded-lg",
                        !isUploading && userInput.trim()
                          ? "bg-reva-500 hover:bg-reva-600 text-white"
                          : "bg-white/10 text-neutral-400 cursor-not-allowed hover:bg-white/20",
                        "transition-all duration-200"
                      )}
                      disabled={isUploading || !userInput.trim()}
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </form>
              <div className="px-3 pt-2 pb-3 text-center text-xs text-neutral-400">
                <span className="px-2 py-1 rounded bg-neutral-800/50 border border-neutral-700/40">
                  Press{" "}
                  <kbd className="px-1 py-0.5 rounded bg-neutral-700/50 text-neutral-300">
                    Enter
                  </kbd>{" "}
                  to send
                </span>
              </div>
            </div>
          </div>
          
          <SalesScriptDialog
            isOpen={activeDialog === 'generate_sales_script'}
            onClose={() => setActiveDialog(null)}
            onSubmit={handleDialogSubmit}
            tool="generate_sales_script"
          />
          
          <ObjectionHandlerDialog
            isOpen={activeDialog === 'handle_objection'}
            onClose={() => setActiveDialog(null)}
            onSubmit={handleDialogSubmit}
            tool="handle_objection"
          />
          
          <ComparablesDialog
            isOpen={activeDialog === 'generate_comparables'}
            onClose={() => setActiveDialog(null)}
            onSubmit={handleDialogSubmit}
            tool="generate_comparables"
          />
          
          <LocationResearchDialog
            isOpen={activeDialog === 'research_location'}
            onClose={() => setActiveDialog(null)}
            onSubmit={handleDialogSubmit}
            tool="research_location"
          />
        </>
      )}
    </div>
  );
};

export default ChatPage;
