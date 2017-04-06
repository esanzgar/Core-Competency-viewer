// This file will fetch the JSON data resource
// Your local app will need two functions:
// - appProcessData (process or clean up data)
// - appTask (whatever you want to do with the loaded data)
$('#interactive').html('JavaScript detected..')

// load the json
// https://facebook.github.io/react-native/docs/network.html
fetch('../datasets/ebi-cp-knowledge-base.json')
  .then((response) => response.json())
  .then((responseJson) => {
    $('#interactive').html('Data fetched...')
    appTask(appProcessData(responseJson));
  })
  .catch((error) => {
    console.error(error);
  });
