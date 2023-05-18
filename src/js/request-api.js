import axios from "axios";

export const getAPI = {
    KEY_API: '1c40c07b431bd44c3eec1b5bff019241',
    movies: function (name, page) {
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.KEY_API}&query=${name}&language=en-US&page=${page}`)
            .then((response) => {
                return response;
            })
            .catch(error => {
                switch (true) {
                    case error.response.status === 401:
                        console.log(error.status_message);
                        break;
                    case error.response.status === 404:
                        console.log(error.status_message);
                        break;
                    default:
                        console.log(`Something went wrong!`);
                };
            });
    },

    genres: function () {
    return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.KEY_API}&language=en-US`)
        .then((response) => {
            return response.data.genres;
        })
        .catch(error => {
            switch (true) {
                case error.response.status === 401:
                    console.log(error.status_message);
                    break;
                case error.response.status === 404:
                    console.log(error.status_message);
                    break;
                default:
                    console.log(`Something went wrong!`);
            };
        });
    },
    trendMovies: function (page) {
    return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${this.KEY_API}&language=en-US&page=${page}`)
        .then((response) => {
            return response;
        })
        .catch(error => {
            switch (true) {
                case error.response.status === 401:
                    console.log(error.status_message);
                    break;
                case error.response.status === 404:
                    console.log(error.status_message);
                    break;
                default:
                    console.log(`Something went wrong!`);
            };
        });
    },
    detailMovie: function (id_movie) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id_movie}?api_key=${this.KEY_API}&language=en-US`)
        .then((response) => {
            return response;
        })
        .catch(error => {
            switch (true) {
                case error.response.status === 401:
                    console.log(error.status_message);
                    break;
                case error.response.status === 404:
                    console.log(error.status_message);
                    break;
                default:
                    console.log(`Something went wrong!`);
            };
        });
    }

}

// Extarer una pelicula de la api Deimer Gutierrez....

export async function getMovie(query) {
    const KEY_API = '1c40c07b431bd44c3eec1b5bff019241';
    let url = `https://api.themoviedb.org/3/movie/${query}?api_key=${KEY_API}`;
    const response = await fetch(url);
    const data =  await response.json();
    return data;
}
