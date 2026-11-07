import React from 'react';

export function Filters({ onFilterChange, initialFilters }) {
  // Используем массивы для категорий, чтобы выбирать несколько
  const [localCategories, setLocalCategories] = React.useState(initialFilters.categories || []);
  const [localMinPrice, setLocalMinPrice] = React.useState(initialFilters.minPrice || 0);
  const [localMaxPrice, setLocalMaxPrice] = React.useState(initialFilters.maxPrice || 1000);
  
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const errs = {};
    // Проверка на отрицательные значения
    if (localMinPrice < 0) errs.min = 'Цена не может быть отрицательной';
    if (localMaxPrice < 0) errs.max = 'Цена не может быть отрицательной';
    // Проверка диапазона
    if (localMinPrice > localMaxPrice) {
      errs.min = 'Цена «от» не может быть больше цены «до»';
      errs.max = 'Цена «до» не может быть меньше цены «от»';
    }
    return errs;
  };

  const handleApply = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onFilterChange({
      categories: localCategories,
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
    });
  };

  const handleCategoryToggle = (category) => {
    if (localCategories.includes(category)) {
      setLocalCategories(localCategories.filter((c) => c !== category));
    } else {
      setLocalCategories([...localCategories, category]);
    }
  };

  const categoriesOptions = [
    { id: 'electronics', label: 'Электроника' },
    { id: 'jewelery', label: 'Ювелирные изделия' },
    { id: "men's clothing", label: 'Мужская одежда' },
    { id: "women's clothing", label: 'Женская одежда' },
  ];

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1rem' }}>
        
        {/* Категории (чекбоксы) */}
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Категории</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {categoriesOptions.map((cat) => (
              <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={localCategories.includes(cat.id)}
                  onChange={() => handleCategoryToggle(cat.id)}
                />
                {cat.label}
              </label>
            ))}
          </div>
        </div>

        {/* Цена (ползунки) */}
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Цена от: {localMinPrice} ₽</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={localMinPrice}
            onChange={(e) => { setLocalMinPrice(Number(e.target.value)); setErrors(prev => ({ ...prev, min: '' })); }}
            style={{ width: '100%' }}
          />
          {errors.min && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.min}</span>}

          <label style={{ fontWeight: 'bold', display: 'block', margin: '15px 0 8px' }}>Цена до: {localMaxPrice} ₽</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={localMaxPrice}
            onChange={(e) => { setLocalMaxPrice(Number(e.target.value)); setErrors(prev => ({ ...prev, max: '' })); }}
            style={{ width: '100%' }}
          />
          {errors.max && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.max}</span>}
        </div>
      </div>

      <button 
        onClick={handleApply} 
        style={{ padding: '10px 24px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
      >
        Применить фильтры
      </button>
    </div>
  );
}