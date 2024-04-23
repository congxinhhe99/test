import React, { useEffect, useState } from 'react'
import { quanLyPhimServ } from '../../services/quanLyPhim';
import "./listmovie.scss"
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovieThunk, handleAllMovie } from '../../redux/slice/phimSlice';
import { NavLink } from 'react-router-dom';
import Item from 'antd/es/list/Item';
const ListMovie = () => {
    // const [arrMovie, setArrMovie] = useState([]);
    const { arrMovie } = useSelector((state) => state.phimSlice);
    const dispatch = useDispatch()
    // console.log(arrMovie)
    useEffect(() => {
        //     quanLyPhimServ.getAllMovie()
        //         .then((res) => {
        //             // setArrMovie(res.data.content)
        //             dispatch(handleAllMovie(res.data.content))
        //         })
        //         .catch((err) => { console.log(err) })
        dispatch(getAllMovieThunk("abc"))
    }, [])
    return (
        <div className='grid grid-cols-4 gap-10'>
            {arrMovie.map((movie, index) => {
                return (
                    <div className='movie__item space-y-4' key={index}>
                        <img src={movie.hinhAnh} className='w-full h-96 object-cover rounded' alt="" />
                        <div className="infoMovie">
                            <h3>
                                <span className='bg-orange-600 text-white rounded py-1 px-2 text-lg font-semibold mr-3'>C18</span>
                                <span className='text-xl font-semibold'>{movie.tenPhim}</span>
                            </h3>
                            <p className='line-clamp-2'>{movie.moTa}</p>
                        </div>
                        <div className="muaVe">
                            <button className="bg-orange-600 w-full h-20 rounded font-semibold text-lg text-white">
                                <NavLink to={`/detail/${movie.maPhim}`}>Mua vé</NavLink></button>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default ListMovie