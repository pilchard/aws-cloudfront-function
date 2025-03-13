/**
 * ## CloudFront Functions
 *
 * CloudFront Functions allow the creation of lightweight functions in JavaScript for high-scale,
 * latency-sensitive CDN customizations. The CloudFront Functions runtime environment offers
 * submillisecond startup times, scales immediately to handle millions of requests per second,
 * and is highly secure. CloudFront Functions is a native feature of CloudFront, which means you
 * can build, test, and deploy your code entirely within CloudFront.
 *
 * When you associate a CloudFront function with a CloudFront distribution, CloudFront intercepts
 * requests and responses at CloudFront edge locations and passes them to your function. You can
 * invoke CloudFront Functions when the following events occur:
 *
 * - When CloudFront receives a request from a viewer (viewer request)
 * - Before CloudFront returns the response to the viewer (viewer response)
 *
 * CloudFront functions generally serve one of the following purposes:
 *
 * - [Modify the HTTP request in a viewer request event type][1]
 * - [Generate an HTTP response in a viewer request event type][2]
 * - [Modify the HTTP response in a viewer response event type][3]
 *
 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/function-code-choose-purpose.html#function-code-modify-request>
 * [2]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/function-code-choose-purpose.html#function-code-generate-response>
 * [3]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/function-code-choose-purpose.html#function-code-modify-response>
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions.html
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html
 */

/** @source https://github.com/aws/aws-cdk/blob/v2.182.0/packages/aws-cdk-lib/aws-cloudfront/lib/function.ts#L239 */
export type FunctionEventType = "viewer-request" | "viewer-response";

/** @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-query-header-cookie */
export interface FunctionEventRequestQuerystring {
	[key: string]: { value: string; multiValue?: Array<{ value: string; }>; };
}

/** @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-query-header-cookie */
export interface FunctionEventReqResHeaders {
	[key: string]: { value: string; multiValue?: Array<{ value: string; }>; };
}

/** @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-query-header-cookie */
export interface FunctionEventReqResCookies {
	[key: string]: {
		value: string;
		attributes?: string;
		multiValue?: Array<{ value: string; attributes?: string; }>;
	};
}

export interface FunctionEventResponseBody {
	/**
	 * The encoding for the body content (`data` field). The only valid encodings are `text` and
	 * `base64`.If you specify encoding as `base64` but the body is not valid base64,
	 * CloudFront returns an error.
	 */
	encoding: "text" | "base64";
	/** The body content.` */
	data: string;
}

/**
 * ## CloudFront Functions Event
 *
 * CloudFront Functions passes an event object to your function code as input when it runs
 * the function. When you test a function, you create the event object and pass it to your
 * function. When you create an event object for testing a function, you can omit the
 * `distributionDomainName`, `distributionId`, and `requestId` fields in the context object.
 * Make sure that the names of headers are lowercase, which is always the case in the event
 * object that CloudFront Functions passes to your function in production.
 *
 * For an example event object, see [Example event object][1].
 *
 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-example> "Example event object"
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html
 */
export interface FunctionEvent {
	/** The version of the CloudFront Functions event object. The current version is 1.0. */
	version: string;
	context: FunctionEventContext;
	viewer: FunctionEventViewer;
	request: FunctionEventRequest;
	response?: FunctionEventResponse | undefined;
}

export interface FunctionRequestEvent extends FunctionEvent {
	response?: never | undefined;
}
export interface FunctionResponseEvent extends FunctionEvent {
	response: FunctionEventResponse;
}

/** @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-context */
export interface FunctionEventContext {
	/**
	 * The CloudFront domain name (e.g. `d111111abcdef8.cloudfront.net`) of the
	 * distribution that’s associated with the event.
	 */
	distributionDomainName: string;
	/**
	 * The ID of the distribution (e.g. `EDFDVBD6EXAMPLE`) that’s associated with the event.
	 */
	distributionId: string;
	/**
	 * The event typeeither `viewer-request` or `viewer-response`.
	 */
	eventType: FunctionEventType;
	/**
	 * A string that uniquely identifies a CloudFront request (and its associated response).
	 */
	requestId: string;
}

/** @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-viewer */
export interface FunctionEventViewer {
	/**
	 * The IP address of the viewer (client) that sent the request. If the viewer request came
	 * through an HTTP proxy or a load balancer, the value is the IP address of the proxy or
	 * load balancer.
	 */
	ip: string;
}

