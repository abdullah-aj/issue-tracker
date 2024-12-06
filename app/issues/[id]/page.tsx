import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { AssigneeSelect } from './_components/AssigneeSelect'
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
            <AssigneeSelect assignedUserId={issue.assignedUserId} issueId={issue.id} />
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

export async function generateMetadata({ params }: Props) {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    return {
      title: issue?.title,
      description: `Details of Issue: ${issue?.id}`
    }
  } catch (error) {
    console.log(error)
    return {
      title: 'Issue Tracker - Issue Detail',
      description: 'Issue detail page'
    }
  }
}
