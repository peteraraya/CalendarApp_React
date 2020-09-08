import React from 'react'

export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                Peter
            </span>
            <button className="btn btn-outline-danger">
                <span className="fa fa-sign-out-alt pr-1">Salir</span>
            </button>
        </div>
    )
}
