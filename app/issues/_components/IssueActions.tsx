import { Status } from '@prisma/client'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

import IssueStatusFilter from '@/app/issues/list/_components/IssueStatusFilter'

type Props = {
  selectedStatus?: Status
}

const IssueActions = ({ selectedStatus }: Props) => {
  return (
    <Flex mb={'5'} justify={'between'}>
      <IssueStatusFilter selectedStatus={selectedStatus} />
      <Button>
        <Link href={'/issues/new'}>New Issue</Link>
      </Button>
    </Flex>
  )
}

export { IssueActions }
