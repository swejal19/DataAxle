import joblib

try:
    encoders = joblib.load('model/encoders.pkl')
    print("Encoders type:", type(encoders))
    if isinstance(encoders, dict):
        print("Keys:", encoders.keys())
    
    scaler = joblib.load('model/scaler.pkl')
    print("Scaler type:", type(scaler))
    
    target_encoder = joblib.load('model/target_encoder.pkl')
    print("Target encoder type:", type(target_encoder))
    if hasattr(target_encoder, 'classes_'):
        print("Classes:", target_encoder.classes_)
except Exception as e:
    print("Error:", e)
