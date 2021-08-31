import React from 'react'
import { Helmet } from "react-helmet";
const LazyPlayground = React.lazy(() => import("../playground"));
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
  return (
    <>
      <Helmet title="Playground" />
      <Playground/>
    </>
  );
}
