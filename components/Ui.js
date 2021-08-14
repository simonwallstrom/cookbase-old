export function Container({ children, className }) {
  return (
    <div
      className={`flex flex-col pb-6 w-full max-w-5xl px-6 mx-auto md:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
