declare module "react-katex" {
  import type { ComponentType } from "react";

  interface KatexProps {
    math: string;
    children?: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
    settings?: Record<string, unknown>;
  }

  export const BlockMath: ComponentType<KatexProps>;
  export const InlineMath: ComponentType<KatexProps>;
}
