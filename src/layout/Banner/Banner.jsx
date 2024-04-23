import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import { quanLyPhimServ } from '../../services/quanLyPhim';
import "./banner.scss"
import { useDispatch } from 'react-redux';
import { handleTurnOffLoading, handleTurnOnLoading } from '../../redux/slice/loadingSlice';

const Banner = () => {
    const dispatch = useDispatch();
    const [arrBanner, setArrBanner] = useState([]);
    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    useEffect(() => {
        dispatch(handleTurnOnLoading())
        quanLyPhimServ.getAllBanner()
            .then((res) => {
                dispatch(handleTurnOffLoading())
                setArrBanner(res.data.content);
            })
            .catch((err) => {
                dispatch(handleTurnOffLoading())
                console.log(err)
            })
    }, [])
    return (
        <div className="carousel__banner">
            <Carousel
                nextArrow={<div><i className="fa-regular fa-arrow-right"></i></div>}
                prevArrow={<div><i className="fa-regular fa-arrow-left"></i></div>}
                arrows={true} dots={false} afterChange={onChange}>
                {arrBanner.map((banner, index) => {
                    return (
                        <div key={index} className='h-screen-70'>
                            <img src={banner.hinhAnh} className='w-full' alt="" />
                        </div>
                    )
                })}
            </Carousel>
        </div>

    )
}
export default Banner