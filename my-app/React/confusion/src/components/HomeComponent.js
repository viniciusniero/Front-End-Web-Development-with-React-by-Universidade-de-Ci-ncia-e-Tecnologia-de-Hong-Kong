import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        );
    } else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    } else {
        return (
            <FadeTransform 
                in
                transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle><h4>{item.name}</h4></CardTitle>
                        {item.designation ? <CardSubtitle><h5>{item.designation}</h5></CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}

function Home(props) { 
    return (
        <div className="container">
            <div className="row align-items-start mt-5 mb-5">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                        isLoading={props.isLoading}
                        errMess={props.dishesErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotions}
                        isLoading={props.promosLoading}
                        errMess={props.promosErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leaders}
                        isLoading={props.leadersLoading}
                        errMess={props.leadersErrMess} />
                </div>
            </div>
        </div>
    );
}

export default Home;