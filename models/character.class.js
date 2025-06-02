class Character extends MovableObject {

    y = 85;
    x = 50;
    height = 350;
    width = 180;
    speed = 10;

    offset = {
        top: 130,
        bottom: 15,
        left: 45,
        right: 45,
    }

    availableBottles = 0;
    collectedCoins = 0;
    isJumping = false;
    canJump = true;
    isPlayingJumpAnimation = false;

    hurtSound = addSound(new Audio('../assets/sounds/character/character-hurt.mp3'));
    jumpSound = addSound(new Audio('../assets/sounds/character/jump.mp3'));
    snoringSound = addSound(new Audio('../assets/sounds/character/snoring.mp3'));


    IMAGES_STANDING = [
        '../assets/2_character_pepe/1_idle/idle/I-1.png',
        '../assets/2_character_pepe/1_idle/idle/I-2.png',
        '../assets/2_character_pepe/1_idle/idle/I-3.png',
        '../assets/2_character_pepe/1_idle/idle/I-4.png',
        '../assets/2_character_pepe/1_idle/idle/I-5.png',
        '../assets/2_character_pepe/1_idle/idle/I-6.png',
        '../assets/2_character_pepe/1_idle/idle/I-7.png',
        '../assets/2_character_pepe/1_idle/idle/I-8.png',
        '../assets/2_character_pepe/1_idle/idle/I-9.png',
        '../assets/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_SLEEPING = [
        '../assets/2_character_pepe/1_idle/long_idle/I-11.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-12.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-13.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-14.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-15.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-16.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-17.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-18.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-19.png',
        '../assets/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    IMAGES_WALKING = [
        '../assets/2_character_pepe/2_walk/W-21.png',
        '../assets/2_character_pepe/2_walk/W-22.png',
        '../assets/2_character_pepe/2_walk/W-23.png',
        '../assets/2_character_pepe/2_walk/W-24.png',
        '../assets/2_character_pepe/2_walk/W-25.png',
        '../assets/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        '../assets/2_character_pepe/3_jump/J-33.png',
        '../assets/2_character_pepe/3_jump/J-34.png',
        '../assets/2_character_pepe/3_jump/J-35.png',
        '../assets/2_character_pepe/3_jump/J-36.png',
        '../assets/2_character_pepe/3_jump/J-37.png',
        '../assets/2_character_pepe/3_jump/J-38.png',
        '../assets/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURTING = [
        '../assets/2_character_pepe/4_hurt/H-41.png',
        '../assets/2_character_pepe/4_hurt/H-42.png',
        '../assets/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        '../assets/2_character_pepe/5_dead/D-51.png',
        '../assets/2_character_pepe/5_dead/D-52.png',
        '../assets/2_character_pepe/5_dead/D-53.png',
        '../assets/2_character_pepe/5_dead/D-54.png',
        '../assets/2_character_pepe/5_dead/D-55.png',
        '../assets/2_character_pepe/5_dead/D-56.png',
        '../assets/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Initializes the character by loading all necessary images,
     * applying gravity, and starting animation loops.
     */
    constructor() {
        super().loadImage('../assets/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity()

        this.animate()
    }

    /**
     * Starts continuous movement and animation updates.
     */
    animate() {
        setStoppableInterval(() => {
            this.handleMovement();
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.handleAnimation();
        }, 150);
    }

    /**
     * Handles character input for movement and jumping.
     */
    handleMovement() {
        this.handleMoveSideways();
        this.handleJump();
        this.checkLanding();
    }

    /**
     * Moves the character left or right based on keyboard input.
     * Updates the camera position to follow the character.
     */
    handleMoveSideways() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
            this.resetMovementStop()
            this.moveRight();
        }
        if (this.world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
            this.resetMovementStop()
            this.moveLeft(true);
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Makes the character jump if the jump key is pressed.
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead() && !this.isJumping) {
            this.jump();
            this.handleJumpSound();
            this.resetMovementStop();
        }
    }

    /**
     * Makes the object jump and start the animation.
     */
    jump() {
        if (!this.isAboveGround()) {
            this.canJump = false;
            this.isJumping = true;
            this.speedY = 30;
            this.handleJumpAnimation();
        }
    }

    /**
     * Checks if the character has finished his jump and adjusts variables.
     */
    checkLanding() {
        if (!this.isAboveGround() && this.speedY <= 0) {
        } else if (this.isAboveGround() && this.speedY === 0) {
            this.isJumping = false;
            this.canJump = true;
        }
    }

    /**
     * Executes all animation types depending on character state.
     */
    handleAnimation() {
        this.handleStandingAnimation();
        this.handleSleepingAnimation();
        this.handleWalkAnimation();
        this.handleHurtAnimation();
        this.handleDeathAnimation();
    }

    /**
     * Plays the walking animation if character is moving.
     */
    handleWalkAnimation() {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isJumping && !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_WALKING)
        }
    }

    /**
     * Plays the standing animation when no movement is detected.
     */
    handleStandingAnimation() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround()) {
            this.setMovementStop()
            this.playAnimation(this.IMAGES_STANDING);
        }
    }

    /**
     * Plays the sleeping animation if the character is idle for 3 seconds.
     * Also manages snoring sound.
     */
    handleSleepingAnimation() {
        const now = new Date().getTime();
        let isSleeping = (this.movementStop && (now - this.movementStop) >= 3000);
        this.handleSnoring(isSleeping);

        if (isSleeping && this.world.gameRunning) {
            this.playAnimation(this.IMAGES_SLEEPING);
        }
    }

    /**
     * Plays the jumping animation while the character is airborne.
     */
    async handleJumpAnimation() {
        if(this.isPlayingJumpAnimation) return;
        if (this.isJumping) {
            this.isPlayingJumpAnimation = true;
            this.playAnimationOnce(this.IMAGES_JUMPING, 700);
            this.isPlayingJumpAnimation = false;
        }
    }

    /**
     * Plays the hurt animation if the character was recently hit.
     */
    handleHurtAnimation() {
        if (this.isHurt() && this.world.gameRunning) {
            this.playAnimation(this.IMAGES_HURTING);
        }
    }

    /**
     * Plays the death animation when the character's life reaches zero.
     */
    handleDeathAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

    /**
     * Applies damage to the character and plays hurt sound if not dead.
     */
    hurtCharacter() {
        if (this.world.gameRunning) {
            this.applyDamage(5);
            this.resetMovementStop();
            if (!this.isDead() && !this.world.isMute) playSound(this.hurtSound)
        }
    }

    /**
     * Checks if the character is in a position to kill an enemy by jumping on it.
     * Endboss is excluded.
     * @param {MovableObject} enemy - The enemy object to test against.
     * @returns {Boolean} - True if in position to kill by jump.
     */
    inPositionToJumpKill(enemy) {
        return this.isColliding(enemy) && this.isAboveGround() && this.speedY < 0 && !(enemy instanceof Endboss);
    }

    /**
     * Manages the snoring sound state depending on whether the character is sleeping.
     * @param {Boolean} isSleeping - Whether the character is in sleeping state.
     */
    handleSnoring(isSleeping) {
        if (isSleeping && this.snoringSound.paused && this.world.gameRunning) {
            playSound(this.snoringSound)
        } else if (!isSleeping && !this.snoringSound.paused) {
            stopSound(this.snoringSound);
            this.snoringSound.currentTime = 0;
        }
    }

    /**
     * Plays the character's jump sound.
     */
    handleJumpSound() {
        playSound(this.jumpSound)
    }
}