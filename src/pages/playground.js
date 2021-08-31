import React from 'react'

const LazyPlayground = React.lazy(() => import("./playground/index"));
function Playground() {
    const isSSR = typeof window === "undefined";
    return (
      <div>
        {!isSSR && (
            <React.Suspense fallback={<div>LOADING...</div>}>
                <LazyPlayground />
            </React.Suspense>
      )}
      </div>
    );
};

export default function PlaygroundWrapper() {
  return <Playground/>;
}
