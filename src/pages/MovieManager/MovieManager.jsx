import React, { useEffect } from 'react'
import { Table } from "antd"
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovieThunk } from '../../redux/slice/phimSlice';
import { NavLink, useParams } from 'react-router-dom';
import { Input, Button } from 'antd';
import { AudioOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';


const MovieManager = () => {
    const { maPhim } = useParams();
    const { Search } = Input;
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const { arrMovie } = useSelector((state) => state.phimSlice);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllMovieThunk("abc"))
    }, [])
    // const dataSource = [
    //     {
    //         key: '1',
    //         name: 'Mike',
    //         age: 32,
    //         address: '10 Downing Street',
    //     },
    //     {
    //         key: '2',
    //         name: 'John',
    //         age: 42,
    //         address: '10 Downing Street',
    //     },
    // ];

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            width: "10%"
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            width: "25%",
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return (
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => {
                        e.target.onError = null; e.target.src = `http://picsum.photos/${index}/50/50`
                    }} />
                )
            },
            width: "20%",
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            sorter: (a, b) => {
                let moTaA = a.mota.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if (moTaA > moTaB) {
                    return 1;
                }
                return -1;
            },
            render: (text, film) => {
                return <div>{film.moTa.lenght > 50 ? film.moTa.subStr(0, 50) + "..." : film.moTa}</div>
            },
            width: "25%",
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, film) => {
                return (
                    <div>
                        <NavLink key={1} className="mr-2 text-2xl" to={`/admin/edit-phim/${film.maPhim}`}><EditOutlined style={{ color: "blue" }} /></NavLink>
                        <NavLink key={2} className="text-2xl " to="/"><DeleteOutlined style={{ color: "red" }} /></NavLink>
                    </div>
                )
            },
            width: "20%"
        },
    ];
    const data = arrMovie;
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div>
            <h3 className="text-4xl"></h3>
            <Button className='mb-5'><NavLink to="/admin/them-phim">Thêm phim</NavLink></Button>
            <Search
                placeholder="Tìm kiếm"
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}

export default MovieManager