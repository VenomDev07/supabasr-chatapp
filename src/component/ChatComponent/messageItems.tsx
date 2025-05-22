import { Message } from '@/app/lib/chatService';
import React from 'react'
import Image from 'next/image';

type MessageItemProps = {
  message: Message;
  isOwn: boolean;
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function MessageItems({ message, isOwn }: MessageItemProps) {
  const hasImage = message.image;
  const hasText = message.text && message.text.trim().length > 0;

  return (
    <div 
      className={`flex relative z-20 ${isOwn ? 'justify-end' : 'justify-start'}`} 
      style={{marginBottom: '16px', paddingLeft: '10px', paddingRight: '10px'}}
    >
      <div 
        className={`max-w-xs lg:max-w-md rounded-lg relative z-30 overflow-hidden ${ 
          isOwn 
            ? 'bg-green-500 text-white rounded-br-none' 
            : 'bg-white text-gray-800 rounded-bl-none shadow-md' 
        }`}
      >
        {/* Image Section */}
        {hasImage && (
          <div className="relative w-full">
            <Image
              src={message.image || ''}
              alt="Message image"
              width={300}
              height={200}
              className="w-full h-auto max-h-96 min-h-48 object-cover"
              style={{ 
                borderRadius: hasText ? '8px 8px 0 0' : '8px',
                aspectRatio: 'auto'
              }}
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 384px, 448px"
              quality={85}
              priority={false}
            />
            {/* Overlay for better text readability on image */}
            {hasText && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            )}
          </div>
        )}

        {/* Text Section */}
        {hasText && (
          <div style={{paddingLeft: '16px', paddingRight: '16px', paddingTop: hasImage ? '8px' : '8px', paddingBottom: hasImage ? '8px' : '8px'}}>
            <p className="text-sm text-shadow-lg whitespace-pre-wrap">{message.text}</p>
          </div>
        )}

        {/* Time and Status Section */}
        <div 
          className={`flex items-center ${hasText ? '' : 'absolute bottom-2'} ${
            isOwn ? 'justify-end right-2' : 'justify-start left-2'
          } ${ 
            isOwn ? 'text-green-100' : 'text-gray-500' 
          }`}
          style={{
            paddingLeft: hasText ? '16px' : '8px',
            paddingRight: hasText ? '16px' : '8px',
            paddingBottom: '8px',
            paddingTop: !hasText && hasImage ? '5px' : '',
            marginTop: hasText ? '4px' : '0',
            backgroundColor: !hasText && hasImage ? 'rgba(0,0,0,0.5)' : 'transparent',
            borderRadius: !hasText && hasImage ? '12px' : '0'
          }}
        >
          <span className={`text-[10px] ${!hasText && hasImage ? 'text-white' : ''}`}>
            {formatTime(message.created_at)}
          </span>
          {isOwn && (
            <svg 
              className={`w-4 h-4 ml-1 ${!hasText && hasImage ? 'text-white' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageItems