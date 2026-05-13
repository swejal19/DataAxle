import sys
import pickle

print(sys.executable)

with open('model/encoders.pkl', 'rb') as f:
    encoders = pickle.load(f)
    print("Encoders type:", type(encoders))
    if isinstance(encoders, dict):
        print("Keys:", list(encoders.keys()))
        for k, v in encoders.items():
            print("Key:", k, "Val type:", type(v))

with open('model/best_income_model.pkl', 'rb') as f:
    model = pickle.load(f)
    print("Model type:", type(model))
    if hasattr(model, 'feature_names_in_'):
        print("Features:", list(model.feature_names_in_))
