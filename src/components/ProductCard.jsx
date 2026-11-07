import React from 'react';

export function ProductCard({ product }) {
  // Генерируем красивую заглушку с названием категории
  const placeholderSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">
      <rect fill="#eee" width="200" height="120"/>
      <text fill="#999" x="50%" y="55%" text-anchor="middle" font-size="14" font-family="sans-serif">${product.category}</text>
    </svg>`
  )}`;

  return (
    <article style={{ border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        height: '120px', 
        backgroundImage: `url("${placeholderSvg}")`, 
        backgroundSize: 'cover', 
        marginBottom: '1rem', 
        borderRadius: '4px' 
      }} />
      
      <h3 style={{ margin: 0, fontSize: '1.1rem', flexGrow: 1 }}>{product.title}</h3>
      <p style={{ margin: '8px 0', color: '#555', fontSize: '0.9rem' }}>Категория: {product.category}</p>
      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem', color: '#2563eb' }}>
        {product.price.toLocaleString('ru-RU')} ₽
      </p>
    </article>
  );
}