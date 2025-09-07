"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="py-8 space-y-6 pb-40">
        {messages.length === 0 && (
          <div className="flex flex-col gap-2 pt-32">
            <div className="text-center text-sm text-muted-foreground">
              Start a conversation and let RAG-Chat fetch the right context.
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Built with ❤️ using Next.js and AI SDK
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className="flex flex-col gap-2 animate-in fade-in-50 slide-in-from-bottom-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {m.role}
            </div>
            <div className="space-y-3">
              {m.parts.map((part, idx) => {
                switch (part.type) {
                  case "text":
                    return (
                      <p
                        key={idx}
                        className={`max-w-prose rounded-2xl px-4 py-3 leading-relaxed shadow-sm ${
                          m.role === "user"
                            ? "bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/20"
                            : "bg-card border border-border"
                        }`}
                      >
                        {part.text}
                      </p>
                    );
                  case "tool-addResource":
                  case "tool-getInformation":
                    return (
                      <div
                        key={idx}
                        className="rounded-xl bg-muted/40 border border-border p-4 text-xs"
                      >
                        <div className=" font-medium">Tool call: {part.type}</div>
                        {/* mb-2 <pre className="overflow-auto">
{JSON.stringify(part.input, null, 2)}
                        </pre> */}
                      </div>
                    );
                }
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
        className="fixed inset-x-0 bottom-4"
      >
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="relative flex items-center gap-2 rounded-2xl border border-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 shadow-lg">
          <Input
            value={input}
            placeholder="Ask anything..."
            onChange={(e) => setInput(e.currentTarget.value)}
            className="h-12 flex-1 rounded-xl"
          />
          <Button type="submit" className="h-12 rounded-xl px-5">
            Send
          </Button>
          </div>
        </div>
      </form>
    </div>
  );
}