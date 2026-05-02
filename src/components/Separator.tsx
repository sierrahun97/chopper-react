export function Separator({
  className = "separator-nav",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <div id="azul"></div>
      <div id="light-green"></div>
      <div id="turq"></div>
      <div id="morado"></div>
    </div>
  );
}
