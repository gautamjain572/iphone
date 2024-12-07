import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { pauseImg, playImg, replayImg } from '../utils';

const VedioCarousel = () => {

    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);


    const [loadedData, setLoadedData] = useState([]);
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) videoRef.current[videoId].pause();
            else startPlay && videoRef.current[videoId].play();
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    useEffect(() => {
        const currProgress = 0;
        if (videoSpanRef.current[videoId]) {
            let anim = gsap.to(videoSpanRef.current[videoId], {
                onUpdate: () => { },
                onComplete: () => { }
            })
        }
    }, [videoId, startPlay])

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }))
                break;
            case 'video-last':
                setVideo((prev) => ({ ...prev, isLastVideo: true }))
                break;
            case 'video-reset':
                setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }))
                break;
            case 'play':
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
                break;
            default:
                return video;
        }
    }
    //console.log(videoRef);


    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video id='video' playsInline={true} preload='auto'
                                    muted ref={(el) => (videoRef.current[i] = el)}
                                    onPlay={() => setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))}>
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text, i) => (
                                    <p key={i}>{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, i) => (
                        <span key={i} ref={(el) => (videoDivRef.current[i] = el)}
                            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
                            <span className='absolute h-full w-full rounded-full' ref={(el) => (videoSpanRef.current[i] = el)} />
                        </span>
                    ))}
                </div>
                <button className='control-btn' onClick={isLastVideo
                    ? () => handleProcess('video-reset')
                    : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')}>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt="play" />
                </button>
            </div>
        </>
    )
}

export default VedioCarousel