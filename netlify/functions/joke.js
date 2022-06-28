import jokes from './jokes.json'

export const handler = async () => {
    const randomIndex = Math.floor(Math.random() * jokes.length)
    const randomJoke = jokes[randomIndex]
    return {
        statusCode: 200,
        body: randomJoke
    }
} 
