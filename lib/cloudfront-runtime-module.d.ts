import {
	OriginAccessControlOriginType,
	OriginAccessControlSigningBehavior,
	OriginAccessControlSigningProtocol,
	OriginProtocol,
	OriginSslProtocol,
} from "./aws-cloudfront";

/**
 * ## CloudFront Functions JS 2.0 Runtime Module
 *
 * A module available for import within CloudFront Functions using the [JavaScript 2.0 runtime][1].
 * It provides access to helper methods for working with [CloudFront KeyValueStore][2] and for
 * modifying the origin within a CloudFront request.
 *
 * To use this module, create a CloudFront function using JavaScript runtime 2.0 and include the
 * following statement in the first line of the function code:
 *
 * ```ts
 * import cf from 'cloudfront';
 * ```
 *
 * ### Helper methods for KeyValueStores
 *
 *  @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-custom-methods.html
 *
 * This section applies if you use the [CloudFront KeyValueStore][2] to include key values in the
 * function that you create. CloudFront Functions has a module that provides access to a handle
 * that provides three helper methods for working with the KeyValueStore.
 *
 * To use this module in the function code, make sure that you have [associated a KeyValueStore][3]
 * with the function.
 *
 * ### Helper methods for origin modification
 *
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/helper-functions-origin-modification.html
 *
 * This section applies if you dynamically update or change the origin used on the request inside
 * your CloudFront Functions code. You can update the origin on viewer request CloudFront Functions
 * only. CloudFront Functions has a module that provides helper methods to dynamically update or
 * change the origin.
 *
 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-20.html> "JS 2.0 runtime"
 * [2]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/kvs-with-functions.html> "CloudFront KeyValueStore"
 * [3]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/kvs-with-functions-associate.html> "Associate kvs"
 */
export interface CloudFrontRuntimeModule {
	/**
	 * ### kvs()
	 *
	 * Use the `kvs()` method to retrieve a handle for the KeyValueStore associacted with the
	 * CloudFront function.
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-custom-methods.html
	 *
	 * @usage
	 *
	 * ```ts
	 * import cf from 'cloudfront';
	 *
	 * // This fails if there is no key value store associated with the function
	 * const kvsHandle = cf.kvs();
	 *
	 * async function handler(event) {
	 *     // Use the first part of the pathname as key,
	 *     // for example "http(s)://domain/<key>/something/else"
	 *     const key = event.request.uri.split('/')[1]
	 *     let value = "Not found" // Default value
	 *     try {
	 *         value = await kvsHandle.get(key);
	 *     } catch (err) {
	 *         console.log(`Kvs key lookup failed for ${key}: ${err}`);
	 *     }
	 *     return event.request;
	 * }
	 * ```
	 * @param kvsId
	 * 		Optional, but if passed must match the `id` of the KeyValueStore associated with the
	 * 		function or the function will throw an error.
	 * 		e.g. `a1b2c3d4-5678-90ab-cdef-EXAMPLE1`.
	 *
	 * @throws
	 * 		`KVSNamespaceNotFound` error in the following cases: no key value store is associated
	 * 		with the function, or the passed `kvsId` does not match the id of the currently
	 * 		associated store.
	 */
	kvs(kvsId?: string): CloudFrontKvsHandle;

	/**
	 * ### updateRequestOrigin()
	 *
	 * Use the updateRequestOrigin() method to update the origin settings for a request. You can
	 * use this method to update existing origin properties for origins that are already defined
	 * in your distribution, or to define a new origin for the request. To do so, specify the
	 * properties that you want to change.
	 *
	 * The origin set by the updateRequestOrigin() method can be any HTTP endpoint and doesn't
	 * need to be an existing origin within your CloudFront distribution.
	 *
	 * ___Important___ Any settings that you don't specify in the updateRequestOrigin() will
	 * inherit the same settings from the existing origin's configuration.
	 *
	 * ___Notes___
	 * - If you're updating an origin that is part of an origin group, only the primary origin of
	 * 		the origin group is updated. The secondary origin remains unchanged.
	 * - If you are changing the origin type and have OAC enabled, make sure that the origin type
	 * 		in originAccessControlConfig matches the new origin type.
	 * - You can't use the updateRequestOrigin() method to update VPC origins. The request will fail.
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/helper-functions-origin-modification.html
	 *
	 * @example
	 * __Update to Amazon S3 request origin__
	 *
	 * The following example changes the viewer request’s origin to an S3 bucket, enables OAC, and
	 * resets custom headers sent to the origin.
	 *
	 * ```ts
	 * cf.updateRequestOrigin({
	 *     "domainName": "amzn-s3-demo-bucket-in-us-east-1.s3.us-east-1.amazonaws.com",
	 *     "originAccessControlConfig": {
	 *         "enabled": true,
	 *         "signingBehavior": "always",
	 *         "signingProtocol": "sigv4",
	 *         "originType": "s3"
	 *     },
	 *     // Empty object resets any header configured on the assigned origin
	 *     "customHeaders": {}
	 * });
	 * ```
	 *
	 * @example
	 * __Update to Application Load Balancer request origin__
	 *
	 * The following example changes the viewer request’s origin to an Application Load Balancer
	 * origin and sets a custom header and timeouts.
	 *
	 * ```ts
	 * cf.updateRequestOrigin({
	 *     "domainName" : "example-1234567890.us-east-1.elb.amazonaws.com",
	 *     "timeouts": {
	 *         "readTimeout": 30,
	 *         "connectionTimeout": 5
	 *     },
	 *     "customHeaders": {
	 *         "x-stage": "production",
	 *         "x-region": "us-east-1"
	 *     }
	 * });
	 * ```
	 *
	 * @example
	 * __Update to origin with Origin Shield enabled__
	 *
	 * In the following example, the origin in the distribution has Origin Shield enabled. The
	 * function code updates only the domain name used for the origin and omits all the other
	 * optional parameters. In this case, Origin Shield will still be used with the modified
	 * origin domain name because the Origin Shield parameters were not updated.
	 *
	 * ```ts
	 * cf.updateRequestOrigin({
	 *   "domainName" : "www.example.com"
	 * });
	 * ```
	 */
	updateRequestOrigin(originProperties: CloudFrontRequestOriginUpdateProps): void;

