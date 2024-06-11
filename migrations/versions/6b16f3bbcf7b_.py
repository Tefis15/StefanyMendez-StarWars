"""empty message

Revision ID: 6b16f3bbcf7b
Revises: 
Create Date: 2023-11-10 01:07:01.677834

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6b16f3bbcf7b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('people',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uid')
    )
    op.create_table('planets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uid')
    )
    op.create_table('starships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uid')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('phone', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=150), nullable=False),
    sa.Column('role', sa.Enum('admin', 'user', name='role'), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('vehicles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uid')
    )
    op.create_table('people_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('diameter', sa.Float(), nullable=True),
    sa.Column('mass', sa.Float(), nullable=True),
    sa.Column('skin_color', sa.String(length=50), nullable=True),
    sa.Column('eye_color', sa.String(length=50), nullable=True),
    sa.Column('birth_year', sa.String(length=50), nullable=True),
    sa.Column('gender', sa.String(length=50), nullable=True),
    sa.Column('created', sa.DateTime(timezone=True), nullable=False),
    sa.Column('edited', sa.DateTime(timezone=True), nullable=False),
    sa.Column('planet_uid', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['planet_uid'], ['planets.uid'], ),
    sa.ForeignKeyConstraint(['uid'], ['people.uid'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uid')
    )
    op.create_table('people_favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('people_uid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['people_uid'], ['people.uid'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planets_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('diameter', sa.Float(), nullable=True),
    sa.Column('rotation_period', sa.Float(), nullable=True),
    sa.Column('orbital_period', sa.Float(), nullable=True),
    sa.Column('gravity', sa.String(length=50), nullable=True),
    sa.Column('population', sa.String(length=50), nullable=True),
    sa.Column('climate', sa.String(length=150), nullable=True),
    sa.Column('terrain', sa.String(length=150), nullable=True),
    sa.Column('surface_water', sa.Float(), nullable=True),
    sa.Column('created', sa.DateTime(timezone=True), nullable=False),
    sa.Column('edited', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['uid'], ['planets.uid'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uid')
    )
    op.create_table('planets_favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('planets_uid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['planets_uid'], ['planets.uid'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('starship_favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('starship_uid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['starship_uid'], ['starships.uid'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('starships_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('model', sa.String(length=100), nullable=True),
    sa.Column('starship_class', sa.String(length=50), nullable=True),
    sa.Column('manufacturer', sa.String(length=50), nullable=True),
    sa.Column('cost_in_credits', sa.String(length=50), nullable=True),
    sa.Column('length', sa.Float(), nullable=True),
    sa.Column('crew', sa.Float(), nullable=True),
    sa.Column('passengers', sa.Integer(), nullable=True),
    sa.Column('max_atmosphering_speed', sa.Float(), nullable=True),
    sa.Column('hyperdrive_rating', sa.Float(), nullable=True),
    sa.Column('mglt', sa.Float(), nullable=True),
    sa.Column('cargo_capacity', sa.Float(), nullable=True),
    sa.Column('consumables', sa.String(length=100), nullable=True),
    sa.Column('created', sa.DateTime(timezone=True), nullable=False),
    sa.Column('edited', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['uid'], ['starships.uid'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uid')
    )
    op.create_table('starships_people',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('people_uid', sa.Integer(), nullable=False),
    sa.Column('starships_uid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['people_uid'], ['people.uid'], ),
    sa.ForeignKeyConstraint(['starships_uid'], ['starships.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('vehicles_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('model', sa.String(length=100), nullable=True),
    sa.Column('vehicle_class', sa.String(length=50), nullable=True),
    sa.Column('manufacturer', sa.String(length=50), nullable=True),
    sa.Column('cost_in_credits', sa.String(length=50), nullable=True),
    sa.Column('length', sa.Float(), nullable=True),
    sa.Column('crew', sa.Float(), nullable=True),
    sa.Column('passengers', sa.Integer(), nullable=True),
    sa.Column('max_atmosphering_speed', sa.Float(), nullable=True),
    sa.Column('cargo_capacity', sa.Float(), nullable=True),
    sa.Column('consumables', sa.String(length=100), nullable=True),
    sa.Column('created', sa.DateTime(timezone=True), nullable=False),
    sa.Column('edited', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['uid'], ['vehicles.uid'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uid')
    )
    op.create_table('vehicles_favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('vehicles_uid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['vehicles_uid'], ['vehicles.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('vehicles_people',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('people_uid', sa.Integer(), nullable=False),
    sa.Column('vehicles_uid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['people_uid'], ['people.uid'], ),
    sa.ForeignKeyConstraint(['vehicles_uid'], ['vehicles.uid'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('vehicles_people')
    op.drop_table('vehicles_favorites')
    op.drop_table('vehicles_details')
    op.drop_table('starships_people')
    op.drop_table('starships_details')
    op.drop_table('starship_favorites')
    op.drop_table('planets_favorites')
    op.drop_table('planets_details')
    op.drop_table('people_favorites')
    op.drop_table('people_details')
    op.drop_table('vehicles')
    op.drop_table('user')
    op.drop_table('starships')
    op.drop_table('planets')
    op.drop_table('people')
    # ### end Alembic commands ###
