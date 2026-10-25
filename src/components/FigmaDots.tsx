export function FigmaDots({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`grid h-[84px] w-[84px] grid-cols-5 grid-rows-5 gap-4 ${className}`}>
      {Array.from({ length: 25 }, (_, index) => <img key={index} src="/figma/dot.svg" alt="" width={4} height={4} />)}
    </div>
  );
}
