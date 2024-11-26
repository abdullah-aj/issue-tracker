import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BsPencilSquare } from 'react-icons/bs'
import ReactMarkdown from 'react-markdown'

import { IssueStatusBadge } from '@/app/components/IssueStatusBadge'
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
          <Heading>{issue.title}</Heading>

          <Flex gap={'2'} my={'2'}>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose" mt={'4'}>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <Button>
            <BsPencilSquare />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
      </Grid>
    )
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default IssueDetailPage
