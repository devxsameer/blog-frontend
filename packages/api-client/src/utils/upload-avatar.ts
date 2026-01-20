import type { AvatarUploadSignature } from '../endpoints';

export async function uploadAvatarToCloudinary(
  file: File,
  sig: AvatarUploadSignature,
) {
  const form = new FormData();

  Object.entries(sig.fields).forEach(([k, v]) => form.append(k, v));
  form.append('file', file);

  const res = await fetch(sig.uploadUrl, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const data = await res.json();

  return data.public_id;
}
