from dotenv import load_dotenv

import os
from pymongo import MongoClient
from bson.objectid import ObjectId

load_dotenv()

database_connection_string = os.environ['DATABASE_CONNECTION_STRING']


def get_database():
    client = MongoClient(database_connection_string)
    return client['notscrapyet']

if __name__ == "__main__":   
   dbname = get_database()
   collection_name = dbname["dealers"]

item_1 = {
    "_id": ObjectId("65e8d3788ccc656f7fefbaa9"),
    "name": 'The Used Car Superstore',
    "address_number": '2110',
    "address_street": 'Ogden Ave',
    "address_city": 'Lisle',
    "address_state": 'IL',
    "address_postal_code": '60532',
    "location": {
        "type": "Point",
        "coordinates": [-88.0956,41.7992]
    },
    "url": 'https://www.thusedcarsuperstore.com',
    "url_path": '/search',
    "status": "inactive"
}
item_2 = {
    "_id": ObjectId("65e8d3788ccc656f7fefbaaa"),
    "name": 'Bill Kay Chevrolet',
    "address_number": '601',
    "address_street": 'Ogden Ave',
    "address_city": 'Lisle',
    "address_state": 'IL',
    "address_postal_code": '60532',
    "location": {
        "type": "Point",
        "coordinates": [-88.0611,41.8019]
    },
    "url": 'https://www.billkaychevrolet.com',
    "url_path": '/used-vehicles',
    "status": "inactive"
}
item_3 = {
    "_id": ObjectId("65e8d3788ccc656f7fefbaab"),
    "name": 'Autos Of Chicago',
    "address_number": '2401',
    "address_street": 'Warrenville Rd',
    "address_city": 'Downers Grove',
    "address_state": 'IL',
    "address_postal_code": '60515',
    "location": {
        "type": "Point",
        "coordinates": [-88.0431,41.8072]
    },
    "url": 'https://www.autosofchicago.com',
    "url_path": '/pre-owned-cars',
    "status": "active"
}

collection_name.insert_many([item_1,item_2,item_3])
collection_name.create_index({"location": "2dsphere"})
