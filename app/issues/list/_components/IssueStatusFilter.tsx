'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
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

const IssueStatusFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams()
    if (status) {
      params.append('status', status)
    }
    if (searchParams.get('orderBy')) {
      params.append('orderBy', searchParams.get('orderBy')!)
    }
    const query = params ? `?${params.toString()}` : ''
    router.push(`/issues/list${query}`)
  }

  return (
    <Select.Root
      defaultValue={searchParams.get('status') ?? (null as unknown as string)}
      onValueChange={handleFilterChange}
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
