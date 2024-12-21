import React from 'react'
import classes from './NavMenu.module.css'
import { useNavigate } from 'react-router-dom';
function NavMenu() {
    const navigate = useNavigate();

    function NavigateTo(param: any) {
        navigate(param)
    }
    return (
        <div>
            <h1>Welcome to Dialog!</h1>
            <div onClick={() => NavigateTo("/login")} className={classes.NavMenu_Elem}>Log in</div>
            <div onClick={() => NavigateTo("/register")} className={classes.NavMenu_Elem}>Sign Up</div>

            <div onClick={() => NavigateTo("/supplier-dashboard")} className={classes.NavMenu_Elem}>Suplier page</div>

            <div onClick={() => NavigateTo("/buyer-dashboard")} className={classes.NavMenu_Elem}>Buyer page</div>

        </div>
    )
}

export default NavMenu