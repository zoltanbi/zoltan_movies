import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './movielist.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

interface MovieListProps {
    category: string;
    type: string;
    id?: number;
}

const MovieList = (props: MovieListProps) => {

    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params})
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params})
                }
            } else {
                // @ts-ignore
                response = await tmdbApi.similar(props.category, props.id);
            }
            // @ts-ignore
            setItems(response.results)
        }
        getList();
    }, []);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide>
                            <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList