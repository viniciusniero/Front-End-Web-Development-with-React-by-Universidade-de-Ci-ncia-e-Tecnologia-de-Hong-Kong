import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from "reactstrap";
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => !(val) || (val.length >= len)

class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            this.toggleModal()
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }
        
    render () {
        return (
            <>
            <Button outline color="secondary" onClick={this.toggleModal} ><span className="fa fa-pencil"></span>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader className="comment-header" toggle={this.toggleModal}>Submit Comments</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlfor="rating" md={12}>Rating</Label>
                        <Col md={12}>
                            <Control.select
                                model='.rating' 
                                id='rating' 
                                name='rating' 
                                className='form-control'>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select> 
                        </Col>
                    </Row>
                    <Row>
                        <Label htmlfor="name" md={12}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model=".author"
                            id="author"
                            name="author" className="form-control"
                            placeholder="Your Name"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15)
                            }}/>
                            <Errors className='text-danger' model=".author" show="touched"
                            messages={{
                                required: 'Must be greater than 2 characters',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }} />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlfor="comment" md={12}>Comment</Label>
                        <Col md={12}>
                            <Control.textarea model=".comment" id='comment' name='comment' row="6"
                            className='form-control' />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                            <Button type='submit' color='primary'>
                                Submit
                            </Button>
                        </Col>
                    </Row>


                    </LocalForm>

                </ModalBody>

            </Modal>
            </>
        )
    }
}

function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1">
                    <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                {/* </FadeTransform> */}
            </div>
        );
}

function RenderComments({comments, addComment, dishId}) {
    if (comments != null) 
        return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {/* <Stagger in> */}
                    {comments.map((comment)=>{
                        return (
                            // <Fade in>
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            // </Fade>
                        )
                    })}
                {/* </Stagger> */}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
        );
    else 
    return (
        <div></div>
    );
}
    
const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
    return (
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to='/menu'>Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    {props.dish.name}
                </BreadcrumbItem>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                </div>
            </Breadcrumb>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments}
                  addComment={props.addComment}
                  dishId={props.dish.id}
                />
            </div>
        </div>   
    );
    else 
        return (
            <div></div>
        );    
}

export default DishDetail