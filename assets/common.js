// This file will fetch the JSON data resource
// Your local app will need two functions:
// - data source: url to your json file
// - appProcessData (process or clean up data)
// - appTask (whatever you want to do with the loaded data)

// Base logic
// ---------
// Loading message(s)
$('#interactive').html('JavaScript detected..')

// load the json
// https://facebook.github.io/react-native/docs/network.html
function loadData(dataSource) {
  fetch(dataSource)
    .then((response) => response.json())
    .then((responseJson) => {
      $('#interactive').html('Data fetched...')
      appTask(appProcessData(responseJson));
    })
    .catch((error) => {
      console.error(error);
    });
}

// Utility react classes
// ---------
// <SplitCommasToBadges data={this.props.TrainingResource.competencyMapping} />
class SplitCommasToBadges extends React.Component {
  render() {
    var data = this.props.data.split(',').map(function (data, index) {
      return <span className="badge small margin-right-small" key={index}>{ data }</span>;
    });
    return <span className="SplitCommasToBadges">{data}</span>;
  }
}

// <SplitCommasToTags data={this.props.TrainingResource.domain} />
class SplitCommasToTags extends React.Component {
  render() {
    if (this.props.data) {
      var data = this.props.data.split(',').map(function (data, index) {
        return <span className="tag small margin-right-small" key={index}>{ data }</span>;
      });
    }
    return <span className="SplitCommasToTags">{data}</span>;
  }
}
