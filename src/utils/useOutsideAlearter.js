import { useEffect } from 'react';

export function useOutsideAlerter(ref, setIsOpenRange) {
  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpenRange(false);
      }
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [ref]);
}
