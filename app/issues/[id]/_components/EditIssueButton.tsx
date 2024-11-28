import { Box, Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { BsPencilSquare } from 'react-icons/bs'

type Props = {
  issueId: number
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button asChild={true}>
      <Link href={`/issues/${issueId}/edit`}>
        <BsPencilSquare />
        Edit Issue
      </Link>
    </Button>
  )
}

export { EditIssueButton }
