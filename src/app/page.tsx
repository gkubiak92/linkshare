import { NavMenu } from "@/components/navMenu/NavMenu";
import { LinkEntry } from "@/components/linkEntry/LinkEntry";
import { getEntries } from "@/api/entries/getEntries";

export default async function Home() {
  const { results } = await getEntries(1);
  const resultsWithThumbnails = results.filter(
    ({ thumbnail }) => thumbnail !== null && thumbnail.endsWith("jpg"),
  );

  return (
    <>
      <NavMenu />
      <main className="flex flex-col justify-between p-8 md:p-24">
        <h2 className="text-4xl mb-8">All entries</h2>
        <div className="flex flex-col gap-4 max-w-screen-md">
          {resultsWithThumbnails.map(
            ({ id, title, description, url, thumbnail, score, user, tags }) => (
              <LinkEntry
                key={id}
                title={title}
                description={description}
                url={url}
                thumbnailUrl={thumbnail}
                score={score}
                author={user}
                tags={tags}
              />
            ),
          )}
        </div>
      </main>
    </>
  );
}
