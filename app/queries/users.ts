import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAllUsersQuery = () => {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  })
}
