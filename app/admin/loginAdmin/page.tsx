'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/loginAdmin.module.css';

export default function LoginAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ten: username, mat_khau: password }),
            });

            const data = await res.json();

            if (data.success) {
                sessionStorage.setItem('isAdmin', 'true');
                router.push('/admin');
            } else {
                setError(data.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            console.error('Lỗi:', err);
            setError('Lỗi server, vui lòng thử lại sau');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Đăng nhập quản trị</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Đăng nhập</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}
