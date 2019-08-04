import React from "react";

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand text-primary" href="#">Название</a>
                {
                    this.props.email ? this.props.email : <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Войти</button>
                }
            </nav>
        )
    }
}

export default Header;