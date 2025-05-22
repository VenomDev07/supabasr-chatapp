'use client';

import React from 'react';
import {  
  HelpCircle, 
  List,
  MessageCircleMore,
  RefreshCcwDot,
  ArrowUpDown,
  MonitorDown,
  BellOff,
  Sparkles
} from 'lucide-react';

const Header = () => {
  return (
    <header className="flex h-full items-center justify-between py-2 px-4 bg-white border-b border-gray-100">
      {/* Left side */}
      <div className="flex ml-1 items-center gap-1" style={{paddingLeft: '10px'}}>
        <MessageCircleMore size={20} className="text-gray-500" />
        <span className="text-sm font-semibold text-gray-500">chats</span>
      </div>
      
      {/* Right side */}
      <div className="flex items-center gap-5" style={{marginRight: '20px'}}>

        <button className="text-gray-600  rounded-sm  buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '4px' }} >
          <RefreshCcwDot size={16} />
          <span className="text-xs font-medium text-gray-600">Refresh</span>
        </button>

        <button className="text-gray-600  rounded-sm  buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '4px' }} >
          <HelpCircle size={16} />
          <span className="text-xs font-medium text-gray-600">Help</span>
        </button>

        <button className="text-gray-600  rounded-sm  buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '4px' }} >
          <span className="w-2 h-2 pl-2 rounded-full bg-yellow-400"></span>
          <span className="text-xs text-gray-700">5 / 6 phones</span>
          <span className="text-gray-400 text-xs"><ArrowUpDown size={12} /></span>
        </button>
        
        <button className="text-gray-600  rounded-sm  buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '2px' }} >
          <MonitorDown size={16} />
        </button>
        
        <button className="text-gray-600  rounded-sm  buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '2px' }} >
          <BellOff size={16} />
        </button>
        
        <button className="text-gray-600  rounded-sm  buttonShadow flex items-center gap-2 hover:text-gray-800 hover:border-gray-400" style={{ paddingInline: '5px', paddingBlock: '4px' }} >
          <span className="text-gray-400 text-xs"><Sparkles  size={14} /></span>
          <span className="text-gray-400 text-xs"><List size={14} /></span>
        </button>
      </div>
    </header>
  );
};

export default Header;