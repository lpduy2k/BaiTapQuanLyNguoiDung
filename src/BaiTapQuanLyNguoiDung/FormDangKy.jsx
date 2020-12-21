import React, { Component } from "react";
import {connect} from "react-redux"

class FormDangKy extends Component {

  handleChangeInput = event => {
    let {value, name} = event.target;
    let typeInput = event.target.getAttribute("typeInput")
    const newValue = {...this.props.nguoiDung.values};
    newValue[name] = value;

    const newError = {...this.props.nguoiDung.errors};
    newError[name] = value.trim() === '' ? name + ' không được bỏ trống !' : '';
    if(typeInput === 'email'){
      const regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!regexEmail.test(value)){
          newError[name] = name + ' không đúng định dạng !';
      }
    }

    if(typeInput === 'phone'){
      const regexNumber = /^[0-9]+$/;
      if (!regexNumber.test(value)){
          newError[name] = name + ' không đúng định dạng !';
      }
    }

    this.props.dispatch({
      type: 'SET_NGUOI_DUNG',
      nguoiDung: {
          values: newValue,
          errors: newError
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let valid = true;
    if (this.props.nguoiDung.values.taiKhoan.trim() === '' || 
    this.props.nguoiDung.values.matKhau.trim() === '' ||
    this.props.nguoiDung.values.email.trim() === '' ||
    this.props.nguoiDung.values.hoTen.trim() === '' ||
    this.props.nguoiDung.values.soDienThoai.trim() === '' 
    ){
      valid = false;
    }

    for (let key in this.props.nguoiDung.errors) {
      if (this.props.nguoiDung.errors[key] !== '') {
        valid = false;
      }
    }

    if (!valid) {
      alert("Dữ liệu không hợp lệ !")
      return;
    }

    this.props.nguoiDung.values.stt +=1;
    this.props.dispatch({
      type: 'THEM_NGUOI_DUNG',
    })

  }

  render() {
    let {taiKhoan, matKhau, email, hoTen, soDienThoai, loaiNguoiDung} = this.props.nguoiDung.values;
    return (
      <form className="border mt-5" onSubmit={this.handleSubmit}>
        <div classname="card text-left">
          <div className="card-header bg-dark text-white display-4 mb-4">
            Form đăng ký
          </div>
          <div classname="card-body">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <h3 className="mb-4 ml-3">Tài khoản</h3>
                    <input className="form-control" name="taiKhoan" value={taiKhoan} onChange={this.handleChangeInput} />
                    <p className="text text-danger">{this.props.nguoiDung.errors.taiKhoan}</p>
                  </div>
                  <div className="form-group">
                    <h3 className="mb-4 ml-3">Mật khẩu</h3>
                    <input className="form-control" name="matKhau" value={matKhau} onChange={this.handleChangeInput} />
                    <p className="text text-danger">{this.props.nguoiDung.errors.matKhau}</p>
                  </div>
                  <div className="form-group">
                    <h3 className="mb-4 ml-3">Email</h3>
                    <input className="form-control" name="email" value={email} typeInput="email" onChange={this.handleChangeInput} />
                    <p className="text text-danger">{this.props.nguoiDung.errors.email}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <h3 className="mb-4 ml-3">Họ tên</h3>
                    <input className="form-control" name="hoTen" value={hoTen} onChange={this.handleChangeInput} />
                    <p className="text text-danger">{this.props.nguoiDung.errors.hoTen}</p>
                  </div>
                  <div className="form-group">
                    <h3 className="mb-4 ml-3">Số điện thoại</h3>
                    <input className="form-control" name="soDienThoai" value={soDienThoai} typeInput="phone" onChange={this.handleChangeInput} />
                    <p className="text text-danger">{this.props.nguoiDung.errors.soDienThoai}</p>
                  </div>
                  <div className="form-group">
                    <h3 className="mb-4 ml-3">Loại người dùng</h3>
                    <select className="form-control" name="loaiNguoiDung" value={loaiNguoiDung} onChange={this.handleChangeInput}>
                        <option value="Khách hàng">Khách hàng</option>
                        <option value="Nhân viên">Nhân viên</option>
                        <option value="Sếp">Sếp</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
              <button className="btn btn-success" type="submit">Đăng ký</button>
              <button className="btn btn-primary ml-3" type="button" onClick={()=>{
                this.props.dispatch({
                  type: 'CAP_NHAT_NGUOI_DUNG',
                })
              }}>Cập nhật</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    nguoiDung: state.BaiTapQuanLyNguoiDungReducer.nguoiDung
  }
}

export default connect(mapStateToProps)(FormDangKy)
