import { Button, Link } from '@radix-ui/themes'
import { FaRegTrashAlt } from 'react-icons/fa'

type Props = {
  issueId: number
}

const DeleteIssueButton = ({ issueId }: Props) => {
  return (
    <Button asChild={true}>
      <Link color="red" href={`/issues/${issueId}/delete`}>
        <FaRegTrashAlt />
        Delete Issue
      </Link>
    </Button>
  )
}

export { DeleteIssueButton }
