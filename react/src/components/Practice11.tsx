import React, { useCallback, useMemo, useState } from "react";

const ProductCard = React.memo(function ProductCard({
  product,
}: {
  product: { id: number; name: string };
}) {
  console.log("ProductCard rendered");
  return <h2>{product.name}</h2>;
});

function ProductPage() {
  const [count, setCount] = useState(0);

  const product = useMemo(() => {
    const product = { id: 1, name: "MacBook Pro" };
    return product;
  }, []);
  const handleClick = useCallback(() => {
    return setCount((prev) => prev + 1);
  }, []);
  return (
    <>
      <button onClick={handleClick}>Count: {count}</button>

      <ProductCard product={product} />
    </>
  );
}
