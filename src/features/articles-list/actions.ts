"use server";

import { CreateListItemCommand } from "@/features/articles-list/model/types";
import { articlesRepository } from "@/features/articles-list/repository/articles.repository";
import { revalidatePath } from "next/cache";

export const createArticleAction = async (
    payload: CreateListItemCommand,
    prevalidatePagePath: string,
) => {
    await articlesRepository.createItem(payload);
    revalidatePath(prevalidatePagePath);
};
