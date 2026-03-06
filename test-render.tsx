import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Barbers } from './src/pages/Barbers';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/lib/i18n'; // Assuming this exists

try {
  const html = renderToString(
    React.createElement(
      StaticRouter,
      { location: '/barbers' },
      React.createElement(Barbers)
    )
  );
  console.log("RENDER SUCCESS. HTML length:", html.length);
} catch (e) {
  console.error("RENDER ERROR:", e);
}
