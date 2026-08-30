import { Badge } from "@/components/ui/badge";
import { TECH_STACK } from "@/lib/tech-stack";

export function TechStackSection() {
  return (
    <section className="space-y-6" id="stack">
      <h2 className="text-lg font-semibold tracking-tight">Tech stack</h2>
      <div className="space-y-4">
        {TECH_STACK.map((category) => (
          <div key={category.label} className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {category.label}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <li key={item}>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
