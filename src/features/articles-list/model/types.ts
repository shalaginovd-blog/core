export type ArticleListItem = {
    id: string;
    title: string;
    preface: string;
};

export type CreateListItemCommand = Pick<ArticleListItem, "title" | "preface">;

export type DeleteListItemCommand = Pick<ArticleListItem, "id">;
