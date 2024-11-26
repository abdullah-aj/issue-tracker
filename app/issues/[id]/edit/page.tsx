import { notFound } from 'next/navigation'
import React from 'react'

import { IssueForm } from '../../_components/IssueForm'

import prisma from '@/prisma/client'

type Props = {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!issue) {
      notFound()
    }

    return <IssueForm issue={issue} />
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default EditIssuePage
