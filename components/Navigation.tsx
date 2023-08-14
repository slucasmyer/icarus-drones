'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AppBar, Slide, useScrollTrigger, IconButton, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from "next/navigation";

export default function Navigation() {
  const trigger = useScrollTrigger();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: '/projects', text: 'PROJECTS' },
    { href: '/features', text: 'FEATURES' },
    { href: '/employees', text: 'EMPLOYEES' },
    { href: '/customers', text: 'CUSTOMERS' },
    { href: '/suppliers', text: 'SUPPLIERS' },
    { href: '/assignments', text: 'ASSIGNMENTS' },
  ];

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={`nav-bar`} sx={{backgroundColor:`#4338ca`}}>
        <nav className={`hidden md:flex justify-between my-2 mx-10`}>
          <Link href={`/`}><h1 className={`transition-all duration-500 text-3xl text-bold hover:underline hover:scale-125`}>ICARUS DRONES</h1></Link>
          <IconButton onClick={() => setMenuOpen(true)} color="inherit">
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
            <List sx={{ width: 300, bgcolor: '#4338ca', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {links.map((link, index) => (
                <Link href={link.href} key={index}>
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <h1 className={`transition-all duration-500 text-2xl text-bold hover:underline hover:scale-125 my-5`}>{link.text}</h1>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </nav>
      </AppBar>
    </Slide>
  );
}
