import random
import pymongo
import json
connection_string = "mongodb+srv://papercutz777:ix4MJwYHFS1TVj4I@sample-project.pftvfy2.mongodb.net/sample-project?retryWrites=true&w=majority"

def connect_to_mongodb():
    try:
        client = pymongo.MongoClient(connection_string)
        print("Connected to MongoDB successfully!")
        return client
    except pymongo.errors.ConnectionFailure as e:
        print("Failed to connect to MongoDB:", e)
        return None

def upload_single_document(client, database_name, collection_name, data):
    try:
        db = client[database_name]
        collection = db[collection_name]
        result = collection.insert_one(data)
        print("Document inserted with ID:", result.inserted_id)
    except Exception as e:
        print("Failed to upload document:", e)

def upload_multiple_documents(client, database_name, collection_name, data_list):
    try:
        db = client[database_name]
        collection = db[collection_name]
        result = collection.insert_many(data_list)
        print("Documents inserted with IDs:", result.inserted_ids)
    except Exception as e:
        print("Failed to upload documents:", e)

def read_json_file_to_list(file_path):
    try:
        with open(file_path, 'r') as file:
            json_data = json.load(file)
            if isinstance(json_data, list):
                return json_data
            else:
                raise ValueError("The JSON data in the file is not a valid array.")
    except FileNotFoundError:
        print(f"File not found at {file_path}")
        return []
    except json.JSONDecodeError as e:
        print(f"Error while decoding JSON: {e}")
        return []

if __name__ == "__main__":
    client = connect_to_mongodb()

    if client:
        database_name = "sample-project"
        collection_name = "products"
        multiple_data=read_json_file_to_list('productdetails.json')
        upload_multiple_documents(client, database_name, collection_name, multiple_data)
        client.close()
