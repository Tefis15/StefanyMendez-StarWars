"""empty message

Revision ID: 926651424d0f
Revises: b88fe6c8bc50
Create Date: 2023-11-12 02:24:12.085981

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '926651424d0f'
down_revision = 'b88fe6c8bc50'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('people_details', schema=None) as batch_op:
        batch_op.add_column(sa.Column('heigth', sa.Float(), nullable=True))
        batch_op.drop_column('diameter')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('people_details', schema=None) as batch_op:
        batch_op.add_column(sa.Column('diameter', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
        batch_op.drop_column('heigth')

    # ### end Alembic commands ###
