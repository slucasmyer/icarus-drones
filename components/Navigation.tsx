'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AppBar, Slide, useScrollTrigger } from "@mui/material";
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
          <Link href={`/`}><h1 className={`transition-all duration-500 text-3xl text-bold hover:underline hover:scale-125`}>ICARUS DRONES</h1></Link>
          <Link href={`/projects`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>PROJECTS</h1></Link>
          <Link href={`/features`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>FEATURES</h1></Link>
          <Link href={`/employees`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>EMPLOYEES</h1></Link>
          <Link href={`/customers`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>CUSTOMERS</h1></Link>
          <Link href={`/suppliers`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>SUPPLIERS</h1></Link>
          <Link href={`/assignments`}><h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125`}>ASSIGNMENTS</h1></Link>
        </nav>
      </AppBar>
    </Slide>
  );
}