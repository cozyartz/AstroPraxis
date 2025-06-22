import os
import re

# Replace map: smart → ascii
REPLACEMENTS = {
    '’': "'",
    '‘': "'",
    '“': '"',
    '”': '"',
    '—': '-',
    '–': '-',   # en dash
    '…': '...',
    '´': "'",
    '•': '-',
    '→': '->',
    '←': '<-',
    '©': '(c)',
    '®': '(R)',
}

# File extensions to process
EXTENSIONS = ['.astro', '.md']

def sanitize_text(text):
    for bad, good in REPLACEMENTS.items():
        text = text.replace(bad, good)
    return text

def sanitize_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sanitized = sanitize_text(content)

    if content != sanitized:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(sanitized)
        print(f"Sanitized: {file_path}")
    else:
        print(f"Clean: {file_path}")

def walk_and_sanitize(base_dir):
    for root, _, files in os.walk(base_dir):
        for file in files:
            if any(file.endswith(ext) for ext in EXTENSIONS):
                full_path = os.path.join(root, file)
                sanitize_file(full_path)

if __name__ == "__main__":
    PROJECT_DIR = "."  # or specify full path
    walk_and_sanitize(PROJECT_DIR)
