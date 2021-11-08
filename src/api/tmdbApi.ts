import axiosClient from "./axiosClient";

interface MovieType {
    [type: string]: string;
}

interface TvType {
    [type: string]: string;
}

interface Category {
    [type: string]: string;
}


export const category: Category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType: MovieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType: TvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi = {

    getMoviesList: (type: string, params: any) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type: string, params: any) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate: string, id: number) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate: string, params: any) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate: string, id: number, params: any) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate: string, id: number) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate: string, id: number) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
}

export default tmdbApi;