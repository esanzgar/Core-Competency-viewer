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

// Utility react classes
// <SplitCommasToBadges data={this.props.TrainingResource.competencyMapping} />
var SplitCommasToBadges = React.createClass({
  render: function() {
    var data = this.props.data.split(',').map(function (data, index) {
        return <span className="badge small margin-right-small" key={index}>{ data }</span>;
    });
    return <span className="SplitCommasToBadges">{data}</span>;
  }
});

// <SplitCommasToTags data={this.props.TrainingResource.domain} />
var SplitCommasToTags = React.createClass({
  render: function() {
    if (this.props.data) {
      var data = this.props.data.split(',').map(function (data, index) {
          return <span className="tag small margin-right-small" key={index}>{ data }</span>;
      });
    }
    return <span className="SplitCommasToTags">{data}</span>;
  }
});
