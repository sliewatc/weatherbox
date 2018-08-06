import React from 'react';

function LoadHold (LoadingComponent) {
  return function WithLoadingComponent({ isSet, ...props }) {
    if (isSet) return (<LoadingComponent {...props} />);
    return (
      <div className={'city-view-loading--wrapper'}>
        <p>Loading...</p>
      </div>
    );
  }
};

export default LoadHold;