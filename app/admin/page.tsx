'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/admin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

type MenuItem = {
    id: number;
    ten_mon: string;
    gia: number;
    danh_muc: string;
};

export default function AdminPage() {
    const router = useRouter();
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [form, setForm] = useState({ ten_mon: '', gia: '', danh_muc: '', id: 0 });
    const [tableType, setTableType] = useState<'menu' | 'menuCoDong'>('menu'); // mặc định bảng khách hàng

    const fetchMenu = async () => {
        const res = await fetch(`/api/${tableType}`);
        const data = await res.json();
        setMenu(data);
    };

    useEffect(() => {
        if (sessionStorage.getItem('isAdmin') !== 'true') {
            router.push('/admin/loginAdmin');
        } else {
            fetchMenu();
        }
    }, [tableType]); // khi đổi bảng, tự load lại

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = form.id ? 'PUT' : 'POST';
        const url = form.id ? `/api/${tableType}/${form.id}` : `/api/${tableType}`;

        await fetch(url, {
            method,
            body: JSON.stringify({
                ten_mon: form.ten_mon,
                gia: parseInt(form.gia),
                danh_muc: form.danh_muc,
            }),
        });
        setForm({ ten_mon: '', gia: '', danh_muc: '', id: 0 });
        fetchMenu();
    };

    const handleDelete = async (id: number) => {
        await fetch(`/api/${tableType}/${id}`, { method: 'DELETE' });
        fetchMenu();
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Quản Lý {tableType === 'menu' ? 'Menu Khách Hàng' : 'Menu Thành Viên'}</h1>

            {/* Nút đăng xuất */}
            <button
                className={`${styles.logoutBtn} ${styles.logoutIcon}`}
                onClick={() => {
                    sessionStorage.removeItem('isAdmin');
                    router.push('/admin/loginAdmin');
                }}
            >
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
            <button
                className={`${styles.logoutBtn} ${styles.logoutText}`}
                onClick={() => {
                    sessionStorage.removeItem('isAdmin');
                    router.push('/admin/loginAdmin');
                }}
            >
                Đăng xuất
            </button>

            <select
                className={styles.input}
                value={tableType}
                onChange={(e) => setTableType(e.target.value as 'menu' | 'menuCoDong')}
            >
                <option value="menu">Bảng khách hàng</option>
                <option value="menuCoDong">Bảng thành viên IoT</option>
            </select>

            {/* Form thêm/sửa */}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    className={styles.input}
                    placeholder="Tên món"
                    value={form.ten_mon}
                    onChange={(e) => setForm({ ...form, ten_mon: e.target.value })}
                    required
                />
                <input
                    className={styles.input}
                    placeholder="Giá"
                    type="number"
                    value={form.gia}
                    onChange={(e) => setForm({ ...form, gia: e.target.value })}
                    required
                />
                <select
                    className={styles.input}
                    value={form.danh_muc}
                    onChange={(e) => setForm({ ...form, danh_muc: e.target.value })}
                    required
                >
                    <option value="">-- Chọn danh mục --</option>
                    <option value="Đồ uống">Đồ uống</option>
                    <option value="IoT Apartment & Hotel">IoT Apartment & Hotel</option>
                    <option value="Sâm Ngọc Linh">Sâm Ngọc Linh mật ong</option>
                </select>

                <button type="submit" className={styles.submitBtn}>
                    {form.id ? 'Cập nhật' : 'Thêm'}
                </button>
                {form.id > 0 && (
                    <button
                        type="button"
                        onClick={() => setForm({ ten_mon: '', gia: '', danh_muc: '', id: 0 })}
                        className={styles.cancelBtn}
                    >
                        Huỷ
                    </button>
                )}
            </form>

            {/* Danh sách */}
            <table className={styles.tableItems}>
                <thead>
                    <tr>
                        <th>Tên món</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th className={styles.actionColumn}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((item) => (
                        <tr key={item.id}>
                            <td>{item.ten_mon}</td>
                            <td>{item.gia.toLocaleString()} đ</td>
                            <td>{item.danh_muc}</td>
                            <td className={styles.actionColumn}>
                                <button
                                    className={`${styles.actionBtn} ${styles.editBtn}`}
                                    onClick={() => setForm({ ...item, gia: item.gia.toString() })}
                                >
                                    Sửa
                                </button>
                                <button
                                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
