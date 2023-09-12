

//KOD FRÅN MAJAS LEKTION.. innan det flummade ut <---------------


// import { S3 } from 'aws-sdk';

// export const handler = async (event) => {
// 	const bucketName = event.Records[0].s3.bucket.name;
// 	console.log(JSON.stringify('Detta är en console log', event));
// 	const keyName = event.Records[0].se.object.key;

// 	const s3 = new S3();

// 	try {
// 		const params = {
// 			Bucket: bucketName,
// 			Key: keyName,
// 		};

// 		const { ContentType } = await s3.headObject(params).promise();
// 		return {
// 			statusCode: 200,
// 			body: JSON.stringify({ contentType: ContentType }),
// 		};
// 	} catch (error) {
// 		console.log('error', error);
//     return {statusCode: 500,
//     body:JSON.stringify({error: 'Failed to get ContentType'})}
// 	}
// };







// Therese lambda ...                                                         import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3"; 
// export const handler = async (event) => {
 
//     const bucketName = event.Records[0].s3.bucket.name;
//     console.log("HÄR ÄR VÅRT EVENT!", JSON.stringify(event));
//     const keyName = event.Records[0].s3.object.key;
    
//     const s3 = new S3Client({region: 'eu-north-1'});
//     try {

//         const params = {
//             Bucket: bucketName,
//             Key: keyName
//         };

//         const { ContentType } = await s3.send(new HeadObjectCommand(params)); 
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ contentType: ContentType })
//         }
//     } catch (err) {
//         console.log('error!!!!', err);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({error: 'Failed to get content type'})
//         }
//     }
// }