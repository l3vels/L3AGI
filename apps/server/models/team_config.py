import uuid

from sqlalchemy import UUID, Column, ForeignKey, Index, String, Text
from sqlalchemy.orm import relationship

from models.base_model import BaseModel
from typings.team import ConfigInput


class TeamConfigModel(BaseModel):
    """
    Team related configurations like goals, instructions, constraints and tools are stored here

    Attributes:
        id (int): The unique identifier of the team configuration.
        team_id (int): The identifier of the associated team.
        key (str): The key of the configuration setting.
        value (str): The value of the configuration setting.
    """

    __tablename__ = "team_config"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    team_id = Column(
        UUID(as_uuid=True), ForeignKey("team.id", ondelete="CASCADE"), index=True
    )
    key = Column(String, index=True)
    value = Column(Text)

    team = relationship("TeamModel", back_populates="configs", cascade="all, delete")

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

    __table_args__ = (Index("ix_team_config_model_team_id_key", "team_id", "key"),)

    def __repr__(self):
        """
        Returns a string representation of the Team Configuration object.

        Returns:
            str: String representation of the Team Configuration.

        """
        return f"TeamConfig(id={self.id}, key={self.key}, value={self.value})"

    @classmethod
    def create_or_update(cls, db, team, update_configs, user, account):
        """
        Create or update team configurations in the database.

        Args:
            db (Session): The database session.
            team (TeamModel): The team object.
            update_configs (ConfigInput): The updated configurations.

        Returns:
            List[TeamConfigModel]: The list of created or updated configurations.
        """
        if not update_configs:
            return

        db_configs = (
            db.session.query(TeamConfigModel)
            .filter(
                TeamConfigModel.team_id == team.id,
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
                new_config = TeamConfigModel(
                    team_id=team.id, key=key, value=str(getattr(update_configs, key))
                )
                new_config.created_by = user.id
                changes.append(new_config)

        db.session.add_all(changes)
        db.session.commit()
        db.session.flush()

        return changes

    @classmethod
    def create_configs_from_template(cls, db, configs, user, team_id):
        """
        Create or update team configurations in the database.

        Args:
            db (Session): The database session.
            configs (list): The list of configurations.
            user (UserModel): The user object.
            team_id (UUID): The team id.

        Returns:
            List[TeamConfigModel]: The list of created or updated configurations.
        """
        changes = []
        for template_config in configs:
            new_config = TeamConfigModel(
                key=template_config.key,
                value=template_config.value,
                team_id=team_id,
                created_by=user.id,
            )
            changes.append(new_config)

        db.session.add_all(changes)
        db.session.commit()

        return changes
