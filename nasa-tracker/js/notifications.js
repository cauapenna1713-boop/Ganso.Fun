/**
 * Notification Service for NASA Tracker
 * Handles polling and browser notifications
 */

const NotificationService = {
    lastLaunchId: localStorage.getItem('last_launch_id'),
    pollingInterval: null,

    /**
     * Request permission to show notifications
     */
    async requestPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications.');
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === 'granted';
    },

    /**
     * Start background polling for new launches
     */
    startPolling(onNewData) {
        if (this.pollingInterval) clearInterval(this.pollingInterval);

        // Check every 5 minutes (300,000 ms)
        // For demo purposes, we can set it to 1 minute
        this.pollingInterval = setInterval(async () => {
            console.log('Polling for updates...');
            const launches = await ApiService.getUpcomingLaunches();
            
            if (launches && launches.length > 0) {
                const latestLaunch = launches[0];
                
                if (this.lastLaunchId && this.lastLaunchId !== latestLaunch.id) {
                    this.showNotification('New Launch Detected!', {
                        body: `New mission: ${latestLaunch.name}. Status: ${latestLaunch.status.name}`,
                        icon: latestLaunch.image || 'https://www.nasa.gov/favicon.ico'
                    });
                    
                    if (onNewData) onNewData(launches);
                }
                
                this.lastLaunchId = latestLaunch.id;
                localStorage.setItem('last_launch_id', this.lastLaunchId);
            }
        }, 60000); // 1 minute interval
    },

    /**
     * Show a system notification
     */
    showNotification(title, options) {
        if (Notification.permission === 'granted') {
            new Notification(title, options);
        }
    }
};
