import React, { useState } from 'react'
import './MapPage.scss'

interface MapPageProps {
  onBuildingClick: (buildingId: string) => void
  onBackToLanding: () => void
}

const MapPage: React.FC<MapPageProps> = ({ onBuildingClick, onBackToLanding }) => {
  const [characterPosition, setCharacterPosition] = useState({ x: 30, y: 55 }) // Starting position on a road in the city

  // Building areas mapped to your exact city image positions
  const buildingAreas = [
    // Top left area - Castle with towers
    { id: 'castle', x: 22, y: 5, width: 20, height: 28, name: 'The Castle' },
    // Top right area - Red building with blue windows  
    { id: 'red-building', x: 62, y: 5, width: 32, height: 35, name: 'The Red Tower' },
    // Middle right - Yellow cubic building
    { id: 'yellow-building', x: 72, y: 35, width: 25, height: 25, name: 'The Golden Cube' },
    // Bottom right - Blue depot building
    { id: 'blue-building', x: 70, y: 65, width: 25, height: 20, name: 'The Blue Depot' },
    // Bottom center - Purple building
    { id: 'purple-building', x: 40, y: 75, width: 25, height: 20, name: 'The Purple Palace' },
    // Bottom left - Orange/yellow building
    { id: 'orange-building', x: 15, y: 60, width: 25, height: 25, name: 'The Orange Hall' },
    // Middle left - assign videochat to a central building
    { id: 'videochat', x: 8, y: 35, width: 30, height: 20, name: 'Video Chat Room' },
  ]

  const handleBuildingClick = (buildingId: string) => {
    console.log(`Clicked on building: ${buildingId}`)
    onBuildingClick(buildingId)
  }

  // Generate random labubu character style
  const getLabubuStyle = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    return { backgroundColor: randomColor }
  }

  const [labubuStyle] = useState(getLabubuStyle())

  return (
    <div className="map-page">
      {/* Back button */}
      <button className="back-btn" onClick={onBackToLanding}>
        ← Back to Landing
      </button>

      {/* Map container */}
      <div className="map-container">
        {/* Background city image */}
        <div className="city-background city-image-bg">
          {/* The background image will be set via CSS */}
        </div>

        {/* Character */}
        <div 
          className="labubu-character" 
          style={{ 
            left: `${characterPosition.x}%`, 
            top: `${characterPosition.y}%`,
            ...labubuStyle 
          }}
        >
          🧸
        </div>

        {/* Building clickable areas */}
        {buildingAreas.map((building) => (
          <div
            key={building.id}
            className="building-area"
            style={{
              left: `${building.x}%`,
              top: `${building.y}%`,
              width: `${building.width}%`,
              height: `${building.height}%`,
            }}
            onClick={() => handleBuildingClick(building.id)}
            title={building.name}
          />
        ))}
      </div>
    </div>
  )
}

export default MapPage 