import * as React from 'react';
import { Message, MessageType } from 'components/Message/Message';

export default function NotFound404() {
  return (
    <Message text="Not found, 404" type={MessageType.Error} />
  );
}
