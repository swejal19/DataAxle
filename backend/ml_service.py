import joblib
import pandas as pd
import os
import hashlib

class MLPipeline:
    def __init__(self, model_dir):
        self.model = None
        self.scaler = None
        self.target_encoder = None
        self.is_ready = False
        
        try:
            print("Loading ML models from", model_dir)
            
            # Load Model
            model_path = os.path.join(model_dir, 'best_income_model.pkl')
            if os.path.exists(model_path):
                self.model = joblib.load(model_path)
            
            # Load Scaler
            scaler_path = os.path.join(model_dir, 'scaler.pkl')
            if os.path.exists(scaler_path):
                self.scaler = joblib.load(scaler_path)
                
            # Load Target Encoder
            target_enc_path = os.path.join(model_dir, 'target_encoder.pkl')
            if os.path.exists(target_enc_path):
                self.target_encoder = joblib.load(target_enc_path)
                
            if self.model and self.scaler and self.target_encoder:
                self.is_ready = True
                print("ML Pipeline initialized successfully.")
            else:
                print("Missing one or more required .pkl files.")
        except Exception as e:
            print(f"Error initializing MLPipeline: {e}")

    def _fallback_encode(self, value):
        """Deterministic integer encoding for strings since encoders.pkl is empty"""
        if pd.isna(value) or value is None:
            return 0
        # Create a consistent integer from string
        hash_val = int(hashlib.md5(str(value).encode('utf-8')).hexdigest(), 16)
        return hash_val % 100

    def predict(self, input_dict):
        if not self.is_ready:
            raise RuntimeError("ML Pipeline is not fully loaded. Cannot predict.")
            
        # 1. Map frontend fields to expected model features
        # Model features: ['age', 'workclass', 'education_level', 'education_num', 
        # 'marital_status', 'occupation', 'relationship', 'race', 'sex', 
        # 'capital_gain', 'capital_loss', 'hours_per_week', 'native_country']
        
        education_map = {
            'Bachelors': 13, 'HS-grad': 9, '11th': 7, 'Masters': 14, 
            '9th': 5, 'Some-college': 10, 'Assoc-acdm': 12, 'Assoc-voc': 11, 
            '7th-8th': 4, 'Doctorate': 16, 'Prof-school': 15, '5th-6th': 3, 
            '10th': 6, '1st-4th': 2, 'Preschool': 1, '12th': 8
        }
        
        education = input_dict.get('education', 'HS-grad')
        education_num = education_map.get(education, 9)
        
        mapped_data = {
            'age': input_dict.get('age', 35),
            'workclass': input_dict.get('workclass', 'Private'),
            'education_level': education,
            'education_num': education_num,
            'marital_status': input_dict.get('marital_status', 'Married-civ-spouse'),
            'occupation': input_dict.get('occupation', 'Exec-managerial'),
            'relationship': input_dict.get('relationship', 'Husband'),
            'race': input_dict.get('race', 'White'),
            'sex': input_dict.get('gender', 'Male'),
            'capital_gain': 0, # Imputed default
            'capital_loss': 0, # Imputed default
            'hours_per_week': input_dict.get('hours_per_week', 40),
            'native_country': input_dict.get('native_country', 'United-States')
        }
        
        df = pd.DataFrame([mapped_data])
        
        # 2. Apply Fallback Encoding to Categoricals
        categorical_cols = ['workclass', 'education_level', 'marital_status', 'occupation', 'relationship', 'race', 'sex', 'native_country']
        for col in categorical_cols:
            df[col] = df[col].apply(self._fallback_encode)
            
        # 3. Scale Features
        # The scaler expects the exact feature order
        features_order = ['age', 'workclass', 'education_level', 'education_num', 'marital_status', 'occupation', 'relationship', 'race', 'sex', 'capital_gain', 'capital_loss', 'hours_per_week', 'native_country']
        df = df[features_order]
        
        scaled_data = self.scaler.transform(df)
        
        # 4. Predict
        probs = self.model.predict_proba(scaled_data)[0]
        pred_idx = probs.argmax()
        confidence = float(probs[pred_idx])
        
        # 5. Decode Target
        # target_encoder.inverse_transform expects 1D array
        raw_prediction = self.target_encoder.inverse_transform([pred_idx])[0]
        
        # Map raw 0/1 predictions to income strings if target_encoder classes are just '0'/'1'
        prediction_label = raw_prediction
        if str(raw_prediction) == '0':
            prediction_label = '<=50K'
        elif str(raw_prediction) == '1':
            prediction_label = '>50K'
            
        return {
            "prediction": prediction_label,
            "confidence": confidence,
            "status": "success"
        }
