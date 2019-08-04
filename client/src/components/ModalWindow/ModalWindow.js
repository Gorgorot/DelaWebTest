import React from "react";
import axios from "axios";

export default class ModalWindow extends React.Component{
    constructor(props){
        super(props);
        this.Authorize = this.Authorize.bind(this);
        this.state = {
            valid_email: "",
            valid_password: "",
            load: false,
            message: false
        };
    }
    validate(element){
        switch (element.target.id){
            case "email":{
                console.log(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,}/.test(element.target.value))
                if(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,}/.test(element.target.value)){
                    this.setState({
                        valid_email: "is-valid"
                    })
                }
                else this.setState({
                    valid_email: "is-invalid"
                })
                break;
            }
            case "password":{
                if(element.target.value.length >3){
                    this.setState({
                        valid_password: "is-valid"
                    })
                }
                else {
                    this.setState({
                        valid_password: "is-invalid"
                    })
                }                
                break;
            }
        }        
    }
    Authorize(){
        var email = document.querySelector("#email").value,
            password = document.querySelector("#password").value;
        this.setState({
            load: true,
            message: false
        })
        axios.request({
            url: "/api/auth",
            method: "POST",
            data: {
                email: email,
                password: password
            },
            headers: { 
                "Content-Type": "application/json"
            }
        })
        .then(response=>{
            console.log(response);
            if(response.data.status == true){
                this.props.onSuccessAuth(response.data);
            }
            else{
                this.setState({
                    load: false,
                    message: true
                });
            }
        })
        .catch(err=>{
            console.error(err);
            this.setState({
                load: false,
                message: true
            })
        })
    }
    render(){
        return(             
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Авторизация</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                this.state.message ? <h6 className="text-danger">Введен неверный логин или пароль!</h6> : null
                            }
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">E-mail</span>
                                </div>
                                <input type="text" id="email" className={ `form-control ${this.state.valid_email}` }  onChange = { (elem)=>this.validate(elem) } placeholder="Электронная почта" aria-label="Электронная почта" aria-describedby="basic-addon1"/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon2">Пароль</span>
                                </div>
                                <input type="password" id="password" className={ `form-control ${this.state.valid_password}` } onChange = { (elem)=>this.validate(elem) } placeholder="Пароль" aria-label="Пароль" aria-describedby="basic-addon2"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" type="button" onClick = { this.Authorize } className="btn btn-primary "  disabled={ this.state.valid_email == "is-valid" && this.state.valid_password == "is-valid" ? false : true }>
                                {
                                    this.state.load ? <span className={ `spinner-border mr-1 spinner-border-sm` } role="status" aria-hidden="true"></span> : null
                                }                                
                                Войти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}