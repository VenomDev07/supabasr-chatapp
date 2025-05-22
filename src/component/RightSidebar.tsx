'use client'
import { useState } from 'react';
import { 
  Image,
  RefreshCw,
  Pencil,
  AlignLeft,
  Network,
  AtSign,
  ArrowLeftFromLine,
  Users,
  ListTodo,
  Columns3Cog
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/useAuth';

export default function RightSidebar() {
  const [activeIcon, setActiveIcon] = useState('home');
  const { user, signOut } = useAuth();
  const router = useRouter()
  const setActivateOrHandleLogOut = (id:string) =>{
    debugger
    id === 'ArrowLeftFromLine' ? (signOut(),router.push('/login')) : setActiveIcon(id)
  }

  const menuItems = [
    { id: 'ArrowLeftFromLine', icon: <ArrowLeftFromLine key="square" color='#b3b3b3' size={20} />, label: 'ArrowLeftFromLine', topSection: true, special: true },
    { id: 'RefreshCw', icon: <RefreshCw key="refresh" color='#b3b3b3' size={20} />, label: 'RefreshCw', topSection: true },
    { id: 'Pencil', icon: <Pencil key="pencil" color='#b3b3b3' size={20} />, label: 'Pencil', topSection: true },
    { id: 'AlignLeft', icon: <AlignLeft key="align" color='#b3b3b3' size={20} />, label: 'AlignLeft', topSection: true },
    { id: 'ListTodo', icon: <ListTodo key="list" color='#b3b3b3' size={20} />, label: 'ListTodo', topSection: true },
    { id: 'Network', icon:  <Network key="network" color='#b3b3b3' size={20} />, label: 'Network', topSection: true },
    { id: 'Users', icon:  <Users key="Users" color='#b3b3b3' size={20} />, label: 'Users', topSection: true },
    { id: 'AtSign', icon: <AtSign key="at" color='#b3b3b3' size={20} />, label: 'AtSign', topSection: true },
    { id: 'Image', icon: <Image key="Image" color='#b3b3b3' size={20} />, label: 'Image', topSection: true },
    { id: 'Columns3Cog', icon:  <Columns3Cog key="Columns3Cog" color='#b3b3b3' size={20} />, label: 'Columns3Cog', topSection: true },
  ];

  const topItems = menuItems.filter(item => item.topSection);

  return (
    <div className="flex flex-col justify-between h-screen w-full bg-white shadow-md py-3">
      {/* Top section */}
      <div className="flex flex-col items-center mt-10 gap-4 space-y-10">
        {topItems.map((item) => (
          <div 
            key={item.id}
            className={`flex justify-center items-center cursor-pointer w-10 h-10 rounded-lg ${
              activeIcon === item.id 
                ? item.id === 'logo' 
                  ? 'bg-green-100' 
                  : 'bg-gray-100'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setActivateOrHandleLogOut(item.id)}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}