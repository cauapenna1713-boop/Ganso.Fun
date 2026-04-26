/**
 * API Service for NASA Tracker
 * Handles all requests to NASA and The Space Devs APIs
 */

const CONFIG = {
    NASA_KEY: 'zaeRNnv790DciLxpNVwO4ndOWRKwkUkK4aM44ZWl', 
    TSD_URL: 'https://lldev.thespacedevs.com/2.2.0',
    SNAPI_URL: 'https://api.spaceflightnewsapi.net/v4',
    NASA_IMAGE_URL: 'https://images-api.nasa.gov',
    ISS_URL: 'https://api.wheretheiss.at/v1/satellites/25544'
};

const ApiService = {
    /**
     * Fetch Astronomy Picture of the Day
     */
    async getAPOD() {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${CONFIG.NASA_KEY}`);
            if (response.status === 429) {
                console.warn('NASA API Rate Limit reached.');
                return { 
                    url: 'https://images.nasa.gov/images/nasalogo.png', 
                    title: 'NASA Exploration', 
                    explanation: 'The Astronomy Picture of the Day is currently unavailable due to high demand. Please check back in an hour.' 
                };
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching APOD:', error);
            return null;
        }
    },

    /**
     * Fetch latest news from NASA via Spaceflight News API (SNAPI)
     */
    async getLatestNews() {
        try {
            // Include NASA, ESA, and SpaceX news
            const response = await fetch(`${CONFIG.SNAPI_URL}/articles/?limit=25`);
            const data = await response.json();
            const allowedAgencies = ['NASA', 'ESA', 'SpaceX', 'Spaceflight Now', 'SpaceNews'];
            return data.results.filter(news => 
                allowedAgencies.some(agency => news.news_site.includes(agency))
            ).slice(0, 8);
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    },

    /**
     * Fetch upcoming launches (NASA-only)
     */
    async getUpcomingLaunches() {
        try {
            // Include NASA, ESA, and SpaceX
            const response = await fetch(`${CONFIG.TSD_URL}/launch/upcoming/?limit=25`);
            const data = await response.json();
            const allowed = ['nasa', 'spacex', 'european space agency', 'esa'];
            return data.results.filter(launch => 
                allowed.some(agency => launch.launch_service_provider?.name.toLowerCase().includes(agency)) ||
                launch.mission?.agencies?.some(a => allowed.some(agency => a.name.toLowerCase().includes(agency)))
            ).slice(0, 4);
        } catch (error) {
            console.error('Error fetching launches:', error);
            return [];
        }
    },

    /**
     * Fetch scientific discoveries (Recent items from 2024+)
     */
    async getDiscoveries() {
        try {
            // Broader query to ensure results, then sorted by date in JS
            const response = await fetch(`${CONFIG.NASA_IMAGE_URL}/search?q=James+Webb+nebula&media_type=image`);
            const data = await response.json();
            
            const items = data.collection.items || [];
            
            // Client-side sorting by date descending
            const sorted = items.sort((a, b) => {
                const dateA = a.data[0]?.date_created ? new Date(a.data[0].date_created) : 0;
                const dateB = b.data[0]?.date_created ? new Date(b.data[0].date_created) : 0;
                return dateB - dateA;
            });
            
            return sorted.slice(0, 4);
        } catch (error) {
            console.error('Error fetching discoveries:', error);
            return [];
        }
    },

    /**
     * Fetch Live ISS Telemetry (Real-world proxy for live mission telemetry)
     */
    async getISSTelemetry() {
        try {
            const response = await fetch(CONFIG.ISS_URL);
            return await response.json();
        } catch (error) {
            console.error('Error fetching ISS telemetry:', error);
            return null;
        }
    },

    /**
     * Fetch all currently active (In Flight) NASA missions
     */
    async getActiveMissions() {
        try {
            // Fetch active missions for NASA, ESA, SpaceX
            const response = await fetch(`${CONFIG.TSD_URL}/launch/?status=3&limit=25`);
            const data = await response.json();
            const allowed = ['nasa', 'spacex', 'esa', 'european space agency'];
            return data.results.filter(launch => 
                allowed.some(agency => launch.launch_service_provider?.name.toLowerCase().includes(agency)) ||
                launch.mission?.agencies?.some(a => allowed.some(agency => a.name.toLowerCase().includes(agency)))
            );
        } catch (error) {
            console.error('Error fetching active missions:', error);
            return [];
        }
    },


    /**
     * Fetch NASA Satellites Data (Mocked with Instagram links)
     */
    async getNASASatellites() {
        return [
            {
                name: "James Webb Space Telescope",
                description: "Infrared space observatory launched to capture the oldest light in the universe.",
                image: "https://images.nasa.gov/images/nasalogo.png",
                instagram: "https://www.instagram.com/nasawebb",
                orbit: "L2 Lagrange Point"
            },
            {
                name: "Hubble Space Telescope",
                description: "A large, space-based observatory, which has revolutionized astronomy.",
                image: "https://images.nasa.gov/images/nasalogo.png",
                instagram: "https://www.instagram.com/nasahubble",
                orbit: "Low Earth Orbit"
            },
            {
                name: "Landsat 9",
                description: "An Earth observation satellite launched to monitor land surface changes.",
                image: "https://images.nasa.gov/images/nasalogo.png",
                instagram: "https://www.instagram.com/nasaearth",
                orbit: "Sun-synchronous Orbit (LEO)"
            },
            {
                name: "Chandra X-ray Observatory",
                description: "Flagship-class space telescope designed to detect X-ray emission from very hot regions.",
                image: "https://images.nasa.gov/images/nasalogo.png",
                instagram: "https://www.instagram.com/nasachandraxray",
                orbit: "High Earth Orbit"
            }
        ];
    },

    /**
     * Fetch a completely random NASA-related news article
     */
    async getRandomNews() {
        try {
            const randomOffset = Math.floor(Math.random() * 200);
            const response = await fetch(`${CONFIG.SNAPI_URL}/articles/?limit=20&offset=${randomOffset}`);
            const data = await response.json();
            const allowedAgencies = ['NASA', 'ESA', 'SpaceX', 'Spaceflight Now', 'SpaceNews'];
            const filtered = data.results.filter(news => 
                allowedAgencies.some(agency => news.news_site.includes(agency))
            );
            return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : null;
        } catch (error) {
            console.error('Error fetching random news:', error);
            return null;
        }
    },

    /**
     * Fetch Currently Active Astronauts
     */
    async getAstronauts() {
        try {
            const response = await fetch('http://api.open-notify.org/astros.json');
            const data = await response.json();
            return data.people || [];
        } catch (error) {
            console.error('Error fetching astronauts:', error);
            return [];
        }
    },

    /**
     * Fetch Latest Mars Rover Photos
     */
    async getMarsPhotos(rover = 'perseverance') {
        try {
            const response = await fetch(`${this.baseUrl}/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${this.apiKey}`);
            const data = await response.json();
            return data.latest_photos || [];
        } catch (error) {
            console.error('Error fetching Mars photos:', error);
            return [];
        }
    },

    /**
     * Fetch ISS Current Location
     */
    async getISSLocation() {
        try {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            return await response.json();
        } catch (error) {
            console.error('Error fetching ISS location:', error);
            return null;
        }
    }
};
