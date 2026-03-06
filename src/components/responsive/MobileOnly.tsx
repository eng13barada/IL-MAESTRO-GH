import React from "react";

/**
 * MobileOnly
 * Renders children ONLY on viewports < md (< 768px).
 * On desktop (md+) the wrapper is hidden via `md:hidden`.
 *
 * Usage:
 *   <MobileOnly>
 *     <p>This content only appears on mobile.</p>
 *   </MobileOnly>
 */
interface MobileOnlyProps {
  children: React.ReactNode;
  className?: string;
}

const MobileOnly: React.FC<MobileOnlyProps> = ({ children, className = "" }) => {
  return (
    <div className={`block md:hidden ${className}`.trim()}>
      {children}
    </div>
  );
};

export default MobileOnly;
