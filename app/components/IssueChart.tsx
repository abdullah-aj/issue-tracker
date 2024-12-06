'use client'

import { Card } from '@radix-ui/themes'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

type Props = {
  open: number
  close: number
  inProgress: number
}

const IssueChart = ({ close, inProgress, open }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'Close', value: close },
    { label: 'InProgress', value: inProgress }
  ]
  return (
    <Card>
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart data={data}>
          <XAxis dataKey={'label'} />
          <YAxis />
          <Bar dataKey={'value'} barSize={60} style={{ fill: 'var(--accent-10)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export { IssueChart }
