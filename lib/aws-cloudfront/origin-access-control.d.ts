/**
 * ## CloudFront Origin Access Control
 *
 * You can configure CloudFront and some AWS origins in a way that provides the following benefits:
 * - Restricts access to the AWS origin so that it's not publicly accessible
 * - Makes sure that viewers (users) can access the content in the AWS origin only through the
 * specified CloudFront distribution and preventing them from accessing the content directly from
 * the bucket, or through an unintended CloudFront distribution.
 *
 * To do this, configure CloudFront to send authenticated requests to your AWS origin and
 * configure the AWS origin to only allow access to authenticated requests from CloudFront.
 * For more information, see following topics for compatible types of AWS origins.
 *
 * - [Restrict access to an AWS origin][1]
 * - [Restrict access to an AWS Elemental MediaPackage v2 origin][2]
 * - [Restrict access to an AWS Elemental MediaStore origin][3]
 * - [Restrict access to an AWS Lambda function URL origin][4]
 * - [Restrict access to an Amazon Simple Storage Service origin][5]
 *
 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-origin.html> "Restrict access to an AWS origin"
 * [2]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-mediapackage.html> "Restrict access to an AWS Elemental MediaPackage v2 origin"
 * [3]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-mediastore.html> "Restrict access to an AWS Elemental MediaStore origin"
 * [4]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-lambda.html> "Restrict access to an AWS Lambda function URL origin"
 * [5]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html> "Restrict access to an Amazon Simple Storage Service origin"
 */

/**
 * __Origin types supported by Origin Access Control__
 *
 * - `s3` - Uses an [Amazon S3 bucket origin][1]
 * - `lambda` - Uses a [AWS Lambda function URL origin][2]
 * - `mediastore` - Uses an [AWS Elemental MediaStore origin][3]
 * - `mediapackagev2` - Uses an [AWS Elemental MediaPackage v2 origin][4]
 *
 * [1]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html#using-s3-as-origin> "Amazon S3 bucket origin"
 * [2]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html#concept_lambda_function_url> "AWS Lambda function URL origin"
 * [3]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html#concept_AWS_Media> "Elemental MediaStore origin"
 * [4]: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html#concept_AWS_Media> "AWS Elemental MediaPackage v2 origin"
 *
 * @source https://github.com/aws/aws-cdk/blob/v2.182.0/packages/aws-cdk-lib/aws-cloudfront/lib/origin-access-control.ts#L82
 */
export type OriginAccessControlOriginType = "s3" | "lambda" | "mediastore" | "mediapackagev2";

/**
 * Specify which requests CloudFront signs.
 *
 * - `always` - Sign all origin requests, overwriting the Authorization header from the
 * 		viewer request if one exists.
 * - `never` - Do not sign any origin requests. This value turns off origin access control
 * 		for all origins in all distributions that use this origin access control.
 * - `no-override` - Sign origin requests only if the viewer request doesn't contain
 * 		the Authorization header.
 *
 * The recommended setting is `always`.
 *
 * @source https://github.com/aws/aws-cdk/blob/v2.182.0/packages/aws-cdk-lib/aws-cloudfront/lib/origin-access-control.ts#L105
 */
export type OriginAccessControlSigningBehavior = "always" | "never" | "no-override";

/** @source https://github.com/aws/aws-cdk/blob/v2.182.0/packages/aws-cdk-lib/aws-cloudfront/lib/origin-access-control.ts#L127 */
export type OriginAccessControlSigningProtocol = "sigv4";
