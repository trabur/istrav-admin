import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // files: {
  //   assets: 'static',
  //   hooks: 'src/hooks',
  //   lib: 'src/lib',
  //   routes: 'src/routes',
  //   serviceWorker: 'src/service-worker',
  //   template: 'src/app.html'
  // },
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node({
			out: 'build'
		})
	}
};

export default config;


