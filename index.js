//http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=eeb714a7a30e4f1a9acf6ced636a91a3

$(document).ready(function() {
  
  const URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  const KEY = 'eeb714a7a30e4f1a9acf6ced636a91a3';
  var startMMDD = "";
  var endMMDD = "";

  
  
  function getResults(startMMDD, endMMDD, state) {
    $.getJSON(URL, {'api-key': KEY, 'begin_date': startMMDD, 'end_date': endMMDD, 'fq': 'glocations:('+state+')' }, 
    function(data) {
      console.log(data);
      // if(data.response.meta.hits == 0) {
      //   $('#results').hide();
    
      //   //alert("No results for this time");
      //   return $('#no-results').text("Sorry, no results for this time and place.");
        
  
      // }
      if(data.response.meta.hits > 0){
        $('#no-results').hide();
        $('#results').show();
        const results = data.response.docs.map((doc, index) => showResults(doc));
        $('#results').html(results);
      }
      
      else {
        $('#results').hide();
        $('#no-results').show();
      
        //alert("No results for this time");
        return $('#no-results').text("Sorry, no results for this time and place.");
      }

  });
  }
  
  //response.meta.hits == 0
  //Dates user sees = MM/YYYY OR August,1950
  //Dates API sees = YYYYMMDD to YYYYMMDD OR 19500801 to 19500832
  
  
  function MMDDFormat(month, year) {
    var year = $('#year').val();//why does this have to be here, but not month?
    if((month == 'February') && (year % 4 == 0) && (year % 100 !== 0) || (year % 400 == 0)) {
      startMMDD = year+'0201';
      endMMDD = year+'0229';
    }
    else if(month == 'January') {
      startMMDD = year+"0101";
      endMMDD = year+"0131";
    }
    else if(month == 'February') {
      startMMDD = year+'0201';
      endMMDD = year+'0228';
    }
    else if(month == 'March') {
      startMMDD = year+'0301';
      endMMDD = year+'0331';
    }
    else if(month == 'April') {
      startMMDD = year+'0401';
      endMMDD = year+'0430';
    }
    else if(month == 'May') {
      startMMDD = year+'0501';
      endMMDD = year+'0531';
    }
    else if(month == 'June') {
      startMMDD = year+'0601';
      endMMDD = year+'0630';
    }
    else if(month == 'July') {
      startMMDD = year+'0701';
      endMMDD = year+'0731';
    }
    else if(month == 'August') {
      startMMDD = year+'0801';
      endMMDD = year+'0831';
    }
    else if(month == 'September') {
      startMMDD = year+'0901';
      endMMDD = year+'0930';
    }
    else if(month == 'October') {
      startMMDD = year+'1001';
      endMMDD = year+'1031';
    }
    else if(month == 'November') {
      startMMDD = year+'1101';
      endMMDD = year+'1130';
    }
    else if(month == 'December') {
      startMMDD = year+'1201';
      endMMDD = year+'1231';
    }
    
    console.log(startMMDD);
    console.log(endMMDD);
    
  }
 
  
  function showResults(doc) {
    console.log(doc.multimedia[2]);
    //$('#no-results').hide();
    
    return `
        <li>
          <h3>${doc.headline.main}</h3>
          <p class="snippet">${doc.snippet}</p>
          <a href="${doc.web_url}" target="_blank" class="link">Read more at nytimes.com</a>
        </li>
      `;
  }
  
  
  $('#search-form').submit(function(event) {
    event.preventDefault();
   $('#results-col').show();
    
    var month = $('#month').val();
    //var year = $('#year').val();
    var state = $('#state').val();
    MMDDFormat(month);
    getResults(startMMDD, endMMDD, state);
  });
  
})
//thoughts on input?
//location problems
//multimedia
//<img src="http://nytimes.com/${doc.multimedia[2].url}" />












