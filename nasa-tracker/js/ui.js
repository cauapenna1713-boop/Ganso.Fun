/**
 * UI Controller for NASA Tracker
 * Handles rendering components and animations
 */

const UI = {
    /**
     * Render Hero Section Content
     */
    renderHero(data) {
        const heroTitle = document.getElementById('hero-title');
        const heroDesc = document.getElementById('hero-desc');
        
        if (data && heroTitle && heroDesc) {
            heroTitle.textContent = data.title;
            heroDesc.textContent = data.explanation.substring(0, 200) + '...';
        }
    },

    /**
     * Create a standard card element
     */
    createCard(data, type = 'news') {
        const card = document.createElement('div');
        card.className = 'card glass reveal';
        
        const dict = I18N.translations[I18N.currentLang];
        
        let imageUrl = '';
        let title = '';
        let summary = '';
        let date = '';
        let sourceUrl = '#';

        if (type === 'news') {
            // SNAPI Structure
            imageUrl = data.image_url || 'https://via.placeholder.com/400x200?text=News+Image';
            title = data.title;
            summary = data.summary ? data.summary.substring(0, 100) + '...' : 'NASA Mission detail.';
            date = new Date(data.published_at).toLocaleDateString();
            sourceUrl = data.url;
            const site = data.news_site || 'Source';
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${imageUrl}" alt="${title}" class="card-image" loading="lazy" onerror="this.src='https://images.nasa.gov/images/nasalogo.png'">
                </div>
                <div class="card-content">
                    <span class="card-label">${site}</span>
                    <h3 class="card-title">${title}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem;">${summary}</p>
                    <div class="card-footer">
                        <a href="${sourceUrl}" target="_blank" class="btn btn-glass" style="width: 100%; text-align: center;">${dict.card_read_more}</a>
                    </div>
                </div>
            `;
        } else if (type === 'discovery') {
            // NASA Image API Structure
            const item = data.data?.[0];
            const links = data.links;
            imageUrl = links?.[0]?.href || 'https://images.nasa.gov/images/nasalogo.png';
            title = item?.title || 'Unknown Discovery';
            summary = item?.description ? item.description.substring(0, 100) + '...' : 'NASA Science frontiers.';
            date = item?.date_created ? new Date(item.date_created).toLocaleDateString() : 'N/A';
            sourceUrl = item?.nasa_id ? `https://images.nasa.gov/details-${item.nasa_id}` : '#';
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${imageUrl}" alt="${title}" class="card-image" loading="lazy" onerror="this.src='https://images.nasa.gov/images/nasalogo.png'">
                </div>
                <div class="card-content">
                    <span class="card-label" data-i18n="section_discoveries">${dict.section_discoveries}</span>
                    <h3 class="card-title">${title}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem;">${summary}</p>
                    <div class="card-footer">
                        <a href="${sourceUrl}" target="_blank" class="btn btn-glass" style="width: 100%; text-align: center;">${dict.card_view_data}</a>
                    </div>
                </div>
            `;
        } else if (type === 'launch' || type === 'artemis') {
            imageUrl = data.image || 'https://images.nasa.gov/images/nasalogo.png';
            title = data.name;
            summary = data.mission?.description ? data.mission.description.substring(0, 80) + '...' : 'NASA Mission detail.';
            date = new Date(data.window_start).toLocaleString();
            const status = data.status.name;
            const statusClass = status.toLowerCase().includes('success') || status.toLowerCase().includes('go') ? 'status-go' : 'status-hold';
            const label = type === 'artemis' ? 'Artemis Program' : 'NASA Mission';
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${imageUrl}" alt="${title}" class="card-image" loading="lazy" onerror="this.src='https://images.nasa.gov/images/nasalogo.png'">
                </div>
                <div class="card-content">
                    <span class="card-label" style="color: ${type === 'artemis' ? '#fff' : 'var(--accent-primary)'}">${label}</span>
                    <h3 class="card-title">${title}</h3>
                    <div style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span class="status-indicator ${statusClass}"></span>
                        <span style="font-size: 0.75rem; color: var(--accent-primary);">${status}</span>
                    </div>
                    <div class="card-footer" style="flex-direction: column; align-items: flex-start; gap: 0.5rem; margin-top: 1rem;">
                        <span style="font-size: 0.8rem;"><i data-lucide="calendar" style="width: 14px; vertical-align: middle;"></i> ${date}</span>
                        <span style="font-size: 0.8rem;"><i data-lucide="map-pin" style="width: 14px; vertical-align: middle;"></i> ${data.pad.name}</span>
                    </div>
                </div>
            `;
        } else if (type === 'satellite') {
            imageUrl = data.image || 'https://images.nasa.gov/images/nasalogo.png';
            title = data.name;
            summary = data.description;
            sourceUrl = data.instagram;
            const orbit = data.orbit;
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${imageUrl}" alt="${title}" class="card-image" loading="lazy" onerror="this.src='https://images.nasa.gov/images/nasalogo.png'">
                </div>
                <div class="card-content">
                    <span class="card-label" style="color: #bc00ff;">Satellite • ${orbit}</span>
                    <h3 class="card-title">${title}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem;">${summary}</p>
                    <div class="card-footer">
                        <a href="${sourceUrl}" target="_blank" class="btn btn-glass" style="width: 100%; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: white; border: none;">
                            <i data-lucide="instagram" style="width: 18px;"></i> <span data-i18n="card_satellite_ig">${dict.card_satellite_ig || 'Instagram'}</span>
                        </a>
                    </div>
                </div>
            `;
        }

        return card;
    },

    /**
     * Render a list of items to a grid
     */
    renderGrid(containerId, items, type) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        items.forEach(item => {
            container.appendChild(this.createCard(item, type));
        });
        
        // Re-initialize icons for new elements
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    /**
     * Render the Live Telemetry Dashboard
     */
    renderLiveDashboard(containerId, activeMissions, issData) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const dict = I18N.translations[I18N.currentLang];
        container.innerHTML = '';

        if (!issData && (!activeMissions || activeMissions.length === 0)) {
            container.innerHTML = `<div class="glass" style="padding: 2rem; text-align: center;">No NASA active missions detected.</div>`;
            return;
        }


        // 1. ISS Telemetry Card (Always Live)
        if (issData) {
            const issCard = document.createElement('div');
            issCard.className = 'glass';
            issCard.style.padding = '2rem';
            issCard.style.display = 'grid';
            issCard.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
            issCard.style.gap = '2rem';
            
            issCard.innerHTML = `
                <div>
                    <span class="card-label" style="color: #00ff88;">● ${dict.live_telemetry}</span>
                    <h3 class="card-title">${dict.live_iss_title}</h3>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">${dict.live_iss_desc}</p>
                </div>
                <div class="glass" style="padding: 1.5rem; background: rgba(0,0,0,0.3);">
                    <div class="telemetry-row"><span>VELOCITY:</span> <span class="telemetry-value">${Math.round(issData.velocity)} km/h</span></div>
                    <div class="telemetry-row"><span>ALTITUDE:</span> <span class="telemetry-value">${Math.round(issData.altitude)} km</span></div>
                    <div class="telemetry-row"><span>LATITUDE:</span> <span class="telemetry-value">${issData.latitude.toFixed(4)}°</span></div>
                    <div class="telemetry-row"><span>LONGITUDE:</span> <span class="telemetry-value">${issData.longitude.toFixed(4)}°</span></div>
                </div>
                <div style="display: flex; align-items: center; justify-content: center;">
                    <button class="glass" style="padding: 0.5rem 1rem; color: #00ff88; font-size: 0.8rem; border-color: #00ff88;">NASA RAW FEED</button>
                </div>
            `;
            container.appendChild(issCard);
        }

        // 2. Active NASA Launch Cards
        activeMissions.forEach(mission => {
            const missionCard = document.createElement('div');
            missionCard.className = 'glass';
            missionCard.style.padding = '1.5rem';
            missionCard.style.marginTop = '1rem';
            missionCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span class="card-label" style="color: #ff4444;">● ${mission.status.name.toUpperCase()}</span>
                        <h3 class="card-title">${mission.name}</h3>
                    </div>
                    <div class="telemetry-value">${dict.live_streaming}</div>
                </div>
            `;
            container.appendChild(missionCard);
        });

        if (window.lucide) window.lucide.createIcons();
    },

    /**
     * Render Astronauts list
     */
    renderAstronauts(containerId, astronauts) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        astronauts.forEach(ast => {
            const card = document.createElement('div');
            card.className = 'card glass reveal';
            card.style.minHeight = 'auto';
            card.style.padding = '1.5rem';
            card.style.textAlign = 'center';
            
            card.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">👨‍🚀</div>
                <h3 class="card-title" style="margin-bottom: 0.5rem;">${ast.name}</h3>
                <span class="card-label" style="color: var(--accent-secondary);">${ast.craft}</span>
            `;
            container.appendChild(card);
        });
        
        if (window.lucide) window.lucide.createIcons();
    },

    /**
     * Render Mars Photos
     */
    renderMarsPhotos(containerId, photos) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        photos.slice(0, 12).forEach(photo => {
            const card = document.createElement('div');
            card.className = 'card glass reveal';
            card.style.padding = '0';
            card.style.overflow = 'hidden';
            
            card.innerHTML = `
                <div style="height: 200px; overflow: hidden;">
                    <img src="${photo.img_src}" alt="Mars Photo" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;" 
                         onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                </div>
                <div style="padding: 1rem;">
                    <span class="card-label">${photo.rover.name} - ${photo.camera.full_name}</span>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">Sol: ${photo.sol} | Date: ${photo.earth_date}</p>
                </div>
            `;
            container.appendChild(card);
        });
    },

    /**
     * Render ISS Location
     */
    renderISS(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="card glass reveal" style="padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; border-color: #00ff88;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 class="card-title" style="color: #00ff88; display: flex; align-items: center; gap: 0.5rem;">
                        <i data-lucide="radio" class="pulse"></i> International Space Station
                    </h3>
                    <span class="status-indicator status-go"></span>
                </div>
                
                <div class="section-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                    <div class="glass" style="padding: 1rem; text-align: center; border-radius: 1rem;">
                        <span class="card-label">LATITUDE</span>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #fff;">${parseFloat(data.latitude).toFixed(4)}°</div>
                    </div>
                    <div class="glass" style="padding: 1rem; text-align: center; border-radius: 1rem;">
                        <span class="card-label">LONGITUDE</span>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #fff;">${parseFloat(data.longitude).toFixed(4)}°</div>
                    </div>
                    <div class="glass" style="padding: 1rem; text-align: center; border-radius: 1rem;">
                        <span class="card-label">ALTITUDE</span>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #fff;">${parseFloat(data.altitude).toFixed(2)} km</div>
                    </div>
                    <div class="glass" style="padding: 1rem; text-align: center; border-radius: 1rem;">
                        <span class="card-label">VELOCITY</span>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #fff;">${parseFloat(data.velocity).toFixed(0)} km/h</div>
                    </div>
                </div>
                
                <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center;">
                    Updating live via WhereTheIssAt API
                </div>
            </div>
        `;
        
        if (window.lucide) window.lucide.createIcons();
    },

    /**
     * Filter grids based on search query
     */
    filterUI(query) {
        const cards = document.querySelectorAll('.card');
        if (!cards.length) return;
        
        const q = query.toLowerCase();
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(q)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
};

// CSS styles for launch status
const style = document.createElement('style');
style.textContent = `
    .status-indicator {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
    .status-go { background-color: #00ff88; box-shadow: 0 0 10px #00ff88; }
    .status-hold { background-color: #ffcc00; box-shadow: 0 0 10px #ffcc00; }
    
    .pulse {
        animation: pulse-red 2s infinite;
    }
    @keyframes pulse-red {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    .telemetry-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-family: 'Courier New', monospace;
    }
    .telemetry-value {
        color: #00ff88;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
