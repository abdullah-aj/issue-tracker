"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import SimpleMDE from "react-simplemde-editor";
import { MdError } from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "validationSchemas/createIssueSchema";

import { z } from "zod";
import { ErrorMessage } from "global/ErrorMessage";

import { Spinner } from "global/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [formError, setFormError] = useState("");
  const navigation = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const formSubmitHandler = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      navigation.push("/");
    } catch (error: unknown) {
      console.log(error);
      setFormError("Some error occurred");
    }
  };

  return (
    <div className="max-w-xl">
      {formError && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdError />
          </Callout.Icon>
          <Callout.Text>{formError}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(formSubmitHandler)} className=" space-y-2">
        <TextField.Root
          disabled={isSubmitting || isLoading}
          placeholder="Title"
          {...register("title")}
        />
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          disabled={isSubmitting || isLoading}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}

        <Button disabled={isSubmitting || isLoading} type="submit">
          {isSubmitting || isLoading ? <Spinner /> : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