	/** Undocumented Methods */
	// selectRequestOriginById(): void;
	// createRequestOriginGroup(): void;
}

/**
 * ### kvs()
 */

export interface CloudFrontKvsHandle {
	/**
	 * Retrieve the value for the key name specified from the KeyValueStore. Returns a `Promise`
	 * that resolves to a value in the format requested by using `options`.
	 * By default, the value is returned as a string.
	 *
	 * @throws `KeyNotFound` error when the key that you requested doesn't exist in the
	 * 		associated KeyValueStore.
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-custom-methods.html#functions-custom-methods-get
	 */
	get<L extends undefined, R extends CloudFrontKvsFormat["string"]>(key: string): Promise<R>;
	get<TLabel extends CloudFrontKvsFormatLabel, RFormat extends CloudFrontKvsFormat[TLabel]>(
		key: string,
		options?: CloudFrontKvsGetOptions<TLabel>,
	): Promise<RFormat>;
	get(
		key: string,
		options?: CloudFrontKvsGetOptions<CloudFrontKvsFormatLabel>,
	): Promise<CloudFrontKvsFormat[CloudFrontKvsFormatLabel]>;

	/**
	 * Determine whether the specifiec key exists in the KeyValueStore.
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-custom-methods.html#functions-custom-methods-exists
	 */
	exists(key: string): Promise<boolean>;
	/**
	 * Return metadata about the KeyValueStore.
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-custom-methods.html#functions-custom-methods-meta
	 */
	meta(): Promise<CloudFrontKvsMetaDataResponse>;
}

export type CloudFrontKvsFormatLabel = "string" | "json" | "bytes";
export type CloudFrontKvsFormat = {
	[Label in CloudFrontKvsFormatLabel]: Label extends "string" ? string
		: Label extends "json" ? unknown
		: Label extends "bytes" ? Buffer
		: never;
};
export interface CloudFrontKvsGetOptions<TLabel extends CloudFrontKvsFormatLabel> {
	format: TLabel;
}
export interface CloudFrontKvsMetaDataResponse {
	/**
	 * The date and time that the KeyValueStore was created, in ISO 8601 format.
	 */
	creationDateTime: string;
	/**
	 * The date and time that the KeyValueStore was last synced from the source, in ISO 8601 format.
	 * The value doesn't include the propagation time to the edge.
	 */
	lastUpdatedDateTime: string;
	/**
	 * The total number of keys in the KeyValueStore after the last sync from the source.
	 */
	keyCount: number;
}
/** @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/helper-functions-origin-modification.html#update-request-origin-helper-function */
export interface CloudFrontRequestOriginUpdateProps {
	/**
	 * The domain name of the origin.
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesDomainName
	 */
	domainName?: string;

	/**
	 * The directory path at the origin where the request should locate content.
	 *
	 * The path should start with a forward slash(/) but shouldn't end with one. For example,
	 * it shouldn't end with `example-path/`. If this is not provided, then the origin path
	 * from the assigned origin is used.
	 *
	 * __For custom origins__
	 *
	 * The path should be URL encoded and have a maximum length of 255 characters.
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginPath
	 */
	originPath?: string;

