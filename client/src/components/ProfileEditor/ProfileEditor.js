import React from "react";
import profile_image from "../../images/unnamed.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import cities from "./cities";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/nest.css";

console.log(cities);

export default class ProfileEditor extends React.Component{
    constructor(props){
        super(props);
        this.saveChanges = this.saveChanges.bind(this);
        this.state = {
            about: "",
            city: "",
            country: "",
            birthday: ""
        };
    }

    saveChanges(){
        axios.request({
            url: "/api/profile/edit",
            method: "POST",
            data: {
                ...this.state,
                birthday: new String(new Date(this.state.birthday).getTime()/1000)
            },
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(response=>{
            if(response.data.status == true){                
                new Noty({
                    type: "success",
                    layout: "bottomRight",
                    timeout: 1000,
                    theme: "nest",
                    text: 'Изменения сохранены!',
                    callbacks: {
                        afterClose: ()=>{
                            window.location.href = `/#/profile/${this.props.id}`;
                        }
                    }
                }).show();
            }
        })
        .catch(err=>{
            new Noty({
                type: "error",
                layout: "bottomRight",
                timeout: 1000,
                theme: 'nest',
                text: 'Изменения не сохранены!',
                callbacks: {
                    afterClose: ()=>{
                        window.location.href = "../";
                    }
                }
            }).show();
        })
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
                    <div className="col-sm-3">
                        <div className="card">
                            <h5 className="card-header">Ваш профиль</h5>
                            <img src={ profile_image } className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Иванов И.И.</h5>
                            </div>
                            <ul className="list-group list-group-flush">                                    
                                <li className="list-group-item text-green">Online</li>
                                <li className="list-group-item">mail@mail.ru</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="card">
                            <h5 className="card-header">Подробная информация</h5>
                            <div className="card-body">
                                <h5 className="card-title">Информация о себе:</h5>
                                <div className="input-group mb-3">                                    
                                    <textarea className="form-control" value={ this.state.about } onChange={ (e)=> { this.setState({ about: e.target.value }) } }></textarea>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Дата рождения</span>
                                    </div>
                                    <input type="date" className="form-control" onChange={ (e)=> { this.setState({ birthday: e.target.value }) } } placeholder="Дата рождения" aria-label="Дата рождения" aria-describedby="basic-addon1" value={ this.state.birthday }/>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01">Страна</label>
                                    </div>
                                    <select class="custom-select" id="inputGroupSelect01" value={ this.state.country } onChange={ (e)=> { this.setState({ country: e.target.value }) } }>
                                        {
                                            ["Россия", "Америка"].map(value=>
                                                <option className={ value==this.state.country ? "selected" : null } value={value}>{value}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01">Город</label>
                                    </div>
                                    <select class="custom-select" id="inputGroupSelect01" value={ this.state.city } onChange={ (e)=> { this.setState({ city: e.target.value }) } }>
                                        {
                                            this.state.country ? cities[this.state.country].map(city=>
                                                <option className={ city==this.state.city ? "selected" : null } value={city}>{ city }</option>
                                            )
                                            : null
                                        }
                                    </select>
                                </div>
                            </div>                                    
                            <div className="card-body">
                                <div class="row justify-content-between px-4">
                                    <div>
                                        <Link to={`/profile/${this.props.id}`} className="btn btn-primary">Назад к профилю</Link>
                                    </div>
                                    <div>                                     
                                        <button className="btn btn-success" onClick = { this.saveChanges }>Сохранить</button>
                                    </div>
                                </div>
                            </div>                      
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}