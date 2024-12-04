import { Status } from '@prisma/client'

import { Pagination } from '@/app/components'
import { IssueActions } from '@/app/issues/_components/IssueActions'
import prisma from '@/prisma/client'
import { ColumnNames, IssueTable, SearchParamsType } from './_components/IssueTable'
import { Flex } from '@radix-ui/themes'

type Props = {
  searchParams: SearchParamsType
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams?.status) ? searchParams.status : undefined

  const orderBy = ColumnNames.includes(searchParams?.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

  const page = searchParams?.page ? parseInt(searchParams?.page) : 1
  const pageSize = 10

  const where = { status }

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({
    where
  })

  return (
    <Flex gap={'3'} direction={'column'}>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount} />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
