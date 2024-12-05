import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

type Props = {
  open: number
  close: number
  inProgress: number
}

const IssueSummary = ({ close, inProgress, open }: Props) => {
  const StatusCards: {
    label: string
    value: number
    status: Status
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'Closed Issues', value: close, status: 'CLOSED' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' }
  ]

  return (
    <div className="flex md:justify-start lg:justify-between gap-4">
      {StatusCards.map(statusCard => (
        <Card key={`card-${statusCard.label}`}>
          <Flex direction={'column'} gap={'1'}>
            <Link className="text-sm font-medium" href={`/issues/list?status=${statusCard.status}`}>
              {statusCard.label}
            </Link>
            <Text size={'5'} className="font-bold">
              {statusCard.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </div>
  )
}

export { IssueSummary }
