import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './sw-register';

const mount = document.getElementById('advice-tracker')!;
const usuario = mount.getAttribute('data-usuario') ?? 'anon';
createRoot(mount).render(<App usuarioWP={usuario} />);
