"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import (db, User, People, PeopleDetails, PeopleFavorites, Planets, PlanetsDetails, PlanetsFavorites, Vehicles, 
                        VehiclesDetails, VehiclesFavorites, Starships, StarshipsDetails, StarshipFavorites, VehiclesPeople, StarshipsPeople
                        )
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    create_access_token,
    JWTManager,
)
from flask_bcrypt import Bcrypt
from datetime import datetime

#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
bcrypt = Bcrypt(app)

app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

# <------------------------------Login------------------------------>

@app.route('/login', methods=['POST'])
def login():
    request_body = request.get_json(force=True, silent=True)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "email" not in request_body or request_body['email'] == "":
        raise APIException("The email is required", status_code=404)
    
    if "password" not in request_body or request_body['password'] == "":
        raise APIException("The password is required", status_code=404)
    
    user = User.query.filter_by(email=request_body['email']).first()
    
    if user is None:
        raise APIException("The email is incorrect", status_code=404)
    
    if bcrypt.check_password_hash(user.password, request_body['password']) is False:
        raise APIException('The password is incorrect', 401)
    
    # AGREGAR VERIFICACION SI EL USUARIO ESTA ACTIVO O NO 
 
    access_token = create_access_token(identity=request_body['email'])
    
    response_body = {
        "msg": "ok",
        "access_token": access_token,
        "User": user.serialize()
    }
    
    return jsonify(response_body), 200
    
# <------------------------------User------------------------------>
@app.route('/user', methods=['GET'])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    if user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    users = User.query.all()
    
    if users is None:
        raise APIException("Users not found", status_code=404)
    
    users = list(map(lambda user: user.serialize(), users))
    sorted_users = sorted(users, key=lambda user: user['id'])
    
    response_body ={
        "msg": "ok",
        "Users": sorted_users
    }
    
    return jsonify(response_body), 200
   
@app.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_by_id(user_id):
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    user = User.query.get(user_id)
    
    if user is None:
        raise APIException("Users not found", status_code=404)
    
    response_body = {
        "msg": "ok",
        "User": user.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route('/user', methods=['POST'])
def add_user():
    request_body = request.get_json(force=True, silent=True)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=400)
    
    if "name" not in request_body or request_body['name'] == "":
        raise APIException("The name is required", status_code=404)
    
    if "phone" not in request_body or request_body['phone'] == "":
        raise APIException("The phone is required", status_code=404)
    
    if "email" not in request_body or request_body['email'] == "":
        raise APIException("The email is required", status_code=404)
    
    if "password" not in request_body or request_body['password'] == "":
        raise APIException("The password is required", status_code=404)
    
    user_exist = User.query.filter_by(email=request_body['email']).first()
    
    if user_exist:
        raise APIException("The email is already registered", status_code=400)
    
    pw_hash = bcrypt.generate_password_hash(
        request_body['password']).decode("utf-8")
    
    user = User(
        name = request_body['name'],
        phone = request_body['phone'],
        email= request_body['email'],
        password = pw_hash,
        role = "user",
        is_active = True
    )
    
    user.save()
    
    response_body = {
        "msg":"ok",
        "User": user.serialize()
    }
    
    return jsonify(response_body), 200

@app.route('/admin/user', methods=['POST'])
@jwt_required()
def add_user_admin():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=400)
    
    if "name" not in request_body or request_body['name'] == "":
        raise APIException("The name is required", status_code=404)
    
    if "phone" not in request_body or request_body['phone'] == "":
        raise APIException("The phone is requierd", status_code=404)
    
    if "email" not in request_body or request_body['email'] == "":
        raise APIException("The email is required", status_code=404)
    
    if "password" not in request_body or request_body['password'] == "":
        raise APIException("The password is required", status_code=404)
    
    if "role" not in request_body or request_body['role'] == "":
            raise APIException("The role is required", status_code=404)
        
    if "is_active" not in request_body or request_body['is_active'] == "":
            raise APIException("The user is active is required", status_code=404)
    
    user_exist = User.query.filter_by(email=request_body['email']).first()
    
    if user_exist:
        raise APIException("The email is already registered", status_code=400)
    
    pw_hash = bcrypt.generate_password_hash(
        request_body['password']).decode("utf-8")

        
    user = User(
    name = request_body['name'],
    phone = request_body['phone'],
    email= request_body['email'],
    password = pw_hash,
    role = request_body['role'],
    is_active = request_body['is_active']
    )
   
    user.save()
    
    response_body = {
        "msg":"ok",
        "User": user.serialize()
    }
    
    return jsonify(response_body), 200

@app.route('/admin/user/<int:user_id>', methods=['PUT'])
@jwt_required() 
def edit_user(user_id):
    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("User not found", status_code=404)
    
    if current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    user = User.query.get(user_id)
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    request_body = request.get_json(force=True, silent=True)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "name" in request_body and request_body['name'] != "":
        user.name = request_body['name']
        
    if "phone" in request_body and request_body['phone'] != "":
        user.phone = request_body['phone']
        
    if "email" in request_body and request_body['email'] != "":
        user.email = request_body['email']
        
    if "password" in request_body and request_body['password'] != "":
        pw_hash = bcrypt.generate_password_hash(
            request_body['password']).decode("utf-8")
        user.password = pw_hash
    
    if "role" in request_body and request_body['role'] != "":
        user.role = request_body['role']
     
    if "is_active" in request_body and request_body['is_active'] != "":
        user.is_active = request_body['is_active']    
        
    user.update()
    
    response_body = {
        "msg": "ok",
        "User": user.serialize()
    }
    
    return jsonify(response_body), 200

