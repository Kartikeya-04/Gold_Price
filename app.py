
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

model = pickle.load(open('model2.pkl', 'rb'))

scaler = pickle.load(open('scaler.pkl', 'rb'))


@app.route('/submit', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data) 
        
        # Extract features from the 'gold' key in the JSON data
        gold_data = data.get('gold', {})
        open_price = float(gold_data.get('open', 0))
        high_price = float(gold_data.get('high', 0))
        low_price = float(gold_data.get('low', 0))
        
        
        input_data = np.array([[open_price, high_price, low_price]])
        print(f"input array {input_data}")
        
        #scaling
        # scaled_data = scaler.transform(input_data)
        # print(f"scaled dATA {scaled_data}")

        new_data_scaled = scaler.transform(input_data)
        print(f"new input {new_data_scaled}")

        prediction = model.predict(new_data_scaled)
        print("Prediction:", prediction)



        # scaled_input_data = scaler.transform(input_data)
        # print('hh')
        # print(f"input array {scaled_input_data}")

        
        # prediction = model.predict(scaled_input_data)
        
        # print("Prediction:", prediction)
        
        return jsonify({'prediction': prediction.tolist()})
    
    except KeyError as e:
        return jsonify({'error': f'Missing or incorrect data format. Expected JSON object with "gold" key containing "open", "high", and "low" keys.'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=4000)


def predict():
    try:
        data = request.get_json()
        print("Received data:", data) 
        
        # Extract features from the 'gold' key in the JSON data
        lung_can = data.get('cancer', {})
        PeerPressure = float(lung_cancer.get('Peer', 0))
        Alcohol = float(lung_cancer.get('alcohol', 0))
        Anxiety = float(lung_cancer.get('anxiety', 0))
        Chronic= float(lung_cancer.get('chronic',0))

        
        
        input_data = np.array([[PeerPressure, Alcohol,Anxiety,Chronic]])
        print(f"input array {input_data}")
        
        prediction = model.predict(input_data)
        print("Prediction:", prediction)
        
        return jsonify({'prediction': prediction.tolist()})
    
    except KeyError as e:
        return jsonify({'error': f'Missing or incorrect data format. Expected JSON object with "cancer" key containing "peer pressure", "alcohol", and "anxiety" and "chronic" keys.'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
