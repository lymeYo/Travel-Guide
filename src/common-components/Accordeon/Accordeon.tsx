import React from 'react'
import "./styles.scss"

function Accordeon(elem: any) {
   const [isOpen, setIsOpen] = React.useState(true)
   const openAccordeon = () => setIsOpen(!isOpen)
   const visibleClass = isOpen ? '' : 'unvisible'
   const turnInfo = isOpen ? 'Свернуть' : 'Развернуть'

   return (
      <div className='accordeon'>
         <div className='body'>
            <div onClick={openAccordeon} className={`open-btn`}>
               {turnInfo}
            </div>
            <div className={`accordeon-body ${visibleClass}`}>
               {elem}
            </div>
         </div>
      </div>
   )
}

export default Accordeon