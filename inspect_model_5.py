import joblib

scaler = joblib.load('model/scaler.pkl')
print("Scaler n_features_in_:", getattr(scaler, 'n_features_in_', 'Unknown'))
if hasattr(scaler, 'feature_names_in_'):
    print("Scaler features:", scaler.feature_names_in_)
