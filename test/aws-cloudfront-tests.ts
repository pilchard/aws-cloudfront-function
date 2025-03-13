import type {
	FunctionEvent,
	FunctionEventContext,
	FunctionEventReqResCookies,
	FunctionEventReqResHeaders,
	FunctionEventRequest,
	FunctionEventRequestQuerystring,
	FunctionEventResponse,
	FunctionEventResponseBody,
	FunctionEventType,
	FunctionEventViewer,
	FunctionRequestEvent,
	FunctionResponseEvent,
	OriginAccessControlOriginType,
	OriginAccessControlSigningBehavior,
	OriginAccessControlSigningProtocol,
	OriginProtocol,
	OriginSslProtocol,
} from "@pilchard/aws-cloudfront-function";

declare let function_event: FunctionEvent;
// @ts-expect-error
function_event = {};
function_event = {
	version: "1.0",
	context: {
		distributionDomainName: "d111111abcdef8.cloudfront.net",
		distributionId: "EDFDVBD6EXAMPLE",
		eventType: "viewer-request",
		requestId: "",
	},
	viewer: { ip: "1.2.3.4" },
	request: { method: "", uri: "", querystring: "", headers: {}, cookies: {} },
};
function_event = {
	version: "1.0",
	context: {
		distributionDomainName: "d111111abcdef8.cloudfront.net",
		distributionId: "EDFDVBD6EXAMPLE",
		eventType: "viewer-request",
		requestId: "",
	},
	viewer: { ip: "1.2.3.4" },
	request: { method: "", uri: "", querystring: "", headers: {}, cookies: {} },
	response: { statusCode: 0, headers: {}, cookies: {} },
};

declare let function_request_event: FunctionRequestEvent;
// @ts-expect-error
function_request_event = {};
function_request_event = {
	version: "1.0",
	context: {
		distributionDomainName: "d111111abcdef8.cloudfront.net",
		distributionId: "EDFDVBD6EXAMPLE",
		eventType: "viewer-request",
		requestId: "",
	},
	viewer: { ip: "1.2.3.4" },
	request: { method: "", uri: "", querystring: "", headers: {}, cookies: {} },
};
function_request_event = {
	version: "1.0",
	context: {
		distributionDomainName: "d111111abcdef8.cloudfront.net",
		distributionId: "EDFDVBD6EXAMPLE",
		eventType: "viewer-request",
		requestId: "",
	},
	viewer: { ip: "1.2.3.4" },
	request: { method: "", uri: "", querystring: "", headers: {}, cookies: {} },
	response: undefined,
};
function_request_event = {
	version: "1.0",
	context: {
		distributionDomainName: "d111111abcdef8.cloudfront.net",
		distributionId: "EDFDVBD6EXAMPLE",
		eventType: "viewer-request",
		requestId: "",
	},
	viewer: { ip: "1.2.3.4" },
	request: { method: "", uri: "", querystring: "", headers: {}, cookies: {} },
	// @ts-expect-error
	response: { statusCode: 0, headers: {}, cookies: {} },
};

declare let function_response_event: FunctionResponseEvent;
// @ts-expect-error
function_response_event = {};
// @ts-expect-error
function_response_event = {
	version: "1.0",
	context: {
		distributionDomainName: "d111111abcdef8.cloudfront.net",
		distributionId: "EDFDVBD6EXAMPLE",
		eventType: "viewer-request",
		requestId: "",
	},
	viewer: { ip: "1.2.3.4" },
	request: { method: "", uri: "", querystring: "", headers: {}, cookies: {} },
};
function_response_event = {
	version: "1.0",
	context: {
		distributionDomainName: "d111111abcdef8.cloudfront.net",
		distributionId: "EDFDVBD6EXAMPLE",
		eventType: "viewer-request",
		requestId: "",
	},
	viewer: { ip: "1.2.3.4" },
	request: { method: "", uri: "", querystring: "", headers: {}, cookies: {} },
	// @ts-expect-error
	response: undefined,
};
function_response_event = {
	version: "1.0",
	context: {
		distributionDomainName: "d111111abcdef8.cloudfront.net",
		distributionId: "EDFDVBD6EXAMPLE",
		eventType: "viewer-request",
		requestId: "",
	},
	viewer: { ip: "1.2.3.4" },
	request: { method: "", uri: "", querystring: "", headers: {}, cookies: {} },
	response: { statusCode: 0, headers: {}, cookies: {} },
};

declare let function_context: FunctionEventContext;
function_context = {
	distributionDomainName: "d111111abcdef8.cloudfront.net",
	distributionId: "EDFDVBD6EXAMPLE",
	eventType: "viewer-request",
	requestId: "",
};

declare let function_cookies: FunctionEventReqResCookies;
function_cookies = {
	cookie1: {
		value: "val1",
		attributes: "Secure; Path=/; Domain=example.com; Expires=Wed, 05 Apr 2021 07:28:00 GMT",
	},
};
function_cookies = {
	ID: { value: "id1234", attributes: "Expires=Wed, 05 Apr 2021 07:28:00 GMT" },
	Cookie1: {
		value: "val1",
		attributes: "Secure; Path=/; Domain=example.com; Expires=Wed, 05 Apr 2021 07:28:00 GMT",
		multiValue: [{
			value: "val1",
			attributes: "Secure; Path=/; Domain=example.com; Expires=Wed, 05 Apr 2021 07:28:00 GMT",
		}, {
			value: "val2",
			attributes: "Path=/cat; Domain=example.com; Expires=Wed, 10 Jan 2021 07:28:00 GMT",
		}],
	},
};

