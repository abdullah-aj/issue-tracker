'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MdError } from 'react-icons/md'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

import { ErrorMessage } from 'global/ErrorMessage'
import { Spinner } from 'global/Spinner'

import 'easymde/dist/easymde.min.css'
import { issueSchema } from '@/app/validationSchemas/issueSchemas'

type IssueFormData = z.infer<typeof issueSchema>

type Props = {
  issue?: Issue
}

const IssueForm = ({ issue }: Props) => {
  const [formError, setFormError] = useState('')
  const navigation = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading }
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  })

  const formSubmitHandler = async (data: IssueFormData) => {
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data)
      } else {
        await axios.post('/api/issues', data)
      }
      navigation.push('/issues')
      navigation.refresh()
    } catch (error: unknown) {
      console.log(error)
      setFormError('Some error occurred')
    }
  }

  return (
    <div className="max-w-xl">
      {formError && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Icon>
            <MdError />
          </Callout.Icon>
          <Callout.Text>{formError}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-2" onSubmit={handleSubmit(formSubmitHandler)}>
        <TextField.Root
          defaultValue={issue?.title}
          disabled={isSubmitting || isLoading}
          placeholder="Title"
          {...register('title')}
        />
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          control={control}
          defaultValue={issue?.description}
          disabled={isSubmitting || isLoading}
          name="description"
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}

        <Button disabled={isSubmitting || isLoading} type="submit">
          {isSubmitting || isLoading ? <Spinner /> : issue ? 'Update Issue' : 'Add New Issue'}
        </Button>
      </form>
    </div>
  )
}

export { IssueForm }
