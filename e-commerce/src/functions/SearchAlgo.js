const searchProducts = (products, searchTerm) => {
  const terms = searchTerm.toLowerCase().trim().split(/\s+/);
  
  return products
    .map(product => {
      const name = product.name.toLowerCase();
      
      // Calculate match score
      const matchScore = terms.reduce((score, term) => {
        return score + (name.includes(term) ? term.length : 0);
      }, 0);
      
      // Calculate similarity ratio
      const similarity = matchScore / name.length;
      
      // Check if all terms are included
      const allTermsIncluded = terms.every(term => name.includes(term));
      
      return {
        ...product,
        relevance: matchScore,
        allTermsIncluded,
        similarity
      };
    })
    .filter(product => product.allTermsIncluded || product.similarity > 0.5)
    .sort((a, b) => b.relevance - a.relevance || b.similarity - a.similarity);
};

export default searchProducts;