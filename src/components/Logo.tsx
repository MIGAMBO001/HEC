export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  return (
    <img
      src="/resources/hotice-branding-image"
      alt="HOTICE"
      className={`${box} shrink-0 rounded-xl object-contain`}
    />
  );
}
