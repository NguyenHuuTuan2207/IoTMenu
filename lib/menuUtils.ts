export type MenuItem = {
  id: number;
  ten_mon: string;
  gia: number;
  danh_muc: string;
};

export async function fetchMenuData(): Promise<MenuItem[]> {
  const res = await fetch('/api/menu');
  if (!res.ok) throw new Error('Lỗi khi tải menu từ DB');
  return res.json();
}

export const fetchEthPrice = async (): Promise<number> => {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=vnd");
  if (!res.ok) throw new Error("Lỗi tải giá ETH");
  const data = await res.json();
  return data.ethereum.vnd;
};

export const calculateTotal = (
  menu: MenuItem[],
  quantities: Record<number, number>
): number => {
  return menu.reduce((sum, item) => {
    return sum + item.gia * (quantities[item.id] || 0);
  }, 0);
};

export const calculateDap = (total: number, ethPrice: number): number => {
  return ethPrice > 0 ? (total * 4) / (ethPrice / 1000) : 0;
};

export const formatCurrency = (value: number): string =>
  value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });