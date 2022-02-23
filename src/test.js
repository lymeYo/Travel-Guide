const axios = require('axios')
const { createClient } = require('pexels')

let test = async () => {
   let res = await axios.get('http://engine.hotellook.com/api/v2/lookup.json?query=%D0%BC%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&lang=ru&lookFor=both&limit=1')

   const client = createClient('563492ad6f9170000100000116a275e462d64379a3003cced42cfdfd');
   const query = 'москва';

   // client.photos.search({ query, per_page: 1 }).then(photos => {
   //    console.log(photos)
      
   // });

   console.log(res.results.locations[0])
}

test()