import { ReactNode } from "react";

type LayoutProps = {
  list: ReactNode;
  trendingTags: ReactNode;
};

export default function Layout({ list, trendingTags }: LayoutProps) {
  return (
    <section className="grid gap-8 grid-cols-[1fr] lg:grid-cols-[2fr,1fr]">
      {list}
      <aside className="order-1 lg:order-2 max-w-full overflow-auto">
        {trendingTags}
      </aside>
    </section>
  );
}
