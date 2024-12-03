import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import AuthOptions from '@/app/auth/AuthOptions'
import { patchIssueSchema } from '@/app/validationSchemas/issueSchemas'
import prisma from '@/prisma/client'

type Props = {
  params: {
    id: string
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(AuthOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }

  const body = await request.json()

  const validation = patchIssueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const { assignedUserId, title, description } = body

  try {
    if (assignedUserId) {
      const user = await prisma.issue.findUnique({
        where: {
          id: parseInt(assignedUserId)
        }
      })

      if (!user) {
        return NextResponse.json({ error: 'Invalid User' }, { status: 400 })
      }
    }

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
        title,
        description,
        assignedUserId
      }
    })

    return NextResponse.json(updatedIssue, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(AuthOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
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
