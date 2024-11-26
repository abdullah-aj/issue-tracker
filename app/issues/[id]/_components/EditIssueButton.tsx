import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { BsPencilSquare } from 'react-icons/bs'

type Props = {
  issueId: number
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button>
        <BsPencilSquare />
        Edit Issue
      </Button>
    </Link>
  )
}

export { EditIssueButton }
