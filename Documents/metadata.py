import pandas as pd

# Load the metadata CSV file
metadata_path = '/Users/jiwounkim/Downloads/14100431-eng/14100431_MetaData.csv'
metadata = pd.read_csv(metadata_path)

# For simplicity, let's assume the metadata contains descriptions of each column
# You may need to adjust processing depending on the actual structure of the file
metadata_json = metadata.to_json(orient='records')

# Save the JSON metadata to a file
with open('metadata.json', 'w') as file:
    file.write(metadata_json)

print("Metadata processed and saved to metadata.json")
