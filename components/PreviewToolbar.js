'use client';

import DeviceIcon from './DeviceIcon';
import OrientationIcon from './OrientationIcon';

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="website-icon">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.1 2.35 3.1 5.35 3.1 9S14.1 18.65 12 21M12 3c-2.1 2.35-3.1 5.35-3.1 9S9.9 18.65 12 21" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="refresh-icon">
      <path d="M20 11a8 8 0 0 0-13.65-5.65L4 7.7" />
      <path d="M4 4.5v3.2h3.2" />
      <path d="M4 13a8 8 0 0 0 13.65 5.65L20 16.3" />
      <path d="M20 19.5v-3.2h-3.2" />
    </svg>
  );
}

export default function PreviewToolbar({
  url,
  onUrlChange,
  onLoad,
  mode,
  onModeChange,
  orientation,
  onOrientationChange,
  onRefresh,
  disabled = false,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onLoad();
  }

  return (
    <div className="preview-toolbar">
      <form className="site-switcher" onSubmit={handleSubmit}>
        <div className="site-input-wrap">
          <span className="site-input-icon" aria-hidden="true"><WebsiteIcon /></span>
          <input
            value={url}
            onChange={(event) => onUrlChange(event.target.value)}
            aria-label="Preview website URL"
            placeholder="Enter another website URL"
            spellCheck="false"
          />
        </div>
        <button className="load-button" type="submit">Load</button>
      </form>

      <div className="toolbar-actions">
        <div className="segmented-control" role="group" aria-label="Display mode">
          <button
            type="button"
            className={mode === 'single' ? 'mode-button active' : 'mode-button'}
            onClick={() => onModeChange('single')}
            disabled={disabled}
            aria-pressed={mode === 'single'}
            title="Single display"
          >
            <DeviceIcon mode="single" />
            <span>Single</span>
          </button>
          <button
            type="button"
            className={mode === 'double' ? 'mode-button active' : 'mode-button'}
            onClick={() => onModeChange('double')}
            disabled={disabled}
            aria-pressed={mode === 'double'}
            title="Double display"
          >
            <DeviceIcon mode="double" />
            <span>Double</span>
          </button>
        </div>

        <div className="segmented-control" role="group" aria-label="Orientation">
          <button
            type="button"
            className={orientation === 'vertical' ? 'mode-button active' : 'mode-button'}
            onClick={() => onOrientationChange('vertical')}
            disabled={disabled}
            aria-pressed={orientation === 'vertical'}
            title="Vertical orientation"
          >
            <OrientationIcon orientation="vertical" />
            <span>Vertical</span>
          </button>
          <button
            type="button"
            className={orientation === 'horizontal' ? 'mode-button active' : 'mode-button'}
            onClick={() => onOrientationChange('horizontal')}
            disabled={disabled}
            aria-pressed={orientation === 'horizontal'}
            title="Horizontal orientation"
          >
            <OrientationIcon orientation="horizontal" />
            <span>Horizontal</span>
          </button>
        </div>

        <button className="refresh-button" type="button" onClick={onRefresh} disabled={disabled} title="Refresh preview">
          <span aria-hidden="true"><RefreshIcon /></span>
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}
