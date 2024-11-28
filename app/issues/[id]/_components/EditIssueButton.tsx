import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { BsPencilSquare } from 'react-icons/bs'

type Props = {
  issueId: number
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button asChild={true}>
      <Link href={`/issues/edit/${issueId}`}>
        <BsPencilSquare />
        Edit Issue
      </Link>
    </Button>
  )
}

export { EditIssueButton }
