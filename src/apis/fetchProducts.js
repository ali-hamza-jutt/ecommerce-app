import axios from 'axios';
export const fetchProducts = async (categoryId) => {
  const options = {
      method: 'GET',
      url: 'https://asos2.p.rapidapi.com/products/v2/list',
      params: {
          lang: 'en-US',
          store: 'US',
          categoryId: categoryId, 
          limit: 48
      },
      headers: {
          'x-rapidapi-key': 'a7dcb20d73msh65c4b51b935b859p12e644jsn207e363a16e5',
          'x-rapidapi-host': 'asos2.p.rapidapi.com'
      }
  };
  
  try {
      const response = await axios.request(options);
      return response.data;
  } catch (error) {
      console.error(error);
      throw new Error('Error fetching products');
  }
};
