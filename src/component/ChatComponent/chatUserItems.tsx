import { Phone } from 'lucide-react';
import React from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';


// extend once globally
dayjs.extend(relativeTime);



export function formatRelativeTime(dateString: string): string {


  return dayjs(dateString).fromNow(); // e.g., "2 days ago"
}

 type User = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  last_message: string;
  last_message_time: string;
  last_message_sender: string;
  last_message_receiver: string;
};

type ChatUserItemProps = {
  user: User;
  isActive: boolean;
  onClick: () => void;
  lastMessage?: string;
};

function ChatUserItems({ user, isActive, onClick, lastMessage }: ChatUserItemProps) {

    const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  return (
        <div key={user.id} onClick={onClick} className='flex h-20' style={{marginBottom: '5px', paddingBottom:'5px'}} >
            <div className='w-[20%]  flex justify-center items-start' style={{paddingTop: '10px'}}><div className={`h-12 w-12 rounded-full flex justify-center bg-green-600 text-white font-semibold items-center cursor-pointer`}>{getInitials(user.name)}</div></div>
            <div className='w-[80%] flex flex-col gap-[1px] cursor-pointer' style={{paddingInline: '8px', paddingTop: '5px'}}>
                <div className='flex h-fit   justify-between items-end'>
                    <p className='text-sm font-semibold'>{user?.name}</p>
                    <button className="text-gray-600  rounded-sm bg-white buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '4px' }} >
                        <span className="text-xs font-semibold text-amber-400">Demo</span>
                    </button>
                </div>
                <div className='flex h-fit justify-between items-center' style={{marginBottom: '3px'}}>
                    <div className='w-[80%]'>
                        <p className='text-xs font-normal text-[#b3b3b3] whitespace-nowrap overflow-ellipsis overflow-hidden w-full'>{user?.last_message}</p>
                    </div>
                </div>
                <div className='flex h-fit justify-between items-center '>
                    <button className="text-gray-600  rounded-sm bg-[#e9e9e9]  buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '2px' }} >
                        <Phone size={12} color="#b3b3b3" />
                        <span className="text-[9px] font-normal text-[#b3b3b3]">{user.phone_number}</span>
                    </button>
                    <p className='text-[#b3b3b3] text-xs font-normal'>{formatRelativeTime(user?.last_message_time || '')}</p>
                </div>
            </div>
        </div>
  )
}

export default ChatUserItems