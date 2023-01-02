/*
docs from: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
*/

import { useEffect, useState } from 'react';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
