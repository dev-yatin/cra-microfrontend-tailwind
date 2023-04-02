import { mount as productAppMount } from "products/Product";
import React, { useEffect, useRef } from "react";

const ProductApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      productAppMount(ref.current);
    }
  }, []);

  return <div ref={ref} id="product-app"></div>;
};

export default ProductApp;
