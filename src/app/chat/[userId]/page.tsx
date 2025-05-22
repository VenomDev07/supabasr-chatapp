'use client'

import ChatWindow from '@/component/ChatWindow'
import { FolderDown, HelpCircle, ListFilter, Phone, Search } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/lib/useAuth';
import { getUserList, User } from '@/app/lib/chatService';
import ChatUserItems from '@/component/ChatComponent/chatUserItems';

function page() {

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelectUser = (user: User) => {
    debugger
    setSelectedUser(user);
  };

  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.id) {
        setLoading(true);
        const userList = await getUserList(user.id);
        setUsers(userList);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user?.id]);

  const userId = String(useParams())
  return (
    <main className='w-full h-full chat-container'>
        <div className='user-bar'>
            <div className='h-full flex flex-col'>
                <div className='flex items-center bg-[rgba(209,205,205,0.23)] h-[45px] justify-between' style={{padding: '5px'}}>
                    <div className='w-fit justify-center items-center inline-flex gap-1 h-fit'>
                        <FolderDown size={20} color="#ffffff" fill='#16a34a' />
                        <p className='font-semibold text-xs text-green-600'>Custom Filter</p>
                        <button className="text-gray-600  rounded-sm bg-white buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '4px' }} >
                            <span className="text-xs font-medium text-gray-600">Save</span>
                        </button>
                        
                    </div>
                    <div className='w-fit items-center inline-flex gap-2 h-fit'>
                        <button className="text-gray-600  rounded-sm bg-white buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '4px' }} >
                            <Search size={16} />
                            <span className="text-xs font-medium text-gray-600">Search</span>
                        </button>

                        <button className="text-gray-600  rounded-sm bg-white  buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '4px' }} >
                            <ListFilter size={16} color="#16a34a" />
                            <span className="text-xs font-medium text-green-600">Filtered</span>
                        </button>
                    </div>
                </div>
                <div className='flex flex-1 bg-white flex-col overflow-y-auto invisible-scrollbar'>
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">Loading users...</div>
                        ) : users.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No users found</div>
                        ) : (
                        users.map((u) => (
                            <ChatUserItems 
                            key={u.id}
                            user={u}
                            isActive={selectedUser?.id === u.id}
                            onClick={() => handleSelectUser(u)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
        <div className='chat-window'><ChatWindow selectedUser={selectedUser} /></div>
    </main>
  )
}

export default page