import firebase_admin
from firebase_admin import credentials, firestore, auth

def initialize_firebase():
    cred = credentials.Certificate("bolt-2023-firebase-adminsdk-xxfrs-0500073c8a.json")
    firebase_admin.initialize_app(cred)
