import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';

function RenderDish({dish}){
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

function RenderComments({comments}){
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
        ); 
    }          
}

    const DishDetail = (props) => {
            console.log('Dishdetail Component render invoked');
        if(props.dish){
            return (
                <div className="container">
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments= {props.dish.comments} />
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
    };


export default DishDetail;