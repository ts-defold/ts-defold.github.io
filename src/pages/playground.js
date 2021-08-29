import React from 'react'

const LazyPlayground = React.lazy(() => import("./playground/index"));
export default function Playground() {
    const isSSR = typeof window === "undefined";
    return (
      <>
        {!isSSR && (
            <React.Suspense fallback={<div />}>
                <LazyPlayground />
            </React.Suspense>
      )}
      </>
    );
};
