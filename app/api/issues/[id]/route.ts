import { NextRequest, NextResponse } from 'next/server'

import { issueSchema } from '@/app/validationSchemas/issueSchemas'
import prisma from '@/prisma/client'

type Props = {
  params: {
    id: string
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!issue) {
      return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 })
    }

    const updatedIssue = await prisma.issue.update({
      where: {
        id: issue.id
      },
      data: {
        title: body.title,
        description: body.description
      }
    })

    return NextResponse.json(updatedIssue, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!issue) {
      return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 })
    }

    const deletedIssue = await prisma.issue.delete({
      where: {
        id: issue.id
      }
    })

    return NextResponse.json(deletedIssue, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
