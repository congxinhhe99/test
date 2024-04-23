import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { quanLyRapServ } from '../../services/quanLyRap';
import LichChieuPhim from '../../components/LichChieuPhim/LichChieuPhim';

const LichChieuCumRap = () => {
    const [arrCumRap, setArrCumRap] = useState([]);

    useEffect(() => {
        quanLyRapServ.getAllThongTinCumRap()
            .then(
                (res) => {
                    setArrCumRap(res.data.content)
                }
            )
            .catch(
                (err) => { console.log(err) }
            )
    }, [])
    return (
        <div className="mt-10">
            <h2 className='font-bold text-2xl text-center'>
                Danh sach lich chieu cum rap
            </h2>
            {/* tab lich chieu cum rap */}
            <div>
                <Tabs
                    tabPosition="left"
                    style={{
                        height: "700px"
                    }}
                    items={arrCumRap.map((cumrap, index) => {
                        return {
                            label: <img className="w-14" src={cumrap.logo} />,
                            key: cumrap.maHeThongRap,
                            children: <LichChieuPhim cumrap={cumrap.lstCumRap} />
                        }
                    })}
                />
            </div>
        </div>
    )
}

export default LichChieuCumRap  