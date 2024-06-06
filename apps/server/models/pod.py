from models.base_model import BaseModel
from sqlalchemy import (
    UUID,
    Boolean,
    Column,
    ForeignKey,
    # or_,
    String,
    Enum,
    Numeric
)
from sqlalchemy.orm import Session, aliased, relationship
from sqlalchemy.dialects.postgresql import JSONB
import uuid


class PodModel(BaseModel):
    """
    Represents an pod entity.

    Attributes:
        id (UUID): Unique identifier of the pod.
        is_deleted (bool): Flag indicating if the api_key has been soft-deleted.
    """

    __tablename__ = "pod"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pod_name = Column(String, nullable=True)
    price = Column(Numeric(precision=5, scale=2), nullable=True)
    status = Column(
        Enum('running', 'stopped', name='status_enum'),
        nullable=True
    )
    provider = Column(String, nullable=True)
    category = Column(String, nullable=True)
    type = Column(Enum('cpu', 'gpu', name='category_enum'), nullable=True)
    resource = Column(
        UUID,
        ForeignKey("resource.id", ondelete="CASCADE"),
        nullable=True,
        index=True
    )
    # template = Column(
    #     UUID,
    #     ForeignKey("template.id", ondelete="CASCADE"),
    #     nullable=True,
    #     index=True
    # )
    gpu_count = Column(Numeric(precision=5, scale=2), nullable=True)
    isinstance_pricing = Column(JSONB, nullable=False)

    is_deleted = Column(Boolean, default=False, index=True)

    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True
    )
    created_by = Column(
        UUID,
        ForeignKey("user.id", name="fk_created_by", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    modified_by = Column(
        UUID,
        ForeignKey("user.id", name="fk_modified_by", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    creator = relationship(
        "UserModel",
        foreign_keys=[created_by],
        lazy="select"
    )
    account = relationship(
        "AccountModel",
        foreign_keys=[account_id],
        lazy="select"
    )

    @classmethod
    def update_model_from_input(
        cls,
        pod_model: "PodModel",
        pod_input
    ):
        for field in pod_input.__annotations__.keys():
            if hasattr(pod_model, field):
                setattr(pod_model, field, getattr(
                    pod_input,
                    field
                ))

    @classmethod
    def create_pod(
        cls,
        db: Session,
        pod,
        user,
        account_id
    ):
        """
        Creates a new Pod.

        Args:
            db (Session): SQLAlchemy Session object.
            pod (PodModel): _description_

        Returns:
            _type_: _description_
        """

        db_pod = PodModel(
            created_by=user.id,
            account_id=account_id
        )

        cls.update_model_from_input(
            db_pod,
            pod
        )

        db.session.add(db_pod)
        db.session.flush()
        db.session.commit()

        return db_pod
