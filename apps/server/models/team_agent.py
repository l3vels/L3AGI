from __future__ import annotations
import uuid

from sqlalchemy import Column, String, Boolean, UUID, or_, ForeignKey, Index
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
from typings.team_agent import TeamAgentInput, QueryParams
from exceptions import TeamAgentNotFoundException


class TeamAgentModel(BaseModel):
    """
    Represents an team entity.

    Attributes:
        id (UUID): Unique identifier of the team.
        name (str): Name of the team.

    """

    __tablename__ = "team_agent"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    team_id = Column(
        UUID, ForeignKey("team.id", ondelete="CASCADE"), nullable=True, index=True
    )
    agent_id = Column(
        UUID, ForeignKey("agent.id", ondelete="CASCADE"), nullable=False, index=True
    )
    role = Column(String, nullable=True)
    is_deleted = Column(Boolean, default=False, index=True)
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True, index=True
    )

    team = relationship("TeamModel", back_populates="team_agents")
    agent = relationship("AgentModel", back_populates="team_agents")

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
        Index("ix_team_agent_model_team_id_agent_id", "team_id", "agent_id"),
        Index("ix_team_agent_model_account_id_is_deleted", "account_id", "is_deleted"),
    )

    def __repr__(self) -> str:
        return (
            f"TeamAgent(id={self.id}, "
            f"team_id='{self.team_id}', agent_id='{self.agent_id}')"
        )

    @classmethod
    def create_team_agent(cls, db, team_agent, user, account):
        """
        Creates a new team_agent with the provided configuration.

        Args:
            db: The database object.
            team_agent_with_config: The object containing the team_agent and configuration details.

        Returns:
            TeamAgent: The created team_agent.

        """
        db_team_agent = TeamAgentModel(
            created_by=user.id,
            account_id=account.id,
        )
        cls.update_model_from_input(db_team_agent, team_agent)
        db.session.add(db_team_agent)
        db.session.flush()  # Flush pending changes to generate the team_agent's ID
        db.session.commit()

        return db_team_agent

    @classmethod
    def create_team_agents(cls, db, team, team_agents, user, account):
        """
        Creates a new team_agent with the provided configuration.

        Args:
            db: The database object.
            team_agent_with_config: The object containing the team_agent and configuration details.

        Returns:
            TeamAgent: The created team_agent.

        """
        db_team_agents = []

        for team_agent in team_agents:
            db_team_agent = TeamAgentModel(
                created_by=user.id, account_id=account.id, team_id=team.id
            )
            cls.update_model_from_input(db_team_agent, team_agent)
            db_team_agents.append(db_team_agent)

        db.session.add_all(db_team_agents)
        db.session.flush()
        db.session.commit()

    @classmethod
    def update_team_agent(cls, db, id, team_agent, user, account):
        """
        Creates a new team_agent with the provided configuration.

        Args:
            db: The database object.
            team_agent_with_config: The object containing the team_agent and configuration details.

        Returns:
            TeamAgent: The created team_agent.

        """
        old_team_agent = cls.get_team_agent_by_id(
            db=db, team_agent_id=id, account=account
        )
        if not old_team_agent:
            raise TeamAgentNotFoundException("TeamAgent not found")
        db_team_agent = cls.update_model_from_input(
            team_agent_model=old_team_agent, team_agent_input=team_agent
        )
        db_team_agent.modified_by = user.id

        db.session.add(db_team_agent)
        db.session.commit()

        return db_team_agent

    @classmethod
    def update_model_from_input(
        cls, team_agent_model: TeamAgentModel, team_agent_input: TeamAgentInput
    ):
        for field in TeamAgentInput.__annotations__.keys():
            setattr(team_agent_model, field, getattr(team_agent_input, field))
        return team_agent_model

    @classmethod
    @classmethod
    def get_team_agents(cls, db, query: QueryParams, account):
        filter_conditions = [
            or_(
                or_(
                    TeamAgentModel.is_deleted.is_(False),
                    TeamAgentModel.is_deleted is None,
                ),
                TeamAgentModel.is_deleted is None,
            )
        ]

        # Iterate over fields in QueryParams
        for field in QueryParams.__annotations__.keys():
            if getattr(query, field):
                filter_conditions.append(
                    getattr(TeamAgentModel, field) == getattr(query, field)
                )

        team_agents = db.session.query(TeamAgentModel).filter(*filter_conditions).all()
        return team_agents

    @classmethod
    def get_team_agent_by_id(cls, db, team_agent_id, account):
        """
        Get TeamAgent from team_agent_id

        Args:
            session: The database session.
            team_agent_id(int) : Unique identifier of an TeamAgent.

        Returns:
            TeamAgent: TeamAgent object is returned.
        """
        # return db.session.query(TeamAgentModel).filter(TeamAgentModel.account_id == account.id, or_(or_(TeamAgentModel.is_deleted.is_(False), TeamAgentModel.is_deleted is None), TeamAgentModel.is_deleted is None)).all()
        team_agents = (
            db.session.query(TeamAgentModel)
            .filter(
                TeamAgentModel.id == team_agent_id,
                or_(
                    or_(
                        TeamAgentModel.is_deleted.is_(False),
                        TeamAgentModel.is_deleted is None,
                    ),
                    TeamAgentModel.is_deleted is None,
                ),
            )
            .first()
        )
        return team_agents

    @classmethod
    def delete_by_id(cls, db, team_agent_id, account):
        db_team_agent = (
            db.session.query(TeamAgentModel)
            .filter(
                TeamAgentModel.id == team_agent_id,
                TeamAgentModel.account_id == account.id,
            )
            .first()
        )

        if not db_team_agent or db_team_agent.is_deleted:
            raise TeamAgentNotFoundException("TeamAgent not found")

        db_team_agent.is_deleted = True
        db.session.commit()

    @classmethod
    def delete_by_team_id(cls, db, team_id: str, account):
        team_agents = (
            db.session.query(TeamAgentModel)
            .filter(
                TeamAgentModel.team_id == team_id,
                TeamAgentModel.account_id == account.id,
                TeamAgentModel.is_deleted.is_(False),
            )
            .all()
        )

        for team_agent in team_agents:
            db.session.delete(team_agent)

        db.session.commit()

    @classmethod
    def create_configs_from_template(cls, db, team_agents, user, team_id):
        """
        Create or update agent configurations in the database.

        Args:
            db (Session): The database session.
            configs (list): The list of configurations.
            user (UserModel): The user object.
            agent_id (UUID): The agent id.

        Returns:
            List[AgentConfigModel]: The list of created or updated configurations.
        """
        changes = []
        for template_team_agent in team_agents:
            new_config = TeamAgentModel(
                team_id=team_id,
                value=template_team_agent.value,
                # agent_id=agent_id,
                created_by=user.id,
            )
            changes.append(new_config)

        db.session.add_all(changes)
        db.session.commit()

        return changes
