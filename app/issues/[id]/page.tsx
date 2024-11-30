import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { DeleteIssueButton } from './_components/DeleteIssueButton'
import { EditIssueButton } from './_components/EditIssueButton'
import IssueDetails from './_components/IssueDetails'

import AuthOptions from '@/app/auth/AuthOptions'
import prisma from '@/prisma/client'

type Props = {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions)

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
        {session && (
          <Flex direction={'column'} gap={'2'}>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Grid>
    )
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default IssueDetailPage
