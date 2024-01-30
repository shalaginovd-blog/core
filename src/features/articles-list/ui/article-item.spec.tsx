import { render, screen } from "@testing-library/react";
import ArticleItem from "@/features/articles-list/ui/article-item";
import { userEvent } from "@testing-library/user-event";

describe("article-item", () => {
    it("должент вызывать callback при клике", async () => {
        const onDelete = jest.fn();
        render(
            <ArticleItem
                article={{
                    id: "abc",
                    title: "test title",
                    preface: "test preface",
                }}
                onDelete={onDelete}
            />,
        );

        await userEvent.click(screen.getByText("Delete"));

        expect(onDelete).toHaveBeenCalled();
    });
});
