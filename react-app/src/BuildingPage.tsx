import React from 'react'
import './BuildingPage.scss'

interface BuildingPageProps {
  buildingId: string
  onBackToMap: () => void
}

const BuildingPage: React.FC<BuildingPageProps> = ({ buildingId, onBackToMap }) => {
  // Convert building ID to display name
  const getBuildingName = (id: string) => {
    const names: { [key: string]: string } = {
      'castle': 'The Castle',
      'red-building': 'Red Building',
      'yellow-building': 'Yellow Building', 
      'blue-building': 'Blue Building',
      'purple-building': 'Purple Building',
      'orange-building': 'Orange Building',
      'videochat': 'Video Chat Room'
    }
    return names[id] || 'Unknown Building'
  }

  return (
    <div className="building-page">
      {/* Back arrow */}
      <button className="back-arrow" onClick={onBackToMap}>
        ← Back to Map
      </button>

      <div className="building-content">
        <h1 className="building-title">
          {getBuildingName(buildingId)}
        </h1>
        
        <div className="building-body">
          <p>Welcome to {getBuildingName(buildingId)}!</p>
          <p>This building page will be customized later.</p>
          <p>Building ID: <code>{buildingId}</code></p>
        </div>
      </div>
    </div>
  )
}

export default BuildingPage 