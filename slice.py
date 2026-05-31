import cv2
import numpy as np
import os
import string

img_path = r"C:\Users\anush\.gemini\antigravity\brain\adf0d106-b46e-4cad-8501-1d8d69beef3d\media__1780247584116.png"
img = cv2.imread(img_path)
if img is None:
    print("Error reading image")
    exit()

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Threshold to isolate the boxes. The borders are gray and the background is white.
# We want to find the rectangles.
_, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

# Find contours
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

boxes = []
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    area = w * h
    # Filter by area to avoid noise.
    # The image is probably around 1000x800. So a box is like 100x150 -> area ~15000
    if 5000 < area < 100000:
        boxes.append((x, y, w, h))

if not boxes:
    print("No boxes found with contour detection. Using grid math instead.")
    # Fallback to math
    # Looking at the image, there's a title at the top. Let's crop it.
    h, w = img.shape[:2]
    # title is roughly top 10% ?
    # Let's say 4 rows, 7 columns.
    pass
else:
    print(f"Found {len(boxes)} boxes")
    
    # Sort boxes by y (row) then by x (column)
    # Group into rows
    boxes.sort(key=lambda b: b[1])
    
    # To properly sort rows:
    rows = []
    current_row = []
    last_y = boxes[0][1]
    for b in boxes:
        # If the y difference is small, it's the same row
        if abs(b[1] - last_y) < 20:
            current_row.append(b)
        else:
            rows.append(sorted(current_row, key=lambda x: x[0]))
            current_row = [b]
            last_y = b[1]
    rows.append(sorted(current_row, key=lambda x: x[0]))
    
    sorted_boxes = []
    for r in rows:
        sorted_boxes.extend(r)
        
    print(f"Sorted {len(sorted_boxes)} boxes")
    
    out_dir = r"public\images\signlanguage\alphabets"
    os.makedirs(out_dir, exist_ok=True)
    
    letters = string.ascii_uppercase
    for i, (x, y, w, h) in enumerate(sorted_boxes[:26]):
        if i >= 26: break
        roi = img[y:y+h, x:x+w]
        out_path = os.path.join(out_dir, f"{letters[i]}.png")
        cv2.imwrite(out_path, roi)
        print(f"Saved {letters[i]}.png")
