async function checkCrossOriginIsolation(url) {
    try {
        // Fetch the URL and get the response headers
        const response = await fetch(url);
        const headers = response.headers;
    
        // Check if the required headers are present
        const coopHeader = headers.get('Cross-Origin-Opener-Policy');
        const coepHeader = headers.get('Cross-Origin-Embedder-Policy');
    
        // If both headers are present, return true indicating cross-origin isolation
        return coopHeader === 'same-origin' && coepHeader === 'require-corp';
      } catch (error) {
        // Handle any errors that occur during fetching or parsing headers
        console.error('Error checking cross-origin isolation:', error);
        return false; // Return false if an error occurs
      }
}

export default checkCrossOriginIsolation; 