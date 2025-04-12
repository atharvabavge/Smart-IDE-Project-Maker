'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Rocket, Sun, Moon } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now(),
    });
  };

  return (
    <>
      {/* Header Section */}
      <div className="p-4 flex justify-between items-center bg-blue-100 text-black shadow-md">
        <div className="flex flex-col items-start gap-2">
          {/* Logo and Title */}
          <Link href={'/'} className="flex items-center gap-2">
            <Image src={'/logo.png'} alt="logo" width={40} height={40} />
            <span className="text-xl font-semibold">SMART IDE</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
          {!userDetail?.name ? (
            <div className="flex gap-5">
              <Button variant="ghost">Sign In</Button>
              <Button className="text-white" style={{ backgroundColor: Colors.BLUE }}>
                Get Started
              </Button>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              {pathname.includes('/workspace/') && (
                <>
                  <Button variant="ghost" onClick={() => onActionBtn('export')}>
                    <Download /> Export
                  </Button>
                  <Button className="text-white" style={{ backgroundColor: Colors.BLUE }} onClick={() => onActionBtn('deploy')}>
                    <Rocket /> Deploy
                  </Button>
                </>
              )}
              {userDetail && (
                <Image
                  onClick={toggleSidebar}
                  src={userDetail?.picture}
                  alt="userImage"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button Below the Light Blue Part */}
      <div className="mt-2 flex justify-start p-4">
        <button onClick={toggleSidebar} className="p-2 rounded-full bg-black text-white hover:bg-gray-800">
          ☰
        </button>
      </div>
    </>
  );
}

export default Header;
