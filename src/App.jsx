// App.js or wherever you want to display the model
import React from 'react';
import TreeScene from './components/ThreeScene';

const App = () => {
  return (
    <div className='App'>

      <TreeScene model="hulk.glb" />
    </div>
  );
};

export default App;
