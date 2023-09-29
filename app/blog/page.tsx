import { draftMode } from 'next/headers';
import { PreviewBridge } from "@gocontento/next";
import { createClient } from "@/lib/contento";
import { ContentApiData } from "@gocontento/client/lib/api-types";
import CategoryPills from "@/app/components/blog/category-pills";

const client = createClient();

export default async function BlogPage() {

    const { isEnabled } = draftMode();

    const response = await client.getContent({
        params: {
            content_type: "blog_landing",
            slug: "blog",
            limit: "1"
        }
    });

    const blogPageContent = response.content[0] as ContentApiData;

    return (
        <div className="px-9 py-7 md:px-24 md:py-20">
            <PreviewBridge draftMode={isEnabled} />
            <header className="border-b-2 border-charcoal md:text-center pb-5">
                <h1 className="text-xxl font-bold mb-5">{blogPageContent.fields.header.text}</h1>
                <p className="text-sm md:max-w-2xl md:mx-auto">{blogPageContent.fields.body.text}</p>
                <CategoryPills />
            </header>
            {/*<BlogGallery />*/}
        </div>
    )
}
