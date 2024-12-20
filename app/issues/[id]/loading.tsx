import { Card, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

const LoadingIssueDetailPage = () => {
  return (
    <>
      <Skeleton className="max-w-xl" />
      <Flex gap={'2'} my={'2'}>
        <Skeleton width={'5rem'} />
        <Skeleton width={'8rem'} />
      </Flex>
      <Card className="prose" mt={'4'}>
        <Skeleton count={3} />
      </Card>
    </>
  )
}

export default LoadingIssueDetailPage
