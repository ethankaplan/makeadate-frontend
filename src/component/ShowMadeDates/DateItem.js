import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import * as routes from '../../constants/routes'
class DateItem extends Component{
   


    
//The categories object isn't pulled in currently, but will be when fetch works
//Will add links, too.
     render(){
    return (
        <div>
        <li>
            Location:{this.props.loc}<br/>
            <ul>Activity:<br/>
            <li>{this.props.act.name} for some *CATEGORIES*<br/>
            {this.props.act.location.address1}, {this.props.act.location.zip_code}</li></ul>
            <ul>Dinner:
            <li>{this.props.din.name} for some *CATEGORIES*<br/>
            {this.props.din.location.address1}, {this.props.din.location.zip_code}</li></ul>
            
            
            
           
        </li>
        </div>
    
    )}
    
}
export default DateItem;
