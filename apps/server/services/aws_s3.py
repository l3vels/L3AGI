import boto3
from config import Config

s3_client = boto3.client('s3',
    aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
    region_name=Config.AWS_REGION
)

class AWSS3Service:
    """AWS S3 Service"""

    @staticmethod
    def upload(body, key: str, content_type: str):    
        """Upload image to S3 bucket"""

        s3_client.put_object(
            Body=body,
            Bucket=Config.AWS_S3_BUCKET,
            Key=key,
            ContentType=content_type,
        )

        public_url = AWSS3Service.get_public_url(key)
        return public_url
    
    @staticmethod
    def generate_presigned_url(key: str, content_type: str):
        """Generate a presigned URL for S3 upload"""

        return s3_client.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': Config.AWS_S3_BUCKET,
                'Key': key,
                'ContentType': content_type
            },
            ExpiresIn=3600
        )
    
    @staticmethod
    def get_public_url(key: str):
        """Get public url for S3 object"""

        return f"https://{Config.AWS_S3_BUCKET}.s3.amazonaws.com/{key}"