interface Metric {
  label: string;
  value: string;
}

interface MetricsProps {
  metrics: Metric[];
  variant: 'banner' | 'callout' | 'inline';
  visible?: boolean;
}

export default function Metrics({ metrics, variant, visible = true }: MetricsProps) {
  if (variant === 'inline') {
    const metric = metrics[0];
    return (
      <div
        className={`bg-accent/5 border-l-[3px] border-accent px-4 py-3 transition-all duration-300 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
      >
        <div className="font-mono text-[11px] text-accent uppercase tracking-wide">{metric.label}</div>
        <div className="font-display font-bold text-2xl text-ink">{metric.value}</div>
      </div>
    );
  }

  if (variant === 'callout') {
    return (
      <div className="metrics-callout grid grid-cols-2 md:grid-cols-3 divide-x divide-border">
        {metrics.map((m) => (
          <div key={m.label} className="text-center px-4">
            <div className="font-display font-bold text-4xl text-accent">{m.value}</div>
            <div className="font-body font-medium text-sm text-muted mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid w-full divide-x divide-border"
      style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}
    >
      {metrics.map((m) => (
        <div key={m.label} className="text-center px-4">
          <div className="font-display font-bold text-4xl text-ink">{m.value}</div>
          <div className="font-mono text-xs text-accent uppercase tracking-wide mt-1">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
