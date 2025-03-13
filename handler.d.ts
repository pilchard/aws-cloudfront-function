import {
	FunctionEvent,
	FunctionEventRequest,
	FunctionEventResponse,
	FunctionRequestEvent,
	FunctionResponseEvent,
} from "@pilchard/aws-cloudfront-function";

/**
 * CloudFront Functions is ideal for lightweight, short-running functions for the following use
 * cases:
 *
 * - __Cache key normalization__ – Transform HTTP request attributes (headers, query strings,
 *      cookies, and even the URL path) to create an optimal cache key, which can improve your
 *      cache hit ratio.
 * - __Header manipulation__ – Insert, modify, or delete HTTP headers in the request or response.
 *      For example, you can add a True-Client-IP header to every request.
 * - __URL redirects or rewrites__ – Redirect viewers to other pages based on information in the
 *      request, or rewrite all requests from one path to another.
 * - __Request authorization__ – Validate hashed authorization tokens, such as JSON web tokens (JWT),
 *      by inspecting authorization headers or other request metadata.
 *
 * When you associate a CloudFront function with a CloudFront distribution, CloudFront intercepts
 * requests and responses at CloudFront edge locations and passes them to your function. You can
 * invoke CloudFront Functions when the following events occur:
 *
 * - When CloudFront receives a request from a viewer (`viewer-request`)
 * - Before CloudFront returns the response to the viewer (`viewer-response`)
 *
 * Regardless of your function’s purpose, the handler is the entry point for any function. It
 * takes a single argument called `event`, which is passed to the function by CloudFront. The event
 * is a JSON object that contains a representation of the HTTP request (and the response, if your
 * function modifies the HTTP response).
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html Customize at the edge}
 * @see {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/function-code-choose-purpose.html Determine function purpose}
 * @see {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html Event stucture}
 */
export type Handler = ResponseEventHandler | RequestEventHandler;

/**
 * @param event
 *      A JSON object that contains a representation of the HTTP request.
 *
 * @return
 * 		A `RequestEventHandler()` may return ___either___ a modified `request` object ___or___
 * 		a modified `response` object. If the function returns a `request` object CloudFront will
 * 		continue processing the request checking the CloudFront cache for a cache hit, and
 * 		sending the request to the origin if necessary. If the function returns a `response`
 * 		object, CloudFront will immediately return it to the viewer without checking the
 * 		CloudFront cache or sending a request to the origin. The handler may return a `Promise`
 * 		resolving to the relevant request or response object.
 *
 * @example
 * **Simple redirect (viewer-request)**
 *
 * A simple function that redirects the viewer to a different URL, and also returns a custom
 * response header.
 *
 * This example function is for a `viewer-request` event trigger. Choose `viewer request` for
 * event trigger when you associate this function with a distribution.
 *
 * ```js
 * function handler(event) {
 *     var response = {
 *         statusCode: 302,
 *         statusDescription: 'Found',
 *         headers: {
 *             'cloudfront-functions': { value: 'generated-by-CloudFront-Functions' },
 *             'location': { value: 'https://aws.amazon.com/cloudfront/' }
 *         }
 *     };
 *     return response;
 * }
 * ```
 *
 * @example
 * __Use key-value pairs in a CloudFront Functions viewer request__
 *
 * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_kvs_key_value_pairs_section.html
 *
 * ```js
 * import cf from 'cloudfront';
 *
 * const kvsHandle = cf.kvs();
 *
 * async function handler(event) {
 *     const request = event.request;
 *     const pathSegments = request.uri.split('/')
 *     const key = pathSegments[1]
 *     try {
 *         pathSegments[1] = await kvsHandle.get(key);
 *         const newUri = pathSegments.join('/');
 *         console.log(`${request.uri} -> ${newUri}`)
 *         request.uri = newUri;
 *     } catch (err) {
 *         console.log(`${request.uri} | ${err}`);
 *     }
 *     return request;
 * }
 * ```
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/service_code_examples_cloudfront_functions_examples.html Further examples}
 */
export type RequestEventHandler = (
	event: FunctionRequestEvent,
) =>
	| FunctionEventRequest
	| FunctionEventResponse
	| Promise<FunctionEventRequest | FunctionEventResponse>;

/**
 * @param event
 *      a JSON object that contains a representation of the HTTP request, and the response,
 *      if your function is triggered on `viewer-response`.
 *
 * @return
 * 		A `ResponseEventHandler()` __must__ return a modified `response` object which CloudFront
 * 		will immediately returns to the viewer. The handler may return a `Promise` resolving to
 * 		the relevant response object.
 * @example
 * __Add HTTP security headers on viewer-response__
 *
 * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_add_security_headers_section.html
 *
 * ```ts
 * async function handler(event) {
 *     var response = event.response;
 *     var headers = response.headers;
 *
 *     headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubdomains; preload'};
 *     headers['content-security-policy'] = { value: "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'"};
 *     headers['x-content-type-options'] = { value: 'nosniff'};
 *     headers['x-frame-options'] = {value: 'DENY'};
 *     headers['x-xss-protection'] = {value: '1; mode=block'};
 *     headers['referrer-policy'] = {value: 'same-origin'};
 *
 *     return response;
 * }
 * ```
 *
 * @example
 * __Add a cache control header on viewer-response__
 *
 * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_add_cache_control_header_section.html
 *
 * ```js
 * async function handler(event) {
 *     var response = event.response;
 *     var headers = response.headers;
 *
 *     if (response.statusCode >= 200 && response.statusCode < 400) {
 *         // Set the cache-control header
 *         headers['cache-control'] = {value: 'public, max-age=63072000'};
 *     }
 *
 *     // Return response to viewers
 *     return response;
 * }
 * ```
 *
 * @see {@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/service_code_examples_cloudfront_functions_examples.html Further examples}
 */
export type ResponseEventHandler = (
	event: FunctionResponseEvent,
) => FunctionEventResponse | Promise<FunctionEventResponse>;
