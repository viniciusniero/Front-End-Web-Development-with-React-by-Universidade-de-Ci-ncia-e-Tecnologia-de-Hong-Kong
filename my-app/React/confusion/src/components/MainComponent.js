import React, { Component } from 'react';

import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Loading } from "./LoadingComponent";
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    renderSelectedDish(dishes) {
        if(this.props.selectedDish != null) {
            return <DishDetail dish={dishes.filter((dish) => dish.id === this.props.selectedDish)[0]} />
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading} 
                    errMess={this.props.dishes.dishesErrMess} 
                    promotions={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 
                    promosLoading={this.props.promotions.isLoading} 
                    promosErrMess={this.props.promotions.errMess} 
                    leaders={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
                    leadersLoading={this.props.leaders.isLoading} 
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const MenuPage = () => {
            return (
                <Menu dishes={this.props.dishes}/>
            );
        }

        const AboutPage = () => {
            return (
                <About leaders={this.props.leaders}/>
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} 
                    commentsLoading={this.props.comments.isLoading }
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment} />
            );
        }

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/aboutus" component={AboutPage} />
                            <Route exact path="/menu" component={MenuPage} />
                            <Route exact path="/menu/:dishId" component={DishWithId} />
                            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                            <Redirect to="/" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));