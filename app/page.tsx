import { Flex, Grid } from '@radix-ui/themes'
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
    <Grid columns={{ initial: '1', md: '2' }} gap={'5'}>
      <Flex direction={'column'} gap={'5'}>
        <IssueSummary close={closeCount} inProgress={inProgressCount} open={openCount} />
        <IssueChart close={closeCount} inProgress={inProgressCount} open={openCount} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
