import React from "react";

/**
 * DesktopOnly
 * Renders children ONLY on viewports ≥ md (≥ 768px).
 * On mobile (< md) the wrapper is hidden via `hidden md:block`.
 *
 * Usage:
 *   <DesktopOnly>
 *     <p>This content only appears on desktop.</p>
 *   </DesktopOnly>
 */
interface DesktopOnlyProps {
  children: React.ReactNode;
  className?: string;
}

const DesktopOnly: React.FC<DesktopOnlyProps> = ({ children, className = "" }) => {
  return (
    <div className={`hidden md:block ${className}`.trim()}>
      {children}
    </div>
  );
};

export default DesktopOnly;
