import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Nav, NavItem,
    Button, Modal, ModalHeader, ModalBody, Card, CardImg, CardText, CardBody, CardTitle,
    Row, Label, Col } from 'reactstrap';
import {Control, Errors, LocalForm} from 'react-redux-form';        
import { Link} from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}){
    if (dish != null){
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
    }
    else{
        return(
            <div>
                <CardText>{this.props.selectedDish}</CardText>
            </div>
        );
    };

}

function RenderComments({comments}){
    if (comments != null){
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (   
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                })}
                </ul>
                <CommentForm/>
            </div>

        );
    } else {
        return(
            <CommentForm/>
        ); 
    }          
}

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state ={
            isModalOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){

        return(
            <React.Fragment>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment </Button>
                    </NavItem>
                </Nav>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Label htmlFor="rating" >Rating</Label>
                            <Row className="form-group">
                                <Col>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Label htmlFor="author">Your Name</Label>
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".author" id="author" name="author"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Label htmlFor="message">Comment</Label>
                            <Row className="form-group">
                                <Col>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
            
        );
    }
}

    const DishDetail = (props) => {
            console.log('Dishdetail Component render invoked');
        if(props.dish){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>                            
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>                    
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>                
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments= {props.comments} />
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