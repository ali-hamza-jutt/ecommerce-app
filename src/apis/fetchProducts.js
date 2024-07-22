import axios from "axios";

export const fetchProducts=async()=>{
    const options = {
        method: 'GET',
        url: 'https://asos2.p.rapidapi.com/products/v2/list',
        params: {
          lang: 'en-US',
          store: 'US',
          categoryId: 4209,
          limit: 48
        },
        headers: {
          'x-rapidapi-key': '115db57930msha0f3dc071ebede0p12df84jsn59e79842489a',
          'x-rapidapi-host': 'asos2.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data.products);
      } catch (error) {
          console.error(error);
      }
}