import React from 'react'
import classes from './LogOut.module.css'
function LogOut() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    function DoLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.reload()
    }
    if (token && role) {
        return (
            <div className={classes.LogOut_Container}>
                <button onClick={DoLogOut} className={classes.LogOut_Button}>
                    Log Out
                </button>
            </div>
        )
    }
    else {
        return <></>
    }

}

export default LogOut