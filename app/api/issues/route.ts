import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { issueSchema } from '../../validationSchemas/issueSchemas'

import AuthOptions from '@/app/auth/AuthOptions'
import prisma from '@/prisma/client'

export async function POST(request: NextRequest) {
  const session = await getServerSession(AuthOptions)
  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  try {
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description
      }
    })
    return NextResponse.json(newIssue, { status: 201 })
  } catch (e) {
    return NextResponse.json(e, { status: 400 })
  }
}
