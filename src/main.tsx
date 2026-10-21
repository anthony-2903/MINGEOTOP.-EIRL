import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LazyMotion, MotionConfig } from 'framer-motion'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={() => import('./lib/motionFeatures').then((module) => module.default)} strict>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
