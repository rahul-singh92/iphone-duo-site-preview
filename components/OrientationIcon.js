export default function OrientationIcon({ orientation }) {
  const isLandscape = orientation === 'horizontal';

  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      className="toolbar-icon orientation-icon"
    >
      {isLandscape ? (
        <rect x="3" y="7" width="22" height="14" rx="3" />
      ) : (
        <rect x="7" y="3" width="14" height="22" rx="3" />
      )}
    </svg>
  );
}
