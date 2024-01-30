import CreateArticleForm from "@/features/articles-list/pub/create-article-form";
import ArticlesList from "@/features/articles-list/pub/articles-list";
import { Separator } from "@/shared/ui/separator";

export default async function Home() {
    const revalidatePagePath = "/";

    return (
        <main className={"flex flex-col items-center min-h-screen p-8 gap-5"}>
            <CreateArticleForm
                revalidatePagePath={revalidatePagePath}
                className={"max-w-screen-lg w-full"}
            />
            <Separator className={"max-w-screen-lg w-full"} />
            <ArticlesList
                revalidatePagePath={revalidatePagePath}
                className={"max-w-screen-lg w-full"}
            />
        </main>
    );
}
