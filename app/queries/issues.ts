import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type IssueUpdateType = {
  issueId: number
  assignedUserId: string | null
}

export const useIssueUpdate = () => {
  return useMutation({
    mutationFn: ({ assignedUserId, issueId }: IssueUpdateType) =>
      axios.patch(`/api/issues/${issueId}`, { assignedUserId })
  })
}
