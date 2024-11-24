import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

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
      <>
        <Heading>{issue.title}</Heading>
        <Flex gap={'2'} my={'2'}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>{issue.description}</Card>
      </>
    )
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default IssueDetailPage
