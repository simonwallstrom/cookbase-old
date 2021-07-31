import { Loader } from 'react-feather';

export default function Button({ children, loading, className, ...restProps }) {
  return (
    <button className={`relative ${className || ''}`} {...restProps}>
      <div
        className={`flex items-center justify-center space-x-2 ${
          loading ? 'opacity-0' : ''
        }`}
      >
        {children}
      </div>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="animate-spin" size={20} />
        </div>
      ) : null}
    </button>
  );
}
