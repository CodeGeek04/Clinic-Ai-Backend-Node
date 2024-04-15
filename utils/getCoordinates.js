export async function getCoordinates(address) {
  const apiKey = process.env.GEOTAGGING_API;

  if (!apiKey) {
    throw new Error("API key not found in environment variables");
  }

  const apiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address
  )}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch coordinates. Status: ${response.status}`
      );
    }

    const data = await response.json();

    const { features } = data;

    if (features.length > 0) {
      const { geometry } = features[0];
      const { coordinates } = geometry;
      const [longitude, latitude] = coordinates;

      return { latitude, longitude };
    } else {
      throw new Error("No coordinates found for the provided address");
    }
  } catch (error) {
    throw new Error(`Error fetching coordinates: ${error.message}`);
  }
}
