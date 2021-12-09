import React from 'react'

import { useParams } from 'react-router'

import PageHeader from '../components/page-header/PageHeader';

import { category as cate} from '../api/tmdbApi';

import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {

    const { category } = useParams();

    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : (category === cate.tv ? 'TV Series' : 'Error 404: Not found')}
            </PageHeader>
            { (category === cate.movie || category === cate.tv) ? (
                <div className="container">
                    <div className="section mb-3">
                        <MovieGrid category={category!}/>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="section mb-3">
                        <h2 className="global-center">Oops, we can't find what you are looking for!</h2>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default Catalog
