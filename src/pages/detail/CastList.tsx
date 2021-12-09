import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

interface CastListProps {
    id: number;
}

const CastList = (props: CastListProps) => {

    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category!, props.id);
            // @ts-ignore
            setCasts(res.cast.slice(0, 5));
        }
        getCredits();
    }, [category, props.id]);


    return (
        <div className="casts">
            {
                casts.map((item: any, i: number) => (
                    <div className="casts__item" key={i}>
                        <div className="casts__item__img" style={{backgroundImage: 
                            `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList;
