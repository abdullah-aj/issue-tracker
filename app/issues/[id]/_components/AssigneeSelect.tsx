'use client'

import { Select } from '@radix-ui/themes'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'

import { useIssueUpdate } from '@/app/queries/issues'
import { useGetAllUsersQuery } from '@/app/queries/users'

type Props = {
  issueId: number
  assignedUserId: string | null
}

const AssigneeSelect = ({ issueId, assignedUserId }: Props) => {
  const {
    data: usersData,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
    isError: isErrorFetchingUsers
  } = useGetAllUsersQuery()

  const {
    mutate: assignUserToIssue,
    isError: isErrorAssignUser,
    isPending: isPendingAssignUser,
    isSuccess: isSuccessAssignUser
  } = useIssueUpdate()

  const handleUserValueChange = (userId: string) => {
    assignUserToIssue({ assignedUserId: userId, issueId: issueId })
  }

  useEffect(() => {
    if (isSuccessAssignUser) {
      console.log('successfully assigned user to issue')
    }
    if (isErrorAssignUser) {
      console.log('unable to assign user to issue')
    }
  }, [isSuccessAssignUser, isErrorAssignUser])

  if (isErrorFetchingUsers) {
    return null
  }

  if (isFetchingUsers || isLoadingUsers) {
    return <Skeleton height={'2rem'} />
  }

  return (
    <Select.Root
      defaultValue={assignedUserId || ''}
      disabled={isPendingAssignUser}
      onValueChange={handleUserValueChange}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={null as unknown as string}>Unassigned</Select.Item>
          {usersData?.map(user => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export { AssigneeSelect }
