import os
from PIL import Image
import glob

def optimize_images():
    print("Starting image optimization...")
    
    # Ensure supported formats
    extensions = ['*.jpg', '*.jpeg', '*.png']
    files = []
    base_dir = '/home/live/Documents/GitHub/edubarret0dev.github.io/images'
    
    for ext in extensions:
        files.extend(glob.glob(os.path.join(base_dir, ext)))
    
    for file_path in files:
        if 'icon-' in file_path: # Skip PWA icons as they are already optimized
            continue
            
        filename = os.path.basename(file_path)
        name, ext = os.path.splitext(filename)
        webp_path = os.path.join(base_dir, f"{name}.webp")
        
        try:
            with Image.open(file_path) as img:
                # Calculate new size (max width 1200 for bg, 400 for avatar)
                if 'bg' in name and img.width > 1920:
                     ratio = 1920 / img.width
                     new_size = (1920, int(img.height * ratio))
                     img = img.resize(new_size, Image.Resampling.LANCZOS)
                elif 'avatar' in name and img.width > 500:
                     ratio = 500 / img.width
                     new_size = (500, int(img.height * ratio))
                     img = img.resize(new_size, Image.Resampling.LANCZOS)
                
                # Save as WebP
                img.save(webp_path, 'WEBP', quality=85)
                print(f"✓ Converted {filename} to WebP")
                
        except Exception as e:
            print(f"✗ Failed to convert {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
