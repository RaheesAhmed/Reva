"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  MessageSquare,
  Trash2,
  Settings,
  PanelLeft,
  PanelRight,
  Plus,
  Brain,
  MoreVertical,
  Pencil,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Logo } from "@/components/ui/logo";

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

interface ChatSideBarProps {
  sessions: SessionProps[];
  activeSessionIndex: number | null;
  onNewChat: () => void;
  onSelectChat: (index: number) => void;
  onClearAllChats: () => void;
  onDeleteChat?: (index: number) => void;
  onRenameChat?: (index: number, newTitle: string) => void;
  subscription: any;
}

export function ChatSideBar({
  sessions,
  activeSessionIndex,
  onNewChat,
  onSelectChat,
  onClearAllChats,
  onDeleteChat,
  onRenameChat,
}: ChatSideBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  const handleStartRename = (index: number, currentTitle: string) => {
    setEditingIndex(index);
    setEditingTitle(currentTitle);
  };

  const handleFinishRename = (index: number) => {
    if (editingTitle.trim() && onRenameChat) {
      onRenameChat(index, editingTitle.trim());
    }
    setEditingIndex(null);
    setEditingTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFinishRename(index);
    } else if (e.key === "Escape") {
      setEditingIndex(null);
      setEditingTitle("");
    }
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative h-full bg-neutral-800/70 transition-all duration-300",
          isCollapsed ? "w-[60px]" : "w-[260px]"
        )}
      >
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center px-3 pt-4 mb-4">
          <Logo collapsed={isCollapsed} />
        </div>

        {/* Header with New Chat button */}
        <div className="flex items-center justify-between px-2 pb-2">
          <Button
            variant="ghost"
            className={cn(
              "flex items-center justify-center",
              "bg-transparent hover:bg-neutral-700/70 text-white",
              "border border-white/10 transition-colors duration-200",
              isCollapsed ? "w-9 h-9 p-0" : "h-10 w-full px-3 py-2",
              "rounded-lg"
            )}
            onClick={onNewChat}
          >
            <Plus className={cn("h-4 w-4", isCollapsed && "stroke-[1.5px]")} />
            {!isCollapsed && <span className="ml-2">New chat</span>}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-white/70 hover:text-white hover:bg-neutral-700/70 transition-colors ml-1"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <PanelRight className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-auto mt-4 pb-4">
          <div className="space-y-1 px-2">
            {sessions.map((session, index) => (
              <div key={index} className="relative group">
                <button
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    "hover:bg-neutral-700/70 group/item",
                    activeSessionIndex === index
                      ? "bg-neutral-700/70 text-white"
                      : "text-neutral-400"
                  )}
                  onClick={() => onSelectChat(index)}
                >
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  {!isCollapsed && (
                    <>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onBlur={() => handleFinishRename(index)}
                          className="flex-1 bg-transparent text-white focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <span className="line-clamp-1 flex-1">
                          {session.title ||
                            session.messages[0]?.content?.slice(0, 30) ||
                            "New Chat"}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenIndex(
                            menuOpenIndex === index ? null : index
                          );
                        }}
                        className={cn(
                          "opacity-0 group-hover/item:opacity-100 transition-opacity",
                          "p-1 hover:bg-neutral-600/50 rounded"
                        )}
                      >
                        <MoreVertical className="h-4 w-4 text-neutral-400" />
                      </button>
                    </>
                  )}
                </button>
                {/* Dropdown Menu */}
                {menuOpenIndex === index && !isCollapsed && (
                  <div className="absolute right-2 top-10 z-50 bg-neutral-800 rounded-md shadow-lg border border-neutral-700 py-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartRename(
                          index,
                          session.title ||
                            session.messages[0]?.content?.slice(0, 30) ||
                            "New Chat"
                        );
                        setMenuOpenIndex(null);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-700 w-full text-left"
                    >
                      <Pencil className="h-4 w-4" />
                      Rename
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDeleteChat) {
                          onDeleteChat(index);
                        }
                        setMenuOpenIndex(null);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:bg-neutral-700 w-full text-left"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom buttons */}
        <div
          className={cn(
            "absolute bottom-4 left-0 right-0 px-2",
            "flex items-center",
            isCollapsed ? "flex-col gap-2 justify-center" : "justify-between"
          )}
        >
          <div
            className={cn(
              "flex items-center",
              isCollapsed ? "flex-col gap-2" : "gap-2"
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg text-white/70 hover:text-white hover:bg-neutral-700/70"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg text-white/70 hover:text-white hover:bg-neutral-700/70"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Clear conversations</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="bg-neutral-800 border border-neutral-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-white">
              Clear conversations
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Are you sure you want to clear all conversations?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-700 text-white hover:bg-neutral-600 border-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onClearAllChats();
                setIsDeleteModalOpen(false);
              }}
              className="bg-white hover:bg-neutral-200 text-black border-0"
            >
              Clear all conversations
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
