import pandas as pd

# Load the dataset from a CSV file
file_path = '/Users/jiwounkim/Downloads/14100431-eng/14100431.csv'
data = pd.read_csv(file_path)

# Ensure 'REF_DATE' is in the datetime format
data['REF_DATE'] = pd.to_datetime(data['REF_DATE'])

# Ensure data is sorted chronologically
data.sort_values(by=['GEO', 'National Occupational Classification (NOC)', 'REF_DATE'], inplace=True)

# Calculate yearly employment numbers
data['Year'] = data['REF_DATE'].dt.year
annual_data = data.groupby(['Year', 'GEO', 'National Occupational Classification (NOC)'])['VALUE'].sum().reset_index()

# Calculate Year-over-Year (YoY) change for each industry and province
annual_data['YoY_Change'] = annual_data.groupby(['GEO', 'National Occupational Classification (NOC)'])['VALUE'].diff()

# Identify top industries based on the YoY change over the last year of available data
top_industries_yearly = annual_data[annual_data['Year'] == annual_data['Year'].max()].copy()
top_industries_yearly['Rank'] = top_industries_yearly.groupby('GEO')['YoY_Change'].rank(ascending=False, method='dense')
top_5_industries_yearly = top_industries_yearly[top_industries_yearly['Rank'] <= 5]

# Retain the original monthly data for detailed trends within a selected province
monthly_data = data.copy()

# The 'monthly_data' DataFrame retains the original granularity of the data,
# and 'top_5_industries_yearly' contains the top 5 industries with the highest YoY growth per province

# Now, you can save these DataFrames to separate JSON files for MongoDB Atlas upload
monthly_data.to_json('monthly_employment_data.json', orient='records', date_format='iso')
top_5_industries_yearly.to_json('top_5_industries_yearly.json', orient='records', date_format='iso')
