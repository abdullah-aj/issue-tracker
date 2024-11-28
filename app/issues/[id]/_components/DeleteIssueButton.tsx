'use client'

import { Spinner } from '@/app/components/global'
import { AlertDialog, Button, Flex, Link } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

type Props = {
  issueId: number
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const [error, setError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const deleteAction = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues')
      router.refresh()
    } catch (e) {
      console.log(e)
      setError(true)
      setIsDeleting(false)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting} style={{ cursor: 'pointer' }}>
            {isDeleting ? <Spinner /> : [<FaRegTrashAlt />, ' Delete Issue']}
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
              <Button color="red" onClick={deleteAction}>
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted!</AlertDialog.Description>
          <Flex mt={'2'} justify={'end'}>
            <Button
              color="gray"
              variant="soft"
              onClick={() => {
                setError(false)
                setIsDeleting(false)
              }}
            >
              Okay
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export { DeleteIssueButton }
