import React from 'react';
import { render } from 'react-dom';
import Main from './Main';
import { BrowserRouter as Router } from 'react-router-dom';

render(<Router> <Main /> </Router>, document.getElementById('root'));
