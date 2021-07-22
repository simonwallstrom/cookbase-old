export function Container({ children, className }) {
  return (
    <div
      className={`flex flex-col w-full max-w-5xl px-6 mx-auto md:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

export function Spacer({ size = 'sm' }) {
  const sizes = {
    sm: 'h-6 md:h-8',
    md: 'h-10 md:h-12',
  };

  return <div className={sizes[size]}></div>;
}
