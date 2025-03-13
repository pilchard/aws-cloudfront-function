// Utility type variable declarations. Since this file has no imports or exports,
// typescript treats these as global declarations that can be used in tests/* files.
declare let str: string;
declare let unknown: unknown;
declare let buffer: Buffer;
declare let date: Date;
declare let obj: {};
declare let array: any[];
declare let anyObj: any;
declare let num: number;
declare let error: Error;
declare let bool: boolean;
declare let strOrNull: string | null;
declare let strOrUndefined: string | undefined;
declare let strOrUndefinedOrNull: string | undefined | null;
declare let boolOrUndefined: boolean | undefined;
declare let boolOrNumOrStr: boolean | number | string;
declare let numOrUndefined: number | undefined;
declare let strArrayOrUndefined: string[] | undefined;
declare let nullOrUndefined: null | undefined;
declare let objectOrUndefined: {} | undefined;

// handler.d.ts types
declare let handler: AWSCloudFrontFunction.Handler;
declare let viewer_request_handler: AWSCloudFrontFunction.RequestEventHandler;
declare let viewer_response_handler: AWSCloudFrontFunction.ResponseEventHandler;

// aws-cloudfront/function.d.ts types
declare let request_event: AWSCloudFrontFunction.FunctionRequestEvent;
declare let response_event: AWSCloudFrontFunction.FunctionResponseEvent;
declare let request: AWSCloudFrontFunction.FunctionEventRequest;
declare let response: AWSCloudFrontFunction.FunctionEventResponse;
declare let reqRes:
	| AWSCloudFrontFunction.FunctionEventRequest
	| AWSCloudFrontFunction.FunctionEventResponse;

/**
 * synchronous handlers
 */

/** generic `viewer-request` handler */
handler = function(event: AWSCloudFrontFunction.FunctionRequestEvent) {
	// @ts-expect-error
	response = event.response;
	return response;
};
handler = function(event: AWSCloudFrontFunction.FunctionRequestEvent) {
	// @ts-expect-error
	response = event.response;
	return request;
};
/** generic `viewer-response` handler */
handler = function(event: AWSCloudFrontFunction.FunctionResponseEvent) {
	response = event.response;
	return response;
};
// @ts-expect-error
handler = function(event: AWSCloudFrontFunction.FunctionResponseEvent) {
	response = event.response;
	// Cannot return a request from a `viewer-response` listener
	return request;
};

/** explicit `viewer-request` handler */

// @ts-expect-error
viewer_request_handler(response_event);
viewer_request_handler(request_event);
// viewer-request handler can return either request or response
(async () => {
	reqRes = await viewer_request_handler(request_event);
	// @ts-expect-error
	response = await viewer_request_handler(request_event);
	// @ts-expect-error
	request = await viewer_request_handler(request_event);

	// `request | response` can be narrowed on `response.statusCode`
	const result = await viewer_request_handler(request_event);
	if ((result as AWSCloudFrontFunction.FunctionEventResponse).statusCode !== undefined) {
		response = result as AWSCloudFrontFunction.FunctionEventResponse;
	} else {
		request = result as AWSCloudFrontFunction.FunctionEventRequest;
	}
})();
viewer_request_handler = function(event: AWSCloudFrontFunction.FunctionRequestEvent) {
	// @ts-expect-error
	response = event.response;
	return response;
};
viewer_request_handler = function(event: AWSCloudFrontFunction.FunctionRequestEvent) {
	// @ts-expect-error
	response = event.response;
	return request;
};

/** explicit `viewer-response` handler */

viewer_response_handler(response_event);
// @ts-expect-error
viewer_response_handler(request_event);
// viewer-response handler must return a response
(async () => {
	response = await viewer_response_handler(response_event);
	// @ts-expect-error
	request = await viewer_response_handler(response_event);
})();
viewer_response_handler = function(event: AWSCloudFrontFunction.FunctionResponseEvent) {
	response = event.response;
	return response;
};
// @ts-expect-error
viewer_response_handler = function(event: AWSCloudFrontFunction.FunctionResponseEvent) {
	response = event.response;
	return request;
};

/**
 * asynchronous handlers
 */

// declare let handler: AWSCloudFrontFunction.Handler;
/** generic `viewer-request` async handler */
handler = async function(event: AWSCloudFrontFunction.FunctionRequestEvent) {
	// @ts-expect-error
	response = event.response;
	return response;
};
handler = async function(event: AWSCloudFrontFunction.FunctionRequestEvent) {
	return request;
};
/** generic `viewer-response` async handler */
handler = async function(event: AWSCloudFrontFunction.FunctionResponseEvent) {
	return response;
};
// @ts-expect-error
handler = async function(event: AWSCloudFrontFunction.FunctionResponseEvent) {
	// Cannot returna request from a `viewer-response` listener
	return request;
};

/** explicit `viewer-request` async handler */
// @ts-expect-error
viewer_request_handler(response_event);
viewer_request_handler(request_event);
(async () => {
	// viewer-request handler can return either request or response
	reqRes = await viewer_request_handler(request_event);
	// @ts-expect-error
	response = await viewer_request_handler(request_event);
	// @ts-expect-error
	request = await viewer_request_handler(request_event);

	// `request | response` can be narrowed on `response.statusCode`
	const result = await viewer_request_handler(request_event);
	if ((result as AWSCloudFrontFunction.FunctionEventResponse).statusCode !== undefined) {
		response = result as AWSCloudFrontFunction.FunctionEventResponse;
	} else {
		request = result as AWSCloudFrontFunction.FunctionEventRequest;
	}
})();
viewer_request_handler = async function(event: AWSCloudFrontFunction.FunctionRequestEvent) {
	return response;
};
viewer_request_handler = async function(event: AWSCloudFrontFunction.FunctionRequestEvent) {
	return request;
};

/** explicit `viewer-response` async handler */
viewer_response_handler(response_event);
// @ts-expect-error
viewer_response_handler(request_event);
(async () => {
	// viewer-response handler must return a response
	response = await viewer_response_handler(response_event);
	// @ts-expect-error
	request = await viewer_response_handler(response_event);
})();
viewer_response_handler = async function(event: AWSCloudFrontFunction.FunctionResponseEvent) {
	return response;
};
// @ts-expect-error
viewer_response_handler = async function(event: AWSCloudFrontFunction.FunctionResponseEvent) {
	return request;
};
