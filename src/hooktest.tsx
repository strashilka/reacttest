import React, { useState, useEffect } from 'react';

export default function Example() {
  const [count, setCount] = useState(0);

  // По принципу componentDidMount и componentDidUpdate:
  useEffect(() => {
    // Обновляем заголовок документа, используя API браузера
    document.title = `Вы нажали ${count} раз`;
  });

  return (
    <div>
      <p>
        Вы нажали
        {' '}
        {count}
        {' '}
        раз
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Нажми на меня
      </button>
    </div>
  );
}
