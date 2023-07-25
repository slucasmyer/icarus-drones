'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AppBar, Drawer, Slide, useScrollTrigger } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, usePathname } from "next/navigation";
import Button from './Button';

export default function Navigation() {
  const trigger = useScrollTrigger();
  const router = useRouter();
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  //close drawer if page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathName]);
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={`nav-bar`} sx={{backgroundColor:`#4338ca`}}>
        <nav className={`hidden md:flex justify-around my-2`}>
          <Link href={`/`}><h1 className={`transition-all duration-500 text-3xl text-bold hover:underline hover:scale-125`}>Employable.Team</h1></Link>
          <Link href={`/marketplace`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>MARKETPLACE</h1></Link>
          <Link href={`/account`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>ACCOUNT</h1></Link>
          <Link href={`/about`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>ABOUT</h1></Link>
          
        </nav>
        <nav className={`flex md:hidden justify-between my-2 mx-2`}>
          <Link href={`/`}><h1 className={`text-2xl text-bold`}>Employable.Team</h1></Link>
          <Button className={`btn-blue`} onClick={() => setMenuOpen(!menuOpen)}><MenuIcon /></Button>
        </nav>
        <Drawer anchor={`right`} open={menuOpen} onClose={() => setMenuOpen(false)}>
          <nav className={`flex flex-col justify-around my-2 bg-indigo-700 min-h-full`}>
            <Link href={`/`}><h1 className={`transition-all duration-500 text-3xl text-bold hover:underline hover:scale-125`}>Employable.Team</h1></Link>
            <Link href={`/marketplace`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>MARKETPLACE</h1></Link>
            <Link href={`/account`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>ACCOUNT</h1></Link>
            <Link href={`/about`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>ABOUT</h1></Link>
          </nav>
        </Drawer>
      </AppBar>
    </Slide>
  );
}