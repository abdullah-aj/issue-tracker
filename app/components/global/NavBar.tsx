'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React from 'react'
import { FaBug } from 'react-icons/fa6'

const NavBar = () => {
  const { status, data: session } = useSession()

  console.log(session?.user!.image)

  const currentPath = usePathname()

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

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={'between'}>
          <Flex align={'center'} gap={'3'}>
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
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    referrerPolicy="no-referrer"
                    className="cursor-pointer"
                    size={'2'}
                    radius="full"
                    src={session.user!.image!}
                    fallback="?"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size={'2'}>{session.user!.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export { NavBar }
