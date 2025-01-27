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

# Iterate through all files in the folder
for filename in sorted(os.listdir(folder_path)):
    file_path = os.path.join(folder_path, filename)
    
    # Skip this script and ensure it's a file
    if filename != script_name and os.path.isfile(file_path):
        # Determine the file extension
        _, file_extension = os.path.splitext(filename)
        
        # Get the appropriate comment style (default to HTML-style)
        comment = comment_styles.get(file_extension, "<!-- {filename} -->")
        
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            # Add the comment with the filename at the top
            combined_content += f"{comment.format(filename=filename)}\n{content}\n\n"

# Write the combined content to the output file
with open(output_file, "w", encoding="utf-8") as output:
    output.write(combined_content)

print(f"All files (except '{script_name}') combined into '{output_file}'")

