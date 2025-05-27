class StatusBar extends DrawableObject {

    IMAGES = {
        health: [
            '../assets/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
            '../assets/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
            '../assets/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
            '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        ],
        coins: [
            '../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
            '../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
            '../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            '../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            '../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            '../assets/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        ],
        bottles: [
            '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
            '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
            '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
            '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
            '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
            '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        ],
        endboss: [
            '../assets/7_statusbars/2_statusbar_endboss/orange/orange0.png',
            '../assets/7_statusbars/2_statusbar_endboss/orange/orange20.png',
            '../assets/7_statusbars/2_statusbar_endboss/orange/orange40.png',
            '../assets/7_statusbars/2_statusbar_endboss/green/green60.png',
            '../assets/7_statusbars/2_statusbar_endboss/green/green80.png',
            '../assets/7_statusbars/2_statusbar_endboss/green/green100.png',
        ]
    }

    percentage = 100;
    statusType;
    world;

    /**
     * Creates a new statusbar of specific type.
     * @param {string} statusType - Type of statusbar ('health', 'coins', 'bottles', 'endboss')
     */
    constructor(statusType) {
        super();
        this.statusType = statusType;
        this.initStatusBar();
        this.width = 200;
        this.height = 60;
    }

    /**
     * Initializes the statusbar based of the given type and sets a starting percentage.
     */
    initStatusBar() {
        if (this.statusType === 'health') {
            this.loadHealthBar();
            this.setPercentage(100);
        } else if (this.statusType === 'coins') {
            this.loadCoinBar();
            this.setPercentage(0);
        } else if (this.statusType === 'bottles') {
            this.loadBottleBar();
            this.setPercentage(0);
        } else if (this.statusType === 'endboss') {
            this.loadEndbossBar();
            this.setPercentage(100);
        }
    }

    /**
     * Loads images and position for health bar.
     */
    loadHealthBar() {
        this.loadImages(this.IMAGES.health);
        this.x = 20;
        this.y = 0; 
    }

    /**
     * Loads images and position for coin bar.
     */
    loadCoinBar() {
        this.loadImages(this.IMAGES.coins);
        this.y = 45;
        this.x = 20;
    }

    /**
     * Loads images and position for bottle bar.
     */
    loadBottleBar() {
        this.loadImages(this.IMAGES.bottles);
        this.y = 90;
        this.x = 20;
    }

    /**
     * Loads images and position for endboss health bar.
     */
    loadEndbossBar() {
        this.loadImages(this.IMAGES.endboss);
        this.y = 10;
        this.x = 490;
    }

    /**
     * Sets the percentage of the bar and adjusts its image.
     * @param {number} percentage - Value between 0 and 100.
     */
    setPercentage(percentage) {
        percentage > 0 ? this.percentage = percentage : this.percentage = 0;
        const imagesForType = this.IMAGES[this.statusType] || [];
        let path = imagesForType[this.resolveImageIndex(this.percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * 
     * @param {number} percentage - Current percentage.
     * @returns {number} - Index of the fitting image.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) { 
            return 2;
        } else if (percentage >= 10) {
            return 1;
        } else if (percentage >= 0) {
            return 0;
        }
    }
}