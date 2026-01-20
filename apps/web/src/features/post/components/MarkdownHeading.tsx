import { useEffect } from 'react';
import type { HTMLAttributes } from 'react';
import type { TocItem } from '../types';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function createHeadingRenderer(
  level: 2 | 3 | 4,
  register: (item: TocItem) => void,
) {
  return function Heading(props: HTMLAttributes<HTMLHeadingElement>) {
    const { children, ...rest } = props;

    const text = String(children);
    const id = slugify(text);
    const Tag = `h${level}` as const;

    const scrollOffset =
      level === 2
        ? 'scroll-mt-28'
        : level === 3
          ? 'scroll-mt-24'
          : 'scroll-mt-20';

    useEffect(() => {
      register({ id, text, level });
    }, [id, text, level]);

    return (
      <Tag id={id} {...rest} className={scrollOffset}>
        {children}
      </Tag>
    );
  };
}
