import React from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';


// Adding components****And Export it
//After adding components, I should fill it with: constructor & renderthen export


function RenderDish({dish}) {
        if (dish != null)
            return(
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            </div>

            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments}) {
        if (comments != null)
            return(
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {comments.map((comments) => {
                            return (
                                <li key={comments.id}>
                                    <p> {comments.comments}</p>
                                    <p>-- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))} </p>
                                    <p>-- {comments.comment}</p>
                                </li>
                            )
                        }

                        )}
                    </ul>


                </div>
            );
        else
            return(
                <div></div>
            );

            }
const DishDetail = (props) => {
        if (props.dish != null)
            return (
              <div class="container">
                  <div className='row'>
                      <RenderDish dish = {props.dish} />
                      <RenderComments comments = {props.dish.comments} />

                  </div>
                  </div>
            );
        else
            return(
                <div></div>
            );




    }


export default DishDetail;