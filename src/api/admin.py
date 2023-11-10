  
import os
from flask_admin import Admin
from .models import db, User
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))  
import os
from flask_admin import Admin
from .models import db, User, People, PeopleDetails, PeopleFavorites, Planets, PlanetsDetails, PlanetsFavorites, Vehicles, VehiclesDetails, VehiclesFavorites
from .models import db, Starships, StarshipsDetails, StarshipFavorites, VehiclesPeople, StarshipsPeople

from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(People, db.session))
    admin.add_view(ModelView(PeopleDetails, db.session))
    admin.add_view(ModelView(PeopleFavorites, db.session))
    admin.add_view(ModelView(Planets, db.session))
    admin.add_view(ModelView(PlanetsDetails, db.session))
    admin.add_view(ModelView(PlanetsFavorites, db.session))
    admin.add_view(ModelView(Vehicles, db.session))
    admin.add_view(ModelView(VehiclesDetails, db.session))
    admin.add_view(ModelView(VehiclesFavorites, db.session))
    admin.add_view(ModelView(Starships, db.session))
    admin.add_view(ModelView(StarshipsDetails, db.session))
    admin.add_view(ModelView(StarshipFavorites, db.session))
    admin.add_view(ModelView(VehiclesPeople, db.session))
    admin.add_view(ModelView(StarshipsPeople, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))