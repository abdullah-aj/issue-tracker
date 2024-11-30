import { Avatar, Box, DropdownMenu, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React from 'react'

const UserDropdown = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }

  if (status === 'unauthenticated') {
    return (
      <Box>
        <Link className="nav-link" href="/api/auth/signin">
          Login
        </Link>
      </Box>
    )
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            referrerPolicy="no-referrer"
            className="cursor-pointer"
            size={'2'}
            radius="full"
            src={session!.user!.image!}
            fallback="?"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={'2'}>{session!.user!.email!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export { UserDropdown }
