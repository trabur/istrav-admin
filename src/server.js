import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, API_URI, IO_URI, HEADLESS_URI } = process.env;
const dev = NODE_ENV === 'production';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
      session: () => ({
        API_URI,
				IO_URI,
				HEADLESS_URI,
      }),
    })
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

	// { name: "PORT", value: "5280" },
	// { name: "NODE_ENV", value: "production" },
	// { name: "API_URI", value: `https://api.${ACK_DOMAIN}` },
	// { name: "IO_URI", value: `https://io.${ACK_DOMAIN}` },
	// { name: "HEADLESS_URI", value: `https://${HEADLESS_DOMAIN}` }