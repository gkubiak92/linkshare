import { NavMenu } from "@/components/navMenu/NavMenu";
import { LinkEntry } from "@/components/linkEntry/LinkEntry";

export default function Home() {
  return (
    <>
      <NavMenu />
      <main className="flex flex-col justify-between p-8 md:p-24">
        <h2 className="text-4xl mb-8">All entries</h2>
        <div className="flex flex-col max-w-screen-md">
          <LinkEntry
            id="1"
            title="test"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
            url="https://www.google.com"
            imageUrl="https://picsum.photos/200/120"
            votesCount={5}
            tags={["social", "media", "marketing"]}
            author={{}}
          />
        </div>
      </main>
    </>
  );
}
