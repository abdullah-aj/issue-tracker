'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">User one</Select.Item>
          <Select.Item value="2">User two</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export { AssigneeSelect }
