import os

# Specify the folder containing the files
folder_path = "./"  # Current directory
output_file = "combined_output.txt"
script_name = "combfiles.py"  # The name of this script

# Initialize a variable to hold the combined content
combined_content = ""

# Define comment styles for specific file types
comment_styles = {
    ".html": "<!-- {filename} -->",
    ".js": "// {filename}",
    ".json": "// {filename}"
}

# Define image file extensions to skip
image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg']

# Function to check if a file is an image
def is_image_file(filename):
    return any(filename.lower().endswith(ext) for ext in image_extensions)

# Iterate through all files in the folder
for filename in sorted(os.listdir(folder_path)):
    file_path = os.path.join(folder_path, filename)
    
    # Skip this script, image files, and ensure it's a file
    if filename != script_name and not is_image_file(filename) and os.path.isfile(file_path):
        # Determine the file extension
        _, file_extension = os.path.splitext(filename)
        
        # Add a comment with the filename if the file type has a defined comment style
        if file_extension in comment_styles:
            combined_content += comment_styles[file_extension].format(filename=filename) + "\n"
        
        # Read the file content and add it to the combined content
        with open(file_path, 'r') as file:
            combined_content += file.read() + "\n"

# Write the combined content to the output file
with open(output_file, 'w') as output:
    output.write(combined_content)