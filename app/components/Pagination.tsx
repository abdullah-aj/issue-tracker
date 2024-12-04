'use client'

import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageSize <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`?${params}`)
  }

  return (
    <Flex align={'center'} gap={'2'} justify={'between'} mt="2">
      <Text size={'2'}>
        Page {currentPage} of {pageCount}
      </Text>
      <Box>
        <Button variant="outline" disabled={currentPage <= 1} onClick={() => changePage(1)}>
          <MdKeyboardDoubleArrowLeft />
        </Button>
        <Button variant="outline" disabled={currentPage <= 1} onClick={() => changePage(currentPage - 1)}>
          <MdKeyboardArrowLeft />
        </Button>

        <Button variant="outline" disabled={currentPage >= pageCount} onClick={() => changePage(currentPage + 1)}>
          <MdKeyboardArrowRight />
        </Button>

        <Button variant="outline" disabled={currentPage >= pageCount} onClick={() => changePage(pageCount)}>
          <MdKeyboardDoubleArrowRight />
        </Button>
      </Box>
    </Flex>
  )
}

export { Pagination }
