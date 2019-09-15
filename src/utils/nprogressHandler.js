import NProgress from 'nprogress';

export function progressStart() {
	NProgress.start();
}

export function progressDone() {
	NProgress.done();
	if (typeof window !== 'undefined') {
		setTimeout(() => window.scrollTo(0, 0), 500);
	}
}
