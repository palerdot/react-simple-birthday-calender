// shows a single birthday card
import React from 'react'

const Birthday = (props) => (
  <div className="birthday-display" 
    style={{
      width: props.dimension + "px", 
      height: props.dimension + "px", 
      backgroundColor: getRandomColor(), 
      color: 'white'
    }}
  >
    <div style={{display: 'flex', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      {props.name}
    </div>
  </div>
)

export default Birthday

// generates random color
// ref: https://stackoverflow.com/a/1484514/1410291
function getRandomColor() {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color;
}