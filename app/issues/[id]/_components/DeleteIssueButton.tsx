'use client'

import { AlertDialog, Button, Flex, Link } from '@radix-ui/themes'
import { FaRegTrashAlt } from 'react-icons/fa'

type Props = {
  issueId: number
}

const DeleteIssueButton = ({ issueId }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <FaRegTrashAlt />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deleting?</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt={'4'} gap={'3'} justify={'end'}>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Confirm</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    // <Button asChild={true}>
    //   <Link color="red" href={`/issues/${issueId}/delete`}>
    //     <FaRegTrashAlt />
    //     Delete Issue
    //   </Link>
    // </Button>
  )
}

export { DeleteIssueButton }
