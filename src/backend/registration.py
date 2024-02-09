from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore, db

app = Flask(__name__)

# Initialize Firebase Admin
cred = credentials.Certificate('path/to/your/firebase-adminsdk.json')
firebase_admin.initialize_app(cred)

@app.route('/add_user', methods=['POST'])
def add_user():
    user_details = request.json
    user_id = user_details['userId']
    email = user_details['email']
    
    # Choose Firestore or Realtime Database based on your preference
    
    # Firestore Example
    firestore_db = firestore.client()
    firestore_db.collection('users').document(user_id).set({
        'email': email
        # Add other user details here
    })
    
    # Realtime Database Example
    # realtime_db_ref = db.reference('/users')
    # realtime_db_ref.child(user_id).set({
    #     'email': email
    #     # Add other user details here
    # })
    
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(debug=True)
