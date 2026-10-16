import { workflowGraph } from "@/content/site";

const { triggers, hub, actions, caption } = workflowGraph;

/** Desktop geometry, in px, matching the 560 × 356 canvas below. */
const TRIGGER_TOPS = [30, 150, 270];
const ACTION_TOPS = [40, 160, 280];
const NODE_W = 160;

function NodeCard({
  kind,
  label,
  sub,
  highlight,
  className,
  style,
}: {
  kind: string;
  label: string;
  sub?: string;
  highlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (highlight) {
    return (
      <div
        className={`reveal rounded-[13px] bg-accent px-4 py-4 shadow-node ${className ?? ""}`}
        style={style}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent-soft">
          {kind}
        </div>
        <div className="mt-1 text-base leading-tight font-bold text-white">{label}</div>
        {sub ? <div className="mt-1.5 text-xs text-accent-soft">{sub}</div> : null}
      </div>
    );
  }

  return (
    <div
      className={`reveal rounded-[11px] border border-line bg-surface px-3.5 py-2.5 shadow-card ${className ?? ""}`}
      style={style}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{kind}</div>
      <div className="mt-0.5 text-sm font-semibold text-ink">{label}</div>
    </div>
  );
}

function Line({
  className,
  style,
  vertical,
  delay,
}: {
  className?: string;
  style?: React.CSSProperties;
  vertical?: boolean;
  delay: number;
}) {
  return (
    <div
      aria-hidden
      className={`absolute bg-accent-line ${vertical ? "line-y" : "line-x"} ${className ?? ""}`}
      style={{ ...style, animationDelay: `${delay}ms` }}
    />
  );
}

export default function WorkflowGraph() {
  return (
    <div aria-label="How an automated workflow is wired: three triggers feed an AI agent that drives three actions">
      {/* Desktop: the wired graph */}
      <div className="relative mx-auto hidden h-[356px] w-[560px] lg:block">
        <div className="absolute top-0 left-[196px] font-mono text-[11px] text-muted">{caption}</div>

        {/* left trunk + stubs */}
        <Line className="h-[2px] w-5" style={{ left: 160, top: 57 }} delay={260} />
        <Line className="h-[2px] w-5" style={{ left: 160, top: 177 }} delay={300} />
        <Line className="h-[2px] w-5" style={{ left: 160, top: 297 }} delay={340} />
        <Line className="h-60 w-[2px]" style={{ left: 178, top: 58 }} vertical delay={380} />
        <Line className="h-[2px] w-[22px]" style={{ left: 178, top: 184 }} delay={560} />

        {/* right trunk + stubs */}
        <Line className="h-[2px] w-[25px]" style={{ left: 360, top: 184 }} delay={760} />
        <Line className="h-60 w-[2px]" style={{ left: 383, top: 67 }} vertical delay={820} />
        <Line className="h-[2px] w-[15px]" style={{ left: 385, top: 67 }} delay={1000} />
        <Line className="h-[2px] w-[15px]" style={{ left: 385, top: 187 }} delay={1040} />
        <Line className="h-[2px] w-[15px]" style={{ left: 385, top: 307 }} delay={1080} />

        {triggers.map((node, i) => (
          <NodeCard
            key={node.id}
            kind={node.kind}
            label={node.label}
            className="absolute"
            style={{ left: 0, top: TRIGGER_TOPS[i], width: NODE_W, animationDelay: `${i * 90}ms` }}
          />
        ))}

        <NodeCard
          kind={hub.kind}
          label={hub.label}
          sub={hub.sub}
          highlight
          className="absolute"
          style={{ left: 200, top: 145, width: NODE_W, animationDelay: "600ms" }}
        />

        {actions.map((node, i) => (
          <NodeCard
            key={node.id}
            kind={node.kind}
            label={node.label}
            className="absolute"
            style={{
              left: 400,
              top: ACTION_TOPS[i],
              width: NODE_W,
              animationDelay: `${900 + i * 90}ms`,
            }}
          />
        ))}
      </div>

      {/* Mobile / tablet: the same flow, stacked */}
      <div className="lg:hidden">
        <div className="mb-3 font-mono text-[11px] text-muted">{caption}</div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {triggers.map((node, i) => (
            <NodeCard
              key={node.id}
              kind={node.kind}
              label={node.label}
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
        <div aria-hidden className="mx-auto my-2 h-6 w-[2px] bg-accent-line" />
        <NodeCard
          kind={hub.kind}
          label={hub.label}
          sub={hub.sub}
          highlight
          style={{ animationDelay: "300ms" }}
        />
        <div aria-hidden className="mx-auto my-2 h-6 w-[2px] bg-accent-line" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {actions.map((node, i) => (
            <NodeCard
              key={node.id}
              kind={node.kind}
              label={node.label}
              style={{ animationDelay: `${400 + i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
