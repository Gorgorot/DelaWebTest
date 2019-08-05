import React from "react";
import profile_image from "../../images/unnamed.jpg";
import './Profile.less';
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            about: "",
            city: "",
            country: "",
            birthday: ""
        };
    }

    componentWillMount(){
        axios.request({
            url: "/api/profile/get",
            method: "POST"
        })
        .then(response=>{
            var data = response.data;
            console.log(data);
            if(data.status == true){
                this.setState({
                    country: data.country,
                    city: data.city,
                    birthday: new Date(data.birthday*1000).toISOString().replace(/^([^T]+)T(.+)$/,'$1'),
                    about: data.about
                })
            }
        })
        .catch(err=>{
            console.error(err);
        })
    }

    render(){
        return(
            <div className="container mt-5">
                <div className="row">
                    <div class="col-sm-3">
                        <div class="card">
                            <h5 class="card-header">Ваш профиль</h5>
                            <img src={ profile_image } class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Иванов И.И.</h5>
                            </div>
                            <ul class="list-group list-group-flush">                                    
                                <li class="list-group-item text-green">Online</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="card">
                            <h5 class="card-header">Подробная информация</h5>
                            <div class="card-body">
                                <h5 class="card-title">Информация о себе:</h5>
                                <p class="card-text">
                                    { this.state.about }
                                </p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item  p-0">
                                    <div className="row m-0">
                                        <div className="col-md-6 border-right-1 px-4 py-2 bg-gray ">Страна:</div>
                                        <div className="col-md-6 px-4 py-2">{ this.state.country }</div>
                                    </div>
                                </li>
                                <li class="list-group-item  p-0">
                                    <div className="row m-0">
                                        <div className="col-md-6 border-right-1 px-4 py-2 bg-gray ">Дата рождения:</div>
                                        <div className="col-md-6 px-4 py-2">{ this.state.birthday }</div>
                                    </div>
                                </li>
                                <li class="list-group-item  p-0">
                                    <div className="row m-0">
                                        <div className="col-md-6 border-right-1 px-4 py-2 bg-gray ">Город:</div>
                                        <div className="col-md-6 px-4 py-2">{ this.state.city }</div>
                                    </div>
                                </li>
                            </ul>          
                            <div className="card-body">
                                <Link to={`/profile/${this.props.id}/edit`} className="btn btn-primary">Редактировать</Link>
                            </div>                      
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}