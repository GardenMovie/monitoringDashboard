# TODOs

- Add server-side validation of the `limit` parameter on all API endpoints to prevent abuse and ensure safe values.

- Implement browser-side caching for chart data (e.g., using localStorage) to avoid redundant API requests for data points that are already available.
- On page load, check how many data points are missing since the last cached timestamp and fetch only the required number of new points.
- After initial sync, fetch only one new data point per interval and update the cache, keeping only the latest 60 points.
- Ensure the caching logic merges new and cached data efficiently, and handles edge cases (e.g., user offline for a while).
- Document that localStorage is managed by the browser and is safe for small data arrays, but be aware of browser storage limits for larger datasets.
