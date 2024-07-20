"use client";

import { IoSearch } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SearchSchema } from "@/schemas";

const SearchBar = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SearchSchema>) => {
    if (values.search) {
      router.push(`/search?s=${values.search}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-between gap-4 p-2 rounded-md flex-1 bg-primary-foreground"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  inputMode="search"
                  autoComplete="off"
                  autoFocus={false}
                  type="text"
                  placeholder="Search"
                  className="bg-transparent border-none outline-none shadow-none focus:border-none focus:outline-none focus-visible:border-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="icon" aria-label="Search Icon">
          <IoSearch className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
