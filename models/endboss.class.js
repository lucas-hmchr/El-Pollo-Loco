class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 50;

    offset = {
        top: 100,
        bottom: 0,
        left: 40,
        right: 10,
    }

    world;

    isAttacking;
    isWalking = false;
    walkNotStarted = true;
    walkInterval;

    IMAGES_WALK = [
        '../assets/4_enemie_boss_chicken/1_walk/G1.png',
        '../assets/4_enemie_boss_chicken/1_walk/G2.png',
        '../assets/4_enemie_boss_chicken/1_walk/G3.png',
        '../assets/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        '../assets/4_enemie_boss_chicken/2_alert/G5.png',
        '../assets/4_enemie_boss_chicken/2_alert/G6.png',
        '../assets/4_enemie_boss_chicken/2_alert/G7.png',
        '../assets/4_enemie_boss_chicken/2_alert/G8.png',
        '../assets/4_enemie_boss_chicken/2_alert/G9.png',
        '../assets/4_enemie_boss_chicken/2_alert/G10.png',
        '../assets/4_enemie_boss_chicken/2_alert/G11.png',
        '../assets/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        '../assets/4_enemie_boss_chicken/3_attack/G13.png',
        '../assets/4_enemie_boss_chicken/3_attack/G14.png',
        '../assets/4_enemie_boss_chicken/3_attack/G15.png',
        '../assets/4_enemie_boss_chicken/3_attack/G16.png',
        '../assets/4_enemie_boss_chicken/3_attack/G17.png',
        '../assets/4_enemie_boss_chicken/3_attack/G18.png',
        '../assets/4_enemie_boss_chicken/3_attack/G19.png',
        '../assets/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        '../assets/4_enemie_boss_chicken/4_hurt/G21.png',
        '../assets/4_enemie_boss_chicken/4_hurt/G22.png',
        '../assets/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        '../assets/4_enemie_boss_chicken/5_dead/G24.png',
        '../assets/4_enemie_boss_chicken/5_dead/G25.png',
        '../assets/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    attackSound = addSound(new Audio('../assets/sounds/chicken/rooster-attack.mp3'));

    /**
     * Constructs the endboss object, loads images for all animation states, sets speed and initial position.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK)
        this.loadImages(this.IMAGES_ALERT)
        this.loadImages(this.IMAGES_ATTACK)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD)
        this.speed = 5;
        this.x = 2000;
    }

    /**
     * Starts the animation loop for the endboss, checking animation states regularly.
     */
    animate() {
        setStoppableInterval(() => {
            this.handleAnimation();
        }, 200);
    }

    /**
     * Calls specific handlers to determine and play the correct animation depending on the endboss' current state.
     */
    handleAnimation() {
        this.handleStandingAnimation();
        this.handleWalkAnimation();
        this.handleAttackingAnimation();
        this.handleHurtAnimation();
        this.handleDeathAnimation();
    }

    /**
     * Plays idle animation if the endboss has not yet started moving.
     */
    handleStandingAnimation() {
        if (this.x === 2000) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Plays walking animation if the endboss is currently moving.
     */
    handleWalkAnimation() {
        if (this.isWalking) {
            this.playAnimation(this.IMAGES_WALK)
        }
    }

    /**
     * Plays attacking animation if the endboss is currently colliding with the character.
     */
    handleAttackingAnimation() {
        if (this.world.character.isColliding(this)) {
            this.playAnimation(this.IMAGES_ATTACK)
        }
    }

    /**
     * Plays hurt animation if the endboss has currently been hit .
     */
    handleHurtAnimation() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT)
        }
    }

    /**
     * Plays death animation if the endboss is dead and stops walking.
     */
    handleDeathAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.isWalking = false;
            clearInterval(this.walkInterval)
        }
    }

    /**
     * Starts walking behavior after a delay to allow idle state first.
     */
    startWalking() {
        this.walkNotStarted = false;
        setTimeout(() => {
            this.isWalking = true;
            this.walk();
        }, 1200);
    }

    /**
     * Calculates the horizontal distance between the enemy and the character.
     * @returns {Number} - The difference in x-coordinate.
     */
    distance() {
        return this.world.character.x - this.x
    }

    /**
     * Makes the enemy walk towards the character if distance is large enough.
     */
    walk() {
        this.walkInterval = setInterval(() => {
            if (this.isDead()) return;
            if (this.distance() >= 80) {
                this.moveRight();
                this.otherDirection = true;
            } else if (this.distance() <= -80) {
                this.moveLeft(false);
            }
        }, 80);
    }
}