'use client'

import dynamic from 'next/dynamic'

import { FormLoadingSkeleton } from '@/app/issues/_components/FormLoadingSkeleton'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm').then(module => module.IssueForm), {
  ssr: false,
  loading: () => <FormLoadingSkeleton />
})

const NewIssuePage = () => {
  return <IssueForm />
}

export default NewIssuePage