/**
 * The `request` object contains a representation of a viewer-to-CloudFront HTTP request.
 * In the `event` object that’s passed to your function, the `request` object represents the
 * actual request that CloudFront received from the viewer.
 *
 * If your function code returns a `request` object to CloudFront, it must use this same structure.
 *
 * For more information about the structure of query strings, headers, and cookies,
 * see [Structure for a query string, header, or cookie][1].
 *
 * For an example event object, see [Example event object][2].
 *
 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-query-header-cookie> "query string, header, or cookie"
 * [2]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-example> "Example event object"
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-request
 */
export interface FunctionEventRequest {
	/** The HTTP method of the request. If your function code returns a `request`, it cannot modify
	 * this field. This is the only read-only field in the `request` object. */
	method: string;
	/**
	 * The relative path of the requested object. If your function modifies the `uri` value,
	 * note the following:
	 *
	 * - The new `uri` value must begin with a forward slash (`/`)`.
	 * - When a function changes the `uri` value, it changes the object that the viewer is
	 * 		requesting.
	 * - When a function changes the `uri` value, it doesn’t change the cache behavior for the
	 * 		request or the origin that an origin request is sent to.
	 */
	uri: string;
	/**
	 * An object that represents the query string in the request. If the request doesn’t include
	 * a query string, the `request` object still includes an empty `querystring` object.
	 *
	 * The `querystring` object contains one field for each query string parameter in the request.
	 * Query string parameter names are converted to lowercase.
	 */
	querystring: string | FunctionEventRequestQuerystring;
	/**
	 * An object that represents the HTTP headers in the request. If the request contains any
	 * `Cookie` headers, those headers are not part of the `headers` object. Cookies are
	 * represented separately in the `cookies` object.
	 *
	 * The `headers` object contains one field for each header in the request. Header names are
	 * converted to lowercase.
	 */
	headers: FunctionEventReqResHeaders;
	/**
	 * An object that represents the cookies in the request (`Cookie` headers).
	 *
	 * The `cookies` object contains one field for each cookie in the request. Cookie names are
	 * converted to lowercase.
	 */
	cookies: FunctionEventReqResCookies;
}

/**
 * The `response` object contains a representation of a CloudFront-to-viewer HTTP response.
 * In the `event` object that’s passed to your function, the `response` object represents
 * CloudFront’s actual response to a viewer request.
 *
 * If your function code returns a `response` object, it must use this same structure.
 *
 * For more information about modified status codes and body content,
 * see [Status code and body][1].
 *
 * For more information about the structure of headers and cookies,
 * see [Structure for a query string, header, or cookie][2].
 *
 * For an example response object, see [Example response object][3].
 *
 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-status-body> "Status code and body"
 * [2]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-query-header-cookie> "query string, header, or cookie"
 * [3]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-response-structure-example> "Example response object"
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-response
 */
export interface FunctionEventResponse {
	/**
	 * The HTTP status code of the response. This value is an integer, not a string.
	 *
	 * ___Note:___
	 *
	 * If the function is associated with a ___viewer-response___ event type, your function code
	 * cannot change the `statusCode` that it received.
	 *
	 * If the function is associated with a
	 * ___viewer-request___ event type and [generates an HTTP response][1],
	 * your function code can set the `statusCode`.
	 *
	 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/writing-function-code.html#function-code-generate-response> "generates an HTTP response"
	 */
	statusCode: number;

	/**
	 * The HTTP status description of the response.
	 */
	statusDescription?: string;

	/**
	 * An object that represents the HTTP headers in the response. If the response contains any
	 * `Set-Cookie` headers, those `headers` are not part of the headers object. Cookies are
	 * represented separately in the `cookies` object.
	 *
	 * The `headers` object contains one field for each header in the response. Header names are
	 * converted to lowercase.
	 */
	headers: FunctionEventReqResHeaders;

	/**
	 * An object that represents the cookies in the response (`Set-Cookie` headers).
	 * The `cookies` object contains one field for each cookie in the response. Cookie names are
	 * converted to lowercase.
	 */
	cookies: FunctionEventReqResCookies;

	/**
	 * Adding the body field is optional, and it will not be present in the response object unless
	 * you specify it in your function. Your function does not have access to the original body
	 * returned by the CloudFront cache or origin. If you don't specify the body field in your
	 * viewer response function, the original body returned by the CloudFront cache or origin is
	 * returned to viewer.
	 *
	 * If you want CloudFront to return a custom body to the viewer, specify the body content
	 * in the data field, and the body encoding in the encoding field. You can specify the encoding
	 * as plain text (`"encoding": "text"`) or as Base64-encoded content (`"encoding": "base64"`).
	 *
	 * As a shortcut, you can also specify the body content directly in the body field —
	 * `"body": "<specify the body content here>"`. When you do this, omit the `data` and
	 * `encoding` fields. CloudFront treats the body as plain text in this case.
	 */
	body?: string | FunctionEventResponseBody;
}
