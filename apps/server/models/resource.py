from models.base_model import BaseModel
from sqlalchemy import UUID, Boolean, Column, or_, String, Enum, Numeric
from sqlalchemy.orm import Session, aliased, relationship
from sqlalchemy.dialects.postgresql import JSONB
import uuid
from typings.resource import (
    ResourceDiscTypeEnum,
    ResourceCloudTypeEnum,
    ResourceStatusEnum,
    ResourceTypeEnum
)


class ResourceModel(BaseModel):
    """
    Represents a resource configuration for cloud or on-premise environments.

    Args:
        BaseModel (Type): Inherits from SQLAlchemy's declarative base model.

    Attributes:
        id (UUID): Unique identifier for the resource.
        name (str): Name of the resource. This field is required.
        display_name (str): Display name for the resource. This field is required.
        type (ResourceTypeEnum): Type of the resource. This field is required.
        category (str): Category of the resource. This field is optional.
        ram (Decimal): Amount of RAM in GB. This field is required.
        secure_price (Decimal): Price for secure access. This field is optional.
        one_month_price (Decimal): Price for one month usage. This field is optional.
        three_month_price (Decimal): Price for three months usage. This field is optional.
        six_month_price (Decimal): Price for six months usage. This field is optional.
        max_gpu (Decimal): Maximum GPU allocation. This field is optional.
        lowest_price (JSONB): JSON object containing the lowest price details. This field is required.
        status (ResourceStatusEnum): Status of the resource. This field is optional.
        disc_type (ResourceDiscTypeEnum): Type of disk used in the resource. This field is optional.
        cloud_type (ResourceCloudTypeEnum): Type of cloud environment. This field is optional.
        region (str): Geographical region of the resource. This field is optional.
        cuda_version (Decimal): Version of CUDA supported. This field is optional.
        is_deleted (bool): Flag indicating if the resource is deleted. Default is False.
    """

    __tablename__ = "resource"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    display_name = Column(String(255), nullable=False)
    type = Column(Enum(ResourceTypeEnum), nullable=False)
    category = Column(String, nullable=True)
    ram = Column(Numeric(precision=5, scale=2), nullable=False)
    secure_price = Column(Numeric(precision=5, scale=2), nullable=True)
    one_month_price = Column(Numeric(precision=5, scale=2), nullable=True)
    three_month_price = Column(Numeric(precision=5, scale=2), nullable=True)
    six_month_price = Column(Numeric(precision=5, scale=2), nullable=True)
    max_gpu = Column(Numeric(precision=5, scale=2), nullable=True)
    lowest_price = Column(JSONB, nullable=False)
    status = Column(
        Enum(ResourceStatusEnum),
        nullable=True
    )
    disc_type = Column(
        Enum(ResourceDiscTypeEnum),
        nullable=True
    )
    cloud_type = Column(
        Enum(ResourceCloudTypeEnum),
        nullable=True)
    region = Column(String(255))
    cuda_version = Column(Numeric(precision=5, scale=2), nullable=True)
    is_deleted = Column(Boolean, default=False, index=True)

    def __repr__(self) -> str:
        return (
            f"ResourceModel(id={self.id}, "
            f"is_deleted={self.is_deleted}"
        )

    @classmethod
    def update_model_from_input(
        cls,
        resource_model: "ResourceModel",
        resource_input
    ):
        for field in resource_input.__annotations__.keys():
            if hasattr(resource_model, field):
                setattr(resource_model, field, getattr(
                    resource_input,
                    field
                ))

    @classmethod
    def get_resources(cls, db):
        resources = (
            db.session.query(ResourceModel)
            .filter(
                or_(
                    or_(
                        ResourceModel.is_deleted.is_(False),
                        ResourceModel.is_deleted is None,
                    ),
                    ResourceModel.is_deleted is None,
                ),
            )
            .all()
        )

        return resources

    @classmethod
    def create_resource(
        cls,
        db: Session,
        resource,
    ):
        """
        Creates a new resource.

        Args:
            db (Session): SQLAlchemy Session object.
            resource (ResourceModel): _description_

        Returns:
            _type_: _description_
        """

        db_resource = ResourceModel()

        cls.update_model_from_input(
            db_resource,
            resource
        )

        db.session.add(db_resource)
        db.session.flush()
        db.session.commit()

        return db_resource
