import { cache } from "react";
import { db } from "@/shared/lib/db";
import {
    ArticleListItem,
    CreateListItemCommand,
    DeleteListItemCommand,
} from "@/features/articles-list/model/types";

interface IArticleRepository {
    getList: () => Promise<ArticleListItem[]>;
    createItem: (payload: CreateListItemCommand) => Promise<ArticleListItem>;
    deleteItem: (identity: DeleteListItemCommand["id"]) => Promise<void>;
}

class ArticlesRepository implements IArticleRepository {
    getList = cache((): Promise<ArticleListItem[]> => db.article.findMany());
    createItem = async (
        payload: CreateListItemCommand,
    ): Promise<ArticleListItem> => {
        return db.article.create({
            data: payload,
        });
    };
    deleteItem = async (id: DeleteListItemCommand["id"]): Promise<void> => {
        await db.article.delete({ where: { id } });
    };
}

export const articlesRepository = new ArticlesRepository();
