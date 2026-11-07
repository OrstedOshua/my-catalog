import React, { useState, useEffect } from 'react';
import { Filters } from './Filters';
import { ProductCard } from './ProductCard';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Начальные фильтры: массив категорий пуст, диапазон от 0 до 1000
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 1000
  });

  // 1. Загрузка данных при монтировании
  useEffect(() => {
    const controller = new AbortController();
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal
        });
        
        if (!res.ok) {
          throw new Error(`Ошибка сети: ${res.status}`);
        }
        
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        // Игнорируем ошибку, если это был принудительный abort
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        // Если компонент не размонтирован, убираем лоадер
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    
    loadData();
    
    // Функция очистки: отменяет запрос при размонтировании
    return () => controller.abort();
  }, []);

  // 2. Фильтрация (пересчитываем при изменении товаров или фильтров)
  useEffect(() => {
    let result = products;

    // Фильтр по массиву категорий (если массив не пустой)
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    
    // Фильтр по минимальной цене
    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice);
    }
    
    // Фильтр по максимальной цене
    if (filters.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }

    setFilteredProducts(result);
  }, [products, filters]);

  if (loading) return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Загрузка товаров...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', fontSize: '1.2rem' }}>Ошибка: {error}</p>;

  return (
    <section>
      <Filters onFilterChange={setFilters} initialFilters={filters} />
      
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777', fontSize: '1.1rem' }}>Товары не найдены по выбранным фильтрам.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}