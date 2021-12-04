import React from 'react';
import { render } from 'react-dom';

import Counter from './Counter';

import './styles.scss';

const Application = () => {
  return (
    <main className="Application">
      <section className="Counters">
        <Counter  step={5} max={15}/>
      </section>
    </main>
  );
};

render(<Application />, document.getElementById('root'));
