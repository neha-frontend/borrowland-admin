import React, { useState, useEffect } from 'react';

const SetTokenInterval = (Component, axios) => {
  const WrappedComponent = (props) => {
    const [interceptor] = useState(
      axios.interceptors.request.use(config => {
        const configObject = config;
        configObject.headers.Authorization = `Bearer ${localStorage.getItem(
          `authToken`,
        )}`;
        return configObject;
      }),
    );
    useEffect(() => () => {
        axios.interceptors.request.eject(interceptor);
      }, []);

    return (
      <>
        <Component {...props} />
      </>
    );
  }
  return WrappedComponent;
}
export default SetTokenInterval;
