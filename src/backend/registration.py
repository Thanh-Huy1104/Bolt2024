from flask import Flask, request, jsonify
from firebase import initialize_firebase
from firebase_admin import auth, firestore

app = Flask(__name__)

# Initialize Firebase
initialize_firebase()

@app.route('/signUp', methods=['POST'])
def signUp():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    try:
        user_record = auth.create_user(
            email=email,
            password=password
        )
        firestore_db = firestore.client()
        firestore_db.collection('users').document(user_record.uid).set({
            "username": username,
            'email': email
        })
        return jsonify({'status': 'success', 'userId': user_record.uid}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
