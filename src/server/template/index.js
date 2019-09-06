import React from 'react';
import ReactDomServer from 'react-dom/server';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import hbs from 'handlebars';

//
import App from '../../App';
import htmlTemplate from './template.html';

//
function renderServerSideContent() {
	const hbsTemplate = hbs.compile(htmlTemplate);
	const css = new Set(); // CSS for all rendered React components
	const insertCss = (...styles) =>
		styles.forEach(style => css.add(style._getCss()));
	const reactComp = ReactDomServer.renderToString(
		<StyleContext.Provider value={{ insertCss }}>
			<App />
		</StyleContext.Provider>
	);
	const content = hbsTemplate({ reactComp, css: [...css].join('') });
	return content;
}

//
export default renderServerSideContent;
