# InstaCrawlerWorker
A cloudflare worker to crawel instagram reels/posts

## Features
- find number of likes
- find number of comments
- find description
- find hashtags

## Deploy
### Deploy with cloudflare online editor
1. create a new worker in Cloudflare
2. copy and paste worker/src/index.js file into a main file of worker
3. deploy and test the worker

### Deploy with wrangler
1. install wrangler and npm
2. clone git repository (Run `gh repo clone 2077DevWave/InstaCrawlerWorker` in cmd)
3. login to cloudflare with wrangler (Run `wrangler login` in cmd)
4. deploy the Worker to cloudflare (Run `npm run deploy` in cmd)
