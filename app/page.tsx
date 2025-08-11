"use client";

import { useEffect, useState } from "react";
import styles from "../styles/menu.module.css";
import Image from 'next/image';
import qrImg from '../asset/qr.png';
import {
  fetchMenuData,
  fetchEthPrice,
  calculateTotal,
  calculateDap,
  formatCurrency,
  MenuItem
} from "@/lib/menuUtils";

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchMenuData()
        .then((data) => {
          setMenu(data);
          const initialQuantities: Record<number, number> = {};
          data.forEach((item) => {
            initialQuantities[item.id] = 0;
          });
          setQuantities(initialQuantities);
        })
        .catch((err) => console.error(err));

      const updateEthPrice = () => {
        fetchEthPrice()
          .then(setEthPrice)
          .catch((err) => console.error(err));
      };

      updateEthPrice(); // Initial fetch
      const intervalId = setInterval(updateEthPrice, 30000);

      return () => clearInterval(intervalId); // Cleanup on unmount
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
  const giacodong = dapAmount / 4;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>IoT Garden</h1>
      <ul className={styles.list}>
        {Object.entries(groupedMenu).map(([category, items]) => (
          <li key={category} className={styles.categoryBox}>
            <div className={styles.categoryTitle}>
              <h3>{category}</h3>
            </div>
            <ul>
              {items.map((item) => (
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

                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className={styles.totalRow}>
        <div className={styles.totalContainer}>
          <h2>Tổng cộng: {formatCurrency(total)}</h2>
          <h1 className={styles.dap}>≈ {dapAmount.toFixed(1)} DAP</h1>
          <b>≈ {giacodong.toFixed(2)} DAP (Áp dụng cho cổ đông IoT)</b>

          <h3>1 DAP = {(ethPrice / 1000).toLocaleString('en-US').replace(/,/g, ', ')} VNĐ</h3>
        </div>
        <div>
          <ul className={styles.noBulletList}>
            <li className={styles.liSpace}>QR Thanh Toán (DAP)</li>
            <li className={styles.liSpace}>
              <Image src={qrImg} alt="QR" width={150} height={150} className={styles.imgBorder} />
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
}