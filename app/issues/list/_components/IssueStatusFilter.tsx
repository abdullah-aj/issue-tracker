'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const STATUSES: { label: string; value?: Status }[] = [
  {
    label: 'All'
  },
  {
    label: 'Open',
    value: 'OPEN'
  },
  {
    label: 'Closed',
    value: 'CLOSED'
  },
  {
    label: 'Inprogress',
    value: 'IN_PROGRESS'
  }
]

type Props = {
  selectedStatus?: Status
}

const IssueStatusFilter = ({ selectedStatus }: Props) => {
  const router = useRouter()

  return (
    <Select.Root
      defaultValue={selectedStatus ?? (null as unknown as string)}
      onValueChange={(status: string) => {
        const query = status ? `?status=${status}` : ''
        router.push(`/issues/list${query}`)
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {STATUSES.map(status => (
          <Select.Item key={`status-${status.value}`} value={status.value ?? (null as unknown as string)}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
