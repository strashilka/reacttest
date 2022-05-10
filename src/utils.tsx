import * as React from 'react';

export type LoadingProps = {
    text:string,
}

export function Loading(props:LoadingProps) {
  const { text } = props;
  return (
    <div className="notification">
      {text}
    </div>
  );
}
