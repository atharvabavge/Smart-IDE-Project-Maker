'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import { Button } from '../ui/button';
import { UserDetailContext } from '@/context/UserDetailContext';

function SideBarFooter() {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);

  const options = [
    {
      name: 'Settings',
      icon: Settings,
    },
    {
      name: 'Help Center',
      icon: HelpCircle,
    },
    {
      name: 'My Subscription',
      icon: Wallet,
      path: '/pricing',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
      action: () => {
        localStorage.removeItem('user');      // Clear user data
        setUserDetail(null);                  // Reset context
        router.push('/SignInDialog');               // Redirect to sign-in page
      },
    },
  ];

  const onOptionClick = (option) => {
    if (option.action) {
      option.action();
    } else if (option.path) {
      router.push(option.path);
    } else {
      console.log(`${option.name} clicked, but no path or action specified.`);
    }
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          variant="ghost"
          className="w-full flex items-center gap-2 my-3"
        >
          <option.icon className="w-5 h-5" />
          <span>{option.name}</span>
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
