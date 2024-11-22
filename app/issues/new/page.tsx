"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import SimpleMDE from "react-simplemde-editor";
import { MdError } from "react-icons/md";

import axios from "axios";

import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

type IssueForm = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const [formError, setFormError] = useState("");
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const navigation = useRouter();

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
    </div>
  );
};

export default NewIssuePage;
