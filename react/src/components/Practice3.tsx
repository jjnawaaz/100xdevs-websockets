import { useMemo, useState } from "react";
const products = [
  { id: 1, name: "MacBook Pro" },
  { id: 2, name: "Mechanical Keyboard" },
  { id: 3, name: "iPhone" },
  { id: 4, name: "Wireless Mouse" },
  { id: 5, name: "Monitor" },
];
const Practice3 = () => {
  const [search, setSearch] = useState("");
  const setData = useMemo(() => {
    function debounce(func, limit) {
      let timeoutId = 0;

      return function (data) {
        // clear the timeout id here
        clearTimeout(timeoutId);
        // setTimeout
        const id = setTimeout(() => {
          func(data);
        }, limit);
        // set the Id here
        timeoutId = id;
      };
    }

    const setData = debounce(setSearch, 500);
    return setData;
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      {/* Search Box  */}
      <div>Search Box</div>
      <input
        type="text"
        placeholder="Search... "
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      {/* Products */}
      {filteredProducts.length > 0 ? (
        <>
          {filteredProducts.map((product) => {
            return (
              <>
                <Product product={product} key={product.id} />
              </>
            );
          })}
        </>
      ) : (
        <>
          <div>No Products found</div>
        </>
      )}
    </div>
  );
};

function Product({ product }: { product: { id: number; name: string } }) {
  return (
    <>
      <h1>{product.name}</h1>
    </>
  );
}
export default Practice3;
