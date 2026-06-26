import { useEffect } from 'react';
import { initCSRF } from '../../api/initCSRF';

export const useCSRF = () => {
  useEffect(() => {
    initCSRF();
  }, []);
};
