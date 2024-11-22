"use client";

import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm, Controller } from "react-hook-form";

import SimpleMDE from "react-simplemde-editor";

import axios from "axios";

import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

type IssueForm = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const navigation = useRouter();

  const formSubmitHandler = async (data: IssueForm) => {
    await axios.post("/api/issues", data);
    navigation.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="max-w-xl space-y-2"
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
