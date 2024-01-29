import { spawn } from "child_process";
import Asteroid from "../common/Asteroid";

const randomWithinRange = (min, max) => {
    return Math.random() * (max - min) + min
}

const asteroids = new Map()

const spawnAsteroid = (instance, scale) => {
    const asteroid = new Asteroid(scale)
    asteroid.x = Math.random() * 1000
    asteroid.y = Math.random() * 1000
    asteroid.velocity.x = randomWithinRange(-5, 5)
    asteroid.velocity.y = randomWithinRange(-5, 5)
    instance.addEntity(asteroid)
    asteroids.set(asteroid.nid, asteroid)
}

const spawnAsteroidAtPosition = (instance, xPos, yPos, scale) => {
    const asteroid = new Asteroid(scale)
    asteroid.x = xPos
    asteroid.y = yPos
    asteroid.isSmallAsteroid = true
    asteroid.velocity.x = randomWithinRange(-10, 10)
    asteroid.velocity.y = randomWithinRange(-10, 10)
    instance.addEntity(asteroid)
    asteroids.set(asteroid.nid, asteroid)
}

const populate = (instance, howManyAsteroids) => {
    for (let i = 0; i < howManyAsteroids; i++) {
        spawnAsteroid(instance, 1)
    }
}

const populateAsteroidsFromDestroyedAsteroid = (instance, howManyAsteroids, xPos, yPos, scale) => {
    for (let i = 0; i < howManyAsteroids; i++) {
        spawnAsteroidAtPosition(instance, xPos, yPos, scale)
    }
}

const update = (delta) => {
    asteroids.forEach(asteroid => {
        asteroid.x += asteroid.velocity.x * delta
        asteroid.y += asteroid.velocity.y * delta
    })
}

export default {
    populate,
    update,
    asteroids,
    populateAsteroidsFromDestroyedAsteroid
}