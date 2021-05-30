import { Loader } from 'react-feather';

export default function Button({ children, loading, className, ...restProps }) {
  return (
    <button className={`relative ${className || ''}`} {...restProps}>
      <span className={`${loading ? 'opacity-0' : ''}`}>{children}</span>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="animate-spin" size={20} />
        </div>
      ) : null}
    </button>
  );
}
