from __future__ import annotations

import uuid
from datetime import datetime, timedelta
from typing import List

from sqlalchemy import (UUID, Boolean, Column, DateTime, ForeignKey, Index,
                        Numeric, String, or_)
from sqlalchemy.orm import Session, joinedload, relationship
from sqlalchemy.sql import and_

from exceptions import ScheduleNotFoundException
from models.base_model import BaseModel
from models.schedule_config import ScheduleConfigModel
from models.user import UserModel
from typings.schedule import ConfigInput, ScheduleInput, ScheduleStatus


class ScheduleModel(BaseModel):
    """
    Represents an schedule entity.

    Attributes:
        id (UUID): Unique identifier of the schedule.
        name (str): Name of the schedule.
        role (str): Role of the schedule.
        description (str): Description of the schedule.
        is_deleted (bool): Flag indicating if the schedule has been soft-deleted.
        is_template (bool): Flag indicating if the schedule is a template.
        user_id (UUID): ID of the user associated with the schedule.
        account_id (UUID): ID of the account associated with the schedule.
        is_public (bool): Flag indicating if the schedule is a system schedule.
        configs: Relationship with schedule configurations.
    """

    # __abstract__ = True
    __tablename__ = "schedule"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    description = Column(String, nullable=True)
    status = Column(String, nullable=True, default=ScheduleStatus.PENDING.value)
    schedule_type = Column(String)  # `Outbound & Inbound`
    cron_expression = Column(String)
    start_date = Column(DateTime(timezone=True), nullable=True)
    end_date = Column(DateTime(timezone=True), nullable=True)
    interval = Column(String, nullable=True)
    next_run_date = Column(DateTime(timezone=True), nullable=True, index=True)
    max_daily_budget = Column(Numeric(precision=5, scale=2), nullable=True)
    is_active = Column(Boolean, default=True, index=True)
    is_deleted = Column(Boolean, default=False, index=True)
    workspace_id = Column(
        UUID, ForeignKey("workspace.id", ondelete="CASCADE"), nullable=True, index=True
    )
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True, index=True
    )

    configs = relationship(
        "ScheduleConfigModel", back_populates="schedule", lazy="select"
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
    creator = relationship("UserModel", foreign_keys=[created_by], lazy="select")
    account = relationship("AccountModel", foreign_keys=[account_id], lazy="select")

    # Define indexes
    Index("ix_schedule_model_workspace_id_is_deleted", "workspace_id", "is_deleted")
    Index("ix_schedule_model_account_id_is_deleted", "account_id", "is_deleted")

    # Define indexes
    __table_args__ = (
        Index("ix_schedule_model_account_id_is_deleted", "account_id", "is_deleted"),
        Index("ix_schedule_model_created_by_is_deleted", "created_by", "is_deleted"),
        Index("ix_schedule_model_id_is_deleted", "id", "is_deleted"),
    )

    def __repr__(self) -> str:
        return (
            f"Schedule(id={self.id}, "
            f"name='{self.name}', role='{self.role}', description='{self.description}', "
            f"is_deleted={self.is_deleted}, is_template={self.is_template}, user_id={self.created_by}, "
            f"account_id={self.account_id}, is_public={self.is_public})"
        )

    @classmethod
    def create_schedule(cls, db, schedule, configs: List[ConfigInput], user, account):
        """
        Creates a new schedule with the provided configuration.

        Args:
            db: The database object.
            schedule_with_config: The object containing the schedule and configuration details.

        Returns:
            Schedule: The created schedule.

        """
        db_schedule = ScheduleModel(
            created_by=user.id,
            account_id=account.id,
        )
        cls.update_model_from_input(db_schedule, schedule)
        db.session.add(db_schedule)
        db.session.flush()  # Flush pending changes to generate the schedule's ID
        db.session.commit()

        ScheduleConfigModel.create_or_update(db, db_schedule, configs, user, account)

        return db_schedule

    @classmethod
    def update_schedule(
        cls, db, id, schedule, configs: List[ConfigInput], user, account
    ):
        """
        Creates a new schedule with the provided configuration.

        Args:
            db: The database object.
            schedule_with_config: The object containing the schedule and configuration details.

        Returns:
            Schedule: The created schedule.

        """
        old_schedule = cls.get_schedule_by_id(db=db, schedule_id=id, account=account)
        if not old_schedule:
            raise ScheduleNotFoundException("Schedule not found")
        db_schedule = cls.update_model_from_input(
            schedule_model=old_schedule, schedule_input=schedule
        )
        db_schedule.modified_by = user.id

        db.session.add(db_schedule)
        db.session.commit()

        ScheduleConfigModel.create_or_update(db, db_schedule, configs, user, account)

        return db_schedule

    @classmethod
    def update_model_from_input(
        cls, schedule_model: ScheduleModel, schedule_input: ScheduleInput
    ):
        for field in ScheduleInput.__annotations__.keys():
            setattr(schedule_model, field, getattr(schedule_input, field))
        return schedule_model

    @classmethod
    def create_schedule_from_template(
        cls, db, template_id, user, account, check_is_template: True
    ):
        """
        Creates a new schedule with the provided configuration.

        Args:
            db: The database object.
            schedule_with_config: The object containing the schedule and configuration details.

        Returns:
            Schedule: The crated schedule.

        """
        template_schedule = cls.get_schedule_by_id(
            db=db, schedule_id=template_id, account=account
        )
        if check_is_template:
            if template_schedule is None or not (
                template_schedule.is_public or template_schedule.is_template
            ):
                raise ScheduleNotFoundException("Schedule not found")

        new_schedule = ScheduleModel(
            name=template_schedule.name,
            role=template_schedule.role,
            schedule_type=template_schedule.schedule_type,
            description=template_schedule.description,
            is_memory=template_schedule.is_memory,
            is_public=False,
            is_template=False,
            created_by=user.id,
            account_id=account.id,
            modified_by=None,
            parent_id=template_schedule.id,
        )

        db.session.add(new_schedule)
        db.session.commit()

        ScheduleConfigModel.create_configs_from_template(
            db=db,
            configs=template_schedule.configs,
            user=user,
            schedule_id=new_schedule.id,
        )

        return new_schedule

    @classmethod
    def get_schedules(cls, db, account):
        schedules = (
            db.session.query(ScheduleModel)
            # .join(ScheduleConfigModel, ScheduleModel.id == ScheduleConfigModel.schedule_id)
            .join(UserModel, ScheduleModel.created_by == UserModel.id)
            .filter(
                ScheduleModel.account_id == account.id,
                or_(
                    or_(
                        ScheduleModel.is_deleted == False,
                        ScheduleModel.is_deleted is None,
                    ),
                    ScheduleModel.is_deleted is None,
                ),
            )
            # .options(joinedload(ScheduleModel.configs))  # if you have a relationship set up named "configs"
            .options(joinedload(ScheduleModel.creator))
            .options(joinedload(ScheduleModel.account))
            # .options(joinedload(ScheduleModel.configs))  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.schedules))
            .all()
        )
        return schedules

    @classmethod
    def get_due_schedules(cls, session: Session):
        two_minutes_ago = datetime.now() - timedelta(minutes=2)

        schedules = (
            session.query(ScheduleModel)
            .join(UserModel, ScheduleModel.created_by == UserModel.id)
            .filter(
                and_(
                    ScheduleModel.status == ScheduleStatus.PENDING.value,
                    ScheduleModel.next_run_date >= two_minutes_ago,
                    ScheduleModel.next_run_date <= datetime.now(),
                    ScheduleModel.is_active == True,
                    ScheduleModel.is_deleted == False,
                ),
            )
            .options(joinedload(ScheduleModel.creator))
            .options(joinedload(ScheduleModel.account))
            .all()
        )
        return schedules

    @classmethod
    def get_template_schedules(cls, db):
        schedules = (
            db.session.query(ScheduleModel)
            .filter(
                or_(
                    ScheduleModel.is_deleted == False,
                    ScheduleModel.is_deleted.is_(None),
                ),
                ScheduleModel.is_template == True,
            )
            .options(joinedload(ScheduleModel.creator))
            .options(
                joinedload(ScheduleModel.configs)
            )  # if you have a relationship set up named "configs"
            .all()
        )
        return schedules

    @classmethod
    def get_public_schedules(cls, db):
        schedules = (
            db.session.query(ScheduleModel)
            # .join(ScheduleConfigModel, ScheduleModel.id == ScheduleConfigModel.schedule_id)
            .join(UserModel, ScheduleModel.created_by == UserModel.id)
            .filter(
                or_(
                    ScheduleModel.is_deleted == False,
                    ScheduleModel.is_deleted.is_(None),
                ),
                ScheduleModel.is_public == True,
            )
            .options(joinedload(ScheduleModel.creator))
            .options(
                joinedload(ScheduleModel.configs)
            )  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.schedules))
            .all()
        )
        return schedules

    @classmethod
    def get_schedule_by_id(cls, db, schedule_id, account):
        """
        Get Schedule from schedule_id

        Args:
            session: The database session.
            schedule_id(int) : Unique identifier of an Schedule.

        Returns:
            Schedule: Schedule object is returned.
        """
        schedule = (
            db.session.query(ScheduleModel)
            .join(
                ScheduleConfigModel, ScheduleModel.id == ScheduleConfigModel.schedule_id
            )
            .join(UserModel, ScheduleModel.created_by == UserModel.id)
            .filter(
                ScheduleModel.id == schedule_id,
                or_(
                    or_(
                        ScheduleModel.is_deleted == False,
                        ScheduleModel.is_deleted is None,
                    ),
                    ScheduleModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(ScheduleModel.configs)
            )  # if you have a relationship set up named "configs"
            .options(joinedload(ScheduleModel.creator))
            .options(joinedload(ScheduleModel.account))
            # .options(joinedload(ScheduleModel.configs))  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.schedules))
            .first()
        )
        return schedule

    @classmethod
    def get_by_parent_id(cls, db, parent_id, account):
        """
        Get Schedule from schedule_id

        Args:
            session: The database session.
            schedule_id(int) : Unique identifier of an Schedule.

        Returns:
            Schedule: Schedule object is returned.
        """
        schedule = (
            db.session.query(ScheduleModel)
            .join(
                ScheduleConfigModel, ScheduleModel.id == ScheduleConfigModel.schedule_id
            )
            .join(UserModel, ScheduleModel.created_by == UserModel.id)
            .filter(
                ScheduleModel.parent_id == parent_id,
                ScheduleModel.account_id == account.id,
                or_(
                    or_(
                        ScheduleModel.is_deleted == False,
                        ScheduleModel.is_deleted is None,
                    ),
                    ScheduleModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(ScheduleModel.configs)
            )  # if you have a relationship set up named "configs"
            .options(joinedload(ScheduleModel.creator))
            # .options(joinedload(ScheduleModel.configs))  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.schedules))
            .first()
        )
        return schedule

    @classmethod
    def get_schedule_by_id_with_account(cls, db, schedule_id):
        """
        Get Schedule from schedule_id

        Args:
            session: The database session.
            schedule_id(int) : Unique identifier of an Schedule.

        Returns:
            Schedule: Schedule object is returned.
        """
        # return db.session.query(ScheduleModel).filter(ScheduleModel.account_id == account.id, or_(or_(ScheduleModel.is_deleted == False, ScheduleModel.is_deleted is None), ScheduleModel.is_deleted is None)).all()
        schedules = (
            db.session.query(ScheduleModel)
            .join(
                ScheduleConfigModel, ScheduleModel.id == ScheduleConfigModel.schedule_id
            )
            .join(UserModel, ScheduleModel.created_by == UserModel.id)
            .filter(
                ScheduleModel.id == schedule_id,
                or_(
                    or_(
                        ScheduleModel.is_deleted == False,
                        ScheduleModel.is_deleted is None,
                    ),
                    ScheduleModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(ScheduleModel.configs)
            )  # if you have a relationship set up named "configs"
            .options(joinedload(ScheduleModel.creator))
            .options(joinedload(ScheduleModel.account))
            # .options(joinedload(ScheduleModel.configs))  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.schedules))
            .first()
        )
        return schedules

    @classmethod
    def delete_by_id(cls, db, schedule_id, account):
        db_schedule = (
            db.session.query(ScheduleModel)
            .filter(
                ScheduleModel.id == schedule_id, ScheduleModel.account_id == account.id
            )
            .first()
        )

        if not db_schedule or db_schedule.is_deleted:
            raise ScheduleNotFoundException("Schedule not found")

        db_schedule.is_deleted = True
        db.session.commit()
