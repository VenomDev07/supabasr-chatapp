'use client'
import { useState } from 'react';
import { 
  Home, 

  LineChart, 
  List, 

  Settings,
  Flower,
  MessageCircleMore,
  Volume1,
  BookUser,
  ListChecks,
  Image,
  Star,
  FileInput,
  Network
} from 'lucide-react';

export default function Sidebar() {
  const [activeIcon, setActiveIcon] = useState('messages');

  const menuItems = [
    { id: 'logo', icon: <Flower size={16} color="#22c55e" />, label: 'Logo', topSection: true, special: true },
    { id: 'home', icon: <Home size={16} />, label: 'Home', topSection: true },
    { id: 'messages', icon: <MessageCircleMore  size={16} />, label: 'Messages', topSection: true },
    { id: 'analytics', icon: <LineChart size={16} />, label: 'Analytics', topSection: true },
    { id: 'list', icon: <List size={16} />, label: 'List', topSection: true },
    { id: 'volume', icon: <Volume1 size={16} />, label: 'Volume', topSection: true },
    { id: 'network', icon: <Network size={16} />, label: 'Network', topSection: true },
    { id: 'bookUser', icon: <BookUser size={16} />, label: 'BookUser', topSection: true },
    { id: 'image', icon: <Image size={16} />, label: 'Image', topSection: true },
    { id: 'listChecks', icon: <ListChecks size={16} />, label: 'ListChecks', topSection: true },
    { id: 'settings', icon: <Settings size={16} />, label: 'Settings', topSection: true },
    
    { id: 'star', icon: <Star size={16} />, label: 'Star', bottomSection: true },
    { id: 'fileInput', icon: <FileInput size={16} />, label: 'FileInput', bottomSection: true },
  ];

  const topItems = menuItems.filter(item => item.topSection);
  const bottomItems = menuItems.filter(item => item.bottomSection);

  return (
    <div className="flex flex-col justify-between h-screen w-full bg-white shadow-md py-3">
      {/* Top section */}
      <div className="flex flex-col items-center space-y-6">
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
            onClick={() => setActiveIcon(item.id)}
          >
            {item.icon}
          </div>
        ))}
      </div>


      {/* Bottom section */}
      <div className="flex flex-col items-center space-y-6">
        {bottomItems.map((item) => (
          <div 
            key={item.id}
            className={`flex justify-center items-center cursor-pointer w-10 h-10 rounded-lg ${
              activeIcon === item.id ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveIcon(item.id)}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}