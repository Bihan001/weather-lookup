import React from 'react';

const mapStyles = ['streets-v11', 'light-v10', 'dark-v10', 'outdoors-v11', 'satellite-v9'];

const ThemeSelect = ({ setTheme }) => {
  return (
    <div id='form-body-radio' className='card bordered'>
      <div className='title'>Map Theme</div>
      <div className='input radio'>
        <div className='input-radio-group'>
          {mapStyles.map((item) => (
            <label key={item}>
              <input
                type='radio'
                name='theme'
                value={item}
                onChange={(e) => setTheme(e.target.value)}
                defaultChecked={item === 'streets-v11'}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelect;
