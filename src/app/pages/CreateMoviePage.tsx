"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Box } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(1, {
    message: "title must be at least 1 characters.",
  }),
  category: z.string().min(1, {
    message: "category must be at least 1 characters.",
  }),
  release_year: z.number().min(1, {
    message: "release_year must be at least 1 characters.",
  }),
  description: z.string().min(3, {
    message: "description must be at least 3 characters.",
  }),
  rating: z
    .number()
    .min(1, {
      message: "rating must be at least 1 characters.",
    })
    .default(0.0),
  director: z.string().min(2, {
    message: "director must be at least 2 characters.",
  }),
  runtime: z
    .number()
    .min(1, {
      message: "runtime must be at least 1 characters.",
    })
    .default(0),
  image: z.string().min(2, {
    message: "image must be at least 2 characters.",
  }),
});

const CreateMoviePage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Win Aung",
      category: "dddd",
      description: "dddd",
      director: "dddd",
      rating: 3.9,
      release_year: 2024,
      runtime: 35000,
      title: "dddd",
      image: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Assuming data includes fields like `title` or `username` from the form schema
    console.log("Form Data:", data);

    // Sending a POST request to an API endpoint to save movie data
  };
  console.log({ imageUrl });
  return (
    <div className="flex">
      <div className="w-[60%] mx-auto">
        {!imageUrl ? null : (
          <Image alt="some" width={300} height={300} src={imageUrl} />
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title Eg: Who You are" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="director"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Director</FormLabel>
                  <FormControl>
                    <Input placeholder="Director" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="release_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release year</FormLabel>
                  <FormControl>
                    <Input placeholder="Release year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input placeholder="Rating" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="runtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Runtime</FormLabel>
                  <FormControl>
                    <Input placeholder="Runtime" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl className="border rounded-md ">
                    <div className="flex justify-between">
                      <Input
                        className="w-[40%]"
                        type="file"
                        onChange={(e) => {
                          if (!e.target.files?.[0]) return;
                          // Manually set the field value to the selected file
                          // upload image
                          const file = e.target.files[0];
                          setImageUrl(URL.createObjectURL(file));
                          field.onChange(
                            "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                          );
                        }}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submits</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateMoviePage;
