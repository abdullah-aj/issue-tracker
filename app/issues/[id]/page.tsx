import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import { EditIssueButton } from './_components/EditIssueButton'
import IssueDetails from './_components/IssueDetails'

import prisma from '@/prisma/client'
import { DeleteIssueButton } from './_components/DeleteIssueButton'

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
      <Grid columns={{ initial: '1', sm: '5' }} gap={'5'}>
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        <Flex direction={'column'} gap={'2'}>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Grid>
    )
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default IssueDetailPage
