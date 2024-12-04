import { Issue, Status } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import { IoMdArrowDropup } from 'react-icons/io'

import { IssueStatusBadge, Link } from '@/app/components'
import { IssueActions } from '@/app/issues/_components/IssueActions'
import prisma from '@/prisma/client'

type Props = {
  searchParams: {
    status: Status
    orderBy: keyof Issue
  }
}

const COLUMNS: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
]

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams?.status) ? searchParams.status : undefined

  const orderBy = COLUMNS.map(column => column.value).includes(searchParams?.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  const issues = await prisma.issue.findMany({
    where: {
      status
    },
    orderBy
  })

  return (
    <div>
      <IssueActions selectedStatus={searchParams?.status} />
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
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
