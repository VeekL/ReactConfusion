import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderDish(dish) {
        if (dish != null)
            return(
                <div class="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>               
                </div>
            );
        else
            return(
                <div>
                    <CardText>{this.props.selectedDish}</CardText>
                </div>
            );
    }

    renderComments(comments){
        if (comments.length > 0){
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map(comm => {
                            return (   
                             <li key={comm.id}>{comm.comment}<br/><li>-- {comm.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</li>
                            <br/></li>
                            )
                    })}
                   </ul>
               </div>
            )
        } else {
            return(
                <div></div>
            ) 
        }          
    }

    render() {
        const {dish} = this.props;
        if(dish){
            return (
                <div className="container">
                    <div className="row">
                        {this.renderDish(dish)}
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    }
}


export default DishDetail;