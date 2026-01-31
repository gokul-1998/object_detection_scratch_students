"""
Background Removal Script using rembg (AI-powered)
"""
from rembg import remove
from PIL import Image
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
input_path = os.path.join(script_dir, "image.jpg")
output_path = os.path.join(script_dir, "image_no_bg.png")

print(f"Processing: {input_path}")
with open(input_path, 'rb') as f:
    input_data = f.read()
    
print("Removing background (downloading AI model on first run)...")
output_data = remove(input_data)

with open(output_path, 'wb') as f:
    f.write(output_data)
print(f"Done! Saved to: {output_path}")
