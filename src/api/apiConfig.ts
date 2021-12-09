const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

const apiConfig = {
    baseUrl: REACT_APP_BASE_URL,
    apiKey: REACT_APP_API_KEY,
    originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;