import { statusMeta } from "../data/status";

export default function StatusBadge({ status }) {
  const meta = statusMeta[status];
  if (!meta) return null;
  return (
    <span className={`badge badge-${status}`} title={meta.hint}>
      <i aria-hidden="true" />
      {meta.label}
    </span>
  );
}
