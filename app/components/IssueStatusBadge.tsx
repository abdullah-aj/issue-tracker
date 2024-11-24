import { Status } from '@prisma/client'
import { Badge, Flex } from '@radix-ui/themes'
import React from 'react'

type Props = {
  status: Status
}

const IssueStatusBadge = ({ status }: Props) => {
  const statusMap: Record<Status, { label: string; color: 'violet' | 'red' | 'green' }> = {
    OPEN: {
      label: 'Open',
      color: 'red'
    },
    IN_PROGRESS: {
      label: 'In Progress',
      color: 'violet'
    },
    CLOSED: {
      label: 'Closed',
      color: 'green'
    }
  }

  return (
    <Flex gap="2">
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </Flex>
  )
}

export { IssueStatusBadge }