@app.route('/user/<string:user_email>', methods=['PUT'])
def edit_user_password(user_email):
    request_body = request.get_json(force=True, silent=True)
    user = User.query.filter_by(email=user_email).first()
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "phone" in request_body and request_body['phone'] != "":
        user.phone = request_body['phone']
    
    if "password" in request_body and request_body['password'] != "":
        pw_hash = bcrypt.generate_password_hash(request_body['password']).decode("utf-8")
        user.password = pw_hash
        
    user.update()
    
    response_body = {
        "msg": "ok",
        "User": user.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    user = User.query.get(user_id)
    
    if user is None:
        raise APIException("User not found", status_code=404)
    
    people_favorites = PeopleFavorites.query.filter_by(user_id=user_id)
    planets_favorites = PlanetsFavorites.query.filter_by(user_id=user_id)
    vehicles_favorites = VehiclesFavorites.query.filter_by(user_id=user_id)
    starships_favorites = StarshipFavorites.query.filter_by(user_id=user_id)
    
    if people_favorites :
        people_favorites.delete()
    
    if planets_favorites :
        planets_favorites.delete()
    
    if vehicles_favorites :
        vehicles_favorites.delete()
    
    if starships_favorites :
        starships_favorites.delete()

    user.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200
    
# <------------------------------People------------------------------>
@app.route('/people', methods=['GET'])
def get_people():
    people = People.query.all()
   
    if people is None:
       raise APIException("People not found", status_code=404)
   
    people = list(map(lambda character: character.serialize(), people))
    sorted_people = sorted(people, key=lambda character: character['uid'])
   
    response_body = {
       "msg": "ok",
       "total_records": len(sorted_people),
       "Results": sorted_people
    }

    return jsonify(response_body), 200
    
@app.route('/people/<int:people_uid>', methods=['GET'])
def get_people_by_uid(people_uid):
    people = People.query.filter_by(uid=people_uid).first()
    
    if people is None:
        raise APIException('People not found', status_code=404)
    
    response_body = {
        "msg": "ok",
        "People": people.serialize()
    }
    
    return jsonify(response_body), 200
        
@app.route('/people', methods=['POST'])
@jwt_required()
def add_people():
    request_body = request.get_json(force=True, silent=True)

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "uid" not in request_body or request_body['uid'] == "":
        raise APIException("The uid is required", status_code=404)
    
    if "name" not in request_body or request_body['name'] == "":
        raise APIException("The name is required", status_code=404)
    
    if "url" not in request_body or request_body['url'] == "":
        raise APIException("The url is required", status_code=404)
    
    people_exists = People.query.filter_by(uid=request_body['uid']).first()
    
    if people_exists:
        raise APIException("The uid is already in use", status_code=400)
    
    people = People(
        uid = request_body['uid'],
        name = request_body['name'],
        url = request_body['url'] 
    )
    
    people.save()
    
    response_body = {
        "msg":"ok",
        "People": people.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/people/<int:people_uid>", methods=['PUT'])
@jwt_required()
def edit_people(people_uid):
    request_body = request.get_json(force=True, silent=True)
    people = People.query.filter_by(uid=people_uid).first()

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if people is None:
        raise APIException("People not found", status_code=404)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)

    if "uid" in request_body and request_body['uid'] != "":
        people.uid = request_body['uid']
    
    if "name" in request_body and request_body['name'] != "":
        people.name = request_body['name']
    
    if "url" in request_body and request_body['url'] != "":
        people.url = request_body['url']
        
    people.update()
    
    response_body = {
        "msg":"ok",
        "People":people.serialize()
    }
    
    return jsonify(response_body), 200
      
@app.route("/people/<int:people_uid>", methods=['DELETE'])
@jwt_required()
def delete_people(people_uid):
    people = People.query.filter_by(uid=people_uid).first()

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if people is None:
        raise APIException("People not found", status_code=404)
    
    people_details = PeopleDetails.query.filter_by(uid=people_uid).first()
    vehicles_people = VehiclesPeople.query.filter_by(people_uid=people_uid)
    starships_people = StarshipsPeople.query.filter_by(people_uid=people_uid)
    people_favorites = PeopleFavorites.query.filter_by(people_uid=people_uid) 
    
    if people_details:
        people_details.delete()
           
    if vehicles_people:
        vehicles_people.delete()
           
    if starships_people:
        starships_people.delete()
               
    if people_favorites:
        people_favorites.delete()
               
    people.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200
    
# <------------------------------PeopleDetails------------------------------>
@app.route("/people/details/<int:people_uid>", methods=['GET'])
def get_details_people(people_uid):
    people_details = PeopleDetails.query.filter_by(uid=people_uid).first()
    
    if people_details is None:
        raise APIException("People details not found", status_code=404)
    
    response_body = {
        "msg":"ok",
        "Results": people_details.serialize()
    }
    
    return jsonify(response_body), 200

@app.route("/people/details", methods=['POST'])
@jwt_required()
def add_details_people():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "uid" not in request_body or request_body['uid']=="":
        raise APIException("The uid of people is required", status_code=404)
    
    if "created" in request_body and request_body["created"] != "":
        raise APIException("Creation date cannot be edited", status_code=404)
        
    if "edited" in request_body and request_body["edited"] != "":
        raise APIException("Edition date cannot be edited", status_code=404)
    
    people_exists = People.query.filter_by(uid=request_body['uid']).first()
    
    if people_exists is None:
        raise APIException("People not found", status_code=400)
      
    people_details_exists = PeopleDetails.query.filter_by(uid=request_body['uid']).first()
    
    if people_details_exists:
        raise APIException("The people details already exist", status_code=400)
    
    planet_exists = Planets.query.filter_by(uid=request_body['planet_uid']).first()
    
    if planet_exists is None:
        raise APIException("The planet not exist", status_code=404)
    
    people_details = PeopleDetails(
            uid=request_body['uid'],
            height= request_body['height'],
            mass= request_body['mass'],
            skin_color= request_body['skin_color'],
            eye_color= request_body['eye_color'],
            birth_year= request_body['birth_year'],
            gender= request_body['gender'],
            created= datetime.utcnow(),
            edited= datetime.utcnow(),
            planet_uid= request_body['planet_uid'],
            description= request_body['description']
    )
    
    people_details.save()
    
    response_body = {
        "msg":"ok",
        "People_details": people_details.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/people/details/<int:people_uid>", methods=['PUT'])
@jwt_required()
def edit_details_people(people_uid):
    request_body = request.get_json(force=True, silent=True)
    people_details = PeopleDetails.query.filter_by(uid=people_uid).first()
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if people_details is None:
        raise APIException("People details not found", status_code=404)
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)

    if "height" in request_body and request_body["height"] != "":
        people_details.height = request_body['height']
        
    if "mass" in request_body and request_body["mass"] != "":
        people_details.mass = request_body['mass']
        
    if "skin_color" in request_body and request_body["skin_color"] != "":
        people_details.skin_color = request_body['skin_color']
        
    if "eye_color" in request_body and request_body["eye_color"] != "":
        people_details.eye_color = request_body['eye_color']
        
    if "birth_year" in request_body and request_body["birth_year"] != "":
        people_details.birth_year = request_body['birth_year']
        
    if "gender" in request_body and request_body["gender"] != "":
        people_details.gender = request_body['gender']
        
    if "planet_uid" in request_body and request_body["planet_uid"] != "":
        planet_exists = Planets.query.filter_by(uid=request_body['planet_uid']).first()
        if planet_exists is None:
            raise APIException("The planet not exist", status_code=404)
        
        people_details.planet_uid = request_body['planet_uid']
        
    if "description" in request_body and request_body["description"] != "":
        people_details.description = request_body['description']
        
    if "created" in request_body and request_body["created"] != "":
        raise APIException("Creation date cannot be edited", status_code=404)
        
    if "edited" in request_body and request_body["edited"] != "":
        raise APIException("Edition date cannot be edited", status_code=404)
    
    if "uid" in request_body and request_body["uid"] != "":
        raise APIException("The uid cannot be edited", status_code=404)

        
    people_details.edited = datetime.utcnow()

    people_details.update()
    
    response_body = {
        "msg":"ok",
        "People_details": people_details.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/people/details/<int:people_uid>", methods=['DELETE'])
@jwt_required()
def delete_people_details(people_uid):
    people_details = PeopleDetails.query.filter_by(uid=people_uid).first()
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if people_details is None:
        raise APIException("People details not found", status_code=404)
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    people_details.delete()
    
    response_body = {
        "msg":"ok",  
    }
    
    return jsonify(response_body), 200

# <------------------------------PeopleFavorites------------------------------>
@app.route("/people/favorites", methods=['GET'])
@jwt_required()
def get_people_favorites():
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    people_favorites = PeopleFavorites.query.filter_by(user_id=current_user.id)
    favorites = list(map(lambda favorite: favorite.serialize(), people_favorites))
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)

    if people_favorites is None:
        raise APIException("People¨favorites not found", status_code=404)
    
    response_body = {
        "msg":"ok",
        "Results":favorites
    }
    
    return jsonify(response_body), 200

@app.route("/people/favorites", methods=['POST'])
@jwt_required()
def add_people_favorites():
    request_body = request.get_json(force=True, silent=True)  
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "people_uid" not in request_body or request_body["people_uid"] == "":
        raise APIException("The uid of people is required", status_code=404)
    
    people_exists = People.query.filter_by(uid=request_body['people_uid']).first()
    
    if people_exists is None:
        raise APIException("People not found", status_code=404)
    
    people_favorites_exists = PeopleFavorites.query.filter_by(user_id=current_user.id, 
                                                       people_uid=request_body['people_uid']).first()
    if people_favorites_exists:
        raise APIException("People favorites already exist", status_code=403)
    
    people_favorites = PeopleFavorites(
        user_id = current_user.id,
        people_uid = request_body['people_uid']
    )
    
    people_favorites.save()
    
    response_body = {
        "msg": "ok",
        "People_favorites": people_favorites.serialize()
    }
    
    return jsonify(response_body), 200
   
@app.route("/people/favorites", methods=['DELETE'])
@jwt_required()
def delete_people_favorites():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "people_uid" not in request_body or request_body['people_uid'] == "":
        raise APIException("The people uid is required", status_code=404)
    
    people = People.query.filter_by(uid=request_body['people_uid']).first()

    if people is None:
        raise APIException("People not found", status_code=404)
    
    people_favorites = PeopleFavorites.query.filter_by(user_id=current_user.id, people_uid=request_body['people_uid']).first()   
    
    if people_favorites is None:
        raise APIException("People favorites not found", status_code=404) 
    
    people_favorites.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200
     
    
# <------------------------------Planets------------------------------>
@app.route('/planets', methods=['GET'])
def get_planets():
    planets = Planets.query.all()
   
    if planets is None:
       raise APIException("Planets not found", status_code=404)
   
    planets = list(map(lambda planet: planet.serialize(), planets))
    sorted_planets = sorted(planets, key=lambda planet: planet['uid'])
   
    response_body = {
       "msg": "ok",
       "total_records": len(sorted_planets),
       "Results": sorted_planets
    }
   
    return jsonify(response_body), 200
    
@app.route('/planets/<int:planets_uid>', methods=['GET'])
def get_planets_by_uid(planets_uid):
    planets = Planets.query.filter_by(uid=planets_uid).first()
    
    if planets is None:
        raise APIException('Planets not found', status_code=404)
    
    response_body = {
        "msg": "ok",
        "Planets": planets.serialize()
    }
    
    return jsonify(response_body), 200
        
@app.route('/planets', methods=['POST'])
@jwt_required()
def add_planets():
    request_body = request.get_json(force=True, silent=True)

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "uid" not in request_body or request_body['uid'] == "":
        raise APIException("The uid is required", status_code=404)
    
    if "name" not in request_body or request_body['name'] == "":
        raise APIException("The name is required", status_code=404)
    
    if "url" not in request_body or request_body['url'] == "":
        raise APIException("The url is required", status_code=404)
    
    planets_exists = Planets.query.filter_by(uid=request_body['uid']).first()
    
    if planets_exists:
        raise APIException("The uid is already in use", status_code=400)
    
    planets = Planets(
        uid = request_body['uid'],
        name = request_body['name'],
        url = request_body['url'] 
    )
    
    planets.save()
    
    response_body = {
        "msg":"ok",
        "Planets": planets.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/planets/<int:planets_uid>", methods=['PUT'])
@jwt_required()
def edit_planets(planets_uid):
    request_body = request.get_json(force=True, silent=True)
    planets = Planets.query.filter_by(uid=planets_uid).first()

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if planets is None:
        raise APIException("Planets not found", status_code=404)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)

    if "uid" in request_body and request_body['uid'] != "":
        planets.uid = request_body['uid']
    
    if "name" in request_body and request_body['name'] != "":
        planets.name = request_body['name']
    
    if "url" in request_body and request_body['url'] != "":
        planets.url = request_body['url']
        
    planets.update()
    
    response_body = {
        "msg":"ok",
        "Planets":planets.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/planets/<int:planets_uid>", methods=['DELETE'])
@jwt_required()
def delete_planets(planets_uid):
    planets = Planets.query.filter_by(uid=planets_uid).first()

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if planets is None:
        raise APIException("Planets not found", status_code=404)
    
    planets_details = PlanetsDetails.query.filter_by(uid=planets_uid).first()
    people_details = PeopleDetails.query.filter_by(planet_uid=planets_uid)
    
    for people in people_details:
        people.planets_uid = ""
        people.update()
    
    if planets_details:
        planets_details.delete()
               
    planets.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body)

# <------------------------------PlanetsDetails------------------------------>
@app.route("/planets/details/<int:planets_uid>", methods=['GET'])
def get_details_planets(planets_uid):
    planets_details = PlanetsDetails.query.filter_by(uid=planets_uid).first()
    
    if planets_details is None:
        raise APIException("Planets details not found", status_code=404)
    
    response_body = {
        "msg":"ok",
        "Results": planets_details.serialize()
    }
    
    return jsonify(response_body), 200

@app.route("/planets/details", methods=['POST'])
@jwt_required()
def add_details_planets():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "uid" not in request_body or request_body['uid']=="":
        raise APIException("The uid of planets is required", status_code=404)
    
    if "created" in request_body and request_body["created"] != "":
        raise APIException("Creation date cannot be edited", status_code=404)
        
    if "edited" in request_body and request_body["edited"] != "":
        raise APIException("Edition date cannot be edited", status_code=404)
    
    planets_exists = Planets.query.filter_by(uid=request_body['uid']).first()
    
    if planets_exists is None:
        raise APIException("Planets not found", status_code=400)
      
    planets_details_exists = PlanetsDetails.query.filter_by(uid=request_body['uid']).first()
    
    if planets_details_exists:
        raise APIException("The planets details already exist", status_code=400)
    
    planets_details = PlanetsDetails(
            uid=request_body['uid'],
            diameter = request_body['diameter'],
            rotation_period = request_body['rotation_period'],  
            orbital_period = request_body['orbital_period'],
            gravity = request_body['gravity'],
            population = request_body['population'],
            climate = request_body['climate'],
            terrain = request_body['terrain'],
            surface_water = request_body['surface_water'],
            created= datetime.utcnow(),
            edited= datetime.utcnow(),
            description= request_body['description']
    )
    
    planets_details.save()
    
    response_body = {
        "msg":"ok",
        "Planets Details": planets_details.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/planets/details/<int:planets_uid>", methods=['PUT'])
@jwt_required()
def edit_details_planets(planets_uid):
    request_body = request.get_json(force=True, silent=True)
    planets_details = PlanetsDetails.query.filter_by(uid=planets_uid).first()
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if planets_details is None:
        raise APIException("Planets details not found", status_code=404)
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
        
    if "diameter" in request_body and request_body["diameter"] != "":
        planets_details.diameter = request_body['diameter']
        
    if "rotation_period" in request_body and request_body["rotation_period"] != "":
        planets_details.rotation_period = request_body['rotation_period']
        
    if "orbital_period" in request_body and request_body["orbital_period"] != "":
        planets_details.orbital_period = request_body['orbital_period']
        
    if "gravity" in request_body and request_body["gravity"] != "":
        planets_details.gravity = request_body['gravity']
        
    if "population" in request_body and request_body["population"] != "":
        planets_details.population = request_body['population']
        
    if "climate" in request_body and request_body["climate"] != "":
        planets_details.climate = request_body['climate']
        
    if "terrain" in request_body and request_body["terrain"] != "":
        planets_details.terrain = request_body['terrain']
        
    if "surface_water" in request_body and request_body["surface_water"] != "":
        planets_details.surface_water = request_body['surface_water']
        
    if "description" in request_body and request_body["description"] != "":
        planets_details.description = request_body['description']
        
    if "created" in request_body and request_body["created"] != "":
        raise APIException("Creation date cannot be edited", status_code=404)
        
    if "edited" in request_body and request_body["edited"] != "":
        raise APIException("Edition date cannot be edited", status_code=404)
    
    if "uid" in request_body and request_body["uid"] != "":
        raise APIException("The uid cannot be edited", status_code=404)
    
    planets_details.edited = datetime.utcnow()

    planets_details.update()
    
    response_body = {
        "msg":"ok",
        "Planets_details": planets_details.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/planets/details/<int:planets_uid>", methods=['DELETE'])
@jwt_required()
def delete_planets_details(planets_uid):
    planets_details = PlanetsDetails.query.filter_by(uid=planets_uid).first()
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if planets_details is None:
        raise APIException("Planets details not found", status_code=404)
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    planets_details.delete()
    
    response_body = {
        "msg":"ok",  
    }
    
    return jsonify(response_body), 200

# <------------------------------PlanetsFavorites------------------------------>
@app.route("/planets/favorites", methods=['GET'])
@jwt_required()
def get_planets_favorites():
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    planets_favorites = PlanetsFavorites.query.filter_by(user_id=current_user.id)
    favorites = list(map(lambda favorite: favorite.serialize(), planets_favorites))
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if planets_favorites is None:
        raise APIException("Planets¨favorites not found", status_code=404)
    
    response_body = {
        "msg":"ok",
        "Results":favorites
    }
    
    return jsonify(response_body), 200

@app.route("/planets/favorites", methods=['POST'])
@jwt_required()
def add_planets_favorites():
    request_body = request.get_json(force=True, silent=True)  
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "planets_uid" not in request_body or request_body["planets_uid"] == "":
        raise APIException("The uid of planets is required", status_code=404)
    
    planets_exists = Planets.query.filter_by(uid=request_body['planets_uid']).first()
    
    if planets_exists is None:
        raise APIException("Planets not found", status_code=404)
    
    planets_favorites_exists = PlanetsFavorites.query.filter_by(user_id=current_user.id, 
                                                       planets_uid=request_body['planets_uid']).first()
    if planets_favorites_exists:
        raise APIException("Planets favorites already exist", status_code=403)
    
    planets_favorites = PlanetsFavorites(
        user_id = current_user.id,
        planets_uid = request_body['planets_uid']
    )
    
    planets_favorites.save()
    
    response_body = {
        "msg": "ok",
        "Planets_favorites": planets_favorites.serialize()
    }
    
    return jsonify(response_body), 200
   
@app.route("/planets/favorites", methods=['DELETE'])
@jwt_required()
def delete_planets_favorites():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "planets_uid" not in request_body or request_body['planets_uid'] == "":
        raise APIException("The planets uid is required", status_code=404)
    
    planets = Planets.query.filter_by(uid=request_body['planets_uid']).first()

    if planets is None:
        raise APIException("Planets not found", status_code=404)
    
    planets_favorites = PlanetsFavorites.query.filter_by(user_id=current_user.id, planets_uid=request_body['planets_uid']).first()   
    
    if planets_favorites is None:
        raise APIException("Planets favorites not found", status_code=404) 
    
    planets_favorites.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200
     

# <------------------------------Vehicles------------------------------>
@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicles.query.all()
   
    if vehicles is None:
       raise APIException("Vehicles not found", status_code=404)
   
    vehicles = list(map(lambda vehicle: vehicle.serialize(), vehicles))
    sorted_vehicles = sorted(vehicles, key=lambda vehicle: vehicle['uid'])
   
    response_body = {
       "msg": "ok",
       "total_records": len(sorted_vehicles),
       "Results": sorted_vehicles
    }
   
    return jsonify(response_body), 200
    
@app.route('/vehicles/<int:vehicles_uid>', methods=['GET'])
def get_vehicles_by_uid(vehicles_uid):
    vehicles = Vehicles.query.filter_by(uid=vehicles_uid).first()
    
    if vehicles is None:
        raise APIException('Vehicles not found', status_code=404)
    
    response_body = {
        "msg": "ok",
        "Vehicles": vehicles.serialize()
    }
    
    return jsonify(response_body), 200
        
@app.route('/vehicles', methods=['POST'])
@jwt_required()
def add_vehicles():
    request_body = request.get_json(force=True, silent=True)

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "uid" not in request_body or request_body['uid'] == "":
        raise APIException("The uid is required", status_code=404)
    
    if "name" not in request_body or request_body['name'] == "":
        raise APIException("The name is required", status_code=404)
    
    if "url" not in request_body or request_body['url'] == "":
        raise APIException("The url is required", status_code=404)
    
    vehicles_exists = Vehicles.query.filter_by(uid=request_body['uid']).first()
    
    if vehicles_exists:
        raise APIException("The uid is already in use", status_code=400)
    
    vehicles = Vehicles(
        uid = request_body['uid'],
        name = request_body['name'],
        url = request_body['url'] 
    )
    
    vehicles.save()
    
    response_body = {
        "msg":"ok",
        "Vehicles": vehicles.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/vehicles/<int:vehicles_uid>", methods=['PUT'])
@jwt_required()
def edit_vehicles(vehicles_uid):
    request_body = request.get_json(force=True, silent=True)
    vehicles = Vehicles.query.filter_by(uid=vehicles_uid).first()

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if vehicles is None:
        raise APIException("Vehicles not found", status_code=404)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)

    if "uid" in request_body and request_body['uid'] != "":
        vehicles.uid = request_body['uid']
    
    if "name" in request_body and request_body['name'] != "":
        vehicles.name = request_body['name']
    
    if "url" in request_body and request_body['url'] != "":
        vehicles.url = request_body['url']
        
    vehicles.update()
    
    response_body = {
        "msg":"ok",
        "Vehicles":vehicles.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/vehicles/<int:vehicles_uid>", methods=['DELETE'])
@jwt_required()
def delete_vehicles(vehicles_uid):
    vehicles = Vehicles.query.filter_by(uid=vehicles_uid).first()

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if vehicles is None:
        raise APIException("Vehicles not found", status_code=404)
    
    vehicles_details = VehiclesDetails.query.filter_by(uid=vehicles_uid).first()
    vehicles_people = VehiclesPeople.query.filter_by(people_uid=vehicles_uid)

           
    if vehicles_details:
        vehicles_details.delete()
               
    if vehicles_people:
        vehicles_people.delete()
    
    vehicles.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200

# <------------------------------VehiclesDetails------------------------------>
@app.route("/vehicles/details/<int:vehicles_uid>", methods=['GET'])
def get_details_vehicles(vehicles_uid):
    vehicles_details = VehiclesDetails.query.filter_by(uid=vehicles_uid).first()
    
    vehicles_people = VehiclesPeople.query.filter_by(vehicles_uid=vehicles_uid)
    
    vehicles = list(map(lambda vehicle: vehicle.serialize(), vehicles_people))
    
    
    if vehicles_details is None:
        raise APIException("Vehicles details not found", status_code=404)
    
    response_body = {
        "msg":"ok",
        "Results": vehicles_details.serialize(),
        "Pilots": vehicles
    }
    
    return jsonify(response_body), 200

@app.route("/vehicles/details", methods=['POST'])
@jwt_required()
def add_details_vehicles():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "uid" not in request_body or request_body['uid']=="":
        raise APIException("The uid of vehicles is required", status_code=404)
    
    if "created" in request_body and request_body["created"] != "":
        raise APIException("Creation date cannot be edited", status_code=404)
        
    if "edited" in request_body and request_body["edited"] != "":
        raise APIException("Edition date cannot be edited", status_code=404)
    
    vehicles_exists = Vehicles.query.filter_by(uid=request_body['uid']).first()
    
    if vehicles_exists is None:
        raise APIException("vehicles not found", status_code=400)
      
    vehicles_details_exists = VehiclesDetails.query.filter_by(uid=request_body['uid']).first()
    
    if vehicles_details_exists:
        raise APIException("The vehicles details already exist", status_code=400)
    
    vehicles_details = VehiclesDetails(
            uid=request_body['uid'],
            model=request_body['model'],
            vehicle_class = request_body['vehicle_class'],
            manufacturer = request_body['manufacturer'],  
            cost_in_credits = request_body['cost_in_credits'],
            length = request_body['length'],
            crew = request_body['crew'],
            passengers = request_body['passengers'],
            max_atmosphering_speed = request_body['max_atmosphering_speed'],
            cargo_capacity = request_body['cargo_capacity'],
            consumables = request_body['consumables'],
            created= datetime.utcnow(),
            edited= datetime.utcnow(),
            description= request_body['description']
    )
    
    vehicles_details.save()
    
    response_body = {
        "msg":"ok",
        "Vehicles_details": vehicles_details.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/vehicles/details/<int:vehicles_uid>", methods=['PUT'])
@jwt_required()
def edit_details_vehicles(vehicles_uid):
    request_body = request.get_json(force=True, silent=True)
    vehicles_details = VehiclesDetails.query.filter_by(uid=vehicles_uid).first()
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if vehicles_details is None:
        raise APIException("Vehicles details not found", status_code=404)
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
        
    if "model" in request_body and request_body["model"] != "":
        vehicles_details.model = request_body['model']
        
    if "vehicle_class" in request_body and request_body["vehicle_class"] != "":
        vehicles_details.vehicle_class = request_body['vehicle_class']
        
    if "manufacturer" in request_body and request_body["manufacturer"] != "":
        vehicles_details.manufacturer = request_body['manufacturer']
        
    if "cost_in_credits" in request_body and request_body["cost_in_credits"] != "":
        vehicles_details.cost_in_credits = request_body['cost_in_credits']
        
    if "length" in request_body and request_body["length"] != "":
        vehicles_details.length = request_body['length']
        
    if "crew" in request_body and request_body["crew"] != "":
        vehicles_details.crew = request_body['crew']
        
    if "passengers" in request_body and request_body["passengers"] != "":
        vehicles_details.passengers = request_body['passengers']
        
    if "max_atmosphering_speed" in request_body and request_body["max_atmosphering_speed"] != "":
        vehicles_details.max_atmosphering_speed = request_body['max_atmosphering_speed']
        
    if "cargo_capacity" in request_body and request_body["cargo_capacity"] != "":
        vehicles_details.cargo_capacity = request_body['cargo_capacity']
        
    if "consumables" in request_body and request_body["consumables"] != "":
        vehicles_details.consumables = request_body['consumables']
        
    if "description" in request_body and request_body["description"] != "":
        vehicles_details.description = request_body['description']
        
    if "created" in request_body and request_body["created"] != "":
        raise APIException("Creation date cannot be edited", status_code=404)
        
    if "edited" in request_body and request_body["edited"] != "":
        raise APIException("Edition date cannot be edited", status_code=404)
    
    if "uid" in request_body and request_body["uid"] != "":
        raise APIException("The uid cannot be edited", status_code=404)
    
    vehicles_details.edited = datetime.utcnow()

    vehicles_details.update()
    
    response_body = {
        "msg":"ok",
        "Vehicles_details": vehicles_details.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/vehicles/details/<int:vehicles_uid>", methods=['DELETE'])
@jwt_required()
def delete_vehicles_details(vehicles_uid):
    vehicles_details = VehiclesDetails.query.filter_by(uid=vehicles_uid).first()
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if vehicles_details is None:
        raise APIException("Vehicles details not found", status_code=404)
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    vehicles_details.delete()
    
    response_body = {
        "msg":"ok",  
    }
    
    return jsonify(response_body), 200

# <------------------------------VehiclesFavorites------------------------------>
@app.route("/vehicles/favorites", methods=['GET'])
@jwt_required()
def get_vehicles_favorites():
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    vehicles_favorites = VehiclesFavorites.query.filter_by(user_id=current_user.id)
    favorites = list(map(lambda favorite: favorite.serialize(), vehicles_favorites))
    
    if vehicles_favorites is None:
        raise APIException("Vehicles¨favorites not found", status_code=404)
    
    response_body = {
        "msg":"ok",
        "Results":favorites
    }
    
    return jsonify(response_body), 200

@app.route("/vehicles/favorites", methods=['POST'])
@jwt_required()
def add_vehicles_favorites():
    request_body = request.get_json(force=True, silent=True)  
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "vehicles_uid" not in request_body or request_body["vehicles_uid"] == "":
        raise APIException("The uid of vehicles is required", status_code=404)
    
    vehicles_exists = Vehicles.query.filter_by(uid=request_body['vehicles_uid']).first()
    
    if vehicles_exists is None:
        raise APIException("Vehicles not found", status_code=404)
    
    vehicles_favorites_exists = VehiclesFavorites.query.filter_by(user_id=current_user.id, 
                                                       vehicles_uid=request_body['vehicles_uid']).first()
    if vehicles_favorites_exists:
        raise APIException("Vehicles favorites already exist", status_code=403)
    
    vehicles_favorites = VehiclesFavorites(
        user_id = current_user.id,
        vehicles_uid = request_body['vehicles_uid']
    )
    
    vehicles_favorites.save()
    
    response_body = {
        "msg": "ok",
        "Vehicles_favorites": vehicles_favorites.serialize()
    }
    
    return jsonify(response_body), 200
   
@app.route("/vehicles/favorites/<int:user_id>", methods=['DELETE'])
@jwt_required()
def delete_vehicles_favorites():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "vehicles_uid" not in request_body or request_body['vehicles_uid'] == "":
        raise APIException("The vehicles uid is required", status_code=404)
    
    vehicles = Vehicles.query.filter_by(uid=request_body['vehicles_uid']).first()

    if vehicles is None:
        raise APIException("Vehicles not found", status_code=404)
    
    vehicles_favorites = VehiclesFavorites.query.filter_by(user_id=current_user.id, vehicles_uid=request_body['vehicles_uid']).first()   
    
    if vehicles_favorites is None:
        raise APIException("Vehicles favorites not found", status_code=404) 
    
    vehicles_favorites.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200
     
# <------------------------------VehiclesPeople------------------------------>
@app.route("/vehicles/people", methods=['POST'])
@jwt_required()
def add_vehicles_people():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "people_uid" not in request_body or request_body['people_uid'] == "":
        raise APIException("The people uid is required", status_code=404)
    
    if "vehicles_uid" not in request_body or request_body["vehicles_uid"] == "":
        raise APIException("The uid of vehicles is required", status_code=404)
    
    people_exists = People.query.filter_by(uid=request_body['people_uid']).first()
    vehicles_exists = Vehicles.query.filter_by(uid=request_body['vehicles_uid']).first()
    
    if people_exists is None:
        raise APIException("People not found", status_code=404)
    
    if vehicles_exists is None:
        raise APIException("Vehicles not found", status_code=404)
    
    vehicles_people_exists = VehiclesPeople.query.filter_by(people_uid=request_body['people_uid'], 
                                                       vehicles_uid=request_body['vehicles_uid']).first()
    if vehicles_people_exists:
        raise APIException("Vehicles people already exist", status_code=403)
    
    vehicles_people = VehiclesPeople(
        people_uid = request_body['people_uid'],
        vehicles_uid = request_body['vehicles_uid']
    )
    
    vehicles_people.save()
    
    response_body = {
        "msg": "ok",
        "Vehicles_people": vehicles_people.serialize()
    }
    
    return jsonify(response_body), 200

@app.route("/vehicles/people", methods=['DELETE'])
@jwt_required()
def delete_vehicles_people():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "people_uid" not in request_body or request_body['people_uid'] == "":
        raise APIException("The people uid is required", status_code=404)
    
    if "vehicles_uid" not in request_body or request_body['vehicles_uid'] == "":
        raise APIException("The vehicles uid is required", status_code=404)
    
    people_exists = People.query.filter_by(uid=request_body['people_uid']).first()
    vehicles = Vehicles.query.filter_by(uid=request_body['vehicles_uid']).first()
    
    if people_exists is None:
        raise APIException("People not found", status_code=404)

    if vehicles is None:
        raise APIException("Vehicles not found", status_code=404)
    
    vehicles_people = VehiclesPeople.query.filter_by(people_uid=request_body['people_uid'], vehicles_uid=request_body['vehicles_uid']).first()   
    
    if vehicles_people is None:
        raise APIException("Vehicles people not found", status_code=404) 
    
    vehicles_people.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200
    
# <------------------------------Starships------------------------------>
@app.route("/starships", methods=['GET'])
def get_starships():
    starships = Starships.query.all()
   
    if starships is None:
       raise APIException("Starships not found", status_code=404)
   
    starships = list(map(lambda vehicle: vehicle.serialize(), starships))
    sorted_starships = sorted(starships, key=lambda vehicle: vehicle['uid'])
   
    response_body = {
       "msg": "ok",
       "total_records": len(sorted_starships),
       "Results": sorted_starships
    }
   
    return jsonify(response_body), 200
    
@app.route('/starships/<int:starships_uid>', methods=['GET'])
def get_starships_by_uid(starships_uid):
    starships = Starships.query.filter_by(uid=starships_uid).first()
    
    if starships is None:
        raise APIException('Starships not found', status_code=404)
    
    response_body = {
        "msg": "ok",
        "Starships": starships.serialize()
    }
    
    return jsonify(response_body), 200
        
@app.route('/starships', methods=['POST'])
@jwt_required()
def add_starships():
    request_body = request.get_json(force=True, silent=True)

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "uid" not in request_body or request_body['uid'] == "":
        raise APIException("The uid is required", status_code=404)
    
    if "name" not in request_body or request_body['name'] == "":
        raise APIException("The name is required", status_code=404)
    
    if "url" not in request_body or request_body['url'] == "":
        raise APIException("The url is required", status_code=404)
    
    starships_exists = Starships.query.filter_by(uid=request_body['uid']).first()
    
    if starships_exists:
        raise APIException("The uid is already in use", status_code=400)
    
    starships = Starships(
        uid = request_body['uid'],
        name = request_body['name'],
        url = request_body['url'] 
    )
    
    starships.save()
    
    response_body = {
        "msg":"ok",
        "Starships": starships.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/starships/<int:starships_uid>", methods=['PUT'])
@jwt_required()
def edit_starships(starships_uid):
    request_body = request.get_json(force=True, silent=True)
    starships = Starships.query.filter_by(uid=starships_uid).first()

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if starships is None:
        raise APIException("Starships not found", status_code=404)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)

    if "uid" in request_body and request_body['uid'] != "":
        starships.uid = request_body['uid']
    
    if "name" in request_body and request_body['name'] != "":
        starships.name = request_body['name']
    
    if "url" in request_body and request_body['url'] != "":
        starships.url = request_body['url']
        
    starships.update()
    
    response_body = {
        "msg":"ok",
        "Starships":starships.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/starships/<int:starships_uid>", methods=['DELETE'])
@jwt_required()
def delete_starships(starships_uid):
    starships = Starships.query.filter_by(uid=starships_uid).first()

    user_login =  get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if starships is None:
        raise APIException("Starships not found", status_code=404)
    
    starships_details = StarshipsDetails.query.filter_by(uid=starships_uid).first()
    starships_people = StarshipsPeople.query.filter_by(people_uid=starships_uid)
     
    if starships_details:
        starships_details.delete()
               
    if starships_people:
        starships_people.delete()
    
    starships.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200

# <------------------------------StarshipsDetails------------------------------>
@app.route("/starships/details/<int:starships_uid>", methods=['GET'])
def get_details_starships(starships_uid):
    starships_details = StarshipsDetails.query.filter_by(uid=starships_uid).first()
    
    starships_people = StarshipsPeople.query.filter_by(starships_uid=starships_uid)
    
    starships = list(map(lambda starship: starship.serialize(), starships_people))
    
    
    if starships_details is None:
        raise APIException("Starships details not found", status_code=404)
    
    response_body = {
        "msg":"ok",
        "Results": starships_details.serialize(),
        "Pilots": starships
    }
    
    return jsonify(response_body), 200

@app.route("/starships/details", methods=['POST'])
@jwt_required()
def add_details_starships():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "uid" not in request_body or request_body['uid']=="":
        raise APIException("The uid of starships is required", status_code=404)
    
    if "created" in request_body and request_body["created"] != "":
        raise APIException("Creation date cannot be edited", status_code=404)
        
    if "edited" in request_body and request_body["edited"] != "":
        raise APIException("Edition date cannot be edited", status_code=404)
    
    starships_exists = Starships.query.filter_by(uid=request_body['uid']).first()
    
    if starships_exists is None:
        raise APIException("Starships not found", status_code=400)
      
    starships_details_exists = StarshipsDetails.query.filter_by(uid=request_body['uid']).first()
    
    if starships_details_exists:
        raise APIException("The starships details already exist", status_code=400)
    
    starships_details = StarshipsDetails(
            uid=request_body['uid'],
            model=request_body['model'],
            starship_class = request_body['starship_class'],
            manufacturer = request_body['manufacturer'],  
            cost_in_credits = request_body['cost_in_credits'],
            length = request_body['length'],
            crew = request_body['crew'],
            passengers = request_body['passengers'],
            max_atmosphering_speed = request_body['max_atmosphering_speed'],
            hyperdrive_rating = request_body['hyperdrive_rating'],
            mglt = request_body['mglt'],
            cargo_capacity = request_body['cargo_capacity'],
            consumables = request_body['consumables'],
            created= datetime.utcnow(),
            edited= datetime.utcnow(),
            description= request_body['description']
    )
    
    starships_details.save()
    
    response_body = {
        "msg":"ok",
        "Starships_details": starships_details.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/starships/details/<int:starships_uid>", methods=['PUT'])
@jwt_required()
def edit_details_starships(starships_uid):
    request_body = request.get_json(force=True, silent=True)
    starships_details = StarshipsDetails.query.filter_by(uid=starships_uid).first()
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if starships_details is None:
        raise APIException("Starships details not found", status_code=404)
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)

    if "model" in request_body and request_body["model"] != "":
        starships_details.model = request_body['model']
        
    if "starship_class" in request_body and request_body["starship_class"] != "":
        starships_details.starship_class = request_body['starship_class']
        
    if "manufacturer" in request_body and request_body["manufacturer"] != "":
        starships_details.manufacturer = request_body['manufacturer']
        
    if "cost_in_credits" in request_body and request_body["cost_in_credits"] != "":
        starships_details.cost_in_credits = request_body['cost_in_credits']
        
    if "length" in request_body and request_body["length"] != "":
        starships_details.length = request_body['length']
        
    if "crew" in request_body and request_body["crew"] != "":
        starships_details.crew = request_body['crew']
        
    if "passengers" in request_body and request_body["passengers"] != "":
        starships_details.passengers = request_body['passengers']
        
    if "max_atmosphering_speed" in request_body and request_body["max_atmosphering_speed"] != "":
        starships_details.max_atmosphering_speed = request_body['max_atmosphering_speed']
        
    if "hyperdrive_rating" in request_body and request_body["hyperdrive_rating"] != "":
        starships_details.hyperdrive_rating = request_body['hyperdrive_rating']
        
    if "mglt" in request_body and request_body["mglt"] != "":
        starships_details.mglt = request_body['mglt']
        
    if "cargo_capacity" in request_body and request_body["cargo_capacity"] != "":
        starships_details.cargo_capacity = request_body['cargo_capacity']
        
    if "consumables" in request_body and request_body["consumables"] != "":
        starships_details.consumables = request_body['consumables']
        
    if "description" in request_body and request_body["description"] != "":
        starships_details.description = request_body['description']
        
    if "created" in request_body and request_body["created"] != "":
        raise APIException("Creation date cannot be edited", status_code=404)
        
    if "edited" in request_body and request_body["edited"] != "":
        raise APIException("Edition date cannot be edited", status_code=404)
    
    if "uid" in request_body and request_body["uid"] != "":
        raise APIException("The uid cannot be edited", status_code=404)
    
    starships_details.edited = datetime.utcnow()

    starships_details.update()
    
    response_body = {
        "msg":"ok",
        "Starships_details": starships_details.serialize()
    }
    
    return jsonify(response_body), 200
    
@app.route("/starships/details/<int:starships_uid>", methods=['DELETE'])
@jwt_required()
def delete_starships_details(starships_uid):
    starships_details = StarshipsDetails.query.filter_by(uid=starships_uid).first()
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if starships_details is None:
        raise APIException("Starships details not found", status_code=404)
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    starships_details.delete()
    
    response_body = {
        "msg":"ok",  
    }
    
    return jsonify(response_body), 200

# <------------------------------StarshipsFavorites------------------------------>
@app.route("/starships/favorites", methods=['GET'])
@jwt_required()
def get_starships_favorites():
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    starships_favorites = StarshipFavorites.query.filter_by(user_id=current_user.id)
    favorites = list(map(lambda favorite: favorite.serialize(), starships_favorites))
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)

    if starships_favorites is None:
        raise APIException("starships¨favorites not found", status_code=404)
    
    
    response_body = {
        "msg":"ok",
        "Results":favorites
    }
    
    return jsonify(response_body), 200

@app.route("/starships/favorites", methods=['POST'])
@jwt_required()
def add_starships_favorites():
    request_body = request.get_json(force=True, silent=True)  
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "starships_uid" not in request_body or request_body["starships_uid"] == "":
        raise APIException("The uid of starships is required", status_code=404)
    
    starships_exists = Starships.query.filter_by(uid=request_body['starships_uid']).first()
    
    if starships_exists is None:
        raise APIException("Starships not found", status_code=404)
    
    starships_favorites_exists = StarshipFavorites.query.filter_by(user_id=current_user.id, 
                                                       starship_uid=request_body['starships_uid']).first()
    if starships_favorites_exists:
        raise APIException("Starships favorites already exist", status_code=403)
    
    starships_favorites = StarshipFavorites(
        user_id = current_user.id,
        starship_uid = request_body['starships_uid']
    )
    
    starships_favorites.save()
    
    response_body = {
        "msg": "ok",
        "Starships_favorites": starships_favorites.serialize()
    }
    
    return jsonify(response_body), 200
   
@app.route("/starships/favorites/<int:user_id>", methods=['DELETE'])
@jwt_required()
def delete_starships_favorites():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None:
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "starships_uid" not in request_body or request_body['starships_uid'] == "":
        raise APIException("The starships uid is required", status_code=404)
    
    starships = Starships.query.filter_by(uid=request_body['starships_uid']).first()

    if starships is None:
        raise APIException("starships not found", status_code=404)
    
    starships_favorites = StarshipFavorites.query.filter_by(user_id=current_user.id, starship_uid=request_body['starships_uid']).first()   
    
    if starships_favorites is None:
        raise APIException("Starships favorites not found", status_code=404) 
    
    starships_favorites.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200
     
# <------------------------------StarshipsPeople------------------------------>
@app.route("/starships/people", methods=['POST'])
@jwt_required()
def add_starships_people():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "people_uid" not in request_body or request_body['people_uid'] == "":
        raise APIException("The people uid is required", status_code=404)
    
    if "starships_uid" not in request_body or request_body["starships_uid"] == "":
        raise APIException("The uid of starships is required", status_code=404)
    
    people_exists = People.query.filter_by(uid=request_body['people_uid']).first()
    starships_exists = Starships.query.filter_by(uid=request_body['starships_uid']).first()
    
    if people_exists is None:
        raise APIException("People not found", status_code=404)
    
    if starships_exists is None:
        raise APIException("Starships not found", status_code=404)
    
    starships_people_exists = StarshipsPeople.query.filter_by(people_uid=request_body['people_uid'], 
                                                       starships_uid=request_body['starships_uid']).first()
    if starships_people_exists:
        raise APIException("Starships people already exist", status_code=403)
    
    starships_people = StarshipsPeople(
        people_uid = request_body['people_uid'],
        starships_uid = request_body['starships_uid']
    )
    
    starships_people.save()
    
    response_body = {
        "msg": "ok",
        "Starships_favorites": starships_people.serialize()
    }
    
    return jsonify(response_body), 200

@app.route("/starships/people", methods=['DELETE'])
@jwt_required()
def delete_starships_people():
    request_body = request.get_json(force=True, silent=True)
    
    user_login = get_jwt_identity()
    current_user = User.query.filter_by(email=user_login).first()
    
    if current_user is None or current_user.role.value != "admin":
        raise APIException("Access denied", status_code=403)
    
    if request_body is None or not request_body:
        raise APIException("You must send information", status_code=404)
    
    if "people_uid" not in request_body or request_body['people_uid'] == "":
        raise APIException("The people uid is required", status_code=404)
    
    if "starships_uid" not in request_body or request_body['starships_uid'] == "":
        raise APIException("The starships uid is required", status_code=404)
    
    people_exists = People.query.filter_by(uid=request_body['people_uid']).first()
    starships_exists = Starships.query.filter_by(uid=request_body['starships_uid']).first()
    
    if people_exists is None:
        raise APIException("People not found", status_code=404)

    if starships_exists is None:
        raise APIException("Starships not found", status_code=404)
    
    starships_people = StarshipsPeople.query.filter_by(people_uid=request_body['people_uid'], starships_uid=request_body['starships_uid']).first()   
    
    if starships_people is None:
        raise APIException("Starships people not found", status_code=404) 
    
    starships_people.delete()
    
    response_body = {
        "msg": "ok"
    }
    
    return jsonify(response_body), 200
    
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)