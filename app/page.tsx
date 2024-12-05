import { Flex } from '@radix-ui/themes'
import { LatestIssues, IssueSummary, IssueChart } from './components'
import prisma from '@/prisma/client'

export default async function Home() {
  const openCount = await prisma.issue.count({
    where: {
      status: 'OPEN'
    }
  })

  const closeCount = await prisma.issue.count({
    where: {
      status: 'CLOSED'
    }
  })

  const inProgressCount = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS'
    }
  })

  return (
    <Flex gap={'2'} direction={'column'}>
      <LatestIssues />
      <IssueSummary close={closeCount} inProgress={inProgressCount} open={openCount} />
      <IssueChart close={closeCount} inProgress={inProgressCount} open={openCount} />
    </Flex>
  )
}
