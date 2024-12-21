import React from 'react'

function Info({ setInfo, user }) {
  const renderUserFields = (userData) => {
    const fields = [];

    const renderField = (key, value) => {
      if (typeof value === 'object') {
        // טפל באובייקטים באופן רקורסיבי
        fields.push(
          <li key={key}>
            <strong>{key}:</strong>
            <ul>{renderUserFields(value)}</ul>
          </li>
        );
      } else {
        fields.push(
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        );
      }
    };

    for (const key in userData) {
      renderField(key, userData[key]);
    }

    return fields;
  };

  return (
    <div className='info'>
      <button onClick={() => setInfo(false)}>❌</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {renderUserFields(user)}
      </ul>
    </div>
  );
}

export default Info;