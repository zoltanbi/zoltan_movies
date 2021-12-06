import React, { useEffect, useState, useRef } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './heroslide.scss';
import { useNavigate } from 'react-router';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState<[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                // TODO: figure out TS error
                // @ts-ignore
                setMovieItems(response.results.slice(0, 4));
                //console.log(response)
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, [])

    return (
        <div className="hero-slide">
            <Swiper
            // @ts-ignore
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 4000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active': ''}`}/>
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
        </div>
    )
}

interface ItemProps {
    item: any;
    className: string;
}

const HeroSlideItem = (props: ItemProps) => {

    let navigate = useNavigate();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);  
        console.log(`modal_${item.id}`)
        console.log(modal)

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        // @ts-ignore
        if (videos.results.length > 0) {
            // @ts-ignore
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal!.querySelector('.modal__content > iframe')!.setAttribute('src', videoSrc);
        } else {
            modal!.querySelector('.modal__content')!.innerHTML = 'No trailer';
        }

        modal!.classList.toggle('active');
    }

    return (
        <div 
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('/movie' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="poster"/>
                </div>
            </div>
        </div>
    )
}

const TrailerModal = (props: any) => {

    const item = props.item;

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const onClose = () => iframeRef.current?.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
