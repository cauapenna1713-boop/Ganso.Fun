/**
 * NASA Tracker - Main Entry Point
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log('NASA Tracker initializing...');

    // 1. Initial Data Fetch (Conditional based on page)
    const newsGrid = document.getElementById('news-grid');
    const launchesGrid = document.getElementById('launches-grid');
    const discoveriesGrid = document.getElementById('discoveries-grid');
    const satellitesGrid = document.getElementById('satellites-grid');
    const liveContainer = document.getElementById('live-container');
    const astronautsGrid = document.getElementById('astronauts-grid');

    // Fetch and Render APOD (Common or Home)
    const apod = await ApiService.getAPOD();
    UI.renderHero(apod || { 
        title: 'NASA Exploration', 
        explanation: 'Exploring the frontiers of space and science to benefit humanity.' 
    });

    // Page Specific Logic
    if (newsGrid) {
        const news = await ApiService.getLatestNews();
        UI.renderGrid('news-grid', news, 'news');
    }

    if (launchesGrid) {
        const launches = await ApiService.getUpcomingLaunches();
        UI.renderGrid('launches-grid', launches, 'launch');
    }

    if (discoveriesGrid) {
        const discoveries = await ApiService.getDiscoveries();
        UI.renderGrid('discoveries-grid', discoveries, 'discovery');
    }

    if (satellitesGrid) {
        const satellites = await ApiService.getNASASatellites();
        UI.renderGrid('satellites-grid', satellites, 'satellite');
    }

    if (astronautsGrid) {
        const astronauts = await ApiService.getAstronauts();
        UI.renderAstronauts('astronauts-grid', astronauts);
    }

    // Mars Rover Photos
    const marsGrid = document.getElementById('mars-grid');
    if (marsGrid) {
        const photos = await ApiService.getMarsPhotos();
        UI.renderMarsPhotos('mars-grid', photos);
    }

    // ISS Live Tracking (Dedicated Page)
    const issContainer = document.getElementById('iss-container');
    if (issContainer) {
        const updateISS = async () => {
            const data = await ApiService.getISSLocation();
            if (data) UI.renderISS('iss-container', data);
        };
        updateISS();
        setInterval(updateISS, 5000);
    }

    if (liveContainer) {
        const [activeMissions, issData] = await Promise.all([
            ApiService.getActiveMissions(),
            ApiService.getISSTelemetry()
        ]);
        const liveNasaMissions = activeMissions.filter(m => 
            m.launch_service_provider?.name.toLowerCase().includes('nasa') ||
            m.mission?.agencies?.some(a => a.name.toLowerCase().includes('nasa'))
        );
        UI.renderLiveDashboard('live-container', liveNasaMissions, issData);

        // LIVE TELEMETRY LOOP (Every 5 seconds)
        setInterval(async () => {
            const [activeMissions, issData] = await Promise.all([
                ApiService.getActiveMissions(),
                ApiService.getISSTelemetry()
            ]);
            const liveNasaMissions = activeMissions.filter(m => 
                m.launch_service_provider?.name.toLowerCase().includes('nasa') ||
                m.mission?.agencies?.some(a => a.name.toLowerCase().includes('nasa'))
            );
            UI.renderLiveDashboard('live-container', liveNasaMissions, issData);
        }, 5000);
    }

    // 3. Initialize Notifications
    const notificationBtn = document.getElementById('notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', async () => {
            const granted = await NotificationService.requestPermission();
            if (granted) {
                alert('Notifications enabled! You will be alerted for new launches.');
                notificationBtn.style.color = 'var(--accent-primary)';
            }
        });
    }

    // Start background polling for news/notifications
    NotificationService.startPolling((newLaunches) => {
        UI.renderGrid('launches-grid', newLaunches, 'launch');
    });

    // 6. Search Functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            UI.filterUI(e.target.value);
        });
    }

    // 7. Random Article Functionality
    const randomBtn = document.getElementById('random-article-btn');
    if (randomBtn) {
        randomBtn.addEventListener('click', async () => {
            const icon = randomBtn.querySelector('i');
            if (icon) icon.classList.add('pulse'); // Visual feedback
            
            const randomArticle = await ApiService.getRandomNews();
            
            if (icon) icon.classList.remove('pulse');
            
            if (randomArticle && randomArticle.url) {
                window.open(randomArticle.url, '_blank');
            } else {
                alert('Could not find a random article at the moment.');
            }
        });
    }

    // 8. Scroll Animations (Simple Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-grid').forEach(grid => {
        observer.observe(grid);
    });

    console.log('NASA Tracker ready.');
});
