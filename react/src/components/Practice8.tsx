type Item = {
  id: number;
  name: string;
  price: number;
};

export function Practice8({ items }: { items: Item[] }) {
  //   const [total, setTotal] = useState(0);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  //   useEffect(() => {
  //     setTotal(items.reduce((sum, item) => sum + item.price, 0));
  //   }, [items]);

  return <h2>Total: ₹{total}</h2>;
}
