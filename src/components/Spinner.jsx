export default function Spinner({ size }) {
  return (
    <span
      className={`loading loading-bars loading-${size} text-blue-400`}
    ></span>
  );
}
