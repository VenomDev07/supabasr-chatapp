import { getMessagesByUsers, Message, sendMessage, subscribeToMessages, User } from '@/app/lib/chatService';
import { useAuth } from '@/app/lib/useAuth';
import { AlignLeft, CircleUserRound, Clock, ClockFading, Mic, Paperclip, Search, SendHorizontal, Smile, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import MessageItems from './ChatComponent/messageItems';
import { RealtimeChannel } from '@supabase/supabase-js';



interface ChatWindowProps {
  selectedUser: User | null;
}

function ChatWindow({selectedUser}:ChatWindowProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
    /* Message Logic */
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  console.log(sending);
  
  // Fetch messages when selected user changes
  const fetchMessages = async () => {
  debugger
  if (user?.id && selectedUser?.id) {
      setLoading(true);
      const fetchedMessages = await getMessagesByUsers(user.id, selectedUser.id);
      setMessages(fetchedMessages);
      setLoading(false);
    } else {
      setMessages([]);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [user?.id, selectedUser?.id]);

  // Subscribe to new messages
    useEffect(() => {
    let subscription: RealtimeChannel ;
      
    const setupSubscription = async () => {
    if (user?.id) {
      subscription = await subscribeToMessages(user.id, (newMessage) => {
        if (selectedUser && newMessage.sender_id === selectedUser.id) {
          setMessages((prev) => [...prev, newMessage]);
        }
      });
    }
  };
   setupSubscription();
    return () => {
      if (subscription?.unsubscribe && typeof subscription.unsubscribe === 'function') {
            subscription.unsubscribe();
        }
    };
  }, [user?.id, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add new message to the list
  const handleNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };
  
  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col h-full justify-center items-center text-gray-500">
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  /* Message Logic */

    const handleSubmit = async (e: React.FormEvent) => {
    debugger
    e.preventDefault();
    
    if (!text.trim() && !image) return;
    
    setSending(true);
    const success = await sendMessage(user?.id || '', selectedUser?.id, text, image || undefined);
    
    if (success) {
      // Create a temporary message object for immediate UI update
      const tempMessage: Message = {
        id: Date.now().toString(), // Temporary ID
        sender_id: user?.id || '',
        receiver_id: selectedUser?.id,
        text: text || null,
        image: image || null,
        created_at: new Date().toISOString(),
      };
      
      handleNewMessage(tempMessage);
      setText('');
      setImage(null);
    }
    
    setSending(false);
    
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to storage service
      // For demo, we'll use a data URL (not recommended for production)
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='chat-window-grid h-full '>
      <div id='chatHeader'>
        <div className='flex h-full'>
          <div className='w-[5%]'><div className='w-[90%] h-[90%] rounded-full flex items-center justify-center'><CircleUserRound size={25} /></div></div>
          <div className='w-[75%] flex flex-col justify-start' style={{paddingTop: '10px'}}>
            <div className='w-[40%]'><p className='text-sm font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden w-full'>{selectedUser?.name}</p></div>
            <div className='w-[55%]'><p className='text-xs font-normal text-[rgb(45,42,42)] whitespace-nowrap overflow-ellipsis overflow-hidden w-full'></p></div>
          </div>
          <div className='w-[20%] flex items-center justify-end gap-2' style={{paddingRight: '10px'}}>
            <Sparkles size={20} fill='#000000' />
            <Search size={20} />
          </div>
        </div>
      </div>
      <div id='chatContent'>
        <div className='flex flex-col h-full bg-[rgba(219,211,211,0.36)] justify-center items-center'>
          <div className='h-full w-full overflow-hidden relative'>
            {/* Background Image Layer */}
            <Image 
              src='/images/wp.png' 
              alt=""
              fill
              className="w-full h-auto max-h-auto min-h-48 object-cover"
            />
            
            {/* Messages Container - Takes full space over the image */}
            <div className='absolute inset-0 z-10 flex flex-col'>
              <div className='flex-1 overflow-y-auto bg-gradient-to-b chat-window-scroll' style={{paddingTop: '5px'}}>
                
                {loading ? "loading ..." : messages.map((message, index) => (
                  <MessageItems 
                    key={index} 
                    message={message} 
                    isOwn={message.sender_id === user?.id} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='chatFooter' className='shadow-xl'>
        <div className='flex flex-col h-full'>
          <form onSubmit={handleSubmit} className='flex h-[50%] items-center'>
            <div className='w-[90%] h-full'><input type="text" onChange={(e) => setText(e.target.value)} className='w-full border-0 h-full focus:outline-0' placeholder='Message...' style={{paddingLeft : '10px'}} /></div>
            <button type='submit' className='flex w-[10%] h-full justify-center items-center'><SendHorizontal fill='#16a34a' size={25} color='#16a34a'/></button>
          </form>
          <div className='flex h-[50%] items-center'>
            <div className='w-[90%] h-full flex items-end' style={{paddingBottom: '7px', paddingLeft: '5px'}}>
              <div style={{marginRight: '15px'}}><Paperclip size={20} onClick={() => document.getElementById('image-upload')?.click()} /><input type="file" id="image-upload" className='hidden' onChange={handleImageUpload} accept="image/*" /></div>
              <div style={{marginRight: '15px'}}><Smile color='#2d2a2a' size={20} /></div>
              <div style={{marginRight: '15px'}}><Clock color='#2d2a2a' size={20} /></div>
              <div style={{marginRight: '15px'}}><ClockFading color='#2d2a2a' size={20} /></div>
              <div style={{marginRight: '15px'}}><Sparkles color='#2d2a2a' size={20} /></div>
              <div style={{marginRight: '15px'}}><AlignLeft color='#2d2a2a' size={20} /></div>
              <div style={{marginRight: '15px'}}><Mic color='#2d2a2a' size={20} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow