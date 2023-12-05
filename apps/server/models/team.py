from __future__ import annotations

import uuid
from typing import List

from sqlalchemy import (UUID, Boolean, Column, ForeignKey, Index, String, and_,
                        or_)
from sqlalchemy.orm import joinedload, relationship

from exceptions import TeamNotFoundException
from models.agent import AgentModel
from models.base_model import BaseModel
from models.team_agent import TeamAgentModel
from models.team_config import TeamConfigModel
from typings.team import ConfigInput, TeamInput


class TeamModel(BaseModel):
    """
    Represents an team entity.

    Attributes:
        id (UUID): Unique identifier of the team.
        name (str): Name of the team.

    """

    __tablename__ = "team"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    avatar = Column(String(300), default=None)
    team_type = Column(
        String
    )  # todo replace as enum (Debates, Plan_Execute, Authoritarian_Speaker, Decentralized_speaker)
    description = Column(String, nullable=True)
    is_deleted = Column(Boolean, default=False, index=True)
    is_public = Column(Boolean, default=False, index=True)
    is_template = Column(Boolean, default=False, index=True)
    is_memory = Column(Boolean, default=False)
    workspace_id = Column(
        UUID, ForeignKey("workspace.id", ondelete="CASCADE"), nullable=True, index=True
    )
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True, index=True
    )
    parent_id = Column(
        UUID, ForeignKey("team.id", ondelete="CASCADE"), nullable=True, index=True
    )

    account = relationship("AccountModel", lazy="select")
    team_agents = relationship("TeamAgentModel", back_populates="team", lazy="select")
    chat_messages = relationship("ChatMessage", back_populates="team", lazy="select")
    configs = relationship("TeamConfigModel", back_populates="team", lazy="select")
    chat = relationship("ChatModel", back_populates="team", lazy="select")

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

    # Define indexes
    __table_args__ = (
        Index("ix_team_model_account_id_is_deleted", "account_id", "is_deleted"),
        Index("ix_team_model_created_by_is_deleted", "created_by", "is_deleted"),
        Index("ix_team_model_id_is_deleted", "id", "is_deleted"),
    )

    def __repr__(self) -> str:
        return (
            f"Team(id={self.id}, "
            f"name='{self.name}', type='{self.team_type}', description='{self.description}', "
            f"is_deleted={self.is_deleted}, is_public={self.is_public}, is_template={self.is_template}, "
            f"workspace_id={self.workspace_id}, account_id={self.account_id})"
        )

    @classmethod
    def create_team(
        cls, db, team: TeamInput, configs: List[ConfigInput], user, account
    ) -> TeamModel:
        """
        Creates a new team with the provided configuration.

        Args:
            db: The database object.
            team_with_config: The object containing the team and configuration details.

        Returns:
            Team: The created team.

        """
        db_team = TeamModel(
            created_by=user.id,
            account_id=account.id,
        )
        cls.update_model_from_input(db_team, team)
        db.session.add(db_team)
        db.session.flush()  # Flush pending changes to generate the team's ID
        db.session.commit()

        TeamConfigModel.create_or_update(db, db_team, configs, user, account)
        return db_team

    @classmethod
    def create_team_from_template(cls, db, template_id, user, account):
        """
        Creates a new team with the provided configuration.

        Args:
            db: The database object.
            team_with_config: The object containing the team and configuration details.

        Returns:
            Team: The crated team.

        """
        template_team = cls.get_team_with_agents(db=db, id=template_id, account=account)
        if template_team is None or not (
            template_team.is_public or template_team.is_template
        ):
            raise TeamNotFoundException("Team not found")

        new_team = TeamModel(
            name=template_team.name,
            team_type=template_team.team_type,
            description=template_team.description,
            is_public=False,
            is_template=False,
            created_by=user.id,
            account_id=account.id,
            modified_by=None,
            parent_id=template_team.id,
            avatar=template_team.avatar,
        )

        db.session.add(new_team)
        db.session.commit()

        new_team_agents = []
        new_agents = []
        for template_team_agent in template_team.team_agents:
            agent = AgentModel.create_agent_from_template(
                db, template_team_agent.agent.id, user, account, False
            )
            new_agents.append(agent)
            new_config = TeamAgentModel(
                team_id=new_team.id,
                agent_id=agent.id,
                role=template_team_agent.role,
                account_id=account.id,
                created_by=user.id,
            )
            new_team_agents.append(new_config)
        db.session.add_all(new_agents)
        db.session.commit()
        db.session.commit()
        db.session.add_all(new_team_agents)

        TeamConfigModel.create_configs_from_template(
            db=db, configs=template_team.configs, user=user, team_id=new_team.id
        )

        # new_configs = []
        # for template_config in template_team.configs:
        #     new_config = ConfigModel(
        #         key=template_config.key,
        #         value=template_config.value,
        #         is_secret=template_config.is_secret,
        #         is_required=template_config.is_required,
        #         key_type=template_config.key_type,
        #         account_id=account.id,
        #         created_by=user.id,
        #         team_id=new_team.id,

        #     )
        #     new_configs.append(new_config)

        # db.session.add_all(new_configs)
        # db.session.commit()

        return new_team

    @classmethod
    def update_team(
        cls, db, id, team: TeamInput, configs: List[ConfigInput], user, account
    ):
        """
        Creates a new team with the provided configuration.

        Args:
            db: The database object.
            team_with_config: The object containing the team and configuration details.

        Returns:
            Team: The created team.

        """
        old_team = cls.get_team_by_id(db=db, team_id=id)
        if not old_team:
            raise TeamNotFoundException("Team not found")
        db_team = cls.update_model_from_input(team_model=old_team, team_input=team)
        db_team.modified_by = user.id

        db.session.add(db_team)
        db.session.commit()

        TeamConfigModel.create_or_update(db, db_team, configs, user, account)

        return db_team

    @classmethod
    def update_model_from_input(cls, team_model: TeamModel, team_input: TeamInput):
        for field in TeamInput.__annotations__.keys():
            if field == "configs" or field == "team_agents":
                continue
            setattr(team_model, field, getattr(team_input, field))
        return team_model

    @classmethod
    def get_teams(cls, db, account):
        teams = (
            db.session.query(TeamModel)
            .filter(
                TeamModel.account_id == account.id,
                or_(
                    or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None),
                    TeamModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(TeamModel.team_agents)
                .joinedload(TeamAgentModel.agent)
                .joinedload(AgentModel.configs)
            )
            .order_by(TeamModel.created_on.desc())
            .options(joinedload(TeamModel.creator))
            .all()
        )
        return teams

    @classmethod
    def get_team_with_agents(cls, db, account, id: str):
        # todo later need to filter by account_id
        # filter_conditions = [TeamModel.account_id == account.id, or_(or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None), TeamModel.is_deleted is None)]
        filter_conditions = [
            or_(
                or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None),
                TeamModel.is_deleted is None,
            )
        ]

        filter_conditions.append(TeamModel.id == id)

        teams = (
            db.session.query(TeamModel)
            .options(
                joinedload(TeamModel.team_agents)
                .joinedload(TeamAgentModel.agent)
                .joinedload(AgentModel.configs)
            )
            .filter(and_(*filter_conditions))
            .options(joinedload(TeamModel.creator))
            .first()
        )
        return teams

    @classmethod
    def get_team_with_agents_by_parent_id(cls, db, account, parent_id: str):
        # todo later need to filter by account_id
        # filter_conditions = [TeamModel.account_id == account.id, or_(or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None), TeamModel.is_deleted is None)]
        filter_conditions = [
            or_(
                or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None),
                TeamModel.is_deleted is None,
            )
        ]

        filter_conditions.append(TeamModel.parent_id == parent_id)
        filter_conditions.append(TeamModel.account_id == account.id)

        teams = (
            db.session.query(TeamModel)
            .options(
                joinedload(TeamModel.team_agents)
                .joinedload(TeamAgentModel.agent)
                .joinedload(AgentModel.configs)
            )
            .filter(and_(*filter_conditions))
            .options(joinedload(TeamModel.creator))
            .first()
        )
        return teams

    @classmethod
    def get_team_by_id(cls, db, team_id):
        """
        Get Team from team_id

        Args:
            session: The database session.
            team_id(int) : Unique identifier of an Team.

        Returns:
            Team: Team object is returned.
        """
        # return db.session.query(TeamModel).filter(TeamModel.account_id == account.id, or_(or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None), TeamModel.is_deleted is None)).all()
        team = (
            db.session.query(TeamModel)
            .outerjoin(TeamConfigModel, TeamModel.id == TeamConfigModel.team_id)
            .filter(
                TeamModel.id == team_id,
                or_(
                    or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None),
                    TeamModel.is_deleted is None,
                ),
            )
            .options(joinedload(TeamModel.creator))
            .options(
                joinedload(TeamModel.team_agents)
                .joinedload(TeamAgentModel.agent)
                .joinedload(AgentModel.configs)
            )
            .options(joinedload(TeamModel.configs))
            .first()
        )
        return team

    @classmethod
    def get_team_by_id_with_account(cls, db, team_id):
        """
        Get Team from team_id

        Args:
            session: The database session.
            team_id(int) : Unique identifier of an Team.

        Returns:
            Team: Team object is returned.
        """
        teams = (
            db.session.query(TeamModel)
            .outerjoin(TeamConfigModel, TeamModel.id == TeamConfigModel.team_id)
            .filter(
                TeamModel.id == team_id,
                or_(
                    or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None),
                    TeamModel.is_deleted is None,
                ),
            )
            .options(joinedload(TeamModel.creator))
            .options(joinedload(TeamModel.account))
            .first()
        )
        return teams

    @classmethod
    def delete_by_id(cls, db, team_id, account):
        db_team = (
            db.session.query(TeamModel)
            .filter(TeamModel.id == team_id, TeamModel.account_id == account.id)
            .first()
        )

        if not db_team or db_team.is_deleted:
            raise TeamNotFoundException("Team not found")

        db_team.is_deleted = True
        db.session.commit()

    @classmethod
    def get_template_teams(cls, db):
        teams = (
            db.session.query(TeamModel)
            .outerjoin(TeamConfigModel, TeamModel.id == TeamConfigModel.team_id)
            .filter(
                TeamModel.is_deleted.is_(True),
                or_(
                    or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None),
                    TeamModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(TeamModel.team_agents)
                .joinedload(TeamAgentModel.agent)
                .joinedload(AgentModel.configs)
            )
            .options(joinedload(TeamModel.creator))
            .options(joinedload(TeamModel.configs))
            .all()
        )
        return teams

    @classmethod
    def get_public_teams(cls, db):
        teams = (
            db.session.query(TeamModel)
            .outerjoin(TeamConfigModel, TeamModel.id == TeamConfigModel.team_id)
            .filter(
                TeamModel.is_public.is_(True),
                or_(
                    or_(TeamModel.is_deleted.is_(False), TeamModel.is_deleted is None),
                    TeamModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(TeamModel.team_agents)
                .joinedload(TeamAgentModel.agent)
                .joinedload(AgentModel.configs)
            )
            .options(joinedload(TeamModel.creator))
            .options(joinedload(TeamModel.configs))
            .all()
        )
        return teams
