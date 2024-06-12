from models.base_model import BaseModel
from sqlalchemy import (
    UUID,
    Boolean,
    Column,
    ForeignKey,
    or_,
    String,
    Enum,
    Numeric
)
from sqlalchemy.orm import Session, aliased, relationship
from sqlalchemy.dialects.postgresql import JSONB
import uuid
from typings.template import (
    TemplateTypeEnum,
    TemplateComputeTypeEnum,
    TemplateVisibilityEnum
)
from  exceptions import TemplateNotFoundException


class TemplateModel(BaseModel):
    """
    Represents a template configuration for containerized workloads.

    Attributes:
        id (UUID): Unique identifier for the template.
        name (str): Name of the template. This field is required.
        description (str): Optional description of the template.
        template_type (TemplateTypeEnum): Type of the template. This field is required.
        compute_type (TemplateComputeTypeEnum): Type of compute resources for the template. This field is required.
        container_image (str): Docker image used for the container. This field is required.
        container_start_command (str): Command to start the container. This field is optional.
        container_disk (Decimal): Disk size allocated for the container in GB. This field is required.
        volume_disk (Decimal): Disk size allocated for the volume in GB. This field is required.
        volume_mount_path (str): Path where the volume is mounted in the container. This field is optional.
        expose_http_ports (str): HTTP ports exposed by the container. This field is optional.
        expose_tcp_ports (str): TCP ports exposed by the container. This field is optional.
        template_visibility (TemplateVisibilityEnum): Visibility setting for the template. This field is required.
        environment_variables (JSONB): JSON object containing environment variables for the container. This field is optional.
        is_deleted (bool): Flag indicating if the template is deleted. Default is False.
        account_id (UUID): Foreign key referencing the associated account. This field is optional.
        created_by (UUID): Foreign key referencing the user who created the template. This field is optional.
        modified_by (UUID): Foreign key referencing the user who last modified the template. This field is optional.
        creator (UserModel): Relationship to the UserModel for the creator of the template.
        account (AccountModel): Relationship to the AccountModel for the associated account.
    """

    __tablename__ = "template"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(String)
    template_type = Column(
        Enum(TemplateTypeEnum),
        nullable=False
    )
    compute_type = Column(
        Enum(TemplateComputeTypeEnum),
        nullable=False
    )
    container_image = Column(String, nullable=False)
    container_start_command = Column(String, nullable=True)
    container_disk = Column(Numeric(precision=5, scale=0), nullable=False)
    volume_disk = Column(Numeric(precision=5, scale=0), nullable=False)
    volume_mount_path = Column(String, nullable=True)
    expose_http_ports = Column(String, nullable=True)
    expose_tcp_ports = Column(String, nullable=True)
    template_visibility = Column(
        Enum(TemplateVisibilityEnum),
        nullable=False
    )
    environment_variables = Column(JSONB, nullable=True)

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
        template_model: "TemplateModel",
        template_input
    ):
        for field in template_input.__annotations__.keys():
            if hasattr(template_model, field):
                setattr(template_model, field, getattr(
                    template_input,
                    field
                ))

    @classmethod
    def create_template(
        cls,
        db: Session,
        template,
        user,
        account
    ):
        """
        Creates a new Template in the database using the provided template, user, and account.

        Args:
            db (Session): The database session object.
            template (dict): The template data used to create the template.
            user (User): The user creating the template.
            account (Account): The account associated with the template.

        Returns:
            TemplateModel: The newly created template.
        """

        db_template = TemplateModel(
            created_by=user.id,
            account_id=account.id
        )

        cls.update_model_from_input(
            db_template,
            template
        )

        db.session.add(db_template)
        db.session.flush()
        db.session.commit()

        return db_template

    @classmethod
    def get_templates(cls, db, account):
        """
        Retrieves all templates associated with a given account.
        Args:
            db (Session): The database session object.
            account (Account): The account object.

        Returns:
            List[TemplateModel]: A list of TemplateModel objects representing the templates associated with the account.
        """
        templates = (
            db.session.query(TemplateModel)
            .filter(
                TemplateModel.account_id == account.id,
                or_(
                    or_(
                        TemplateModel.is_deleted.is_(False),
                        TemplateModel.is_deleted is None,
                    ),
                    TemplateModel.is_deleted is None,
                ),
            )
            .all()
        )

        return templates

    @classmethod
    def get_template_by_id(cls, db, template_id, account):
        template = (
            db.session.query(TemplateModel)
            .filter(
                TemplateModel.id == template_id,
                TemplateModel.account_id == account.id,
                or_(
                    or_(
                        TemplateModel.is_deleted.is_(False),
                        TemplateModel.is_deleted is None,
                    ),
                    TemplateModel.is_deleted is None,
                ),
            )
            .first()
        )

        return template

    @classmethod
    def delete_template_by_id(
        cls,
        db,
        template_id,
        account
    ):
        template = (
            db.session.query(TemplateModel)
            .filter(
                TemplateModel.id == template_id,
                TemplateModel.account_id == account.id
            )
            .first()
        )

        if not template or template.is_deleted:
            raise TemplateNotFoundException("Template not found")

        template.is_deleted = True
        db.session.commit()

    @classmethod
    def update_template(
        cls, db, template_id, input, user, account
    ):
        old_template = cls.get_template_by_id(
            db=db,
            template_id=template_id,
            account=account
        )
        if not old_template:
            raise TemplateNotFoundException("Template not found")

        db_template = cls.update_model_from_input(
            template_model=old_template,
            template_input=input
        )
        db_template.modified_by = user.id

        db.session.add(db_template)
        db.session.commit()

        return db_template
