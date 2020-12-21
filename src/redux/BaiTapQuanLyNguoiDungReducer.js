const stateDefault = {
    mangNguoiDung: [],
    nguoiDung: {
        values: {
            stt: 0,
            taiKhoan: '',
            matKhau: '',
            email: '',
            hoTen: '',
            soDienThoai: '',
            loaiNguoiDung: 'Khách hàng' 
        },
        errors: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            hoTen: '',
            soDienThoai: '',
        }
    }

}

export const BaiTapQuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'THEM_NGUOI_DUNG': {
            const mangNguoiDungUpdate = [...state.mangNguoiDung,state.nguoiDung.values];
            return {...state, mangNguoiDung: mangNguoiDungUpdate}
        }
        case 'XOA_NGUOI_DUNG': {
            let mangNguoiDungUpdate = [...state.mangNguoiDung];
            let index = mangNguoiDungUpdate.findIndex(nd => nd.stt === action.xoaNguoiDung.stt);
            if (index !== -1) {
                mangNguoiDungUpdate.splice(index, 1);
            }
            state.mangNguoiDung = mangNguoiDungUpdate;
            return {...state}
        }
        case 'SUA_NGUOI_DUNG': {
            let newNguoiDung = {...state.nguoiDung};
            newNguoiDung.values = {...action.suaNguoiDung};
            return {...state, nguoiDung:newNguoiDung}
        }
        case 'CAP_NHAT_NGUOI_DUNG': {
            const mangNguoiDungUpdate = [...state.mangNguoiDung];
            let nguoiDungUpdate = mangNguoiDungUpdate.find(nd => nd.stt === state.nguoiDung.values.stt);
            console.log(nguoiDungUpdate)
            if (nguoiDungUpdate) {
                nguoiDungUpdate.taiKhoan = state.nguoiDung.values.taiKhoan;
                nguoiDungUpdate.matKhau = state.nguoiDung.values.matKhau;
                nguoiDungUpdate.email = state.nguoiDung.values.email;
                nguoiDungUpdate.hoTen = state.nguoiDung.values.hoTen;
                nguoiDungUpdate.soDienThoai = state.nguoiDung.values.soDienThoai;
                nguoiDungUpdate.loaiNguoiDung = state.nguoiDung.values.loaiNguoiDung;
            }
            state.mangNguoiDung = mangNguoiDungUpdate;
            return {...state}
        }
        case 'SET_NGUOI_DUNG': {
            state.nguoiDung = action.nguoiDung;
            return {...state}
        }
        default: return {...state}
    }
}