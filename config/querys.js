
const query_all_get_products = `
    
        query GetAllProducts($retailerId: ID="${retailerID}" ) {
        menu(retailerId: $retailerId, filter: { category: FLOWER}, pagination: { offset: 0, limit: 20 } ) {
            products {
                id,
                name,
                brand{
                  name
                },
                image,
                category,
                subcategory,
                variants {
                  option,
                  priceMed,
                  priceRec,
                }
            },
            productsCount
        }
    }


`;
