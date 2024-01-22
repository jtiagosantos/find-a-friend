import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommandInput, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PreSignURLInput } from './inputs/pre-sign-url.input';

@Injectable()
export class AWSS3Service {
  private s3 = new S3Client({
    region: process.env.AWS_PROFILE_REGION,
    credentials: {
      secretAccessKey: process.env.AWS_PROFILE_SECRET_ACCESS_KEY as string,
      accessKeyId: process.env.AWS_PROFILE_ACCESS_KEY_ID as string,
    },
  });

  public async preSignURL({ key, contentType }: PreSignURLInput) {
    const params: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key.concat('-').concat(randomUUID()),
      ContentType: contentType,
      ACL: 'public-read',
    };

    const command = new PutObjectCommand(params);

    const url = await getSignedUrl(this.s3, command, { expiresIn: 120 });

    return url;
  }
}
