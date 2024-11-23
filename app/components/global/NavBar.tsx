'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBug } from 'react-icons/fa6'

const NavBar = () => {
  const currentPath = usePathname()

  const navLinks = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Issues',
      href: '/issues'
    }
  ]

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={'/'}>
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {navLinks.map(link => (
          <li key={`link-${link.href}`}>
            <Link
              className={classNames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-zinc-800': true
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { NavBar }
