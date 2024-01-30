"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createArticleAction } from "@/features/articles-list/actions";
import { CreateListItemCommand } from "@/features/articles-list/model/types";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { cn } from "@/shared/ui/utils";

type Props = {
    revalidatePagePath: string;
    className?: string;
};

const createArticleFormSchema = z.object({
    title: z.string(),
    preface: z.string(),
});

const CreateArticleForm = ({ revalidatePagePath, className }: Props) => {
    const [isCreating, startCreateTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(createArticleFormSchema),
        defaultValues: {
            title: "",
            preface: "",
        },
    });

    const onSubmit = (data: CreateListItemCommand) => {
        startCreateTransition(async () => {
            await createArticleAction(data, revalidatePagePath);
            toast("Article has been created!");
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(className, "flex flex-col gap-3")}
            >
                <FormField
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={"Enter title here"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name={"title"}
                />
                <FormField
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preface</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={"Enter preface here"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name={"preface"}
                />
                <Button type={"submit"} disabled={isCreating}>
                    Create
                </Button>
            </form>
        </Form>
    );
};

export default CreateArticleForm;
