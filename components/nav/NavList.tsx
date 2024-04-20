import React, { useState } from 'react'
import { navItems } from '../../lib/navlist'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

type Props = {
    searchSelected: boolean
}

function NavList({searchSelected}: Props) {
    const [menuOpen, setMenuOpen] = useState('');

  return (
    <ul onMouseLeave={() => setMenuOpen('')} className={`animate-forward md:flex items-center ${searchSelected ? 'animate-slideUp' : 'animate-slideDown'}`}>
        {navItems?.map(menuItem => (
            <li
            key={menuItem.name}
            className='flex px-2 relative items-center gap-1 cursor-pointer hover:bg-slate-900 py-4 ease-in duration-150 min-h-fit'
            onMouseEnter={() => setMenuOpen(menuItem.name)}
            >
                <p className='text-white md:text-sm lg:text-lg'>{menuItem.name}</p>
                {menuItem.children.length > 0 && (
                    menuOpen === menuItem.name ? (
                    <>
                        <ChevronUpIcon 
                        className={`text-white font-semibold ${menuOpen === menuItem.name && 'animate-rotateUp'}`} 
                        height={18} 
                        width={18} />
                        {/* Dropdown menu */}
                        <div className='absolute min-w-full md:top-12 lg:top-14 left-0 rounded-lg bg-slate-900 text-slate-500 py-3 z-10 px-2'>
                            <ul className='flex flex-col items-start justify-start gap-1 w-full'>
                                {menuItem?.children.map(child => (
                                    <li
                                    key={child.name}
                                    className='py-2 px-3 font-semibold scale-hover whitespace-nowrap hover:text-white w-full'
                                    >
                                            {child.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                     )
                    : <ChevronDownIcon 
                    className={`text-white font-semibold animate-rotateDown`} 
                    height={18} 
                    width={18} />              
                )}
            </li>
        ))}
    </ul>
  )
}

export default NavList