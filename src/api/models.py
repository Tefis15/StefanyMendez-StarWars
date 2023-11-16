from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()


#Agregar def __repr__(self): en los favoritos y en vehiclesPeople y starshipsPeople

class role(enum.Enum):
    admin = "admin"
    user = "user"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), unique=False, nullable=False)
    role = db.Column(db.Enum(role), nullable=False) 
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "role": self.role.value,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }
        
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class Starships(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return f'<Starships {self.name}>'
    
    def serialize(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "url": self.url
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class StarshipsDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(Starships.uid), unique=True, nullable=False)
    description = db.Column(db.String(500)) 
    model = db.Column(db.String(100)) 
    starship_class = db.Column(db.String(50)) 
    manufacturer = db.Column(db.String(50))
    cost_in_credits = db.Column(db.String(50))
    length = db.Column(db.Float)
    crew = db.Column(db.Float) 
    passengers = db.Column(db.Integer) 
    max_atmosphering_speed = db.Column(db.Float) 
    hyperdrive_rating = db.Column(db.Float) 
    mglt = db.Column(db.Float) 
    cargo_capacity = db.Column(db.Float) 
    consumables = db.Column(db.String(100)) 
    created = db.Column(db.DateTime(timezone=True), nullable=False)
    edited = db.Column(db.DateTime(timezone=True), nullable=False)
    starships = db.relationship(Starships)

    def __repr__(self):
        return f'<Starships Details {self.starships.name}'
    
    def serialize(self):
        return {
                "properties":{
                        "model": self.model,
                        "starship_class": self.starship_class,
                        "manufacturer": self.manufacturer,
                        "cost_in_credits": self.cost_in_credits,
                        "length": self.length,
                        "crew": self.crew,
                        "passengers": self.passengers,
                        "max_atmosphering_speed": self.max_atmosphering_speed,
                        "hyperdrive_rating": self.hyperdrive_rating,
                        "MGLT": self.mglt,
                        "cargo_capacity": self.cargo_capacity,
                        "consumables": self.consumables,
                        "created": self.created,
                        "edited": self.edited,
                        "name": self.starships.name,
                        "url": self.starships.url
            },
            "uid": self.starships.uid,  
            "id": self.id, 
            "description": self.description  
        }
        
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class StarshipFavorites (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    starship_uid = db.Column(db.Integer, db.ForeignKey(Starships.uid), nullable=False)
    user = db.relationship(User) 
    starships = db.relationship(Starships) 
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.serialize(),
            "starships_uid": self.starships.serialize(),
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
                       
class Vehicles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return f'<Vehicles {self.name}>'
    
    def serialize(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "url": self.url
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class VehiclesDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(Vehicles.uid), unique=True, nullable=False)
    description = db.Column(db.String(500)) 
    model = db.Column(db.String(100)) 
    vehicle_class = db.Column(db.String(50)) 
    manufacturer = db.Column(db.String(50))
    cost_in_credits = db.Column(db.String(50))
    length = db.Column(db.Float)
    crew = db.Column(db.Float) 
    passengers = db.Column(db.Integer) 
    max_atmosphering_speed = db.Column(db.Float) 
    cargo_capacity = db.Column(db.Float) 
    consumables = db.Column(db.String(100)) 
    created = db.Column(db.DateTime(timezone=True), nullable=False)
    edited = db.Column(db.DateTime(timezone=True), nullable=False)
    vehicles = db.relationship(Vehicles)

    def __repr__(self):
        return f'<Vehicles Details {self.vehicles.name}'
    
    def serialize(self):
        return {
                "properties":{
                        "model": self.model,
                        "vehicle_class": self.vehicle_class,
                        "manufacturer": self.manufacturer,
                        "cost_in_credits": self.cost_in_credits,
                        "length": self.length,
                        "crew": self.crew,
                        "passengers": self.passengers,
                        "max_atmosphering_speed": self.max_atmosphering_speed,
                        "cargo_capacity": self.cargo_capacity,
                        "consumables": self.consumables,
                        "created": self.created,
                        "edited": self.edited,
                        "name": self.vehicles.name,
                         "url": self.vehicles.url
            },
            "uid": self.vehicles.uid,  
            "id": self.id, 
            "description": self.description
        }      
        
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class VehiclesFavorites (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    vehicles_uid = db.Column(db.Integer, db.ForeignKey(Vehicles.uid), nullable=False)
    user = db.relationship(User) 
    vehicles = db.relationship(Vehicles) 
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.serialize(),
            "vehicles_uid": self.vehicles.serialize(),
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return f'<Planets {self.name}>'
    
    def serialize(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "url": self.url
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class PlanetsDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(Planets.uid), unique=True, nullable=False)
    description = db.Column(db.String(500)) 
    diameter = db.Column(db.Float)
    rotation_period = db.Column(db.Float)   
    orbital_period = db.Column(db.Float)
    gravity = db.Column(db.String(50))
    population = db.Column(db.String(50))
    climate = db.Column(db.String(150)) 
    terrain = db.Column(db.String(150)) 
    surface_water = db.Column(db.Float) 
    created = db.Column(db.DateTime(timezone=True), nullable=False)
    edited = db.Column(db.DateTime(timezone=True), nullable=False)
    planets = db.relationship(Planets)


    def __repr__(self):
        return f'<Planets Details {self.planets.name}'
    
    def serialize(self):
        return {
                "properties":{
                        "diameter": self.diameter,
                        "rotation_period": self.rotation_period,
                        "orbital_period": self.orbital_period,
                        "gravity": self.gravity,
                        "population": self.population,
                        "climate": self.climate,
                        "terrain": self.terrain,
                        "surface_water": self.surface_water,
                        "created": self.created,
                        "edited": self.edited,
                        "name": self.planets.name,
                         "url": self.planets.url
            },
            "uid": self.planets.uid,  
            "id": self.id, 
            "description": self.description         
        }
        
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class PlanetsFavorites (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    planets_uid = db.Column(db.Integer, db.ForeignKey(Planets.uid), nullable=False)
    user = db.relationship(User) 
    planets = db.relationship(Planets) 
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.serialize(),
            "planets_uid": self.planets.serialize(),
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return f'<People {self.name}>'
    
    def serialize(self):
        return {
            "uid": self.uid,
            "name": self.name,
            "url": self.url
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class PeopleDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey(People.uid), unique=True, nullable=False)
    description = db.Column(db.String(500)) 
    height = db.Column(db.Float)
    mass = db.Column(db.Float)   
    skin_color = db.Column(db.String(50))
    eye_color = db.Column(db.String(50))
    birth_year = db.Column(db.String(50))
    gender = db.Column(db.String(50)) 
    created = db.Column(db.DateTime(timezone=True), nullable=False)
    edited = db.Column(db.DateTime(timezone=True), nullable=False)
    planet_uid = db.Column(db.Integer, db.ForeignKey(Planets.uid)) 
    people = db.relationship(People)
    homeworld = db.relationship(Planets)
    
    def __repr__(self):
        return f'<People Details {self.people.name}'
    
    def serialize(self):
        return {
                "properties":{
                        "height": self.height,
                        "mass": self.mass,
                        "skin_color": self.skin_color,
                        "eye_color": self.eye_color,
                        "birth_year": self.birth_year,
                        "gender": self.gender,
                        "created": self.created,
                        "edited": self.edited,
                        "homeworld": self.homeworld.serialize(),
                        "name": self.people.name,
                         "url": self.people.url
            },
            "uid": self.people.uid,  
            "id": self.id, 
            "description": self.description
        } 
        
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
class PeopleFavorites (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    people_uid = db.Column(db.Integer, db.ForeignKey(People.uid), nullable=False)
    user = db.relationship(User) 
    people = db.relationship(People) 
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.serialize(),
            "people_uid": self.people.serialize(),
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
class VehiclesPeople(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    people_uid = db.Column(db.Integer, db.ForeignKey(People.uid), nullable=False)
    vehicles_uid = db.Column(db.Integer, db.ForeignKey(Vehicles.uid), nullable=False)
    people = db.relationship(People) 
    vehicles = db.relationship(Vehicles) 
    
    def serialize(self):
        return {
            "id": self.id,
            "people_uid": self.people.serialize(),
            "vehicles_id": self.vehicles.serialize(),
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
class StarshipsPeople(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    people_uid = db.Column(db.Integer, db.ForeignKey(People.uid), nullable=False)
    starships_uid = db.Column(db.Integer, db.ForeignKey(Starships.uid), nullable=False)
    people = db.relationship(People) 
    starships = db.relationship(Starships) 
    
    def serialize(self):
        return {
            "id": self.id,
            "people_uid": self.people.serialize(),
            "starships_id": self.starships.serialize(),
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()