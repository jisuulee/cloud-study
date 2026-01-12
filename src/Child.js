import { useEffect } from 'react';

export default function Child() {
  useEffect(() => {
    console.log('Child가 화면에 나타남 (마운트)');

    return () => {
      console.log('Child가 사라짐 (언마운트)');
    };
  }, []);

  return <h2>황승희 똥쟁이</h2>;
}
