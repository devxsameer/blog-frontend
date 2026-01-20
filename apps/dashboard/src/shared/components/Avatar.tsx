type AvatarProps = {
  src?: string | null;
  name: string;
  size?: number;
  isLoading?: boolean;
};

export function Avatar({ src, name, size = 64 }: AvatarProps) {
  return (
    <>
      {src ? (
        <div className="avatar">
          <div
            className="ring-neutral ring-offset-base-100 rounded-full ring-2 ring-offset-2"
            style={{ width: size, height: size }}
          >
            <img src={src} alt={name} className="rounded-full object-cover" />
          </div>
        </div>
      ) : (
        <div className="avatar avatar-placeholder">
          <div
            className="ring-neutral ring-offset-base-100 bg-neutral text-neutral-content rounded-full ring-2 ring-offset-2"
            style={{ width: size, height: size }}
          >
            <span className="text-sm font-medium">{name[0].toUpperCase()}</span>
          </div>
        </div>
      )}
    </>
  );
}
