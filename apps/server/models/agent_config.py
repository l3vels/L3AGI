import uuid

from sqlalchemy import UUID, Column, ForeignKey, Index, String, Text
from sqlalchemy.orm import relationship

from models.base_model import BaseModel
from typings.agent import ConfigInput


class AgentConfigModel(BaseModel):
    """
    Agent related configurations like goals, instructions, constraints and tools are stored here

    Attributes:
        id (int): The unique identifier of the agent configuration.
        agent_id (int): The identifier of the associated agent.
        key (str): The key of the configuration setting.
        value (str): The value of the configuration setting.
    """

    __tablename__ = "agent_config"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    agent_id = Column(
        UUID(as_uuid=True), ForeignKey("agent.id", ondelete="CASCADE"), index=True
    )
    key = Column(String, index=True)
    value = Column(Text)

    agent = relationship("AgentModel", back_populates="configs", cascade="all, delete")

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

    __table_args__ = (Index("ix_agent_config_model_agent_id_key", "agent_id", "key"),)

    def __repr__(self):
        """
        Returns a string representation of the Agent Configuration object.

        Returns:
            str: String representation of the Agent Configuration.

        """
        return f"AgentConfig(id={self.id}, key={self.key}, value={self.value})"

    @classmethod
    def create_or_update(cls, db, agent, update_configs, user, account):
        """
        Create or update agent configurations in the database.

        Args:
            db (Session): The database session.
            agent (AgentModel): The agent object.
            update_configs (ConfigInput): The updated configurations.

        Returns:
            List[AgentConfigModel]: The list of created or updated configurations.
        """
        db_configs = (
            db.session.query(AgentConfigModel)
            .filter(
                AgentConfigModel.agent_id == agent.id,
            )
            .all()
        )
        changes = []
        for key in ConfigInput.__annotations__.keys():
            # search db_configs
            matching_configs = [
                config for config in db_configs if getattr(config, "key", None) == key
            ]
            if matching_configs:
                db_config = matching_configs[0]
                db_config.value = str(getattr(update_configs, key))
                db_config.modified_by = user.id
                changes.append(db_config)
            else:
                new_config = AgentConfigModel(
                    agent_id=agent.id, key=key, value=str(getattr(update_configs, key))
                )
                new_config.created_by = user.id
                changes.append(new_config)

        db.session.add_all(changes)
        db.session.commit()
        db.session.flush()

        return changes

    @classmethod
    def create_configs_from_template(
        cls, db, configs, user, account, agent_id, check_is_template
    ):
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

        import ast

        from models.agent import AgentModel

        changes = []
        for template_config in configs:
            new_config = AgentConfigModel(
                key=template_config.key,
                value=template_config.value,
                agent_id=agent_id,
                created_by=user.id,
            )

            if new_config.key == "sentiment_analyzer":
                runner = ast.literal_eval(new_config.value)
                runner_id = runner.get("runner", None)

                if runner_id:
                    runner_model = AgentModel.create_agent_from_template(
                        db, runner_id, user, account, check_is_template
                    )

                    runner["runner"] = str(runner_model.id)

                new_config.value = str(runner)
            elif new_config.key == "runners":
                runners = ast.literal_eval(new_config.value)

                for runner in runners:
                    runner_id = runner.get("runner", None)

                    if runner_id:
                        runner_model = AgentModel.create_agent_from_template(
                            db, runner_id, user, account, check_is_template
                        )
                        runner["runner"] = str(runner_model.id)

                new_config.value = str(runners)

            changes.append(new_config)

        db.session.add_all(changes)
        db.session.commit()

        return changes
