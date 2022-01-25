### Some usefull links

https://www.reddit.com/r/sveltejs/comments/quuo35/my_manager_is_insistent_we_deploy_to_our_svelte/

https://github.com/yarbsemaj/sveltekit-adapter-lambda/issues/1

https://yarbsemaj.com/blog/svelte-kit-ssr-aws-lambda

https://rodneylab.com/using-netlify-functions-sveltekit/

For full stack Lambda see:

To improve page speed I have a high max-age cache on all pages and even more so on the backend API, then, when the state of the blog changes I trigger an invalidation of the appropriate paths in Cloudfront to server the new content to users.
Compromises
Pre-rendered pages have to be added to Cloudfront behavior config.
Any static assets ending with .json have to be added directly to the Cloudfront behavior config.
Both of these pitfalls could be solved by utilizing the lambda@edge functionality that is part of CloudFront. At build time a manifest could be generated and bundled as part of the function, the manifest could be checked by the edge function and requests origins rewritten if a file or precompiled page was in S3.
However, I decided not to do this for my use case as my app only has two pre-rendered pages and one static asset with the extension .json. By implementing lambda@edge I would add a small amount of TTFB to every non-cached request and incur additional, not free tier eligible lambda cost.

https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CacheBehavior.html

https://stackoverflow.com/questions/61366373/how-to-change-cache-behavior-settings-on-existing-cloudfront-distribution

For monitoring see: https://dashbird.io/

