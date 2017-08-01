//http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=eeb714a7a30e4f1a9acf6ced636a91a3

$(document).ready(function() {
  
  const URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  const KEY = 'eeb714a7a30e4f1a9acf6ced636a91a3';
  
  function getResults(searchTerm, beginDate, endDate) {
    $.getJSON(URL, {'q': searchTerm, 'api-key': KEY, 'begin_date': beginDate, 'end_date': endDate, 
      'fq': 'glocations:(CALIFORNIA)' }, 
    function(data) {
      console.log(data);
      const results = data.response.docs.map((doc, index) => showResults(doc));
      $('#results').html(results);
    });
  }
  

  function showResults(doc) {
    return `
        <li>
          <h3>${doc.web_url}</h3>
          
        </li>
      `;
  }
  
  
  $('#search-form').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('#search-term').val();
    var beginDate = $('#begin-date').val();
    console.log(beginDate);
    var endDate = $('#end-date').val();
    console.log(endDate);
    //var state = $('#state').val();
    getResults(searchTerm, beginDate, endDate);
  })
  
})
//'fq': 'glocations:('+state+')'
//'fq': 'glocations:(CALIFORNIA)'

//Desired App = month&year + location input
//dates are hard
//location as variable?
//both api's or one? archive is working for dates, search for location
//

