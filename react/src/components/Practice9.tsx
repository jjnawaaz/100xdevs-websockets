import { useState } from "react";

const Practice9 = () => {
  const [search, setSeacrh] = useState("");
  return (
    <div>
      <SearchBox search={search} setSearch={setSeacrh} />
      <ProductList search={search} />
    </div>
  );
};

const SearchBox = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search...."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const ProductList = ({ search }) => {
  const products = [
    { id: 1, name: "MacBook Pro" },
    { id: 2, name: "Mechanical Keyboard" },
    { id: 3, name: "iPhone" },
  ];
  const filteredProducts = products.filter((product) =>
    product.name.includes(search.toLowerCase()),
  );
  return (
    <>
      <div>
        {filteredProducts.length > 0 ? (
          <>
            {filteredProducts.map((product) => (
              <>
                <h1>{product.name}</h1>
              </>
            ))}
          </>
        ) : (
          <>
            <div>No products found</div>
          </>
        )}
      </div>
    </>
  );
};

export default Practice9;
