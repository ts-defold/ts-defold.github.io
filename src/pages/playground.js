import React from 'react'
import { Helmet } from "react-helmet";
const LazyPlayground = React.lazy(() => import("../playground"));

function Playground({ location }) {
    const isSSR = typeof window === "undefined";
    return (
      <div>
        {!isSSR && (
            <React.Suspense fallback={<div>LOADING...</div>}>
                <LazyPlayground location={location} />
            </React.Suspense>
      )}
      </div>
    );
};

export default function PlaygroundWrapper(props) {
  return (
    <>
      <Helmet title="Playground" />
      <Playground {...props} />
    </>
  );
}
