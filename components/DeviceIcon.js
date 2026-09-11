export default function DeviceIcon({ mode, orientation }) {
  if (orientation === 'landscape') {
    return (
      <svg viewBox="0 0 28 20" aria-hidden="true" className="toolbar-icon">
        <rect x="1" y="4" width="26" height="12" rx="3" />
        <path d="M5 7h18" />
        <circle cx="23" cy="13" r="1" />
      </svg>
    );
  }

  if (mode === 'double') {
    return (
      <svg viewBox="0 0 28 20" aria-hidden="true" className="toolbar-icon">
        <rect x="2" y="1" width="24" height="18" rx="4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 28" aria-hidden="true" className="toolbar-icon">
      <rect x="1" y="1" width="18" height="26" rx="4" />
      <path d="M7 4h6" />
      <circle cx="10" cy="24" r="1" />
    </svg>
  );
}
