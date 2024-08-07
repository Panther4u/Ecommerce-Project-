// ProductCardLoader.jsx
import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductCardLoader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="400" height="300" />
    <rect x="0" y="320" rx="4" ry="4" width="350" height="20" />
    <rect x="0" y="350" rx="4" ry="4" width="200" height="20" />
    <rect x="0" y="380" rx="4" ry="4" width="300" height="20" />
    <rect x="0" y="410" rx="4" ry="4" width="100" height="30" />
  </ContentLoader>
);

export default ProductCardLoader;
