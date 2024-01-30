import { articlesRepository } from "@/features/articles-list/repository/articles.repository";
import ArticleItem from "@/features/articles-list/ui/article-item";
import { revalidatePath } from "next/cache";
import { cn } from "@/shared/ui/utils";

type Props = {
    revalidatePagePath: string;
    className?: string;
};

const ArticlesList = async ({ revalidatePagePath, className }: Props) => {
    const list = await articlesRepository.getList();

    const handleDeleteAction = async (articleId: string) => {
        "use server";

        await articlesRepository.deleteItem(articleId);

        revalidatePath(revalidatePagePath);
    };

    return (
        <div className={cn(className, "flex flex-col gap-3")}>
            {list.map((article) => (
                <ArticleItem
                    key={article.id}
                    article={article}
                    onDelete={handleDeleteAction.bind(null, article.id)}
                />
            ))}
        </div>
    );
};

export default ArticlesList;
