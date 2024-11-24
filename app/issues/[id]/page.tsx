import { notFound } from 'next/navigation'
import React from 'react'

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
      <div>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>
        <p>{issue.updatedAt.toDateString()}</p>
      </div>
    )
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default IssueDetailPage
