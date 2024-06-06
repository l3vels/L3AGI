from models.base_model import BaseModel
from sqlalchemy import UUID, Boolean, Column, or_, String, Enum, Numeric
from sqlalchemy.orm import Session, aliased, relationship
from sqlalchemy.dialects.postgresql import JSONB
import uuid


class ResourceModel(BaseModel):
    """_summary_

    Args:
        BaseModel (_type_): _description_
    """

    __tablename__ = "resource"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    display_name = Column(String(255), nullable=False)
    type = Column(Enum("cpu", "gpu", name="resource_type"), nullable=False)
    category = Column(String, nullable=True)
    ram = Column(Numeric(precision=5, scale=2), nullable=True)
    secure_price = Column(Numeric(precision=5, scale=2), nullable=True)
    one_month_price = Column(Numeric(precision=5, scale=2), nullable=True)
    three_month_price = Column(Numeric(precision=5, scale=2), nullable=True)
    six_month_price = Column(Numeric(precision=5, scale=2), nullable=True)
    max_gpu = Column(Numeric(precision=5, scale=2), nullable=True)
    lowest_price = Column(JSONB, nullable=False)
    # { compliance, minMemory, minVcpu, minimumBidPrice, stockStatus, uninterruptablePrice  }
    status = Column(
        Enum('low', 'high', 'unavailable', name='status_enum'),
        nullable=True
    )
    disc_type = Column(
        Enum('ssd', 'nvme', 'unavailable', name='disc_type_enum'),
        nullable=True
    )
    cloud_type = Column(
        Enum(
            'secure cloud',
            'community cloud',
            'unavailable',
            name='cloud_type_enum'
        ),
        nullable=True)
    region = Column(String(255), nullable=False)
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
    def create_user_account_access(
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
