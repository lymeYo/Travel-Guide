import React from 'react'

function SightsItem(props: any) {
   let { name, wikipedia_extracts: { text: info } = 'none' ,wikipedia: linkWiki, preview: { source: imgSrc = 'none' } = 'none' } = props.sight


   return (
      <div className='sight'>
         <h3 className='title'>
            {name}
         </h3>
         <div className='body'>
            <div className='image-wrapper'>
               <img src={imgSrc} alt="" />
            </div>
            <p className='info'>
               {info}
            </p>
            <div className='buttons'>
               <a href={linkWiki}>Подробнее</a>
            </div>
         </div>
      </div>
   )
}

export default SightsItem