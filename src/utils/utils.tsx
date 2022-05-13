import * as React from 'react';

export type InfoProps = {
    text:string,
}

export function InfoMessage({ text }:InfoProps) {
  return (
    <div className="notification">
      {text}
    </div>
  );
}

export function ErrorMessage({ text }:InfoProps) {
  return (
    <div className="error">
      {text}
    </div>
  );
}
