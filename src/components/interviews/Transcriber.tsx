"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/src/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Helper to group consecutive messages from the same sender
function groupConsecutiveMessages(transcript: Array<{ role: string; text: string }>) {
  if (transcript.length === 0) return [];
  const groups: { role: string; texts: string[] }[] = [];
  let current = { role: transcript[0].role, texts: [transcript[0].text] };
  for (let i = 1; i < transcript.length; i++) {
    if (transcript[i].role === current.role) {
      current.texts.push(transcript[i].text);
    } else {
      groups.push(current);
      current = { role: transcript[i].role, texts: [transcript[i].text] };
    }
  }
  groups.push(current);
  return groups;
}

function Transcriber({ transcript, error }: { transcript: Array<{ role: string; text: string }>, error?: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const grouped = groupConsecutiveMessages(transcript);

  return (
    <div className="h-full flex flex-col">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg font-semibold text-center border border-red-300">
          {error}
        </div>
      )}
      {/* Messages Container */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 p-4">
        {grouped.map((group, idx) => (
          <div
            key={idx}
            className={`flex ${group.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-3xl ${group.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                group.role === 'assistant' ? 'bg-blue-100' : 'bg-slate-100'
              }`}>
                {group.role === 'assistant' ? (
                  <span role="img" aria-label="AI">🧑‍💼</span>
                ) : (
                  <span role="img" aria-label="You">👤</span>
                )}
              </div>
              {/* Message */}
              <div className={`mx-3 ${group.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-3 rounded-lg ${
                  group.role === 'assistant'
                    ? 'bg-white border border-slate-200 shadow-sm'
                    : 'bg-blue-600 text-white'
                }`}>
                  <div className="text-sm font-medium mb-1">
                    {group.role === 'assistant' ? 'Alex' : 'You'}
                  </div>
                  <div className="text-sm leading-relaxed">
                    {group.texts.join(' ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transcriber;
export { Avatar, AvatarImage, AvatarFallback }; 