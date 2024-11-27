import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import { EditIssueButton } from './_components/EditIssueButton'
import IssueDetails from './_components/IssueDetails'

import prisma from '@/prisma/client'

type Props = {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!issue) {
      notFound()
    }

    return (
      <Grid columns={{ initial: '1', md: '2' }} gap={'5'}>
        <Box>
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      </Grid>
    )
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default IssueDetailPage
