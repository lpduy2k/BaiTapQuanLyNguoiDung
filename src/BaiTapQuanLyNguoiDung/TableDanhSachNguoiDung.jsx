import React, { Component } from 'react'
import {connect} from 'react-redux'

class TableDanhSachNguoiDung extends Component {

    renderNguoiDung = () => {
        return this.props.mangNguoiDung.map((nd, index) => {
            return <tr key={index}>
                <td>{index + 1}</td>
                <td>{nd.taiKhoan}</td>
                <td>{nd.matKhau}</td>
                <td>{nd.email}</td>
                <td>{nd.hoTen}</td>
                <td>{nd.soDienThoai}</td>
                <td>{nd.loaiNguoiDung}</td>
                <td>
                    <button className="btn btn-danger mr-3" onClick={() => {
                        this.props.dispatch({
                            type: 'XOA_NGUOI_DUNG',
                            xoaNguoiDung: nd
                        })
                    }}>Xóa</button>
                    <button className="btn btn-primary" onClick={() =>{
                        this.props.dispatch({
                            type: 'SUA_NGUOI_DUNG',
                            suaNguoiDung: nd
                        })
                    }}>Sửa</button>
                </td>
            </tr>        
        })
    }

    render() {
        return (
            <div className="card text-left border mt-5">
                <div className="card-header bg-dark text-white">Danh sách người dùng</div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr classname>
                                <th>STT</th>
                                <th>Tài khoản</th>
                                <th>Mật khẩu</th>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>Loại người dùng</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderNguoiDung()}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    mangNguoiDung: state.BaiTapQuanLyNguoiDungReducer.mangNguoiDung
})

export default connect(mapStateToProps)(TableDanhSachNguoiDung)
