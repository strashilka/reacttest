import Select from 'react-select';
import * as React from 'react';
import { User } from 'views/Users/User';

type OnChangeFunction = () => void;
type SelectUsersProps = {
    users:Array<User>,
    onChange: OnChangeFunction
}
export default function SelectUsers({ users, onChange }:SelectUsersProps) {
  // const items:Array<any> = [{ value: 0, label: '--- Do not filter --- ' },
  //   users.map((user:User) => ({ value: user.id, label: user.name }))];
  const items = [{ value: 0, label: '--- Do not filter --- ' }]
    .concat(users.map((user:User) => ({ value: user.id, label: user.name })));
  return <Select options={items} onChange={onChange} />;
}
