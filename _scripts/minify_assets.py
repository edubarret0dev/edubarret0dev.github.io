import os
import re

def minify_css(content):
    # Remove comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s*([\{\};,:])\s*', r'\1', content)
    content = content.replace(';}', '}')
    return content.strip()

def minify_js(content):
    # Basic JS minification (remove comments and whitespace)
    # This is not a full parser, just a basic cleaner
    lines = content.split('\n')
    minified_lines = []
    for line in lines:
        line = line.strip()
        if not line: continue
        if line.startswith('//'): continue
        if line.startswith('/*') and line.endswith('*/'): continue
        minified_lines.append(line)
    
    return ' '.join(minified_lines)

def process_assets():
    base_dir = '/home/live/Documents/GitHub/edubarret0dev.github.io'
    
    # Minify CSS
    css_files = [
        'assets/css/modern.css'
    ]
    
    for css_rel in css_files:
        path = os.path.join(base_dir, css_rel)
        if os.path.exists(path):
            with open(path, 'r') as f:
                content = f.read()
            
            minified = minify_css(content)
            min_path = path.replace('.css', '.min.css')
            
            with open(min_path, 'w') as f:
                f.write(minified)
            print(f"✓ Minified {css_rel} -> {os.path.basename(min_path)}")
            
    # Minify JS
    js_files = [
        'assets/js/site.js'
    ]
    
    for js_rel in js_files:
        path = os.path.join(base_dir, js_rel)
        if os.path.exists(path):
            with open(path, 'r') as f:
                content = f.read()
                
            minified = minify_js(content)
            min_path = path.replace('.js', '.min.js')
            
            with open(min_path, 'w') as f:
                f.write(minified)
            print(f"✓ Minified {js_rel} -> {os.path.basename(min_path)}")

if __name__ == "__main__":
    process_assets()
