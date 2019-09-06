import React from 'react';
import ReactDOM from 'react-dom';
// import indexStyle from './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import StyleContext from 'isomorphic-style-loader/StyleContext';

const insertCss = (...styles) => {
	const removeCss = styles.map(style => style._insertCss());
	return () => removeCss.forEach(dispose => dispose());
};

ReactDOM.hydrate(
	<StyleContext.Provider value={{ insertCss }}>
		<App />
	</StyleContext.Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
