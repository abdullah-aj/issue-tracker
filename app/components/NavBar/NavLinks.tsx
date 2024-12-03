import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navLinks = [
  {
    label: 'Dashboard',
    href: '/'
  },
  {
    label: 'Issues',
    href: '/issues/list'
  }
]

const NavLinks = () => {
  const currentPath = usePathname()

  return (
    <ul className="flex space-x-6">
      {navLinks.map(link => (
        <li key={`link-${link.href}`}>
          <Link
            className={classNames({
              '!text-zinc-900': link.href === currentPath,
              'nav-link': true
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export { NavLinks }
