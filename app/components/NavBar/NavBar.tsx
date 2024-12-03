'use client'

import { Container, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { FaBug } from 'react-icons/fa6'

import { NavLinks } from './NavLinks'
import { UserDropdown } from './UserDropdown'

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={'between'}>
          <Flex align={'center'} gap={'3'}>
            <Link href={'/'}>
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <UserDropdown />
        </Flex>
      </Container>
    </nav>
  )
}

export { NavBar }
