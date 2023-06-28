export default function Card({
  children,
  className,
}: {
  children?: JSX.Element | JSX.Element[];
  className?: string;
}) {
  return (
    <div className={`card p-4 bg-gray-100 shadow border rounded-md ${className}`}>
      {children}
    </div>
  );
}
