from math import radians, sin, cos, asin, sqrt

def distance(lat1, lon1, lat2, lon2):
    """
    Calculates distance between two points using Haversine formula (in kilometers)
    """

    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2) * sin(dlat/2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2) * sin(dlon/2)
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of Earth in kilometers

    return c * r