declare let function_event_type: FunctionEventType;
function_event_type = "viewer-request";
function_event_type = "viewer-response";
// @ts-expect-error
function_event_type = "unknown-type";

declare let function_headers: FunctionEventReqResHeaders;
function_headers = {};
function_headers = { host: { value: "video.example.com" } };
function_headers = {
	accept: {
		value: "application/json",
		multiValue: [{ value: "application/json" }, { value: "application/xml" }, {
			value: "text/html",
		}],
	},
};
function_headers["x-custom-header"] = { value: "example value" };

declare let function_querystring: FunctionEventRequestQuerystring;
function_querystring = {};
function_querystring = {
	ID: { value: "42" },
	Exp: { value: "1619740800" },
	TTL: { value: "1440" },
	NoValue: { value: "" },
	querymv: { value: "val1", multiValue: [{ value: "val1" }, { value: "val2,val3" }] },
};

declare let function_request: FunctionEventRequest;
function_request = {
	method: "GET",
	uri: "/media/index.mpd",
	querystring: {
		ID: { value: "42" },
		Exp: { value: "1619740800" },
		TTL: { value: "1440" },
		NoValue: { value: "" },
		querymv: { value: "val1", multiValue: [{ value: "val1" }, { value: "val2,val3" }] },
	},
	headers: {},
	cookies: {},
};
function_request = {
	method: "GET",
	uri: "/media/index.mpd",
	querystring: "ID=42&Exp=1619740800&TTL=1440&NoValue=&querymv=val1&querymv=val2,val3",
	headers: {},
	cookies: {},
};

declare let function_response: FunctionEventResponse;
function_response = {
	statusCode: 200,
	statusDescription: "OK",
	headers: {
		date: { value: "Mon, 04 Apr 2021 18:57:56 GMT" },
		server: { value: "gunicorn/19.9.0" },
		"access-control-allow-origin": { value: "*" },
		"access-control-allow-credentials": { value: "true" },
		"content-type": { value: "text/html" },
		"content-length": { value: "86" },
	},
	cookies: {
		ID: { value: "id1234", attributes: "Expires=Wed, 05 Apr 2021 07:28:00 GMT" },
		Cookie1: {
			value: "val1",
			attributes: "Secure; Path=/; Domain=example.com; Expires=Wed, 05 Apr 2021 07:28:00 GMT",
			multiValue: [{
				value: "val1",
				attributes:
					"Secure; Path=/; Domain=example.com; Expires=Wed, 05 Apr 2021 07:28:00 GMT",
			}, {
				value: "val2",
				attributes: "Path=/cat; Domain=example.com; Expires=Wed, 10 Jan 2021 07:28:00 GMT",
			}],
		},
	},
	body: {
		encoding: "text",
		data: "<!DOCTYPE html><html><body><p>Here is your custom content.</p></body></html>",
	},
};
function_response = {
	statusCode: 200,
	headers: {},
	cookies: {},
	body: "<!DOCTYPE html><html><body><p>Here is your custom content.</p></body></html>",
};

declare let function_event_response_body: FunctionEventResponseBody;
function_event_response_body = { encoding: "base64", data: "data string" };
function_event_response_body = { encoding: "text", data: "data string" };
// @ts-expect-error
function_event_response_body = {};
// @ts-expect-error
function_event_response_body = { encoding: "text" };
// @ts-expect-error
function_event_response_body = { data: "data string" };

declare let function_viewer: FunctionEventViewer;
// @ts-expect-error
function_viewer = {};
function_viewer = { ip: "1.2.3.4" };

declare let origin_access_control_origin_type: OriginAccessControlOriginType;
origin_access_control_origin_type = "lambda";
origin_access_control_origin_type = "mediapackagev2";
origin_access_control_origin_type = "mediastore";
origin_access_control_origin_type = "s3";
// @ts-expect-error
origin_access_control_origin_type = "unknown-type";

declare let origin_access_control_signing_behavior: OriginAccessControlSigningBehavior;
origin_access_control_signing_behavior = "always";
origin_access_control_signing_behavior = "never";
origin_access_control_signing_behavior = "no-override";
// @ts-expect-error
origin_access_control_signing_behavior = "unkown-behavior";

declare let origin_access_control_signing_protocol: OriginAccessControlSigningProtocol;
origin_access_control_signing_protocol = "sigv4";
// @ts-expect-error
origin_access_control_signing_protocol = "unknown-protocol";

declare let origin_protocol: OriginProtocol;
origin_protocol = "http";
origin_protocol = "https";
// @ts-expect-error
origin_protocol = "unknown-protocol";

declare let origin_ssl_protocol: OriginSslProtocol;
origin_ssl_protocol = "SSLv3";
origin_ssl_protocol = "TLSv1";
origin_ssl_protocol = "TLSv1.1";
origin_ssl_protocol = "TLSv1.2";
// @ts-expect-error
origin_ssl_protocol = "unknown-protocol";
