import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "MacBook Pro" },
  { id: 2, name: "Mechanical Keyboard" },
  { id: 3, name: "iPhone" },
  { id: 4, name: "Wireless Mouse" },
  { id: 5, name: "Monitor" },
];
const Practice2 = () => {
  const [search, setSearch] = useState("");

  const setData = useMemo(() => {
    function debouncer(func, limit) {
      // maintain an id for old operations
      let timeoutId = 0;
      return function (data) {
        // clearTimeout if called again
        clearTimeout(timeoutId);
        // initial time make the id
        let id = setTimeout(() => {
          func(data);
        }, limit);

        timeoutId = id;
      };
    }
    const setData = debouncer(setSearch, 500);
    return setData;
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <div>Search Box</div>
      {/* SearchBar */}
      <input
        type="text"
        placeholder="Search.."
        onChange={(e) => {
          // add debouncer here
          setData(e.target.value);
        }}
      />
      {/* Render Products here  */}
      {filteredProducts.length > 0 ? (
        <>
          {filteredProducts.map((product) => (
            <>
              <Product key={product.id} product={product} />
            </>
          ))}
        </>
      ) : (
        <>
          <div>No Products Found</div>
        </>
      )}
    </div>
  );
};

const Product = ({ product }: { product: { id: number; name: string } }) => {
  return (
    <>
      <h1>{product.name}</h1>
    </>
  );
};

export default Practice2;
