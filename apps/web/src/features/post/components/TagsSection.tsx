import type { Tag } from '@blog/types';

function TagsSection({ tags }: { tags: Tag[] }) {
  if (!tags.length) return null;

  return (
    <aside className="sticky top-24 hidden w-full shrink-0 lg:block">
      <div className="bg-base-100 rounded-lg p-4">
        <h2 className="mb-3 font-semibold">Popular Topics</h2>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="badge badge-sm border-base-300 bg-base-200 cursor-pointer transition-colors"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default TagsSection;
