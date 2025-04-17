export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
