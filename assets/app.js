function runApp(loadedData) {
  var ReviewCalculator = React.createClass({
     getInitialState: function() {
       return {data: loadedData};
     },
     render: function() {
       return (
          <table>
            <tbody>
             <tr>
               <td>{this.state.data[0].name}</td>
             </tr>
            </tbody>
          </table>
       );

     }
  });
 ReactDOM.render(<ReviewCalculator/>, document.getElementById('main-content-area'));
}







// load the json
$.getJSON( "/assets/datasets/ebi-cp-knowledge-base.json", function( data ) {
  // console.log(data);
  runApp(data);
});

// function formatName(user) {
//   return user.firstName + ' ' + user.lastName;
// }
//
// const user = {
//   firstName: 'Harper',
//   lastName: 'Perez'
// };
//
// const element = (
//   <h1>
//     Hello, {formatName(user)}!
//   </h1>
// );
//
// ReactDOM.render(
//   element,
//   document.getElementById('main-content-area')
// );
