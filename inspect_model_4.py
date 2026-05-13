import joblib

model = joblib.load('model/best_income_model.pkl')
print(model.get_booster().feature_names)
