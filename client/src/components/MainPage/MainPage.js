import React from "react";
import img1 from "../../images/depositphotos_37556247-stock-photo-erawan-waterfall-in-kanchanaburi-province.jpg";
import img2 from "../../images/original-99-1.jpg";
import img3 from "../../images/information_items_457.jpg";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/src/styles';
import "./MainPage.less";

export default class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slide: 0
        }
        console.log(this.props);
        this.willMountCallback = this.willMountCallback.bind(this);
    }
    willMountCallback(){
        this.props.timer = setInterval(()=>{      
            console.log(this.selected);    
            document.querySelector(".aws-sld__next").click();
        }, 2500);
    }
    render(){
        return(
            <div>                  
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Lorem ipsum dolor</h1>
                        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                    </div>
                </div>                
                <div className="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
                            <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                        </div>
                        <div class="col-lg-4">                        
                            <h2>Heading</h2>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                            <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                        </div>
                        <div class="col-lg-4">
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                            <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                        </div>
                    </div>

                    <hr class="featurette-divider"></hr>

                    <div class="row featurette">
                        <div class="col-md-7">
                            <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
                            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                        </div>
                        <div class="col-md-5">
                            <img className="rounded float-right" width={"100%"} src={ img1 } />
                        </div>
                    </div>
                    
                    <hr class="featurette-divider"></hr>

                    <div className="row">                    
                        <div className="col-md-4">                        
                            <AwesomeSlider startup = { true } infinity = { true } bullets = { false } onFirstMount = { this.willMountCallback }>
                                <div><img src={ img1 } /></div>                
                                <div><img src={ img2 } /></div>
                                <div><img src={ img3 } /></div>          
                            </AwesomeSlider>
                        </div>
                        <div className="col-md-8">
                            <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
                            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                        </div>
                    </div>

                    <hr class="featurette-divider"></hr>

                    <footer className="container-fluid">
                        <p className="float-right"><a href="#">Back to top</a></p>
                        <p>Company, Inc.</p>
                    </footer>
                </div>
            </div>
        );
    }  
}