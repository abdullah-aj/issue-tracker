import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

import { IssueStatusBadge } from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'

type Props = {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  await delay(2000)
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!issue) {
      notFound()
    }

    return (
      <>
        <Heading>{issue.title}</Heading>
        <Flex gap={'2'} my={'2'}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt={'4'}>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </>
    )
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default IssueDetailPage
