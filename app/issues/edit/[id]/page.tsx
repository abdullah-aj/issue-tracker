import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import React from 'react'

import { FormLoadingSkeleton } from '@/app/issues/_components/FormLoadingSkeleton'
import prisma from '@/prisma/client'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm').then(module => module.IssueForm), {
  ssr: false,
  loading: () => <FormLoadingSkeleton />
})

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
