import * as React from "react";

type TabsContextType = {
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = React.createContext<TabsContextType | null>(null);

export function Tabs({ value, onValueChange, children }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode }) {
  const ctx = React.useMemo<TabsContextType>(() => ({ value, setValue: onValueChange }), [value, onValueChange]);
  return (
    <TabsContext.Provider value={ctx}>
      <div data-value={value} className="flex items-center gap-2">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`inline-flex rounded-full bg-white/5 p-1 ${className}`} {...props}>{children}</div>;
}

export type TabsTriggerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onClick"> & {
  value: string;
};

export function TabsTrigger({ value, className = "", children, ...props }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext);
  const active = ctx?.value === value;
  return (
    <button
      className={`rounded-full px-3 py-1.5 text-sm transition ${active ? "bg-indigo-600" : "bg-transparent hover:bg-white/10"} ${className}`}
      onClick={() => ctx?.setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}
