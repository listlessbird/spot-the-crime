



filtered_crimes = [crime for crime in crimes if distance(crime["latitude"], crime["longitude"], center_lat, center_lon) <= radius]
print(len(filtered_crimes))
crime_counts = {}
for crime in filtered_crimes:
  crime_type = crime["crimeType"]
  crime_counts[crime_type] = crime_counts.get(crime_type, 0) + 1

most_frequent_crime = max(crime_counts, key=crime_counts.get)

print(f"Most frequent crime within {radius} km radius: {most_frequent_crime} ({crime_counts[most_frequent_crime]} occurrences)")

population_density = 5000  
area = 3.14159 * radius**2  
crime_rate = crime_counts[most_frequent_crime] / (population_density * area) * 1000  

print(f"Crime rate (per 1000 residents): {crime_rate:.2f}")
