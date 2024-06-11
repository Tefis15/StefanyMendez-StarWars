"""empty message

Revision ID: a0708391efbe
Revises: 926651424d0f
Create Date: 2023-11-12 02:45:50.623635

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a0708391efbe'
down_revision = '926651424d0f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('people_details', schema=None) as batch_op:
        batch_op.add_column(sa.Column('height', sa.Float(), nullable=True))
        batch_op.drop_column('heigth')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('people_details', schema=None) as batch_op:
        batch_op.add_column(sa.Column('heigth', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
        batch_op.drop_column('height')

    # ### end Alembic commands ###
