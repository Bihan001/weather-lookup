import React from 'react';

const mapStyles = [
  { id: 'streets-v11', name: 'Streets' },
  { id: 'light-v10', name: 'Light' },
  { id: 'dark-v10', name: 'Dark' },
  { id: 'outdoors-v11', name: 'Outdoors' },
  { id: 'satellite-v9', name: 'Satellite' },
];

const ThemeSelect = ({ setTheme }) => {
  return (
    <div id='form-body-radio' className='card bordered'>
      <div className='title'>Map Theme</div>
      <div className='input radio'>
        <div className='input-radio-group'>
          {mapStyles.map((item) => (
            <label key={item.id}>
              <input
                type='radio'
                name='theme'
                value={item.id}
                onChange={(e) => setTheme(e.target.value)}
                defaultChecked={item.id === 'streets-v11'}
              />
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelect;
