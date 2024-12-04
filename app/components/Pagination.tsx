import { Box, Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from 'react-icons/md'

type Props = {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ currentPage, pageSize, itemCount }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageSize <= 1) return null

  return (
    <Flex align={'center'} gap={'2'} justify={'between'}>
      <Text size={'2'}>
        Page {currentPage} of {pageCount}
      </Text>
      <Box>
        <Button variant="outline" disabled={currentPage <= 1}>
          <MdKeyboardDoubleArrowLeft />
        </Button>
        <Button variant="outline" disabled={currentPage <= 1}>
          <MdKeyboardArrowLeft />
        </Button>

        <Button variant="outline" disabled={currentPage >= pageCount}>
          <MdKeyboardArrowRight />
        </Button>

        <Button variant="outline" disabled={currentPage >= pageCount}>
          <MdKeyboardDoubleArrowRight />
        </Button>
      </Box>
    </Flex>
  )
}

export { Pagination }
