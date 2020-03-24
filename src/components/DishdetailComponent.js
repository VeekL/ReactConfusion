import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody, Card, CardImg, CardText, CardBody, CardTitle,
    Form, FormGroup, Input, Label, Col } from 'reactstrap';
    import {Control, Field} from 'react-redux-form';    
import { Link, NavLink } from 'react-router-dom';

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
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(event){
        this.toggleModal();
        alert("Rating: " + this.rating);
        event.preventDefault();
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
                        <Form onSubmit={this.handleSubmitComment}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Field
                                    name="min"
                                    component="input"
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Col md={14}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
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