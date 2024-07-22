"use client";
import MessagesMain from "@/components/messages/messagesMain";
import MessagesSidebar from "@/components/messages/messagesSidebar";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-32px)] w-full flex-row rounded-2xl ">
      <MessagesSidebar />
      <MessagesMain />
    </div>
  );
}
