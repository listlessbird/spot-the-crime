from flask import Flask, jsonify, request

from distance import distance
from crimeData import crimes
from flask_cors import CORS
from firestore import db
app = Flask(__name__)

CORS(app)

@app.route('/getcrimes/', methods=['GET'])
def get_crimes():
    try:
       

        docs = db.collection('crimeData').stream()
        documents = []
        # Iterate over each document and extract its data
        for doc in docs:
            documents.append(doc.to_dict())
        print(documents)
        data = request.json
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
        radius = float(request.args.get('radius'))

        filtered_crimes = [
            doc for doc in documents
            if distance(doc["latitude"], doc["longitude"], lat, lon) <= radius
        ]
        print(filtered_crimes)
        if len(filtered_crimes) == 0:
            return jsonify([])  # Return empty list if no crimes found
        else:
            return jsonify(filtered_crimes)  # Return filtered crime data

    except (KeyError, TypeError, ValueError) as e:
        return jsonify({'error': 'Missing or invalid data'}), 400  # Bad Request


@app.route('/addcrimes/', methods=['POST'])
def add_crimes():
    try:
        data = request.json
        crime_type = data['crimeType']
        date = data['date']
        latitude = data['latitude'] 
        longitude = data['longitude']

        ref = db.collection('crimeData').add({
            "crimeType": crime_type,
            "date": date,
            "latitude": latitude,
            "longitude": longitude
        })

        return jsonify({'message': 'Crime data added successfully'}), 201  # Created status code
    except (KeyError, TypeError) as e:
        return jsonify({'error': 'Missing or invalid data'}), 400  # Bad Request status code


if __name__ == '__main__':
    app.run(debug=True)

