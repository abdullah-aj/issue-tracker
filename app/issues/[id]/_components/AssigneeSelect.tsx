'use client'

import { Select } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

import { useGetAllUsersQuery } from '@/app/queries/users'

const AssigneeSelect = () => {
  const {
    data: usersData,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
    isError: isErrorFetchingUsers
  } = useGetAllUsersQuery()

  if (isErrorFetchingUsers) {
    return null
  }

  if (isFetchingUsers || isLoadingUsers) {
    return <Skeleton height={'2rem'} />
  }

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
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
