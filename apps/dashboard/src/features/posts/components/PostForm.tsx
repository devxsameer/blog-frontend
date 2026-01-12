import { lazy, Suspense, useState } from 'react';
import type { PostStatus } from '@blog/types';
import type { ValidationIssue } from '@blog/api-client';

import TagInput from './TagInput';
import { generateSlug } from '@/shared/utils/slug';
import type { PostFormProps } from '../posts.types';
import { usePostForm } from '../hooks/usePostForm';
import PostSuccessModal from './PostSucessModal';

const MarkdownEditor = lazy(() => import('./MarkdownEditor'));

export default function PostForm({ initialValues, mode }: PostFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [slug, setSlug] = useState(initialValues?.slug ?? '');
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? '');
  const [tags, setTags] = useState<string[]>(
    initialValues?.tags?.map((t) => t.name) ?? [],
  );
  const [contentMarkdown, setContentMarkdown] = useState(
    initialValues?.contentMarkdown ?? '',
  );
  const [status, setStatus] = useState<PostStatus>(
    initialValues?.status ?? 'draft',
  );

  const { submit, isSubmitting, error, showSuccess, closeSuccess, result } =
    usePostForm(mode, initialValues?.slug);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    submit({
      title,
      contentMarkdown,
      excerpt: excerpt || null,
      status,
      tags,
    });
  }

  const isArchived = status === 'archived';
  const canEditContent = !isArchived;

  function handleTitleChange(value: string) {
    setTitle(value);
    if (mode === 'create') setSlug(generateSlug(value));
  }
  return (
    <>
      <PostSuccessModal
        open={showSuccess}
        mode={mode}
        slug={result?.slug}
        onClose={closeSuccess}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Archived notice */}
        {isArchived && (
          <div className="alert alert-warning">
            This post is archived. You can unarchive it, but content cannot be
            edited while archived.
          </div>
        )}

        {/* Validation errors */}
        {error?.issues && (
          <div className="space-y-1">
            {error.issues.map((issue: ValidationIssue) => (
              <p key={issue.path} className="text-sm text-red-500">
                {issue.path}: {issue.message}
              </p>
            ))}
          </div>
        )}

        {/* Main form */}
        <div className="flex flex-wrap gap-6">
          <div className="card bg-base-100 min-w-lg flex-3 shadow-sm">
            <div className="card-body space-y-4">
              <label className="fieldset">
                <span className="fieldset-label font-semibold">Title *</span>
                <input
                  className="input w-full"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  disabled={!canEditContent}
                  required
                />
              </label>

              <label className="fieldset">
                <span className="fieldset-label font-semibold">Slug</span>
                <input className="input w-full" value={slug} disabled />
              </label>

              <label className="fieldset">
                <span className="fieldset-label font-semibold">Summary</span>
                <textarea
                  className="textarea textarea-bordered"
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  disabled={!canEditContent}
                />
              </label>
            </div>
          </div>

          <div className="card bg-base-100 min-w-xs flex-1 shadow-sm">
            <div className="card-body space-y-4">
              <label className="fieldset">
                <span className="fieldset-label font-semibold">Tags</span>
                <TagInput
                  value={tags}
                  onChange={setTags}
                  maxTags={10}
                  disabled={!canEditContent}
                />
              </label>

              <label className="fieldset">
                <span className="fieldset-label font-semibold">Status *</span>
                <select
                  className="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PostStatus)}
                >
                  <option value="draft">Draft</option>

                  {!isArchived && <option value="published">Published</option>}

                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <label className="fieldset">
              <span className="fieldset-label font-semibold">
                Content Markdown
              </span>
              <Suspense fallback={<div className="skeleton h-40" />}>
                <MarkdownEditor
                  value={contentMarkdown}
                  onChange={setContentMarkdown}
                  disabled={!canEditContent}
                />
              </Suspense>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end">
          <button
            type="submit"
            className="btn btn-neutral"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving…'
              : mode === 'create'
                ? 'Create Post'
                : 'Save Changes'}
          </button>
        </div>
      </form>
    </>
  );
}