	/**
	 * You can include custom headers with the request by specifying a header name and value
	 * pair for each custom header. The format is different than that of the request and response
	 * headers in the event structure. Use the following key:value pair syntax:
	 *
	 * ```js
	 * {"key1": "value1", "key2": "value2", ...}
	 * ```
	 *
	 * You can't add headers that are disallowed, and a header with the same name can't also be
	 * present in the incoming request headers. Header name must be lowercase in your
	 * function code. When CloudFront Functions converts the event object back into an HTTP
	 * request, the first letter of each word in header names is capitalized, and words are
	 * separated by a hyphen.
	 *
	 * For example, if you function code adds a header named `example-header-name`, CloudFront
	 * converts this to `Example-Header-Name` in the HTTP request.
	 *
	 * For more information see:
	 * - [Custom headers that CloudFront can’t add to origin requests][1]
	 * - [Restrictions on edge functions][2]
	 *
	 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html#add-origin-custom-headers-denylist> "CloudFront header limitiations"
	 * [2]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html> "Restrictions on edge functions"
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginCustomHeaders
	 */
	customHeaders?: Record<string, string>;
	/**
	 * The number of times that CloudFront attempts to connect to the origin.
	 * The minimum is 1 and the maximum is 3.
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#origin-connection-attempts
	 */
	connectionAttempts?: number;
	/**
	 * Enable or update CloudFront Origin Shield. If enabled you must specify the AWS Region.
	 * Use the Region code, not the Region name. For example, use `us-east-2` to specify
	 * the US East(Ohio) Region. For a list of available AWS Regions and help choosing the
	 * best Region for your origin, see [Choosing the AWS Region for Origin Shield][1].
	 *
	 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html#choose-origin-shield-region> "AWS Region for Origin Shield"
	 *
	 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#create-update-fields-origin-shield
	 */
	originShield?: { enabled: true; region: string; } | { enabled: false; region?: never; };
	/**
	 * The unique identifier of an origin access control (OAC) for this origin. This is only
	 * used when the origin supports a CloudFront OAC, such as Amazon S3, Lambda function URLs,
	 * MediaStore, and MediaPackage V2. If this is not provided, then the OAC settings from
	 * the assigned origin are used.
	 */
	originAccessControlConfig?: {
		enabled: false;
		signingBehavior?: never;
		signingProtocol?: never;
		originType?: never;
	} | {
		enabled: true;
		/**
		 * Specifies which requests CloudFront signs (adds authentication information to).
		 * Specify always for the most common use case. For more information, see .
		 *
		 * - `always` – CloudFront signs all origin requests, overwriting the Authorization
		 * 		header from the viewer request if one exists.
		 * - `never` – CloudFront doesn’t sign any origin requests. This value turns off origin
		 * 		access control for the origin.
		 * - `no-override` – If the viewer request doesn’t contain the Authorization header,
		 * 		then CloudFront signs the origin request. If the viewer request contains the
		 * 		Authorization header, then CloudFront doesn’t sign the origin request and instead
		 * 		passes along the Authorization header from the viewer request.
		 */
		signingBehavior: OriginAccessControlSigningBehavior;

		/**
		 * The signing protocol of the OAC, which determines how CloudFront signs (authenticates)
		 * requests. The only valid value is `sigv4`.
		 */
		signingProtocol: OriginAccessControlSigningProtocol;

		/**
		 * The type of origin for this OAC.
		 * Valid values include `s3`, `mediapackagev2`, `mediastore`, and `lambda`.
		 */
		originType: OriginAccessControlOriginType;
	};

	/**
	 * Timeouts only apply to custom origins, not Amazon S3 origins.
	 * (S3 origin configurations will ignore these settings.)
	 */
	timeouts?: {
		/**
		 * `readTimeout` applies to both of the following values:
		 *
		 * - How long (in seconds) CloudFront waits for a response after forwarding a request
		 * 		to the origin.
		 * - How long (in seconds) CloudFront waits after receiving a packet of a response from
		 * 		the origin and before receiving the next packet.
		 *
		 * The minimum timeout is 1 second and the maximum is 60 seconds.
		 *
		 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginResponseTimeout
		 */
		readTimeout?: number;

		/**
		 * `keepAliveTimeout` specifies how long CloudFront should try to maintain the
		 * connection to the origin after receiving the last packet of the response.
		 * The minimum timeout is 1 second and the maximum is 60 seconds.
		 *
		 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginResponseTimeout
		 */
		keepAliveTimeout?: number;

		/**
		 * The number of seconds that CloudFront waits when trying to establish a connection
		 * to the origin. The minimum timeout is 1 second and the maximum is 10 seconds.
		 *
		 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#origin-connection-timeout
		 */
		connectionTimeout?: number;
	};

	/**
	 * Specify connection settings for origins that are not an Amazon S3 bucket. There is one
	 * exception: you can specify these settings if the S3 bucket is configured with static
	 * website hosting.
	 */
	customOriginConfig?: {
		/**
		 * The HTTP port that CloudFront uses to connect to the origin. Specify the HTTP port
		 * that the origin listens on.
		 *
		 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesHTTPPort
		 */
		port: string;

		/**
		 * Specifies the protocol (HTTP or HTTPS) that CloudFront uses to connect to the origin.
		 *
		 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginProtocolPolicy
		 */

		protocol: OriginProtocol;

		/**
		 * A list that specifies the minimum SSL/TLS protocol that CloudFront uses when connecting
		 * to your origin over HTTPS.
		 *
		 * Valid values include `SSLv3`, `TLSv1`, `TLSv1.1`, and `TLSv1.2`.
		 *
		 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginSSLProtocols
		 */
		sslProtocols: OriginSslProtocol[];
	};
}
