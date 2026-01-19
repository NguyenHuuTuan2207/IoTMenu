"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/menu.module.css";
import Image from 'next/image';
import qrImg from '../../asset/qr.png';
import {
    fetchEthPrice,
    calculateTotal,
    fetchU2UPrice,
    calculateDap,
    formatCurrency,
    MenuItem
} from "@/lib/menuUtils";
import Link from "next/link";

export default function MenuPage() {
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [ethPrice, setEthPrice] = useState<number>(0);
    const [U2UPrice, setU2UPrice] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetch("/api/menuCoDong")
                .then(res => res.json())
                .then((data: MenuItem[]) => {
                    setMenu(data);
                    const initialQuantities: Record<number, number> = {};
                    data.forEach((item) => {
                        initialQuantities[item.id] = 0;
                    });
                    setQuantities(initialQuantities);
                })
                .catch((err) => console.error("Lỗi load menuCoDong:", err));

            const updateEthPrice = () => {
                fetchEthPrice()
                    .then(setEthPrice)
                    .catch((err) => console.error(err));
            };

            const updateU2UPrice = () => {
                fetchU2UPrice()
                    .then(setU2UPrice)
                    .catch((err) => console.error(err));
            };

            // ✅ Hàm cập nhật thời gian
            const updateTime = () => {
                const now = new Date();
                const pad = (n: number) => n.toString().padStart(2, "0");

                const hours = pad(now.getHours());
                const minutes = pad(now.getMinutes());
                const seconds = pad(now.getSeconds());
                const day = pad(now.getDate());
                const month = pad(now.getMonth() + 1);
                const year = now.getFullYear();

                const formatted = `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
                setCurrentTime(formatted);
            };

            updateEthPrice();
            updateU2UPrice();
            updateTime();

            const intervalId = setInterval(updateEthPrice, 30000);
            const u2uIntervalId = setInterval(updateU2UPrice, 30000);
            const timeIntervalId = setInterval(updateTime, 1000); // cập nhật mỗi giây

            return () => {
                clearInterval(intervalId);
                clearInterval(u2uIntervalId);
                clearInterval(timeIntervalId);
            };
        }
    }, []);

    const handleQuantityChange = (id: number, value: number | string) => {
        const qty = Math.max(0, typeof value === "string" ? parseInt(value) || 0 : value);
        setQuantities((prev) => ({
            ...prev,
            [id]: qty,
        }));
    };

    const groupedMenu = menu.reduce((acc: Record<string, MenuItem[]>, item) => {
        if (!acc[item.danh_muc]) acc[item.danh_muc] = [];
        acc[item.danh_muc].push(item);
        return acc;
    }, {});

    const total = calculateTotal(menu, quantities);
    const dapAmount = calculateDap(total, ethPrice);

    const hasItems = Object.values(quantities).some(qty => qty > 0);
    const onlyIoTItems =
        hasItems &&
        Object.entries(quantities).every(([id, qty]) => {
            if (qty === 0) return true;
            const item = menu.find(i => i.id === Number(id));
            return item?.danh_muc === "IoT Apartment & Hotel";
        });

    const categoryOrder = ["Đồ uống", "Sâm Ngọc Linh", "IoT Apartment & Hotel"];
    const sortedCategories = [
        ...categoryOrder,
        ...Object.keys(groupedMenu).filter(cat => !categoryOrder.includes(cat))
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>IoT Member Menu</h1>
            <ul className={styles.list}>
                {sortedCategories.map((category) =>
                    groupedMenu[category] ? (
                        <li key={category} className={styles.categoryBox}>
                            <div className={styles.categoryTitle}>
                                <h3>{category}</h3>
                            </div>
                            <ul>
                                {groupedMenu[category].map((item) => (
                                    <li key={item.id} className={styles.item}>
                                        <div className={styles.itemInfo}>
                                            <span>
                                                {item.ten_mon.replace(/\s*\(.*\)/, '')}
                                                <br />
                                                <small style={{ fontSize: '0.85em', color: '#555' }}>
                                                    {/\(.*\)/.test(item.ten_mon) && item.ten_mon.match(/\(.*\)/)?.[0]}
                                                </small>
                                            </span>
                                        </div>
                                        <div className={styles.quantity}>
                                            <button
                                                className={styles.decreaseBtn}
                                                onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 0) - 1)}
                                            >-</button>
                                            <input
                                                type="number"
                                                min="0"
                                                value={quantities[item.id] || 0}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                className={styles.input}
                                            />
                                            <button
                                                className={styles.increaseBtn}
                                                onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 0) + 1)}
                                            >+</button>
                                            <span className={styles.price}>{formatCurrency(item.gia)}</span>

                                            {item.danh_muc === "IoT Apartment & Hotel" && U2UPrice > 0 && (
                                                <div className={styles.u2udisplay}>
                                                    {(item.gia / U2UPrice).toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })} U2U
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ) : null
                )}
            </ul>
            <div className={styles.totalRow}>
                <div className={styles.totalContainer}>
                    <h2>Tổng cộng: {formatCurrency(total)}</h2>
                    <h1 className={styles.dap}>≈ {dapAmount.toFixed(2)} DAP </h1>

                    {onlyIoTItems && U2UPrice > 0 && (
                        <h2>
                            = {(total / U2UPrice).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} U2U
                        </h2>
                    )}

                    {ethPrice > 0 && (
                        <h3>1 DAP = {(ethPrice / 100).toLocaleString('vi-VN')} VNĐ</h3>
                    )}
                    {U2UPrice > 0 && (
                        <>
                            <h3>1 U2U = {U2UPrice.toLocaleString('vi-VN')} VNĐ</h3>
                            {/* ✅ Thời gian hiển thị ngay dưới dòng 1 U2U */}
                            <p style={{ fontSize: "0.8em" }}>{currentTime}</p>
                        </>
                    )}
                </div>
                <div>
                    <ul className={styles.noBulletList}>
                        <li className={styles.liSpace}>QR Thanh Toán (DAP)</li>
                        <li className={styles.liSpace}>
                            <Image src={qrImg} alt="QR" width={150} height={150} className={styles.imgBorder} />
                        </li>
                        <li>
                            <Link href="/" className={styles.buttonNavigate}>
                                Click đến menu khách hàng
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <footer className={styles.footer}>
                <p>© Bản quyền thuộc về IoT Innovation Hub 2025</p>
            </footer>
        </div >
    );
}
