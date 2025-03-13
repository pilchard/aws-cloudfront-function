import type {
	CloudFrontKvsFormat,
	CloudFrontKvsFormatLabel,
	CloudFrontKvsGetOptions,
	CloudFrontKvsHandle,
	CloudFrontKvsMetaDataResponse,
	CloudFrontRequestOriginUpdateProps,
	CloudFrontRuntimeModule,
} from "@pilchard/aws-cloudfront-function";

declare let kvs_format_label: CloudFrontKvsFormatLabel;
kvs_format_label = "string";
kvs_format_label = "json";
kvs_format_label = "bytes";

declare let cloudFrontKvsStrFormat: CloudFrontKvsFormat["string"];
declare let cloudFrontKvsJsonFormat: CloudFrontKvsFormat["json"];
declare let cloudFrontKvsBytesFormat: CloudFrontKvsFormat["bytes"];
str = cloudFrontKvsStrFormat;
unknown = cloudFrontKvsJsonFormat;
buffer = cloudFrontKvsBytesFormat;

declare let cloud_front_kvs_get_options: CloudFrontKvsGetOptions<CloudFrontKvsFormatLabel>;
// @ts-expect-error
cloud_front_kvs_get_options = {};
cloud_front_kvs_get_options = {
	// @ts-expect-error
	format: undefined,
};
cloud_front_kvs_get_options = {
	// @ts-expect-error
	format: "format-x",
};
cloud_front_kvs_get_options = { format: "string" };
cloud_front_kvs_get_options = { format: "json" };
cloud_front_kvs_get_options = { format: "bytes" };

declare let cloud_front_kvs_handle: CloudFrontKvsHandle;
(async () => {
	// Return types

	str = await cloud_front_kvs_handle.get("key-name");
	str = await cloud_front_kvs_handle.get("key-name", { format: "string" });
	unknown = await cloud_front_kvs_handle.get("key-name", { format: "json" }); // inconclusive
	buffer = await cloud_front_kvs_handle.get("key-name", { format: "bytes" });

	// Coercion

	// @ts-expect-error
	array = await cloud_front_kvs_handle.get("key-name") as any[];
	// @ts-expect-error
	array = await cloud_front_kvs_handle.get("key-name", { format: "string" }) as any[];
	/**  coercion available since `json` format returns `unknown` */
	array = await cloud_front_kvs_handle.get("key-name", { format: "json" }) as any[];
	// @ts-expect-error
	array = await cloud_front_kvs_handle.get("key-name", { format: "bytes" }) as any[];

	// Arguments

	// @ts-expect-error
	str = await cloud_front_kvs_handle.get();
})();

declare let cloud_front_kvs_meta_data_response: CloudFrontKvsMetaDataResponse;
// @ts-expect-error
cloud_front_kvs_meta_data_response = {};
cloud_front_kvs_meta_data_response = {
	// @ts-expect-error
	creationDateTime: undefined,
	// @ts-expect-error
	lastUpdatedDateTime: undefined,
	// @ts-expect-error
	keyCount: undefined,
};
cloud_front_kvs_meta_data_response = {
	creationDateTime: "2025-03-12T19:33:19.776Z",
	lastUpdatedDateTime: new Date().toISOString(),
	keyCount: 1,
};

declare let cloud_front_request_origin_update_props: CloudFrontRequestOriginUpdateProps;
cloud_front_request_origin_update_props = {};
cloud_front_request_origin_update_props = {
	domainName: "amzn-s3-demo-bucket.s3.us-west-2.amazonaws.com",
};
cloud_front_request_origin_update_props = { originPath: "/origin/path" };
cloud_front_request_origin_update_props = { customHeaders: { "x-header-one": "header value" } };
cloud_front_request_origin_update_props = { connectionAttempts: 3 };
cloud_front_request_origin_update_props = { originShield: { enabled: true, region: "us-east-1" } };
cloud_front_request_origin_update_props = { originShield: { enabled: false } };
cloud_front_request_origin_update_props = {
	originShield: {
		enabled: false,
		// @ts-expect-error
		region: "us-east-1",
	},
};
cloud_front_request_origin_update_props = {
	originAccessControlConfig: {
		enabled: true,
		signingBehavior: "always",
		signingProtocol: "sigv4",
		originType: "s3",
	},
};
cloud_front_request_origin_update_props = { originAccessControlConfig: { enabled: false } };
cloud_front_request_origin_update_props = {
	originAccessControlConfig: {
		enabled: false,
		// @ts-expect-error
		signingBehavior: "always",
		// @ts-expect-error
		signingProtocol: "sigv4",
		// @ts-expect-error
		originType: "s3",
	},
};
cloud_front_request_origin_update_props = {
	timeouts: { readTimeout: 2000, keepAliveTimeout: 5000, connectionTimeout: 60000 },
};
cloud_front_request_origin_update_props = { timeouts: { readTimeout: 2000 } };
cloud_front_request_origin_update_props = { timeouts: { connectionTimeout: 60000 } };
cloud_front_request_origin_update_props = {
	customOriginConfig: { port: "2020", protocol: "https", sslProtocols: ["TLSv1.2", "TLSv1.1"] },
};
cloud_front_request_origin_update_props = {
	// @ts-expect-error
	customOriginConfig: {},
};
cloud_front_request_origin_update_props = {
	domainName: "amzn-s3-demo-bucket.s3.us-west-2.amazonaws.com",
	originPath: "/origin/path",
	customHeaders: { "x-header-one": "header value" },
	connectionAttempts: 3,
	originShield: { enabled: true, region: "us-east-1" },
	originAccessControlConfig: {
		enabled: true,
		signingBehavior: "always",
		signingProtocol: "sigv4",
		originType: "s3",
	},
	timeouts: { readTimeout: 2000, keepAliveTimeout: 5000, connectionTimeout: 60000 },
	customOriginConfig: { port: "2020", protocol: "https", sslProtocols: ["TLSv1.2", "TLSv1.1"] },
};

declare let cloud_front_runtime_module: CloudFrontRuntimeModule;
cloud_front_kvs_handle = cloud_front_runtime_module.kvs();
cloud_front_runtime_module.updateRequestOrigin(cloud_front_request_origin_update_props);
cloud_front_runtime_module.updateRequestOrigin({});
// @ts-expect-error
cloud_front_runtime_module.updateRequestOrigin();
