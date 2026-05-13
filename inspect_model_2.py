import joblib
import pandas as pd

try:
    model = joblib.load('model/best_income_model.pkl')
    print("Model type:", type(model))
    if hasattr(model, 'feature_names_in_'):
        print("Features:", model.feature_names_in_)
    if hasattr(model, 'get_booster'):
        print("Features from booster:", model.get_booster().feature_names)
except Exception as e:
    print("Error:", e)
