import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('config/bolt-2023-firebase-adminsdk-xxfrs-0500073c8a.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
