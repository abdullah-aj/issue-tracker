import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { IoMdArrowDropup } from 'react-icons/io'

import NextLink from 'next/link'

export type SearchParamsType = {
  status: Status
  orderBy: keyof Issue
  page: string
}

type Props = {
  issues: Issue[]
  searchParams: SearchParamsType
}

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {COLUMNS.map(column => (
            <Table.ColumnHeaderCell key={`column-${column.label}`} {...column}>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: column.value }
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && <IoMdArrowDropup className="inline" />}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={`issue-row-${issue.id}`}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export { IssueTable }

const COLUMNS: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
]

export const ColumnNames = COLUMNS.map(column => column.value)
