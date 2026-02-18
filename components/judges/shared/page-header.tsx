"use client";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ label, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <span className="text-sm font-semibold uppercase tracking-wider text-[#84752F]">
          {label}
        </span>
        <h1 className="mt-2 text-3xl font-bold font-serif text-gray-900">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-gray-500 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 mt-2">{actions}</div>}
    </div>
  );
}
