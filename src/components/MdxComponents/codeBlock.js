import * as React from 'react';
import Prism from 'prism-react-renderer/prism';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from '../../theme/prism/oneDark';
import Loadable from 'react-loadable';
import LoadingProvider from './loading';

// Include extra prism languages
if (typeof global !== "undefined" || typeof window !== "undefined") {
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-lua");
}

/** Removes the last token from a code example if it's empty. */
function cleanTokens(tokens) {
  const tokensLength = tokens.length;

  if (tokensLength === 0) {
    return tokens;
  }
  const lastToken = tokens[tokensLength - 1];

  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1);
  }
  return tokens;
}

const LoadableComponent = Loadable({
  loader: () => import('./LiveProvider'),
  loading: LoadingProvider,
});

/* eslint-disable react/jsx-key */
const CodeBlock = ({ children: code, ...props }) => {
  if (props['react-live']) {
    return <LoadableComponent code={code} />;
  } else {
    const lang = props.className ? props.className.split('-')[1] : null;
    return (
      <Highlight {...defaultProps} code={code} language={lang ? lang : 'javascript'} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + ' pre'} style={style} p={3}>
            {cleanTokens(tokens).map((line, i) => {
              let lineClass = {};

              let isDiff = false;

              if (line[0] && line[0].content.length && line[0].content[0] === '+') {
                lineClass = { backgroundColor: 'rgba(76, 175, 80, 0.2)' };
                isDiff = true;
              } else if (line[0] && line[0].content.length && line[0].content[0] === '-') {
                lineClass = { backgroundColor: 'rgba(244, 67, 54, 0.2)' };
                isDiff = true;
              } else if (line[0] && line[0].content === '' && line[1] && line[1].content === '+') {
                lineClass = { backgroundColor: 'rgba(76, 175, 80, 0.2)' };
                isDiff = true;
              } else if (line[0] && line[0].content === '' && line[1] && line[1].content === '-') {
                lineClass = { backgroundColor: 'rgba(244, 67, 54, 0.2)' };
                isDiff = true;
              }
              const lineProps = getLineProps({ line, key: i });

              lineProps.style = lineClass;
              const diffStyle = {
                userSelect: 'none',
                MozUserSelect: '-moz-none',
                WebkitUserSelect: 'none',
              };

              let splitToken;

              return (
                <div {...lineProps} key={line + i}>
                  {line.map((token, key) => {
                    if (isDiff) {
                      if (
                        (key === 0 || key === 1) &
                        (token.content.charAt(0) === '+' || token.content.charAt(0) === '-')
                      ) {
                        if (token.content.length > 1) {
                          splitToken = {
                            types: ['template-string', 'string'],
                            content: token.content.slice(1),
                          };
                          const firstChar = {
                            types: ['operator'],
                            content: token.content.charAt(0),
                          };

                          return (
                            <React.Fragment key={token + key}>
                              <span
                                {...getTokenProps({ token: firstChar, key })}
                                style={diffStyle}
                              />
                              <span {...getTokenProps({ token: splitToken, key })} />
                            </React.Fragment>
                          );
                        } else {
                          return <span {...getTokenProps({ token, key })} style={diffStyle} />;
                        }
                      }
                    }
                    return <span {...getTokenProps({ token, key })} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    );
  }
};

export default CodeBlock;
