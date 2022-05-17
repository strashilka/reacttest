import * as React from 'react';

export enum MessageType {
  Information = 'information',
  Error = 'error',
}

export type InfoProps = {
    text:string,
    type:MessageType
}

export function Message({ text, type = MessageType.Information }:InfoProps) {
  const className = (type === MessageType.Information) ? 'notification' : 'error';
  return (
    <div className={className}>
      {text}
    </div>
  );
}
