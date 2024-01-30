"use client";

import { ArticleListItem } from "@/features/articles-list/model/types";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    article: ArticleListItem;
    onDelete: () => Promise<void>;
};

const ArticleItem = ({ article, onDelete }: Props) => {
    const [isLoadingDelete, startDeleteTransition] = useTransition();

    const handleDelete = () => {
        startDeleteTransition(async () => {
            await onDelete();
            toast("Article has been deleted");
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.preface}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button disabled={isLoadingDelete} onClick={handleDelete}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ArticleItem;
