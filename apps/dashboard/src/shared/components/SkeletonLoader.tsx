export default function SkeletonLoader() {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header */}
      <header className="flex flex-col gap-4">
        <h1 className="skeleton h-4 w-20"></h1>
        <p className="skeleton h-4 w-72"></p>
      </header>

      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}
