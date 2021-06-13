export function Container({ children }) {
  return (
    <div className="w-full max-w-5xl px-6 mx-auto md:px-12">{children}</div>
  );
}

export function Spacer({ size = 'sm' }) {
  const sizes = {
    sm: 'h-6 md:h-8',
  };

  return <div className={sizes[size]}></div>;
}
