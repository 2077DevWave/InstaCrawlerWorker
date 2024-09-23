export default {
  async fetch(request) {
    const url = new URL(request.url);
    const reel_link = url.searchParams.get('reel_link');

    if (reel_link) {
      try {
        // Fetch the Instagram page
        const response = await fetch(reel_link, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        });
  
        if (!response.ok) {
          return new Response("Failed to fetch the page", { status: response.status });
        }
  
        // Initialize a variable to capture the title
        let title = '';
  
        // HTMLRewriter to extract the title
        const rewriter = new HTMLRewriter()
          .on('title', {
            text(textChunk) {
              title += textChunk.text;  // Accumulate text content
            }
          });
  
        // Process the HTML response
        const rewrittenResponse = rewriter.transform(response);
        await rewrittenResponse.text();  // Trigger the transformation process
  
        if (title) {
          let tp = title.split("|");
          if (tp.length >= 2) {
            return new Response(tp[tp.length - 2], { status: 200 });
          }
          return new Response(`Error: title has lower than 2 part seprate with "|" \n title: ${title}`, { status: 500 });
        } else {
          return new Response('Title not found', { status: 404 });
        }
      } catch (err) {
        return new Response(`Error: ${err.message}`, { status: 500 });
      }
    }
    else{
      return new Response(`Error: Require 'reel_link' GET Parameter!`, { status: 500 });
    }
  }
}
