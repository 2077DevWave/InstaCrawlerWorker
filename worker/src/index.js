import * as cheerio from 'cheerio';
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const reel_link = url.searchParams.get('reel_link');
        if (!reel_link) {
            return new Response("Error: need reel_link Get parameter!", {status: 500})
        }
        const getUrl = async (url) => {
            try {
              const response = await fetch(url, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
              });
              const html = await response.text();
      
              // Extract meta tags
              const $ = cheerio.load(html);
              const metaTags = {};
              $('meta').each((index, meta) => {
                const name = $(meta).attr('name');
                const property = $(meta).attr('property');
                const content = $(meta).attr('content');
      
                if (name) {
                  metaTags[name] = content;
                } else if (property) {
                  metaTags[property] = content;
                }
              });
      
              const description = metaTags["description"];
              const ogTitle = metaTags["og:title"];
      
              // Extract required information
              const likesComments = description.split(', ');
              const likes = likesComments[0].replace('likes', '').trim();
              const comments = likesComments[1].match(/\d[,\.]*\d*/)[0].replace(',', '');
      
              const ogTitleParts = ogTitle.split('on Instagram‎: ');
              const title = ogTitleParts[1].split('#')[0].trim();
              const tags = ogTitleParts[1].split('#').slice(1).map(tag => tag.trim());
      
              // Return extracted information as JSON
              return new Response(JSON.stringify({
                likes,
                comments,
                title,
                tags
              }), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            } catch (error) {
              console.error(error);
              return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            }
          };
  
      return getUrl(reel_link); // replace with the URL you want to fetch
    }
  }