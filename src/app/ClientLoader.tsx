"use client";

import { useEffect, useState } from "react";

export default function ClientLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#8b7355] z-50">
          {/* Coffee Loader */}
          <div className="coffee-loader">
            <div className="cup">
              <div className="coffee"></div>
            </div>
            {/* Steam */}
            <div className="steam steam1"></div>
            <div className="steam steam2"></div>
            <div className="steam steam3"></div>
          </div>

          <p className="text-white mt-6 text-lg tracking-wide animate-pulse">
            Brewing your coffee...
          </p>
        </div>
      ) : (
        children
      )}
    </>
  );
}
